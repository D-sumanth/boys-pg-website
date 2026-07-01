import { AdminCard, EmptyState, StatusBadge } from "@/components/admin/admin-card"
import { ProtectedAdminPage } from "@/components/admin/protected-admin-page"
import { Button } from "@/components/ui/button"
import { getDashboardData } from "@/lib/admin/data"

export default async function DashboardPage() {
  const data = await getDashboardData()
  const pendingEnquiries = data.enquiries.filter((enquiry) => enquiry.status === "New" || enquiry.status === "Follow Up Later")

  return (
    <ProtectedAdminPage>
      <div className="grid gap-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Dashboard</p>
          <h1 className="font-heading text-3xl font-bold text-primary">Today at the hostel</h1>
          <p className="mt-1 text-sm text-muted-foreground">Quick numbers and common actions for daily work.</p>
        </div>

        <section className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="grid gap-3 sm:grid-cols-3">
            <Button render={<a href="/admin/rooms" />} nativeButton={false} size="lg" className="h-12">
              Manage Rooms
            </Button>
            <Button render={<a href="/admin/residents" />} nativeButton={false} size="lg" className="h-12 bg-accent text-accent-foreground hover:bg-accent/90">
              Add / View Residents
            </Button>
            <Button render={<a href="/admin/today" />} nativeButton={false} size="lg" variant="outline" className="h-12">
              Today Tasks
            </Button>
          </div>
        </section>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <AdminCard title="Total beds" value={data.metrics.totalBeds} note="Configured beds or planned capacity" />
          <AdminCard title="Occupied beds" value={data.metrics.occupiedBeds} />
          <AdminCard title="Available beds" value={data.metrics.availableBeds} />
          <AdminCard title="Rent collected this month" value={`₹${data.metrics.rentCollected.toLocaleString("en-IN")}`} />
          <AdminCard title="Active residents" value={data.metrics.activeResidents} />
          <AdminCard title="New enquiries this month" value={data.metrics.newEnquiries} />
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h2 className="font-heading text-xl font-bold text-primary">Recent enquiries</h2>
            <div className="mt-4 grid gap-3">
              {pendingEnquiries.slice(0, 5).map((enquiry) => (
                <div key={enquiry.enquiry_id} className="flex items-center justify-between gap-3 rounded-xl bg-secondary p-3">
                  <div>
                    <p className="font-semibold text-foreground">{enquiry.name}</p>
                    <p className="text-sm text-muted-foreground">{enquiry.phone}</p>
                  </div>
                  <StatusBadge status={enquiry.status} />
                </div>
              ))}
              {pendingEnquiries.length === 0 ? <EmptyState title="No pending enquiries" text="New leads will appear here." /> : null}
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h2 className="font-heading text-xl font-bold text-primary">Recent payments</h2>
            <div className="mt-4 grid gap-3">
              {data.payments.slice(0, 5).map((payment) => (
                <div key={payment.payment_id} className="flex items-center justify-between gap-3 rounded-xl bg-secondary p-3">
                  <div>
                    <p className="font-semibold text-foreground">₹{Number(payment.amount).toLocaleString("en-IN")}</p>
                    <p className="text-sm text-muted-foreground">{payment.payment_purpose} • {payment.payment_mode}</p>
                  </div>
                  <StatusBadge status={payment.payment_direction === "In" ? "Paid" : "Refund"} />
                </div>
              ))}
              {data.payments.length === 0 ? <EmptyState title="No payments yet" text="Collected rent and deposits will appear here." /> : null}
            </div>
          </section>
        </div>
      </div>
    </ProtectedAdminPage>
  )
}
