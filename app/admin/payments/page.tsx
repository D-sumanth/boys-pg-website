import Link from "next/link"
import { FileDown, PlusCircle, ReceiptText, UserRoundPlus } from "lucide-react"
import { createPaymentAction } from "@/app/admin/actions"
import { EmptyState, StatusBadge } from "@/components/admin/admin-card"
import { Field, SelectField, TextAreaField } from "@/components/admin/form-fields"
import { ProtectedAdminPage } from "@/components/admin/protected-admin-page"
import { Button } from "@/components/ui/button"
import { canEditAdmin, requireAdmin } from "@/lib/admin/auth"
import { getPayments, getResidents } from "@/lib/admin/data"

const purposes = ["Rent", "Deposit", "Advance", "Fine", "Food Extra", "AC Charges", "Other"]
const modes = ["Cash", "UPI", "Bank Transfer", "Card", "Cheque", "Other"]

export default async function PaymentsPage() {
  const admin = await requireAdmin()
  const canEdit = canEditAdmin(admin)
  const [payments, residents] = await Promise.all([getPayments(), getResidents()])
  const residentById = new Map(residents.map((resident) => [resident.resident_id, resident]))
  const today = new Date().toISOString().slice(0, 10)

  return (
    <ProtectedAdminPage admin={admin}>
      <div className="grid gap-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Fee Receipts</p>
          <h1 className="font-heading text-3xl font-bold text-primary">Collect fee and issue receipt</h1>
          <p className="mt-1 text-sm text-muted-foreground">Save the payment once, then download, share or print the receipt.</p>
        </div>

        {canEdit ? <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <PlusCircle className="size-5" />
            </span>
            <div>
              <h2 className="font-heading text-xl font-bold text-primary">Create a new receipt</h2>
              <p className="mt-1 text-sm text-muted-foreground">Receipt number is created automatically.</p>
            </div>
          </div>

          {residents.length > 0 ? (
          <form action={createPaymentAction} className="mt-5 grid gap-4 sm:grid-cols-2">
            <input type="hidden" name="payment_direction" value="In" />
            <SelectField label="Resident" name="resident_id" required>
              <option value="">Choose resident</option>
              {residents.map((resident) => <option key={resident.resident_id} value={resident.resident_id}>{resident.full_name}</option>)}
            </SelectField>
            <Field label="Payment date" name="payment_date" type="date" defaultValue={today} required />
            <Field label="Amount received" name="amount" type="number" min="1" step="0.01" inputMode="decimal" required />
            <SelectField label="Purpose" name="payment_purpose" defaultValue="Rent">
              {purposes.map((purpose) => <option key={purpose}>{purpose}</option>)}
            </SelectField>
            <SelectField label="Mode" name="payment_mode" defaultValue="UPI">
              {modes.map((mode) => <option key={mode}>{mode}</option>)}
            </SelectField>
            <Field label="Transaction reference" name="transaction_reference" />
            <div className="sm:col-span-2">
              <TextAreaField label="Notes (optional)" name="notes" placeholder="Example: August hostel fee" />
            </div>
            <Button type="submit" size="lg" className="h-14 gap-2 text-base sm:col-span-2">
              <ReceiptText className="size-5" />
              Save Payment & Generate Receipt
            </Button>
          </form>
          ) : (
            <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-950">
              <p className="font-semibold">Add a resident before creating a receipt.</p>
              <p className="mt-1 text-sm">Receipts are linked to resident records so names and phone numbers stay accurate.</p>
              <Button render={<Link href="/admin/residents" />} nativeButton={false} size="lg" className="mt-4 h-12 gap-2">
                <UserRoundPlus className="size-5" />
                Add Resident
              </Button>
            </div>
          )}
        </section> : null}

        <section>
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <h2 className="font-heading text-xl font-bold text-primary">Receipt history</h2>
              <p className="text-sm text-muted-foreground">Open any receipt to save or share it again.</p>
            </div>
            <span className="rounded-full bg-card px-3 py-1 text-sm font-semibold text-primary shadow-sm">{payments.length}</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {payments.map((payment) => {
            const resident = payment.resident_id ? residentById.get(payment.resident_id) : null
            return (
              <article key={payment.payment_id} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-heading text-xl font-bold text-primary">₹{Number(payment.amount).toLocaleString("en-IN")}</h2>
                    <p className="text-sm text-muted-foreground">
                      {payment.payment_date} • {payment.payment_purpose} • {payment.payment_mode}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">Resident: {resident?.full_name || "Not linked"}</p>
                  </div>
                  <StatusBadge status={payment.payment_direction === "In" ? "Paid" : "Refund"} />
                </div>
                <p className="mt-3 truncate text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {payment.receipt_number || `PDPG-${payment.payment_id.slice(0, 8).toUpperCase()}`}
                </p>
                <Button
                  render={<Link href={`/admin/payments/${payment.payment_id}/receipt`} />}
                  nativeButton={false}
                  variant="outline"
                  size="lg"
                  className="mt-3 h-11 w-full gap-2"
                >
                  <FileDown className="size-4" />
                  Open Receipt
                </Button>
              </article>
            )
          })}
          {payments.length === 0 ? <EmptyState title="No receipts yet" text="Create the first fee receipt above." /> : null}
          </div>
        </section>
      </div>
    </ProtectedAdminPage>
  )
}
