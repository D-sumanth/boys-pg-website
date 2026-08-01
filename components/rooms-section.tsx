import Image from "next/image"
import { BedDouble, CheckCircle2, Info, MessageCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"

export function RoomsSection() {
  return (
    <section id="rooms" className="relative scroll-mt-16 overflow-hidden bg-background py-14 md:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-secondary to-transparent" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl sm:mx-auto sm:text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-accent sm:text-sm">
            <span className="h-px w-6 bg-accent" />
            Monthly Fees
            <span className="h-px w-6 bg-accent" />
          </span>
          <h2 className="mt-3 text-balance font-heading text-2xl font-bold leading-tight text-primary sm:text-4xl">
            Room fee structure
          </h2>
          <p className="mt-3 text-pretty text-sm leading-6 text-muted-foreground sm:text-base sm:leading-relaxed">
            Clear per-person monthly pricing for students, airport staff and
            working professionals. Food and essential daily facilities are included.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3 lg:gap-5">
          {siteConfig.pricingPlans.map((plan) => (
            <article
              key={plan.title}
              className={cn(
                "relative flex flex-col overflow-hidden rounded-2xl border bg-card p-5 shadow-lg sm:p-6",
                plan.featured
                  ? "border-accent shadow-accent/15 ring-2 ring-accent/20"
                  : "border-border",
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-heading text-xl font-bold text-primary">{plan.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {plan.description}
                  </p>
                </div>
                <span className={cn(
                  "rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide",
                  plan.featured
                    ? "bg-accent text-accent-foreground"
                    : "bg-primary/10 text-primary",
                )}>
                  {plan.badge}
                </span>
              </div>

              <div className="mt-6 divide-y divide-border border-y border-border">
                {plan.options.map((option) => (
                  <div key={option.room} className="flex items-end justify-between gap-4 py-4">
                    <p className="max-w-44 text-sm font-semibold leading-snug text-foreground">
                      {option.room}
                    </p>
                    <div className="shrink-0 text-right">
                      <p className="font-heading text-2xl font-bold text-primary">{option.price}</p>
                      <p className="text-xs text-muted-foreground">per person</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                render={<a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer" />}
                nativeButton={false}
                className="mt-6 h-12 gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <MessageCircle className="size-5" />
                {plan.featured ? "Ask About Student Offer" : "Check Availability"}
              </Button>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-6 rounded-2xl border border-primary/15 bg-secondary p-5 shadow-sm lg:grid-cols-[1fr_auto] lg:items-center lg:p-7">
          <div>
            <div className="flex items-center gap-2">
              <Info className="size-5 text-accent" />
              <h3 className="font-heading text-lg font-bold text-primary">Important fee details</h3>
            </div>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {siteConfig.pricingNotes.map((note) => (
                <li key={note} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />
                  {note}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:min-w-80 lg:grid-cols-1">
            <Button render={<a href={siteConfig.phoneLink} />} nativeButton={false} size="lg" variant="outline" className="h-12 gap-2 bg-card">
              <Phone className="size-5" />
              Call Now
            </Button>
            <Button render={<a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer" />} nativeButton={false} size="lg" className="h-12 gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
              <MessageCircle className="size-5" />
              WhatsApp Enquiry
            </Button>
          </div>
        </div>

        <div className="mt-12 md:mt-16">
          <div className="max-w-2xl sm:mx-auto sm:text-center">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-accent sm:text-sm">Room Options</span>
            <h3 className="mt-2 text-balance font-heading text-2xl font-bold leading-tight text-primary sm:text-3xl">
              Choose the room setup that suits you
            </h3>
          </div>

          <div className="mt-7 grid gap-4 lg:grid-cols-3 lg:gap-5">
            {siteConfig.roomCategories.map((room) => (
              <article key={room.name} className="overflow-hidden rounded-2xl border border-border bg-card shadow-md">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={room.image}
                    alt={`${room.name} at ${siteConfig.name}`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-primary/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-foreground shadow-lg">
                    <BedDouble className="size-3.5" />
                    {room.badge}
                  </span>
                </div>
                <div className="p-5">
                  <h4 className="font-heading text-xl font-bold text-primary">{room.name}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{room.description}</p>
                  <ul className="mt-4 space-y-2">
                    {room.features.slice(0, 4).map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-foreground/80">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
