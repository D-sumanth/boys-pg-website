import { Check, MessageCircle, Phone, BedDouble } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WHATSAPP_LINK, PHONE_TEL } from "@/lib/site-config"

const includes = [
  "Homely food — breakfast, lunch & dinner",
  "Veg & non-veg meals",
  "High-speed Wi-Fi",
  "Daily housekeeping",
  "Attached washroom",
  "Hot & mineral water",
  "24-hour water facility",
  "CCTV security",
]

const stats = [
  { value: "24", label: "Total rooms" },
  { value: "4", label: "Sharing per room" },
  { value: "96", label: "Total capacity" },
  { value: "₹0", label: "Brokerage" },
]

export function RoomsSection() {
  return (
    <section id="rooms" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent">
            <span className="h-px w-6 bg-accent" />
            Rooms &amp; Pricing
            <span className="h-px w-6 bg-accent" />
          </span>
          <h2 className="mt-3 text-balance font-heading text-3xl font-bold text-primary sm:text-4xl">
            One simple, transparent price
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Comfortable 4-sharing rooms with everything included — food, Wi-Fi,
            housekeeping and security. No hidden charges, no brokerage.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-lg">
          <div className="relative overflow-hidden rounded-3xl border border-accent/40 bg-card shadow-xl ring-1 ring-accent/20">
            <span className="absolute right-5 top-5 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent-foreground">
              Most Popular
            </span>

            <div className="bg-brand-gradient px-7 py-8 text-primary-foreground sm:px-9">
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-primary-foreground/15">
                <BedDouble className="size-6" />
              </span>
              <h3 className="mt-4 font-heading text-2xl font-bold">4 Sharing Room</h3>
              <p className="mt-1 text-sm text-primary-foreground/80">
                Spacious shared room with attached washroom
              </p>
              <div className="mt-5 flex items-baseline gap-1.5">
                <span className="font-heading text-5xl font-bold">₹8,000</span>
                <span className="text-primary-foreground/80">/ month</span>
              </div>
              <p className="mt-1 text-xs text-primary-foreground/70">per person · all-inclusive</p>
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

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button
                  render={<a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" />}
                  nativeButton={false}
                  size="lg"
                  className="flex-1 gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <MessageCircle className="size-5" />
                  Enquire Now
                </Button>
                <Button
                  render={<a href={`tel:${PHONE_TEL}`} />}
                  nativeButton={false}
                  size="lg"
                  variant="outline"
                  className="flex-1 gap-2"
                >
                  <Phone className="size-5" />
                  Call
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card p-6 text-center">
              <p className="font-heading text-3xl font-bold text-primary">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
