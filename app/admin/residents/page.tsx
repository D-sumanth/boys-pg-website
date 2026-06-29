import { assignBedAction, createResidentAction, updateResidentAction, vacateResidentAction } from "@/app/admin/actions"
import { EmptyState, StatusBadge } from "@/components/admin/admin-card"
import { Field, SelectField } from "@/components/admin/form-fields"
import { ProtectedAdminPage } from "@/components/admin/protected-admin-page"
import { Button } from "@/components/ui/button"
import { getActiveOccupancies, getBeds, getResidents, getRooms } from "@/lib/admin/data"

export default async function ResidentsPage() {
  const [residents, beds, rooms, occupancies] = await Promise.all([
    getResidents(),
    getBeds(),
    getRooms(),
    getActiveOccupancies(),
  ])
  const availableBeds = beds.filter((bed) => bed.status === "Available")
  const roomById = new Map(rooms.map((room) => [room.room_id, room]))
  const bedById = new Map(beds.map((bed) => [bed.bed_id, bed]))
  const occupancyByResident = new Map(occupancies.map((occupancy) => [occupancy.resident_id, occupancy]))

  return (
    <ProtectedAdminPage>
      <div className="grid gap-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Residents</p>
          <h1 className="font-heading text-3xl font-bold text-primary">Resident register</h1>
        </div>

        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-primary">Add resident</h2>
          <form action={createResidentAction} className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Resident code" name="resident_code" placeholder="PD-001" />
            <Field label="Full name" name="full_name" required />
            <Field label="Phone" name="phone" required />
            <Field label="WhatsApp" name="whatsapp_number" />
            <Field label="Email" name="email" type="email" />
            <SelectField label="Resident type" name="resident_type" defaultValue="Student">
              <option>Student</option>
              <option>Working Professional</option>
              <option>Other</option>
            </SelectField>
            <Field label="College / company" name="college_or_company" />
            <Field label="Course / role" name="course_or_role" />
            <Field label="Guardian name" name="guardian_name" />
            <Field label="Guardian phone" name="guardian_phone" />
            <Field label="ID proof type" name="id_proof_type" placeholder="Aadhaar / PAN" />
            <Field label="Masked ID proof" name="id_proof_number_masked" placeholder="XXXX-XXXX-1234" />
            <SelectField label="Status" name="status" defaultValue="Active">
              <option>Active</option>
              <option>Vacated</option>
              <option>Blocked</option>
              <option>Inactive</option>
            </SelectField>
            <Button type="submit" className="h-12 lg:col-span-3">Add Resident</Button>
          </form>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-primary">Assign bed</h2>
          <form action={assignBedAction} className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SelectField label="Resident" name="resident_id">
              <option value="">Select resident</option>
              {residents.filter((resident) => resident.status === "Active").map((resident) => (
                <option key={resident.resident_id} value={resident.resident_id}>{resident.full_name}</option>
              ))}
            </SelectField>
            <SelectField label="Available bed" name="bed_id">
              <option value="">Select bed</option>
              {availableBeds.map((bed) => {
                const room = roomById.get(bed.room_id)
                return <option key={bed.bed_id} value={bed.bed_id}>Room {room?.room_number ?? "-"} • {bed.bed_code}</option>
              })}
            </SelectField>
            <SelectField label="Room" name="room_id">
              <option value="">Select same room</option>
              {rooms.map((room) => <option key={room.room_id} value={room.room_id}>Room {room.room_number}</option>)}
            </SelectField>
            <Field label="Joining date" name="joining_date" type="date" />
            <Field label="Agreed rent" name="agreed_monthly_rent" type="number" />
            <Field label="Notice days" name="notice_period_days" type="number" defaultValue={30} />
            <label className="flex items-center gap-2 rounded-xl bg-secondary px-3 py-3 text-sm font-medium">
              <input type="checkbox" name="is_ac_selected" />
              AC selected
            </label>
            <Button type="submit" className="h-12">Assign Bed</Button>
          </form>
        </section>

        <section className="grid gap-3">
          {residents.map((resident) => {
            const occupancy = occupancyByResident.get(resident.resident_id)
            const bed = occupancy ? bedById.get(occupancy.bed_id) : null
            const room = occupancy ? roomById.get(occupancy.room_id) : null

            return (
              <article key={resident.resident_id} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="font-heading text-xl font-bold text-primary">{resident.full_name}</h2>
                    <p className="text-sm text-muted-foreground">{resident.phone} • {resident.resident_type}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {room && bed ? `Room ${room.room_number}, ${bed.bed_label || bed.bed_code}` : "No active bed assigned"}
                    </p>
                  </div>
                  <StatusBadge status={resident.status} />
                </div>
                <div className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
                  <p>Guardian: {resident.guardian_name || "Not set"}</p>
                  <p>Company/College: {resident.college_or_company || "Not set"}</p>
                  <p>ID: {resident.id_proof_number_masked || "Not set"}</p>
                </div>
                <form action={updateResidentAction} className="mt-4 grid gap-3 rounded-xl bg-secondary p-3 sm:grid-cols-2 lg:grid-cols-4">
                  <input type="hidden" name="resident_id" value={resident.resident_id} />
                  <Field label="Name" name="full_name" defaultValue={resident.full_name} />
                  <Field label="Phone" name="phone" defaultValue={resident.phone} />
                  <Field label="WhatsApp" name="whatsapp_number" defaultValue={resident.whatsapp_number || ""} />
                  <Field label="Email" name="email" defaultValue={resident.email || ""} />
                  <Field label="College / company" name="college_or_company" defaultValue={resident.college_or_company || ""} />
                  <Field label="Guardian" name="guardian_name" defaultValue={resident.guardian_name || ""} />
                  <Field label="Guardian phone" name="guardian_phone" defaultValue={resident.guardian_phone || ""} />
                  <Field label="Masked ID" name="id_proof_number_masked" defaultValue={resident.id_proof_number_masked || ""} />
                  <SelectField label="Status" name="status" defaultValue={resident.status}>
                    <option>Active</option>
                    <option>Vacated</option>
                    <option>Blocked</option>
                    <option>Inactive</option>
                  </SelectField>
                  <Button type="submit" size="sm" className="h-10 lg:col-span-3">Update Resident</Button>
                </form>
                {occupancy ? (
                  <form action={vacateResidentAction} className="mt-4">
                    <input type="hidden" name="occupancy_id" value={occupancy.occupancy_id} />
                    <input type="hidden" name="bed_id" value={occupancy.bed_id} />
                    <input type="hidden" name="resident_id" value={resident.resident_id} />
                    <Button type="submit" variant="outline" size="sm">Mark Vacated</Button>
                  </form>
                ) : null}
              </article>
            )
          })}
          {residents.length === 0 ? <EmptyState title="No residents yet" text="Add your first resident above." /> : null}
        </section>
      </div>
    </ProtectedAdminPage>
  )
}
