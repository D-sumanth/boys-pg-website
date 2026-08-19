import Link from "next/link"
import { ChevronDown, Phone, UserPlus, UsersRound } from "lucide-react"
import { updateRoomAction } from "@/app/admin/actions"
import { Field, SelectField } from "@/components/admin/form-fields"
import { Button } from "@/components/ui/button"
import type { Occupancy, Resident, Room } from "@/lib/admin/types"
import { cn } from "@/lib/utils"

type RoomResident = {
  occupancy: Occupancy
  resident: Resident | null
}

const joiningDateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
})

export function RoomOverviewCard({
  room,
  roomTypeName,
  roomResidents,
  maintenanceSlots,
  canEdit,
}: {
  room: Room
  roomTypeName: string
  roomResidents: RoomResident[]
  maintenanceSlots: number
  canEdit: boolean
}) {
  const occupiedCount = roomResidents.length
  const usableCapacity = Math.max(room.capacity - maintenanceSlots, 0)
  const vacancyCount = Math.max(usableCapacity - occupiedCount, 0)
  const occupancyPercent = room.capacity > 0 ? Math.min((occupiedCount / room.capacity) * 100, 100) : 0
  const unavailable = room.status === "Maintenance" || room.status === "Inactive"
  const availabilityLabel =
    room.status === "Inactive"
      ? "Inactive"
      : room.status === "Maintenance"
        ? "Maintenance"
        : vacancyCount > 0
          ? `${vacancyCount} ${vacancyCount === 1 ? "vacancy" : "vacancies"}`
          : "Full"

  return (
    <details className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow open:shadow-lg">
      <summary className="cursor-pointer list-none p-4 marker:hidden [&::-webkit-details-marker]:hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Floor {room.floor_number || "Not set"}
            </p>
            <h2 className="mt-0.5 font-heading text-2xl font-bold text-primary">Room {room.room_number}</h2>
            <p className="mt-1 truncate text-sm text-muted-foreground">{roomTypeName}</p>
          </div>
          <span
            className={cn(
              "inline-flex shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ring-1",
              unavailable
                ? "bg-muted text-muted-foreground ring-border"
                : vacancyCount > 0
                  ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                  : "bg-amber-50 text-amber-700 ring-amber-200",
            )}
          >
            {availabilityLabel}
          </span>
        </div>

        <div className="mt-4 rounded-xl bg-secondary p-3">
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <UsersRound className="size-4 text-primary" />
              {occupiedCount} of {room.capacity} occupied
            </span>
            <span className="text-xs font-medium text-muted-foreground">{Math.round(occupancyPercent)}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-background">
            <div className="h-full rounded-full bg-primary" style={{ width: `${occupancyPercent}%` }} />
          </div>
        </div>

        <div className="mt-4 min-h-28">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Residents</p>
          {roomResidents.length > 0 ? (
            <ul className="mt-2 grid gap-2">
              {roomResidents.map(({ occupancy, resident }) => (
                <li key={occupancy.occupancy_id} className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {(resident?.full_name || "?").charAt(0).toUpperCase()}
                  </span>
                  <span className="truncate">{resident?.full_name || "Resident record unavailable"}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-2 rounded-xl border border-dashed border-border px-3 py-5 text-center text-sm text-muted-foreground">
              No residents assigned
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-3 text-xs font-semibold text-accent">
          <span className="group-open:hidden">Tap to view room details</span>
          <span className="hidden group-open:inline">Room details are open</span>
          <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
        </div>
      </summary>

      <div className="border-t border-border p-4">
        <div className="grid gap-2">
          {roomResidents.map(({ occupancy, resident }) => (
            <div key={occupancy.occupancy_id} className="rounded-xl border border-border bg-background p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-foreground">{resident?.full_name || "Resident record unavailable"}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Joined {joiningDateFormatter.format(new Date(`${occupancy.joining_date}T00:00:00Z`))}
                  </p>
                </div>
                {resident ? (
                  <Button
                    render={<Link href={`/admin/residents?resident=${resident.resident_id}#resident-${resident.resident_id}`} />}
                    nativeButton={false}
                    size="sm"
                    variant="outline"
                    className="h-9"
                  >
                    Manage
                  </Button>
                ) : null}
              </div>
              {resident?.phone ? (
                <a href={`tel:${resident.phone}`} className="mt-2 inline-flex min-h-9 items-center gap-2 text-sm font-medium text-primary">
                  <Phone className="size-4" />
                  {resident.phone}
                </a>
              ) : null}
            </div>
          ))}
        </div>

        {canEdit && vacancyCount > 0 && !unavailable ? (
          <Button
            render={<Link href={`/admin/residents?room=${room.room_id}#assign-resident`} />}
            nativeButton={false}
            size="lg"
            className="mt-4 h-12 w-full gap-2"
          >
            <UserPlus className="size-5" />
            Assign Resident to Room {room.room_number}
          </Button>
        ) : null}

        {maintenanceSlots > 0 ? (
          <p className="mt-4 rounded-xl bg-muted p-3 text-sm text-muted-foreground">
            {maintenanceSlots} room {maintenanceSlots === 1 ? "space is" : "spaces are"} under maintenance.
          </p>
        ) : null}

        {canEdit ? (
          <form action={updateRoomAction} className="mt-4 grid gap-3 rounded-xl bg-secondary p-3">
            <input type="hidden" name="room_id" value={room.room_id} />
            <p className="font-heading text-base font-bold text-primary">Update room</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Floor" name="floor_number" defaultValue={room.floor_number || ""} />
              <Field label="Capacity" name="capacity" type="number" min="1" max="4" defaultValue={room.capacity} />
              <SelectField label="Status" name="status" defaultValue={room.status}>
                <option>Available</option>
                <option>Occupied</option>
                <option>Maintenance</option>
                <option>Inactive</option>
              </SelectField>
              <Field label="Notes" name="notes" defaultValue={room.notes || ""} />
            </div>
            <Button type="submit" size="lg" className="h-11">Save Room Changes</Button>
          </form>
        ) : null}
      </div>
    </details>
  )
}
