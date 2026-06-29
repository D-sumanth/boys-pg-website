import { selectRows } from "@/lib/admin/supabase-rest"
import type { Bed, Enquiry, Hostel, Occupancy, Payment, Resident, Room, RoomType } from "@/lib/admin/types"

export async function getHostel() {
  const result = await selectRows<Hostel>("hostels", {
    select: "hostel_id,hostel_name,total_rooms,total_capacity",
    is_active: "eq.true",
    limit: 1,
  })

  return result.data?.[0] ?? null
}

export async function getRoomTypes() {
  const result = await selectRows<RoomType>("room_types", {
    select: "room_type_id,room_type_name,sharing_capacity,internal_non_ac_price,internal_ac_price",
    is_active: "eq.true",
    order: "room_type_name.asc",
  })

  return result.data ?? []
}

export async function getRooms() {
  const result = await selectRows<Room>("rooms", {
    select: "*",
    order: "room_number.asc",
  })

  return result.data ?? []
}

export async function getBeds() {
  const result = await selectRows<Bed>("beds", {
    select: "*",
    order: "bed_code.asc",
  })

  return result.data ?? []
}

export async function getResidents() {
  const result = await selectRows<Resident>("residents", {
    select: "*",
    order: "created_at.desc",
  })

  return result.data ?? []
}

export async function getActiveOccupancies() {
  const result = await selectRows<Occupancy>("resident_occupancy", {
    select: "*",
    status: "eq.Active",
  })

  return result.data ?? []
}

export async function getEnquiries() {
  const result = await selectRows<Enquiry>("enquiries", {
    select: "*",
    order: "created_at.desc",
  })

  return result.data ?? []
}

export async function getPayments() {
  const result = await selectRows<Payment>("payments", {
    select: "*",
    order: "payment_date.desc",
  })

  return result.data ?? []
}

export async function getDashboardData() {
  const [hostel, rooms, beds, residents, occupancies, enquiries, payments] = await Promise.all([
    getHostel(),
    getRooms(),
    getBeds(),
    getResidents(),
    getActiveOccupancies(),
    getEnquiries(),
    getPayments(),
  ])

  const currentMonth = new Date().toISOString().slice(0, 7)
  const monthlyPayments = payments.filter((payment) => payment.payment_date.startsWith(currentMonth))
  const rentCollected = monthlyPayments
    .filter((payment) => payment.payment_purpose === "Rent" && payment.payment_direction === "In")
    .reduce((sum, payment) => sum + Number(payment.amount), 0)

  return {
    hostel,
    rooms,
    beds,
    residents,
    occupancies,
    enquiries,
    payments,
    metrics: {
      totalBeds: beds.length || hostel?.total_capacity || 90,
      occupiedBeds: beds.filter((bed) => bed.status === "Occupied").length,
      availableBeds: beds.filter((bed) => bed.status === "Available").length,
      occupancyPercent: beds.length ? Math.round((beds.filter((bed) => bed.status === "Occupied").length / beds.length) * 100) : 0,
      rentCollected,
      newEnquiries: enquiries.filter((enquiry) => enquiry.created_at?.startsWith(currentMonth)).length,
      activeResidents: residents.filter((resident) => resident.status === "Active").length,
      availableRooms: rooms.filter((room) => room.status === "Available").length,
    },
  }
}
