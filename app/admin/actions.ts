"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { requireAdmin, signInWithPassword, signOutAdmin } from "@/lib/admin/auth"
import { getHostel } from "@/lib/admin/data"
import { insertRow, selectRows, updateRows } from "@/lib/admin/supabase-rest"
import type { Bed } from "@/lib/admin/types"

function text(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === "string" ? value.trim() : ""
}

function optionalText(formData: FormData, key: string) {
  const value = text(formData, key)
  return value || null
}

function numberValue(formData: FormData, key: string, fallback = 0) {
  const value = Number(text(formData, key))
  return Number.isFinite(value) ? value : fallback
}

function boolValue(formData: FormData, key: string) {
  return text(formData, key) === "on" || text(formData, key) === "true"
}

async function logActivity(entityType: string, entityId: string | null, action: "Create" | "Update", newValue: unknown) {
  const admin = await requireAdmin()
  await insertRow("activity_logs", {
    user_id: admin.id,
    entity_type: entityType,
    entity_id: entityId,
    action,
    new_value_json: newValue,
  })
}

export async function loginAction(_previousState: { error?: string } | undefined, formData: FormData) {
  const email = text(formData, "email")
  const password = text(formData, "password")

  if (!email || !password) {
    return { error: "Enter email and password." }
  }

  const result = await signInWithPassword(email, password)

  if (!result.ok) {
    return { error: result.error }
  }

  redirect("/admin/dashboard")
}

export async function logoutAction() {
  await signOutAdmin()
  redirect("/admin/login")
}

export async function createRoomAction(formData: FormData) {
  await requireAdmin()
  const hostel = await getHostel()

  if (!hostel) {
    redirect("/admin/rooms?error=missing-hostel")
  }

  const body = {
    hostel_id: hostel.hostel_id,
    room_type_id: text(formData, "room_type_id"),
    room_number: text(formData, "room_number"),
    floor_number: optionalText(formData, "floor_number"),
    capacity: numberValue(formData, "capacity", 4),
    is_ac_available: boolValue(formData, "is_ac_available"),
    has_attached_washroom: boolValue(formData, "has_attached_washroom"),
    has_geyser: boolValue(formData, "has_geyser"),
    has_locker: boolValue(formData, "has_locker"),
    notes: optionalText(formData, "notes"),
    status: text(formData, "status") || "Available",
  }

  const result = await insertRow<{ room_id: string }>("rooms", body)
  await logActivity("rooms", result.data?.[0]?.room_id ?? null, "Create", body)
  revalidatePath("/admin/rooms")
  redirect("/admin/rooms")
}

export async function updateRoomAction(formData: FormData) {
  await requireAdmin()
  const roomId = text(formData, "room_id")
  const body = {
    floor_number: optionalText(formData, "floor_number"),
    capacity: numberValue(formData, "capacity", 4),
    status: text(formData, "status") || "Available",
    notes: optionalText(formData, "notes"),
  }

  await updateRows("rooms", `room_id=eq.${roomId}`, body)
  await logActivity("rooms", roomId, "Update", body)
  revalidatePath("/admin/rooms")
}

export async function createResidentAction(formData: FormData) {
  await requireAdmin()
  const body = {
    resident_code: optionalText(formData, "resident_code"),
    full_name: text(formData, "full_name"),
    phone: text(formData, "phone"),
    whatsapp_number: optionalText(formData, "whatsapp_number"),
    email: optionalText(formData, "email"),
    resident_type: text(formData, "resident_type") || "Student",
    college_or_company: optionalText(formData, "college_or_company"),
    course_or_role: optionalText(formData, "course_or_role"),
    guardian_name: optionalText(formData, "guardian_name"),
    guardian_phone: optionalText(formData, "guardian_phone"),
    id_proof_type: optionalText(formData, "id_proof_type"),
    id_proof_number_masked: optionalText(formData, "id_proof_number_masked"),
    status: text(formData, "status") || "Active",
  }

  const result = await insertRow<{ resident_id: string }>("residents", body)
  await logActivity("residents", result.data?.[0]?.resident_id ?? null, "Create", body)
  revalidatePath("/admin/residents")
  redirect("/admin/residents")
}

export async function updateResidentAction(formData: FormData) {
  await requireAdmin()
  const residentId = text(formData, "resident_id")
  const body = {
    full_name: text(formData, "full_name"),
    phone: text(formData, "phone"),
    whatsapp_number: optionalText(formData, "whatsapp_number"),
    email: optionalText(formData, "email"),
    college_or_company: optionalText(formData, "college_or_company"),
    guardian_name: optionalText(formData, "guardian_name"),
    guardian_phone: optionalText(formData, "guardian_phone"),
    id_proof_number_masked: optionalText(formData, "id_proof_number_masked"),
    status: text(formData, "status") || "Active",
  }

  await updateRows("residents", `resident_id=eq.${residentId}`, body)
  await logActivity("residents", residentId, "Update", body)
  revalidatePath("/admin/residents")
}

export async function assignBedAction(formData: FormData) {
  await requireAdmin()
  const residentId = text(formData, "resident_id")
  const roomId = text(formData, "room_id")
  const availableBeds = await selectRows<Bed>("beds", {
    select: "bed_id,room_id,bed_code,bed_label,default_price,ac_price,status",
    room_id: `eq.${roomId}`,
    status: "eq.Available",
    order: "bed_code.asc",
    limit: 1,
  })
  const bedId = availableBeds.data?.[0]?.bed_id

  if (!bedId) {
    redirect("/admin/residents?error=no-room-slot")
  }

  const body = {
    resident_id: residentId,
    bed_id: bedId,
    room_id: roomId,
    joining_date: text(formData, "joining_date") || new Date().toISOString().slice(0, 10),
    agreed_monthly_rent: numberValue(formData, "agreed_monthly_rent"),
    is_ac_selected: boolValue(formData, "is_ac_selected"),
    notice_period_days: numberValue(formData, "notice_period_days", 30),
    status: "Active",
  }

  const result = await insertRow<{ occupancy_id: string }>("resident_occupancy", body)
  await updateRows("beds", `bed_id=eq.${bedId}`, { status: "Occupied" })
  await logActivity("resident_occupancy", result.data?.[0]?.occupancy_id ?? null, "Create", body)
  revalidatePath("/admin/residents")
  revalidatePath("/admin/rooms")
  redirect("/admin/residents")
}

export async function vacateResidentAction(formData: FormData) {
  await requireAdmin()
  const occupancyId = text(formData, "occupancy_id")
  const bedId = text(formData, "bed_id")
  const residentId = text(formData, "resident_id")
  await updateRows("resident_occupancy", `occupancy_id=eq.${occupancyId}`, {
    status: "Vacated",
    leaving_date: new Date().toISOString().slice(0, 10),
  })
  await updateRows("beds", `bed_id=eq.${bedId}`, { status: "Available" })
  await updateRows("residents", `resident_id=eq.${residentId}`, { status: "Vacated" })
  await logActivity("residents", residentId, "Update", { status: "Vacated" })
  revalidatePath("/admin/residents")
  revalidatePath("/admin/rooms")
}

export async function createEnquiryAction(formData: FormData) {
  await requireAdmin()
  const hostel = await getHostel()
  const body = {
    hostel_id: hostel?.hostel_id,
    name: text(formData, "name"),
    phone: text(formData, "phone"),
    email: optionalText(formData, "email"),
    resident_type: optionalText(formData, "resident_type"),
    college_or_company: optionalText(formData, "college_or_company"),
    source: text(formData, "source") || "Website",
    preferred_room_type_id: optionalText(formData, "preferred_room_type_id"),
    ac_preference: text(formData, "ac_preference") || "No Preference",
    expected_joining_date: optionalText(formData, "expected_joining_date"),
    budget: numberValue(formData, "budget") || null,
    message: optionalText(formData, "message"),
    status: text(formData, "status") || "New",
  }

  const result = await insertRow<{ enquiry_id: string }>("enquiries", body)
  await logActivity("enquiries", result.data?.[0]?.enquiry_id ?? null, "Create", body)
  revalidatePath("/admin/enquiries")
  redirect("/admin/enquiries")
}

export async function updateEnquiryStatusAction(formData: FormData) {
  await requireAdmin()
  const enquiryId = text(formData, "enquiry_id")
  const status = text(formData, "status")
  await updateRows("enquiries", `enquiry_id=eq.${enquiryId}`, { status })
  await logActivity("enquiries", enquiryId, "Update", { status })
  revalidatePath("/admin/enquiries")
}

export async function createPaymentAction(formData: FormData) {
  const admin = await requireAdmin()
  const amount = numberValue(formData, "amount")
  const rentInvoiceId = optionalText(formData, "rent_invoice_id")
  const body = {
    resident_id: optionalText(formData, "resident_id"),
    rent_invoice_id: rentInvoiceId,
    payment_date: text(formData, "payment_date") || new Date().toISOString().slice(0, 10),
    amount,
    payment_direction: text(formData, "payment_direction") || "In",
    payment_purpose: text(formData, "payment_purpose") || "Rent",
    payment_mode: text(formData, "payment_mode") || "UPI",
    transaction_reference: optionalText(formData, "transaction_reference"),
    receipt_number: optionalText(formData, "receipt_number"),
    collected_by_user_id: admin.id,
    notes: optionalText(formData, "notes"),
  }

  const result = await insertRow<{ payment_id: string }>("payments", body)

  if (rentInvoiceId && body.payment_direction === "In") {
    await updateRows("rent_invoices", `rent_invoice_id=eq.${rentInvoiceId}`, {
      paid_amount: amount,
      balance_amount: 0,
      status: "Paid",
    })
  }

  await logActivity("payments", result.data?.[0]?.payment_id ?? null, "Create", body)
  revalidatePath("/admin/payments")
  revalidatePath("/admin/dashboard")
  redirect("/admin/payments")
}
