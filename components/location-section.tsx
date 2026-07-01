import { ExternalLink, Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site-config"

export function LocationSection() {
  return (
    <section id="location" className="bg-secondary py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            Location
          </span>
          <h2 className="mt-2 text-balance font-heading text-3xl font-bold text-primary sm:text-4xl">
            Easy to find in Shamshabad
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Located in Rangareddy Nagar, Brindavan Colony, with convenient
            access for students and nearby working employees.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-center gap-5 rounded-3xl border border-border bg-card p-6 shadow-xl sm:p-8">
            <div className="flex items-start gap-3">
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <MapPin className="size-6" />
              </span>
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  Our Address
                </h3>
                <address className="mt-1 not-italic leading-relaxed text-muted-foreground">
                  {siteConfig.address.line1},<br />
                  {siteConfig.address.line2},<br />
                  {siteConfig.address.line3}
                </address>
                {siteConfig.address.landmark && (
                  <p className="mt-2 text-sm font-semibold text-accent">
                    {siteConfig.address.landmark}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Button render={<a href={siteConfig.googleMapsLink} target="_blank" rel="noopener noreferrer" />} nativeButton={false} size="lg" className="h-12 gap-2">
                <ExternalLink className="size-5" />
                View Location
              </Button>
              <Button render={<a href={siteConfig.phoneLink} />} nativeButton={false} size="lg" variant="outline" className="h-12 gap-2">
                <Phone className="size-5" />
                Call Now
              </Button>
              <Button render={<a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer" />} nativeButton={false} size="lg" className="h-12 gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
                <MessageCircle className="size-5" />
                WhatsApp
              </Button>
              <Button render={<a href={siteConfig.emailLink} />} nativeButton={false} size="lg" variant="outline" className="h-12 gap-2">
                <Mail className="size-5" />
                Email Us
              </Button>
            </div>
          </div>

          <div className="relative min-h-[300px] overflow-hidden rounded-3xl border border-border bg-brand-gradient p-6 text-primary-foreground shadow-xl">
            <div className="pointer-events-none absolute inset-0 bg-dot-grid text-primary-foreground/10" aria-hidden="true" />
            <div className="relative flex h-full min-h-[260px] flex-col justify-between rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 p-6 backdrop-blur">
              <div>
                <MapPin className="size-10 text-accent" />
                <h3 className="mt-5 font-heading text-2xl font-bold">
                  Shamshabad, Hyderabad
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-primary-foreground/78">
                  Use the location button for directions. A live Google Maps embed
                  can be added here after the final map share or embed URL is ready.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-primary-foreground/10 p-4">
                  <p className="font-heading text-2xl font-bold">{siteConfig.roomPlan.rooms}</p>
                  <p className="text-primary-foreground/70">rooms</p>
                </div>
                <div className="rounded-2xl bg-primary-foreground/10 p-4">
                  <p className="font-heading text-2xl font-bold">Now open</p>
                  <p className="text-primary-foreground/70">ready for visits</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
