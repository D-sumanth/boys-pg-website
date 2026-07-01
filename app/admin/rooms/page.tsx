import { createBedAction, createRoomAction, updateBedStatusAction, updateRoomAction } from "@/app/admin/actions"
import { EmptyState, StatusBadge } from "@/components/admin/admin-card"
import { Field, SelectField, TextAreaField } from "@/components/admin/form-fields"
import { ProtectedAdminPage } from "@/components/admin/protected-admin-page"
import { Button } from "@/components/ui/button"
import { getBeds, getRooms, getRoomTypes } from "@/lib/admin/data"

const bedStatuses = ["Available", "Occupied", "Reserved", "Maintenance", "Inactive"]

export default async function RoomsPage() {
  const [rooms, beds, roomTypes] = await Promise.all([getRooms(), getBeds(), getRoomTypes()])
  const roomTypeById = new Map(roomTypes.map((roomType) => [roomType.room_type_id, roomType]))
  const bedsByRoom = new Map<string, typeof beds>()

  for (const bed of beds) {
    bedsByRoom.set(bed.room_id, [...(bedsByRoom.get(bed.room_id) ?? []), bed])
  }

  return (
    <ProtectedAdminPage>
      <div className="grid gap-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Rooms &amp; Beds</p>
          <h1 className="font-heading text-3xl font-bold text-primary">Manage rooms</h1>
          <p className="mt-1 text-sm text-muted-foreground">Add rooms once, then tap a room card whenever you need to update it.</p>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <details open className="rounded-2xl border border-border bg-card shadow-sm">
            <summary className="cursor-pointer list-none p-5 font-heading text-xl font-bold text-primary marker:hidden [&::-webkit-details-marker]:hidden">
              Add room
            </summary>
            <form action={createRoomAction} className="grid gap-4 border-t border-border p-5 sm:grid-cols-2">
              <Field label="Room number" name="room_number" required placeholder="101" />
              <Field label="Floor" name="floor_number" placeholder="1" />
              <SelectField label="Room type" name="room_type_id">
                <option value="">Select room type</option>
                {roomTypes.map((roomType) => (
                  <option key={roomType.room_type_id} value={roomType.room_type_id}>
                    {roomType.room_type_name}
                  </option>
                ))}
              </SelectField>
              <Field label="Capacity" name="capacity" type="number" defaultValue={4} />
              <SelectField label="Status" name="status" defaultValue="Available">
                <option>Available</option>
                <option>Occupied</option>
                <option>Maintenance</option>
                <option>Inactive</option>
              </SelectField>
              <div className="grid gap-2 rounded-xl bg-secondary p-3 text-sm">
                <label><input type="checkbox" name="is_ac_available" className="mr-2" />AC available</label>
                <label><input type="checkbox" name="has_attached_washroom" className="mr-2" defaultChecked />Attached washroom</label>
                <label><input type="checkbox" name="has_geyser" className="mr-2" defaultChecked />Geyser</label>
                <label><input type="checkbox" name="has_locker" className="mr-2" defaultChecked />Locker</label>
              </div>
              <div className="sm:col-span-2">
                <TextAreaField label="Notes" name="notes" />
              </div>
              <Button type="submit" className="h-12 sm:col-span-2">Add Room</Button>
            </form>
          </details>

          <details className="rounded-2xl border border-border bg-card shadow-sm">
            <summary className="cursor-pointer list-none p-5 font-heading text-xl font-bold text-primary marker:hidden [&::-webkit-details-marker]:hidden">
              Add bed
            </summary>
            <form action={createBedAction} className="grid gap-4 border-t border-border p-5 sm:grid-cols-2">
              <SelectField label="Room" name="room_id">
                <option value="">Select room</option>
                {rooms.map((room) => (
                  <option key={room.room_id} value={room.room_id}>Room {room.room_number}</option>
                ))}
              </SelectField>
              <Field label="Bed code" name="bed_code" required placeholder="101-A" />
              <Field label="Bed label" name="bed_label" placeholder="Bed A" />
              <Field label="Non-AC price" name="default_price" type="number" />
              <Field label="AC price" name="ac_price" type="number" />
              <SelectField label="Status" name="status" defaultValue="Available">
                {bedStatuses.map((status) => <option key={status}>{status}</option>)}
              </SelectField>
              <Button type="submit" className="h-12 sm:col-span-2">Add Bed</Button>
            </form>
          </details>
        </div>

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {rooms.map((room) => {
            const roomBeds = bedsByRoom.get(room.room_id) ?? []
            const roomType = roomTypeById.get(room.room_type_id)
            const availableBeds = roomBeds.filter((bed) => bed.status === "Available").length
            const occupiedBeds = roomBeds.filter((bed) => bed.status === "Occupied").length
            const maintenanceBeds = roomBeds.filter((bed) => bed.status === "Maintenance").length

            return (
              <details key={room.room_id} className="group rounded-2xl border border-border bg-card shadow-sm transition-shadow open:shadow-lg">
                <summary className="cursor-pointer list-none p-4 marker:hidden [&::-webkit-details-marker]:hidden">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-heading text-xl font-bold text-primary">Room {room.room_number}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Floor {room.floor_number || "Not set"} &bull; {roomType?.room_type_name ?? "Room type"}
                      </p>
                    </div>
                    <StatusBadge status={room.status} />
                  </div>

                  <div className="mt-4 grid grid-cols-4 gap-2 text-center text-xs">
                    <div className="rounded-xl bg-secondary p-2">
                      <p className="font-heading text-lg font-bold text-primary">{room.capacity}</p>
                      <p className="text-muted-foreground">capacity</p>
                    </div>
                    <div className="rounded-xl bg-green-50 p-2 text-green-800">
                      <p className="font-heading text-lg font-bold">{availableBeds}</p>
                      <p>free</p>
                    </div>
                    <div className="rounded-xl bg-amber-50 p-2 text-amber-800">
                      <p className="font-heading text-lg font-bold">{occupiedBeds}</p>
                      <p>used</p>
                    </div>
                    <div className="rounded-xl bg-muted p-2 text-muted-foreground">
                      <p className="font-heading text-lg font-bold">{maintenanceBeds}</p>
                      <p>maint.</p>
                    </div>
                  </div>

                  <p className="mt-3 text-xs font-semibold text-accent group-open:hidden">Tap to manage room and beds</p>
                  <p className="mt-3 hidden text-xs font-semibold text-accent group-open:block">Room controls are open</p>
                </summary>

                <div className="border-t border-border p-4">
                  <form action={updateRoomAction} className="grid gap-3 rounded-xl bg-secondary p-3">
                    <input type="hidden" name="room_id" value={room.room_id} />
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field label="Floor" name="floor_number" defaultValue={room.floor_number || ""} />
                      <Field label="Capacity" name="capacity" type="number" defaultValue={room.capacity} />
                      <SelectField label="Status" name="status" defaultValue={room.status}>
                        <option>Available</option>
                        <option>Occupied</option>
                        <option>Maintenance</option>
                        <option>Inactive</option>
                      </SelectField>
                      <Field label="Notes" name="notes" defaultValue={room.notes || ""} />
                    </div>
                    <Button type="submit" size="sm" className="h-10">Update Room</Button>
                  </form>

                  <div className="mt-4 grid gap-3">
                    {roomBeds.map((bed) => (
                      <div key={bed.bed_id} className="rounded-xl bg-secondary p-3">
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <p className="font-semibold text-foreground">{bed.bed_label || bed.bed_code}</p>
                            <p className="text-xs text-muted-foreground">Rs. {Number(bed.default_price).toLocaleString("en-IN")} internal</p>
                          </div>
                          <StatusBadge status={bed.status} />
                        </div>
                        <form action={updateBedStatusAction} className="mt-3 grid grid-cols-[1fr_auto] gap-2">
                          <input type="hidden" name="bed_id" value={bed.bed_id} />
                          <select name="status" defaultValue={bed.status} className="h-10 min-w-0 rounded-lg border border-input bg-background px-2 text-xs">
                            {bedStatuses.map((status) => <option key={status}>{status}</option>)}
                          </select>
                          <Button type="submit" size="sm">Save</Button>
                        </form>
                      </div>
                    ))}
                  </div>
                  {roomBeds.length === 0 ? <div className="mt-4"><EmptyState title="No beds added" text="Add beds for this room using the form above." /></div> : null}
                </div>
              </details>
            )
          })}
          {rooms.length === 0 ? <EmptyState title="No rooms yet" text="Add your actual room numbers and floors when ready." /> : null}
        </section>
      </div>
    </ProtectedAdminPage>
  )
}
