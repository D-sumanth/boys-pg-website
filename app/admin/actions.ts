"use server"

import { randomUUID } from "node:crypto"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { requireAdminEditor, signInWithPassword, signOutAdmin } from "@/lib/admin/auth"
import { getHostel } from "@/lib/admin/data"
import { insertRow, selectRows, updateRows, type SupabaseResult } from "@/lib/admin/supabase-rest"
import type { Bed } from "@/lib/admin/types"

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/
const PHONE_PATTERN = /^\+?[0-9 ()-]{7,20}$/
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function rawText(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === "string" ? value : ""
}

function text(formData: FormData, key: string, maxLength = 200) {
  const value = rawText(formData, key).trim()

  if (value.length > maxLength) {
    throw new Error("Invalid admin form submission.")
  }

  return value
}

function requiredText(formData: FormData, key: string, maxLength = 200) {
  const value = text(formData, key, maxLength)

  if (!value) {
    throw new Error("Invalid admin form submission.")
  }

  return value
}

function optionalText(formData: FormData, key: string, maxLength = 500) {
  const value = text(formData, key, maxLength)
  return value || null
}

function numberValue(
  formData: FormData,
  key: string,
  options: { fallback?: number; min?: number; max?: number; integer?: boolean } = {},
) {
  const { fallback = 0, min = 0, max = 100_000_000, integer = false } = options
  const rawValue = text(formData, key)

  if (!rawValue) {
    return fallback
  }

  const value = Number(rawValue)

  if (!Number.isFinite(value)) {
    throw new Error("Invalid admin form submission.")
  }

  if (value < min || value > max || (integer && !Number.isInteger(value))) {
    throw new Error("Invalid admin form submission.")
  }

  return value
}

function boolValue(formData: FormData, key: string) {
  return text(formData, key) === "on" || text(formData, key) === "true"
}

function uuidValue(formData: FormData, key: string) {
  const value = requiredText(formData, key, 36)

  if (!UUID_PATTERN.test(value)) {
    throw new Error("Invalid admin form submission.")
  }

  return value
}

function optionalUuid(formData: FormData, key: string) {
  const value = optionalText(formData, key, 36)

  if (value && !UUID_PATTERN.test(value)) {
    throw new Error("Invalid admin form submission.")
  }

  return value
}

function enumValue<const T extends readonly string[]>(
  formData: FormData,
  key: string,
  allowed: T,
  fallback: T[number],
) {
  const value = text(formData, key, 50) || fallback

  if (!(allowed as readonly string[]).includes(value)) {
    throw new Error("Invalid admin form submission.")
  }

  return value as T[number]
}

function optionalPhone(formData: FormData, key: string) {
  const value = optionalText(formData, key, 20)

  if (value && !PHONE_PATTERN.test(value)) {
    throw new Error("Invalid admin form submission.")
  }

  return value
}

function requiredPhone(formData: FormData, key: string) {
  const value = requiredText(formData, key, 20)

  if (!PHONE_PATTERN.test(value)) {
    throw new Error("Invalid admin form submission.")
  }

  return value
}

function optionalEmail(formData: FormData, key: string) {
  const value = optionalText(formData, key, 254)

  if (value && !EMAIL_PATTERN.test(value)) {
    throw new Error("Invalid admin form submission.")
  }

  return value?.toLowerCase() ?? null
}

function optionalDate(formData: FormData, key: string) {
  const value = optionalText(formData, key, 10)

  if (value) {
    const parsedDate = new Date(`${value}T00:00:00Z`)

    if (!DATE_PATTERN.test(value) || Number.isNaN(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== value) {
      throw new Error("Invalid admin form submission.")
    }
  }

  return value
}

function requiredDate(formData: FormData, key: string, fallback: string) {
  return optionalDate(formData, key) ?? fallback
}

function requireMutation<T>(result: SupabaseResult<T>): T {
  if (result.error || result.data === null || (Array.isArray(result.data) && result.data.length === 0)) {
    throw new Error("The admin operation could not be completed.")
  }

  return result.data
}

async function logActivity(entityType: string, entityId: string | null, action: "Create" | "Update", newValue: unknown) {
  const admin = await requireAdminEditor()
  await insertRow("activity_logs", {
    user_id: admin.id,
    entity_type: entityType,
    entity_id: entityId,
    action,
    new_value_json: newValue,
  })
}

export async function loginAction(_previousState: { error?: string } | undefined, formData: FormData) {
  const email = rawText(formData, "email").trim().toLowerCase()
  const password = rawText(formData, "password")

  if (!email || !password || email.length > 254 || password.length > 1024 || !EMAIL_PATTERN.test(email)) {
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
  await requireAdminEditor()
  const hostel = await getHostel()

  if (!hostel) {
    redirect("/admin/rooms?error=missing-hostel")
  }

  const body = {
    hostel_id: hostel.hostel_id,
    room_type_id: uuidValue(formData, "room_type_id"),
    room_number: requiredText(formData, "room_number", 20),
    floor_number: optionalText(formData, "floor_number", 20),
    capacity: numberValue(formData, "capacity", { fallback: 4, min: 1, max: 4, integer: true }),
    is_ac_available: boolValue(formData, "is_ac_available"),
    has_attached_washroom: boolValue(formData, "has_attached_washroom"),
    has_geyser: boolValue(formData, "has_geyser"),
    has_locker: boolValue(formData, "has_locker"),
    notes: optionalText(formData, "notes", 1000),
    status: enumValue(formData, "status", ["Available", "Occupied", "Maintenance", "Inactive"] as const, "Available"),
  }

  const result = await insertRow<{ room_id: string }>("rooms", body)
  const rooms = requireMutation(result)
  await logActivity("rooms", rooms[0]?.room_id ?? null, "Create", body)
  revalidatePath("/admin/rooms")
  redirect("/admin/rooms")
}

export async function updateRoomAction(formData: FormData) {
  await requireAdminEditor()
  const roomId = uuidValue(formData, "room_id")
  const body = {
    floor_number: optionalText(formData, "floor_number", 20),
    capacity: numberValue(formData, "capacity", { fallback: 4, min: 1, max: 4, integer: true }),
    status: enumValue(formData, "status", ["Available", "Occupied", "Maintenance", "Inactive"] as const, "Available"),
    notes: optionalText(formData, "notes", 1000),
  }

  requireMutation(await updateRows("rooms", { room_id: `eq.${roomId}` }, body))
  await logActivity("rooms", roomId, "Update", body)
  revalidatePath("/admin/rooms")
}

export async function createResidentAction(formData: FormData) {
  await requireAdminEditor()
  const body = {
    resident_code: optionalText(formData, "resident_code", 40),
    full_name: requiredText(formData, "full_name", 120),
    phone: requiredPhone(formData, "phone"),
    whatsapp_number: optionalPhone(formData, "whatsapp_number"),
    email: optionalEmail(formData, "email"),
    resident_type: enumValue(formData, "resident_type", ["Student", "Working Professional", "Other"] as const, "Student"),
    college_or_company: optionalText(formData, "college_or_company", 160),
    course_or_role: optionalText(formData, "course_or_role", 120),
    guardian_name: optionalText(formData, "guardian_name", 120),
    guardian_phone: optionalPhone(formData, "guardian_phone"),
    id_proof_type: optionalText(formData, "id_proof_type", 40),
    id_proof_number_masked: optionalText(formData, "id_proof_number_masked", 40),
    status: enumValue(formData, "status", ["Active", "Vacated", "Blocked", "Inactive"] as const, "Active"),
  }

  const result = await insertRow<{ resident_id: string }>("residents", body)
  const residents = requireMutation(result)
  await logActivity("residents", residents[0]?.resident_id ?? null, "Create", body)
  revalidatePath("/admin/residents")
  redirect("/admin/residents")
}

export async function updateResidentAction(formData: FormData) {
  await requireAdminEditor()
  const residentId = uuidValue(formData, "resident_id")
  const body = {
    full_name: requiredText(formData, "full_name", 120),
    phone: requiredPhone(formData, "phone"),
    whatsapp_number: optionalPhone(formData, "whatsapp_number"),
    email: optionalEmail(formData, "email"),
    college_or_company: optionalText(formData, "college_or_company", 160),
    guardian_name: optionalText(formData, "guardian_name", 120),
    guardian_phone: optionalPhone(formData, "guardian_phone"),
    id_proof_number_masked: optionalText(formData, "id_proof_number_masked", 40),
    status: enumValue(formData, "status", ["Active", "Vacated", "Blocked", "Inactive"] as const, "Active"),
  }

  requireMutation(await updateRows("residents", { resident_id: `eq.${residentId}` }, body))
  await logActivity("residents", residentId, "Update", body)
  revalidatePath("/admin/residents")
}

export async function assignBedAction(formData: FormData) {
  await requireAdminEditor()
  const residentId = uuidValue(formData, "resident_id")
  const roomId = uuidValue(formData, "room_id")
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
    joining_date: requiredDate(formData, "joining_date", new Date().toISOString().slice(0, 10)),
    agreed_monthly_rent: numberValue(formData, "agreed_monthly_rent", { min: 0, max: 100_000 }),
    is_ac_selected: boolValue(formData, "is_ac_selected"),
    notice_period_days: numberValue(formData, "notice_period_days", { fallback: 30, min: 0, max: 365, integer: true }),
    status: "Active",
  }

  const result = await insertRow<{ occupancy_id: string }>("resident_occupancy", body)
  const occupancies = requireMutation(result)
  requireMutation(await updateRows("beds", { bed_id: `eq.${bedId}` }, { status: "Occupied" }))
  await logActivity("resident_occupancy", occupancies[0]?.occupancy_id ?? null, "Create", body)
  revalidatePath("/admin/residents")
  revalidatePath("/admin/rooms")
  redirect("/admin/residents")
}

export async function vacateResidentAction(formData: FormData) {
  await requireAdminEditor()
  const occupancyId = uuidValue(formData, "occupancy_id")
  const bedId = uuidValue(formData, "bed_id")
  const residentId = uuidValue(formData, "resident_id")
  requireMutation(await updateRows("resident_occupancy", { occupancy_id: `eq.${occupancyId}` }, {
    status: "Vacated",
    leaving_date: new Date().toISOString().slice(0, 10),
  }))
  requireMutation(await updateRows("beds", { bed_id: `eq.${bedId}` }, { status: "Available" }))
  requireMutation(await updateRows("residents", { resident_id: `eq.${residentId}` }, { status: "Vacated" }))
  await logActivity("residents", residentId, "Update", { status: "Vacated" })
  revalidatePath("/admin/residents")
  revalidatePath("/admin/rooms")
}

export async function createEnquiryAction(formData: FormData) {
  await requireAdminEditor()
  const hostel = await getHostel()
  const body = {
    hostel_id: hostel?.hostel_id,
    name: requiredText(formData, "name", 120),
    phone: requiredPhone(formData, "phone"),
    email: optionalEmail(formData, "email"),
    resident_type: enumValue(formData, "resident_type", ["Student", "Working Professional", "Other"] as const, "Student"),
    college_or_company: optionalText(formData, "college_or_company", 160),
    source: enumValue(formData, "source", ["WhatsApp", "Call", "Instagram", "Google Maps", "Referral", "College", "Walk-in", "Website", "Other"] as const, "Website"),
    preferred_room_type_id: optionalUuid(formData, "preferred_room_type_id"),
    ac_preference: enumValue(formData, "ac_preference", ["AC", "Non-AC", "No Preference"] as const, "No Preference"),
    expected_joining_date: optionalDate(formData, "expected_joining_date"),
    budget: numberValue(formData, "budget", { min: 0, max: 100_000 }) || null,
    message: optionalText(formData, "message", 2000),
    status: enumValue(formData, "status", ["New", "Contacted", "Visit Scheduled", "Visited", "Joined", "Lost", "Follow Up Later"] as const, "New"),
  }

  const result = await insertRow<{ enquiry_id: string }>("enquiries", body)
  const enquiries = requireMutation(result)
  await logActivity("enquiries", enquiries[0]?.enquiry_id ?? null, "Create", body)
  revalidatePath("/admin/enquiries")
  redirect("/admin/enquiries")
}

export async function updateEnquiryStatusAction(formData: FormData) {
  await requireAdminEditor()
  const enquiryId = uuidValue(formData, "enquiry_id")
  const status = enumValue(formData, "status", ["New", "Contacted", "Visit Scheduled", "Visited", "Joined", "Lost", "Follow Up Later"] as const, "New")
  requireMutation(await updateRows("enquiries", { enquiry_id: `eq.${enquiryId}` }, { status }))
  await logActivity("enquiries", enquiryId, "Update", { status })
  revalidatePath("/admin/enquiries")
}

export async function createPaymentAction(formData: FormData) {
  const admin = await requireAdminEditor()
  const amount = numberValue(formData, "amount", { min: 0.01, max: 10_000_000 })
  const rentInvoiceId = optionalUuid(formData, "rent_invoice_id")
  const paymentDate = requiredDate(formData, "payment_date", new Date().toISOString().slice(0, 10))
  const receiptNumber = `PDPG-${paymentDate.replaceAll("-", "")}-${randomUUID().slice(0, 8).toUpperCase()}`
  const body = {
    resident_id: uuidValue(formData, "resident_id"),
    rent_invoice_id: rentInvoiceId,
    payment_date: paymentDate,
    amount,
    payment_direction: enumValue(formData, "payment_direction", ["In", "Out"] as const, "In"),
    payment_purpose: enumValue(formData, "payment_purpose", ["Rent", "Deposit", "Refund", "Advance", "Fine", "Food Extra", "AC Charges", "Maintenance", "Other"] as const, "Rent"),
    payment_mode: enumValue(formData, "payment_mode", ["Cash", "UPI", "Bank Transfer", "Card", "Cheque", "Other"] as const, "UPI"),
    transaction_reference: optionalText(formData, "transaction_reference", 120),
    receipt_number: receiptNumber,
    collected_by_user_id: admin.id,
    notes: optionalText(formData, "notes", 1000),
  }

  const result = await insertRow<{ payment_id: string }>("payments", body)
  const payments = requireMutation(result)
  const paymentId = payments[0]?.payment_id

  if (!paymentId) {
    throw new Error("The receipt could not be created.")
  }

  if (rentInvoiceId && body.payment_direction === "In") {
    requireMutation(await updateRows("rent_invoices", { rent_invoice_id: `eq.${rentInvoiceId}` }, {
      paid_amount: amount,
      balance_amount: 0,
      status: "Paid",
    }))
  }

  await logActivity("payments", paymentId, "Create", body)
  revalidatePath("/admin/payments")
  revalidatePath("/admin/dashboard")
  redirect(`/admin/payments/${paymentId}/receipt`)
}
