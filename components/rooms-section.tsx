import { BadgeIndianRupee, BedDouble, Check, MessageCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site-config"

const includes = [
  "Homely food: breakfast, lunch and dinner",
  "South Indian and North Indian food",
  "Veg and non-veg meals",
  "Attached washrooms",
  "High-speed Wi-Fi",
  "CCTV camera security",
  "Housekeeping",
  "Mineral water, hot water and 24-hour water facility",
]

export function RoomsSection() {
  const { roomPlan } = siteConfig
  const stats = [
    { value: String(roomPlan.rooms), label: "Total rooms" },
    { value: String(roomPlan.sharing), label: "Sharing per room" },
    { value: String(roomPlan.capacity), label: "Total capacity" },
    { value: roomPlan.brokerage, label: "Brokerage" },
  ]

  return (
    <section id="rooms" className="relative overflow-hidden bg-background py-16 md:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-secondary to-transparent" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent">
            <span className="h-px w-6 bg-accent" />
            Rooms &amp; Pricing
            <span className="h-px w-6 bg-accent" />
          </span>
          <h2 className="mt-3 text-balance font-heading text-3xl font-bold text-primary sm:text-4xl">
            One room type. One transparent price.
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            All {roomPlan.rooms} rooms are 4-sharing rooms, designed for students
            and working professionals who want clean, safe and disciplined living.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl items-stretch gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative overflow-hidden rounded-3xl border border-accent/45 bg-card shadow-2xl ring-1 ring-accent/20">
            <span className="absolute right-5 top-5 z-10 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent-foreground shadow-md">
              {roomPlan.badge}
            </span>

            <div className="bg-brand-gradient px-7 py-8 text-primary-foreground sm:px-9">
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-primary-foreground/15">
                <BedDouble className="size-6" />
              </span>
              <h3 className="mt-4 font-heading text-2xl font-bold">{roomPlan.name}</h3>
              <p className="mt-1 text-sm text-primary-foreground/80">{roomPlan.description}</p>
              <div className="mt-5 flex flex-wrap items-end gap-2">
                <span className="font-heading text-5xl font-bold">{roomPlan.price}</span>
                <span className="pb-1 text-primary-foreground/80">{roomPlan.pricePeriod}</span>
              </div>
              <p className="mt-1 text-xs text-primary-foreground/70">{roomPlan.priceNote}</p>
            </div>

            <div className="px-7 py-7 sm:px-9">
              <ul className="grid gap-3 sm:grid-cols-2">
                {includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <Check className="size-3.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <Button render={<a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer" />} nativeButton={false} size="lg" className="h-12 gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
                  <MessageCircle className="size-5" />
                  WhatsApp Enquiry
                </Button>
                <Button render={<a href={siteConfig.phoneLink} />} nativeButton={false} size="lg" variant="outline" className="h-12 gap-2">
                  <Phone className="size-5" />
                  Call Now
                </Button>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-secondary/70 p-6 shadow-lg">
            <div className="rounded-2xl bg-card p-6 shadow-sm">
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <BadgeIndianRupee className="size-6" />
              </span>
              <h3 className="mt-4 font-heading text-xl font-bold text-primary">
                What this means for residents
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                A simple monthly plan with food and essential facilities included,
                plus no brokerage. Every room follows the same 4-sharing setup.
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-border bg-card p-5 text-center shadow-sm">
                  <p className="font-heading text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
