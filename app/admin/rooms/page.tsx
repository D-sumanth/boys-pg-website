import Link from "next/link"
import { Building2, DoorOpen, Filter, UsersRound } from "lucide-react"
import { createRoomAction } from "@/app/admin/actions"
import { EmptyState } from "@/components/admin/admin-card"
import { Field, SelectField, TextAreaField } from "@/components/admin/form-fields"
import { ProtectedAdminPage } from "@/components/admin/protected-admin-page"
import { RoomOverviewCard } from "@/components/admin/room-overview-card"
import { Button } from "@/components/ui/button"
import { canEditAdmin, requireAdmin } from "@/lib/admin/auth"
import { getActiveOccupancies, getBeds, getResidents, getRooms, getRoomTypes } from "@/lib/admin/data"
import type { Room } from "@/lib/admin/types"
import { cn } from "@/lib/utils"

const roomViews = [
  { value: "all", label: "All rooms" },
  { value: "vacancies", label: "Vacancies" },
  { value: "full", label: "Full" },
  { value: "maintenance", label: "Maintenance" },
] as const

type RoomView = (typeof roomViews)[number]["value"]

function roomFilterHref(view: RoomView, floor: string) {
  const query = new URLSearchParams()

  if (view !== "all") query.set("view", view)
  if (floor) query.set("floor", floor)

  const suffix = query.toString()
  return suffix ? `/admin/rooms?${suffix}` : "/admin/rooms"
}

export default async function RoomsPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; floor?: string }>
}) {
  const admin = await requireAdmin()
  const canEdit = canEditAdmin(admin)
  const { view: requestedView, floor: requestedFloor } = await searchParams
  const activeView: RoomView = roomViews.some((view) => view.value === requestedView)
    ? (requestedView as RoomView)
    : "all"
  const [rooms, beds, roomTypes, occupancies, residents] = await Promise.all([
    getRooms(),
    getBeds(),
    getRoomTypes(),
    getActiveOccupancies(),
    getResidents(),
  ])
  const roomTypeById = new Map(roomTypes.map((roomType) => [roomType.room_type_id, roomType]))
  const residentById = new Map(residents.map((resident) => [resident.resident_id, resident]))
  const bedsByRoom = new Map<string, typeof beds>()
  const occupanciesByRoom = new Map<string, typeof occupancies>()

  for (const bed of beds) {
    bedsByRoom.set(bed.room_id, [...(bedsByRoom.get(bed.room_id) ?? []), bed])
  }

  for (const occupancy of occupancies) {
    occupanciesByRoom.set(occupancy.room_id, [...(occupanciesByRoom.get(occupancy.room_id) ?? []), occupancy])
  }

  const floorOptions = Array.from(new Set(rooms.map((room) => room.floor_number).filter((floor): floor is string => Boolean(floor))))
    .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }))
  const activeFloor = requestedFloor && floorOptions.includes(requestedFloor) ? requestedFloor : ""

  function getRoomCounts(room: Room) {
    const roomBeds = bedsByRoom.get(room.room_id) ?? []
    const occupied = occupanciesByRoom.get(room.room_id)?.length ?? 0
    const maintenance = roomBeds.filter((bed) => bed.status === "Maintenance").length
    const vacancies = Math.max(room.capacity - occupied - maintenance, 0)

    return { occupied, maintenance, vacancies }
  }

  const totalOccupied = rooms.reduce((total, room) => total + getRoomCounts(room).occupied, 0)
  const totalVacancies = rooms.reduce((total, room) => {
    const counts = getRoomCounts(room)
    return room.status === "Maintenance" || room.status === "Inactive" ? total : total + counts.vacancies
  }, 0)
  const fullRooms = rooms.filter((room) => {
    const counts = getRoomCounts(room)
    return room.status !== "Maintenance" && room.status !== "Inactive" && counts.vacancies === 0
  }).length
  const filteredRooms = rooms.filter((room) => {
    const counts = getRoomCounts(room)
    const matchesFloor = !activeFloor || room.floor_number === activeFloor

    if (!matchesFloor) return false
    if (activeView === "vacancies") return room.status !== "Maintenance" && room.status !== "Inactive" && counts.vacancies > 0
    if (activeView === "full") return room.status !== "Maintenance" && room.status !== "Inactive" && counts.vacancies === 0
    if (activeView === "maintenance") return room.status === "Maintenance" || counts.maintenance > 0
    return true
  })

  return (
    <ProtectedAdminPage admin={admin}>
      <div className="grid gap-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Room Overview</p>
          <h1 className="font-heading text-3xl font-bold text-primary">Rooms at a glance</h1>
          <p className="mt-1 text-sm text-muted-foreground">See residents and vacancies room by room, then tap a card to manage it.</p>
        </div>

        <section className="grid grid-cols-2 gap-3 xl:grid-cols-4" aria-label="Room summary">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <Building2 className="size-5 text-primary" />
            <p className="mt-3 font-heading text-2xl font-bold text-primary">{rooms.length}</p>
            <p className="text-xs text-muted-foreground">Total rooms</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <UsersRound className="size-5 text-primary" />
            <p className="mt-3 font-heading text-2xl font-bold text-primary">{totalOccupied}</p>
            <p className="text-xs text-muted-foreground">Residents assigned</p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm">
            <DoorOpen className="size-5 text-emerald-700" />
            <p className="mt-3 font-heading text-2xl font-bold text-emerald-800">{totalVacancies}</p>
            <p className="text-xs text-emerald-700">Available spaces</p>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
            <UsersRound className="size-5 text-amber-700" />
            <p className="mt-3 font-heading text-2xl font-bold text-amber-800">{fullRooms}</p>
            <p className="text-xs text-amber-700">Full rooms</p>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-4 shadow-sm" aria-label="Room filters">
          <div className="flex items-center gap-2 font-heading font-bold text-primary">
            <Filter className="size-4" />
            Filter rooms
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {roomViews.map((view) => (
              <Link
                key={view.value}
                href={roomFilterHref(view.value, activeFloor)}
                className={cn(
                  "inline-flex min-h-10 shrink-0 items-center rounded-lg px-3 text-sm font-semibold",
                  activeView === view.value ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground",
                )}
              >
                {view.label}
              </Link>
            ))}
          </div>
          <form className="mt-3 grid grid-cols-[1fr_auto] gap-2" action="/admin/rooms">
            {activeView !== "all" ? <input type="hidden" name="view" value={activeView} /> : null}
            <label className="sr-only" htmlFor="floor">Floor</label>
            <select id="floor" name="floor" defaultValue={activeFloor} className="h-11 rounded-lg border border-input bg-background px-3 text-sm">
              <option value="">All floors</option>
              {floorOptions.map((floor) => <option key={floor} value={floor}>Floor {floor}</option>)}
            </select>
            <Button type="submit" size="lg" className="h-11 px-4">Apply</Button>
          </form>
        </section>

        {canEdit ? (
          <details className="rounded-2xl border border-border bg-card shadow-sm">
            <summary className="cursor-pointer list-none p-5 font-heading text-xl font-bold text-primary marker:hidden [&::-webkit-details-marker]:hidden">
              Add a new room
            </summary>
            <form action={createRoomAction} className="grid gap-4 border-t border-border p-5 sm:grid-cols-2">
              <Field label="Room number" name="room_number" required placeholder="101" />
              <Field label="Floor" name="floor_number" placeholder="1" />
              <SelectField label="Room type" name="room_type_id" required>
                <option value="">Select room type</option>
                {roomTypes.map((roomType) => (
                  <option key={roomType.room_type_id} value={roomType.room_type_id}>{roomType.room_type_name}</option>
                ))}
              </SelectField>
              <Field label="Capacity" name="capacity" type="number" min="1" max="4" defaultValue={4} />
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
              <div className="sm:col-span-2"><TextAreaField label="Notes" name="notes" /></div>
              <Button type="submit" size="lg" className="h-12 sm:col-span-2">Add Room</Button>
            </form>
          </details>
        ) : null}

        <div className="flex items-center justify-between gap-3">
          <h2 className="font-heading text-xl font-bold text-primary">
            {activeFloor ? `Floor ${activeFloor}` : "All floors"}
          </h2>
          <span className="rounded-full bg-card px-3 py-1 text-sm font-semibold text-primary shadow-sm">
            {filteredRooms.length} {filteredRooms.length === 1 ? "room" : "rooms"}
          </span>
        </div>

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filteredRooms.map((room) => {
            const roomOccupancies = occupanciesByRoom.get(room.room_id) ?? []
            const roomResidents = roomOccupancies.map((occupancy) => ({
              occupancy,
              resident: residentById.get(occupancy.resident_id) ?? null,
            }))
            const maintenanceSlots = (bedsByRoom.get(room.room_id) ?? []).filter((bed) => bed.status === "Maintenance").length

            return (
              <RoomOverviewCard
                key={room.room_id}
                room={room}
                roomTypeName={roomTypeById.get(room.room_type_id)?.room_type_name ?? "Room type not set"}
                roomResidents={roomResidents}
                maintenanceSlots={maintenanceSlots}
                canEdit={canEdit}
              />
            )
          })}
          {filteredRooms.length === 0 ? (
            <div className="sm:col-span-2 xl:col-span-3">
              <EmptyState title="No rooms match this filter" text="Choose another room status or floor." />
            </div>
          ) : null}
        </section>
      </div>
    </ProtectedAdminPage>
  )
}
