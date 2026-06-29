import { createEnquiryAction, updateEnquiryStatusAction } from "@/app/admin/actions"
import { EmptyState, StatusBadge } from "@/components/admin/admin-card"
import { Field, SelectField, TextAreaField } from "@/components/admin/form-fields"
import { ProtectedAdminPage } from "@/components/admin/protected-admin-page"
import { Button } from "@/components/ui/button"
import { getEnquiries, getRoomTypes } from "@/lib/admin/data"

const statuses = ["New", "Contacted", "Visit Scheduled", "Visited", "Joined", "Lost", "Follow Up Later"]
const sources = ["WhatsApp", "Call", "Instagram", "Google Maps", "Referral", "College", "Walk-in", "Website", "Other"]

export default async function EnquiriesPage() {
  const [enquiries, roomTypes] = await Promise.all([getEnquiries(), getRoomTypes()])

  return (
    <ProtectedAdminPage>
      <div className="grid gap-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Enquiries</p>
          <h1 className="font-heading text-3xl font-bold text-primary">Lead register</h1>
        </div>

        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-primary">Add enquiry</h2>
          <form action={createEnquiryAction} className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Name" name="name" required />
            <Field label="Phone" name="phone" required />
            <Field label="Email" name="email" type="email" />
            <SelectField label="Resident type" name="resident_type">
              <option>Student</option>
              <option>Working Professional</option>
              <option>Other</option>
            </SelectField>
            <Field label="College / company" name="college_or_company" />
            <SelectField label="Source" name="source" defaultValue="Website">
              {sources.map((source) => <option key={source}>{source}</option>)}
            </SelectField>
            <SelectField label="Preferred room" name="preferred_room_type_id">
              <option value="">Not decided</option>
              {roomTypes.map((roomType) => <option key={roomType.room_type_id} value={roomType.room_type_id}>{roomType.room_type_name}</option>)}
            </SelectField>
            <SelectField label="AC preference" name="ac_preference" defaultValue="No Preference">
              <option>AC</option>
              <option>Non-AC</option>
              <option>No Preference</option>
            </SelectField>
            <Field label="Expected joining" name="expected_joining_date" type="date" />
            <Field label="Budget" name="budget" type="number" />
            <SelectField label="Status" name="status" defaultValue="New">
              {statuses.map((status) => <option key={status}>{status}</option>)}
            </SelectField>
            <div className="sm:col-span-2 lg:col-span-3">
              <TextAreaField label="Message / notes" name="message" />
            </div>
            <Button type="submit" className="h-12 lg:col-span-3">Add Enquiry</Button>
          </form>
        </section>

        <section className="grid gap-3">
          {enquiries.map((enquiry) => (
            <article key={enquiry.enquiry_id} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-heading text-xl font-bold text-primary">{enquiry.name}</h2>
                  <p className="text-sm text-muted-foreground">{enquiry.phone} • {enquiry.source}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{enquiry.message || "No message added"}</p>
                </div>
                <StatusBadge status={enquiry.status} />
              </div>
              <form action={updateEnquiryStatusAction} className="mt-4 flex flex-wrap gap-2">
                <input type="hidden" name="enquiry_id" value={enquiry.enquiry_id} />
                <select name="status" defaultValue={enquiry.status} className="h-10 rounded-lg border border-input bg-background px-3 text-sm">
                  {statuses.map((status) => <option key={status}>{status}</option>)}
                </select>
                <Button type="submit" size="sm">Update Status</Button>
              </form>
            </article>
          ))}
          {enquiries.length === 0 ? <EmptyState title="No enquiries yet" text="Website, call and WhatsApp leads can be added here." /> : null}
        </section>
      </div>
    </ProtectedAdminPage>
  )
}
