import { ChevronDown, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site-config"

export function FaqSection() {
  return (
    <section id="faq" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">Common Questions</span>
          <h2 className="mt-2 text-balance font-heading text-3xl font-bold text-primary sm:text-4xl">
            Quick answers for students and parents
          </h2>
        </div>

        <div className="mt-10 space-y-3">
          {siteConfig.faqs.map((faq) => (
            <details key={faq.question} className="group rounded-2xl border border-border bg-card px-5 shadow-sm open:border-accent/40 open:shadow-md">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 font-heading font-semibold text-foreground marker:content-none">
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
          <Button render={<a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer" />} nativeButton={false} size="lg" className="h-12 shrink-0 gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
            <MessageCircle className="size-5" />
            WhatsApp Enquiry
          </Button>
        </div>
      </div>
    </section>
  )
}
