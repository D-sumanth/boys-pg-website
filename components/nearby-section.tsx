import { BriefcaseBusiness, BusFront, ExternalLink, GraduationCap, MessageCircle, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"

const locationIcons = {
  College: GraduationCap,
  Airport: Plane,
  "Work Location": BriefcaseBusiness,
} as const

export function NearbySection() {
  return (
    <section id="nearby" className="scroll-mt-16 bg-secondary py-14 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl sm:mx-auto sm:text-center">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-accent sm:text-sm">Nearby Places</span>
          <h2 className="mt-2 text-balance font-heading text-2xl font-bold leading-tight text-primary sm:text-4xl">
            Convenient stay near colleges, airport and work locations
          </h2>
          <p className="mt-3 text-pretty text-sm leading-6 text-muted-foreground sm:text-base sm:leading-relaxed">
            Located in Shamshabad with convenient access to nearby colleges,
            the airport area and major work locations.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {siteConfig.nearbyLocations.map((place, index) => {
            const Icon = locationIcons[place.type]
            return (
              <article key={place.name} className={cn("flex min-h-40 flex-col rounded-xl border border-border bg-card p-4 shadow-sm sm:min-h-44", index === siteConfig.nearbyLocations.length - 1 && "col-span-2 sm:col-span-1")}>
                <span className="inline-flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary sm:size-11">
                  <Icon className="size-4 sm:size-5" />
                </span>
                <p className="mt-3 text-[10px] font-bold uppercase tracking-wide text-accent sm:text-xs">{place.type}</p>
                <h3 className="mt-1 flex-1 font-heading text-sm font-bold leading-snug text-foreground sm:text-base">{place.name}</h3>
                <p className="mt-3 font-heading text-xl font-bold text-primary sm:text-2xl">{place.distance}</p>
                <p className="text-xs text-muted-foreground">from the hostel</p>
              </article>
            )
          })}
        </div>

        <div className="mt-6 grid gap-5 rounded-2xl bg-brand-gradient p-5 text-primary-foreground shadow-xl md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div className="flex items-start gap-3">
            <BusFront className="mt-1 size-6 shrink-0 text-accent" />
            <div>
              <h3 className="font-heading text-xl font-bold">Transport support for nearby routes</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-primary-foreground/75">
                Transport can be arranged for nearby colleges and key locations at reasonable prices, subject to route and availability.
              </p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Button render={<a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer" />} nativeButton={false} size="lg" className="h-12 gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
              <MessageCircle className="size-5" />
              Ask About Transport
            </Button>
            <Button render={<a href={siteConfig.googleMapsLink} target="_blank" rel="noopener noreferrer" />} nativeButton={false} size="lg" variant="outline" className="h-12 gap-2 border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground">
              <ExternalLink className="size-5" />
              View Location
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
