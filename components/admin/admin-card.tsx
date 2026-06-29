import { cn } from "@/lib/utils"

export function AdminCard({
  title,
  value,
  note,
  className,
}: {
  title: string
  value: string | number
  note?: string
  className?: string
}) {
  return (
    <div className={cn("rounded-2xl border border-border bg-card p-5 shadow-sm", className)}>
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <p className="mt-2 font-heading text-3xl font-bold text-primary">{value}</p>
      {note ? <p className="mt-1 text-xs text-muted-foreground">{note}</p> : null}
    </div>
  )
}

export function StatusBadge({ status }: { status: string }) {
  const tone =
    status === "Available" || status === "Paid" || status === "Active"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
      : status === "Pending" || status === "Reserved" || status === "Partial" || status === "New"
        ? "bg-amber-50 text-amber-700 ring-amber-200"
        : status === "Overdue" || status === "Blocked" || status === "Lost"
          ? "bg-red-50 text-red-700 ring-red-200"
          : "bg-muted text-muted-foreground ring-border"

  return (
    <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-bold ring-1", tone)}>
      {status}
    </span>
  )
}

export function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card/70 p-6 text-center">
      <p className="font-heading text-lg font-semibold text-foreground">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{text}</p>
    </div>
  )
}
