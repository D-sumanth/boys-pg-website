import { AdminCard, EmptyState, StatusBadge } from "@/components/admin/admin-card"
import { ProtectedAdminPage } from "@/components/admin/protected-admin-page"
import { Button } from "@/components/ui/button"
import { getDashboardData } from "@/lib/admin/data"

export default async function TodayPage() {
  const data = await getDashboardData()
  const availableBeds = data.beds.filter((bed) => bed.status === "Available")
  const newEnquiries = data.enquiries.filter((enquiry) => enquiry.status === "New")

  return (
    <ProtectedAdminPage>
      <div className="grid gap-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Today</p>
          <h1 className="font-heading text-3xl font-bold text-primary">Daily work screen</h1>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Button render={<a href="/admin/payments" />} nativeButton={false} size="lg" className="h-14">Quick Add Payment</Button>
          <Button render={<a href="/admin/enquiries" />} nativeButton={false} size="lg" variant="outline" className="h-14 bg-card">Quick Add Enquiry</Button>
          <Button render={<a href="/admin/residents" />} nativeButton={false} size="lg" variant="outline" className="h-14 bg-card">Add Resident</Button>
          <Button render={<a href="/admin/rooms" />} nativeButton={false} size="lg" variant="outline" className="h-14 bg-card">View Beds</Button>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <AdminCard title="Available beds" value={availableBeds.length} />
          <AdminCard title="New enquiries" value={newEnquiries.length} />
          <AdminCard title="Payments this month" value={data.payments.length} />
        </div>

        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-primary">Available beds</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {availableBeds.slice(0, 12).map((bed) => (
              <div key={bed.bed_id} className="rounded-xl bg-secondary p-3">
                <p className="font-semibold text-foreground">{bed.bed_code}</p>
                <StatusBadge status={bed.status} />
              </div>
            ))}
          </div>
          {availableBeds.length === 0 ? <EmptyState title="No available beds configured" text="Add rooms and beds from the Rooms screen." /> : null}
        </section>
      </div>
    </ProtectedAdminPage>
  )
}
