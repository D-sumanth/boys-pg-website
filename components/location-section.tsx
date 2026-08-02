import { BusFront, ExternalLink, GraduationCap, Mail, MapPin, MessageCircle, Phone, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TrackedLink } from "@/components/tracked-link"
import { siteConfig } from "@/lib/site-config"

export function LocationSection() {
  return (
    <section id="location" className="scroll-mt-16 bg-secondary py-14 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl sm:mx-auto sm:text-center">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-accent sm:text-sm">
            Location
          </span>
          <h2 className="mt-2 text-balance font-heading text-2xl font-bold leading-tight text-primary sm:text-4xl">
            Easy to find in Shamshabad
          </h2>
          <p className="mt-3 text-pretty text-sm leading-6 text-muted-foreground sm:text-base sm:leading-relaxed">
            Located at {siteConfig.address.line2}, with convenient access to
            nearby colleges, the airport area and work locations.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-6">
          <div className="flex flex-col justify-center gap-5 rounded-2xl border border-border bg-card p-5 shadow-xl sm:p-8">
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
                  {siteConfig.address.line3},<br />
                  {siteConfig.address.country}
                </address>
                {siteConfig.address.landmark && (
                  <p className="mt-2 text-sm font-semibold text-accent">
                    {siteConfig.address.landmark}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Button render={<TrackedLink href={siteConfig.googleMapsLink} eventName="click_google_maps" target="_blank" rel="noopener noreferrer" />} nativeButton={false} size="lg" className="h-12 gap-2">
                <ExternalLink className="size-5" />
                View Location
              </Button>
              <Button render={<TrackedLink href={siteConfig.phoneLink} eventName="click_call" />} nativeButton={false} size="lg" variant="outline" className="h-12 gap-2">
                <Phone className="size-5" />
                Call Now
              </Button>
              <Button render={<TrackedLink href={siteConfig.whatsappLink} eventName="click_whatsapp" target="_blank" rel="noopener noreferrer" />} nativeButton={false} size="lg" className="h-12 gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
                <MessageCircle className="size-5" />
                WhatsApp
              </Button>
              <Button render={<a href={siteConfig.emailLink} />} nativeButton={false} size="lg" variant="outline" className="h-12 gap-2">
                <Mail className="size-5" />
                Email Us
              </Button>
            </div>
          </div>

          <div className="relative min-h-[300px] overflow-hidden rounded-2xl border border-border bg-brand-gradient p-5 text-primary-foreground shadow-xl sm:p-6">
            <div className="pointer-events-none absolute inset-0 bg-dot-grid text-primary-foreground/10" aria-hidden="true" />
            <div className="relative flex h-full min-h-[260px] flex-col justify-between rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 p-6 backdrop-blur">
              <div>
                <MapPin className="size-10 text-accent" />
                <h3 className="mt-5 font-heading text-2xl font-bold">
                  Well connected from Shamshabad
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-primary-foreground/78">
                  Use the location button for directions. Transport support can
                  be arranged for nearby routes at reasonable prices.
                </p>
              </div>
              <div className="mt-8 grid gap-3 text-sm sm:grid-cols-3">
                <div className="rounded-2xl bg-primary-foreground/10 p-4">
                  <Plane className="size-5 text-accent" />
                  <p className="mt-2 font-heading text-xl font-bold">7.2 km</p>
                  <p className="text-primary-foreground/70">airport terminal</p>
                </div>
                <div className="rounded-2xl bg-primary-foreground/10 p-4">
                  <GraduationCap className="size-5 text-accent" />
                  <p className="mt-2 font-heading text-xl font-bold">8.6-9 km</p>
                  <p className="text-primary-foreground/70">nearby colleges</p>
                </div>
                <div className="rounded-2xl bg-primary-foreground/10 p-4">
                  <BusFront className="size-5 text-accent" />
                  <p className="mt-2 font-heading text-lg font-bold">Available</p>
                  <p className="text-primary-foreground/70">transport support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
