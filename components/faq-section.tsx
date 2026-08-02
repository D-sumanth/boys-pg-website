import { ChevronDown, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TrackedLink } from "@/components/tracked-link"
import { siteConfig } from "@/lib/site-config"

export function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-16 bg-background py-14 md:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl sm:mx-auto sm:text-center">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-accent sm:text-sm">Common Questions</span>
          <h2 className="mt-2 text-balance font-heading text-2xl font-bold leading-tight text-primary sm:text-4xl">
            Quick answers for students and parents
          </h2>
        </div>

        <div className="mt-8 space-y-2.5 sm:space-y-3">
          {siteConfig.faqs.map((faq) => (
            <details key={faq.question} className="group rounded-xl border border-border bg-card px-4 shadow-sm open:border-accent/40 open:shadow-md sm:rounded-2xl sm:px-5">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3.5 font-heading text-sm font-semibold text-foreground marker:content-none sm:min-h-16 sm:py-4 sm:text-base">
                {faq.question}
                <ChevronDown className="size-5 shrink-0 text-accent transition-transform group-open:rotate-180" />
              </summary>
              <p className="border-t border-border pb-5 pt-4 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl bg-secondary p-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h3 className="font-heading text-lg font-bold text-primary">Still have a question?</h3>
            <p className="mt-1 text-sm text-muted-foreground">WhatsApp us for room availability, fees, visits or transport.</p>
          </div>
          <Button render={<TrackedLink href={siteConfig.whatsappLink} eventName="click_whatsapp" target="_blank" rel="noopener noreferrer" />} nativeButton={false} size="lg" className="h-12 shrink-0 gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
            <MessageCircle className="size-5" />
            WhatsApp Enquiry
          </Button>
        </div>
      </div>
    </section>
  )
}
