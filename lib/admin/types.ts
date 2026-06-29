export type RoomStatus = "Available" | "Occupied" | "Maintenance" | "Inactive"
export type BedStatus = "Available" | "Occupied" | "Reserved" | "Maintenance" | "Inactive"
export type ResidentStatus = "Active" | "Vacated" | "Blocked" | "Inactive"
export type EnquiryStatus = "New" | "Contacted" | "Visit Scheduled" | "Visited" | "Joined" | "Lost" | "Follow Up Later"

export type Hostel = {
  hostel_id: string
  hostel_name: string
  total_rooms: number
  total_capacity: number
}

export type RoomType = {
  room_type_id: string
  room_type_name: string
  sharing_capacity: number
  internal_non_ac_price: number
  internal_ac_price: number
}

export type Room = {
  room_id: string
  hostel_id: string
  room_type_id: string
  room_number: string
  floor_number: string | null
  capacity: number
  is_ac_available: boolean
  has_attached_washroom: boolean
  has_geyser: boolean
  has_locker: boolean
  notes: string | null
  status: RoomStatus
}

export type Bed = {
  bed_id: string
  room_id: string
  bed_code: string
  bed_label: string | null
  default_price: number
  ac_price: number
  status: BedStatus
}

export type Resident = {
  resident_id: string
  resident_code: string | null
  full_name: string
  phone: string
  whatsapp_number: string | null
  email: string | null
  resident_type: "Student" | "Working Professional" | "Other"
  college_or_company: string | null
  course_or_role: string | null
  guardian_name: string | null
  guardian_phone: string | null
  id_proof_type: string | null
  id_proof_number_masked: string | null
  status: ResidentStatus
  created_at: string
}

export type Occupancy = {
  occupancy_id: string
  resident_id: string
  bed_id: string
  room_id: string
  joining_date: string
  agreed_monthly_rent: number
  is_ac_selected: boolean
  status: "Active" | "Moved" | "Vacated"
}

export type Enquiry = {
  enquiry_id: string
  name: string
  phone: string
  email: string | null
  resident_type: string | null
  college_or_company: string | null
  source: string
  ac_preference: string
  expected_joining_date: string | null
  budget: number | null
  message: string | null
  status: EnquiryStatus
  converted_resident_id: string | null
  created_at: string
}

export type Payment = {
  payment_id: string
  resident_id: string | null
  rent_invoice_id: string | null
  payment_date: string
  amount: number
  payment_direction: "In" | "Out"
  payment_purpose: string
  payment_mode: string
  transaction_reference: string | null
  receipt_number: string | null
  notes: string | null
  created_at: string
}
