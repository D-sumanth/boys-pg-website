import { createPaymentAction } from "@/app/admin/actions"
import { EmptyState, StatusBadge } from "@/components/admin/admin-card"
import { Field, SelectField, TextAreaField } from "@/components/admin/form-fields"
import { ProtectedAdminPage } from "@/components/admin/protected-admin-page"
import { Button } from "@/components/ui/button"
import { getPayments, getResidents } from "@/lib/admin/data"

const purposes = ["Rent", "Deposit", "Refund", "Advance", "Fine", "Food Extra", "AC Charges", "Maintenance", "Other"]
const modes = ["Cash", "UPI", "Bank Transfer", "Card", "Cheque", "Other"]

export default async function PaymentsPage() {
  const [payments, residents] = await Promise.all([getPayments(), getResidents()])
  const residentById = new Map(residents.map((resident) => [resident.resident_id, resident]))

  return (
    <ProtectedAdminPage>
      <div className="grid gap-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Payments</p>
          <h1 className="font-heading text-3xl font-bold text-primary">Cash and UPI register</h1>
          <p className="mt-1 text-sm text-muted-foreground">Payments are not deleted in the MVP. Use adjustments later if needed.</p>
        </div>

        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-primary">Add payment</h2>
          <form action={createPaymentAction} className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <SelectField label="Resident" name="resident_id">
              <option value="">Select resident</option>
              {residents.map((resident) => <option key={resident.resident_id} value={resident.resident_id}>{resident.full_name}</option>)}
            </SelectField>
            <Field label="Date" name="payment_date" type="date" />
            <Field label="Amount" name="amount" type="number" required />
            <SelectField label="Direction" name="payment_direction" defaultValue="In">
              <option>In</option>
              <option>Out</option>
            </SelectField>
            <SelectField label="Purpose" name="payment_purpose" defaultValue="Rent">
              {purposes.map((purpose) => <option key={purpose}>{purpose}</option>)}
            </SelectField>
            <SelectField label="Mode" name="payment_mode" defaultValue="UPI">
              {modes.map((mode) => <option key={mode}>{mode}</option>)}
            </SelectField>
            <Field label="Transaction reference" name="transaction_reference" />
            <Field label="Receipt number" name="receipt_number" />
            <Field label="Rent invoice ID" name="rent_invoice_id" placeholder="Optional UUID" />
            <div className="sm:col-span-2 lg:col-span-3">
              <TextAreaField label="Notes" name="notes" />
            </div>
            <Button type="submit" className="h-12 lg:col-span-3">Save Payment</Button>
          </form>
        </section>

        <section className="grid gap-3">
          {payments.map((payment) => {
            const resident = payment.resident_id ? residentById.get(payment.resident_id) : null
            return (
              <article key={payment.payment_id} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="font-heading text-xl font-bold text-primary">₹{Number(payment.amount).toLocaleString("en-IN")}</h2>
                    <p className="text-sm text-muted-foreground">
                      {payment.payment_date} • {payment.payment_purpose} • {payment.payment_mode}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">Resident: {resident?.full_name || "Not linked"}</p>
                  </div>
                  <StatusBadge status={payment.payment_direction === "In" ? "Paid" : "Refund"} />
                </div>
              </article>
            )
          })}
          {payments.length === 0 ? <EmptyState title="No payments yet" text="Add rent, deposit, advance or refund entries above." /> : null}
        </section>
      </div>
    </ProtectedAdminPage>
  )
}
