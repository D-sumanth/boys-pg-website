import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { ProtectedAdminPage } from "@/components/admin/protected-admin-page"
import { ReceiptActions, type ReceiptDownloadData } from "@/components/admin/receipt-actions"
import { Button } from "@/components/ui/button"
import { requireAdmin } from "@/lib/admin/auth"
import { getActiveOccupancyForResident, getPaymentById, getResidentById, getRoomById } from "@/lib/admin/data"
import {
  amountToIndianWords,
  fallbackReceiptNumber,
  formatReceiptAmount,
  formatReceiptDate,
} from "@/lib/admin/receipt"
import { siteConfig } from "@/lib/site-config"

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export default async function PaymentReceiptPage({ params }: { params: Promise<{ paymentId: string }> }) {
  const admin = await requireAdmin()
  const { paymentId } = await params

  if (!UUID_PATTERN.test(paymentId)) {
    notFound()
  }

  const payment = await getPaymentById(paymentId)

  if (!payment) {
    notFound()
  }

  const [resident, occupancy] = payment.resident_id
    ? await Promise.all([
        getResidentById(payment.resident_id),
        getActiveOccupancyForResident(payment.resident_id),
      ])
    : [null, null]
  const room = occupancy ? await getRoomById(occupancy.room_id) : null
  const amount = Number(payment.amount)
  const receiptNumber = payment.receipt_number || fallbackReceiptNumber(payment.payment_id)
  const receiptTitle = payment.payment_direction === "Out" ? "Payment Voucher" : "Fee Receipt"
  const residentLabel = payment.payment_direction === "Out" ? "Paid to" : "Received from"
  const formattedDate = formatReceiptDate(payment.payment_date)
  const amountWords = amountToIndianWords(amount)
  const receiptData: ReceiptDownloadData = {
    receiptNumber,
    receiptTitle,
    paymentDate: formattedDate,
    residentLabel,
    residentName: resident?.full_name || "Not linked to a resident",
    residentPhone: resident?.phone || "",
    roomNumber: room?.room_number || "",
    amount,
    amountWords,
    purpose: payment.payment_purpose,
    paymentMode: payment.payment_mode,
    transactionReference: payment.transaction_reference || "",
    notes: payment.notes || "",
    hostelName: siteConfig.name,
    addressLines: [siteConfig.address.line1, siteConfig.address.line2, siteConfig.address.line3],
    hostelPhone: siteConfig.phoneDisplay,
    hostelEmail: siteConfig.email,
  }

  return (
    <ProtectedAdminPage admin={admin}>
      <div className="mx-auto grid max-w-3xl gap-5">
        <div className="grid gap-3 print:hidden sm:flex sm:items-center sm:justify-between">
          <Button render={<Link href="/admin/payments" />} nativeButton={false} variant="outline" size="lg" className="h-12 gap-2 bg-card">
            <ArrowLeft className="size-5" />
            Back to Receipts
          </Button>
          <ReceiptActions receipt={receiptData} />
        </div>

        <article className="overflow-hidden rounded-2xl border border-border bg-white text-slate-900 shadow-lg print:rounded-none print:border-0 print:shadow-none">
          <header className="bg-primary px-5 py-7 text-center text-primary-foreground sm:px-10">
            <p className="font-heading text-2xl font-bold sm:text-3xl">{siteConfig.name}</p>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-primary-foreground/82">
              {siteConfig.address.line1}, {siteConfig.address.line2}<br />
              {siteConfig.address.line3}
            </p>
            <p className="mt-1 text-sm text-primary-foreground/82">{siteConfig.phoneDisplay} | {siteConfig.email}</p>
            <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 font-bold text-accent-foreground">
              <CheckCircle2 className="size-5" />
              {receiptTitle}
            </div>
          </header>

          <div className="h-1.5 bg-accent" />

          <div className="p-5 sm:p-10">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 pb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Receipt number</p>
                <p className="mt-1 font-heading text-lg font-bold text-primary">{receiptNumber}</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Payment date</p>
                <p className="mt-1 font-semibold">{formattedDate}</p>
              </div>
            </div>

            <dl className="grid gap-4 py-6 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{residentLabel}</dt>
                <dd className="mt-1 font-semibold">{resident?.full_name || "Not linked to a resident"}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Phone</dt>
                <dd className="mt-1 font-semibold">{resident?.phone || "Not recorded"}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Room</dt>
                <dd className="mt-1 font-semibold">{room ? `Room ${room.room_number}` : "Not assigned"}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Payment for</dt>
                <dd className="mt-1 font-semibold">{payment.payment_purpose}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Payment mode</dt>
                <dd className="mt-1 font-semibold">{payment.payment_mode}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Transaction reference</dt>
                <dd className="mt-1 break-words font-semibold">{payment.transaction_reference || "Not applicable"}</dd>
              </div>
            </dl>

            <section className="rounded-xl bg-secondary p-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
              <div>
                <p className="text-sm font-semibold text-slate-600">Amount {payment.payment_direction === "Out" ? "paid" : "received"}</p>
                <p className="mt-1 font-heading text-3xl font-bold text-primary sm:text-4xl">{formatReceiptAmount(amount)}</p>
              </div>
              <p className="mt-3 max-w-md text-sm leading-6 text-slate-600 sm:mt-0 sm:text-right">{amountWords}</p>
            </section>

            {payment.notes ? (
              <div className="mt-5 rounded-xl border border-slate-200 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Notes</p>
                <p className="mt-1 whitespace-pre-wrap text-sm leading-6">{payment.notes}</p>
              </div>
            ) : null}

            <footer className="mt-8 border-t border-slate-200 pt-5 text-center text-xs leading-5 text-slate-500">
              <p>This is a computer-generated receipt and does not require a signature.</p>
              <p className="mt-1 font-semibold text-primary">Thank you.</p>
            </footer>
          </div>
        </article>
      </div>
    </ProtectedAdminPage>
  )
}
