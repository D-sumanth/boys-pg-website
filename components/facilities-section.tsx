import {
  Beef,
  Clock,
  Droplets,
  Flame,
  ShieldCheck,
  ShowerHead,
  UtensilsCrossed,
  Wifi,
} from "lucide-react"

const facilities = [
  { icon: UtensilsCrossed, label: "Homely Food" },
  { icon: UtensilsCrossed, label: "Breakfast, Lunch & Dinner" },
  { icon: Beef, label: "Veg & Non-Veg Food" },
  { icon: ShowerHead, label: "Attached Washrooms" },
  { icon: ShieldCheck, label: "CCTV Camera Security" },
  { icon: Wifi, label: "High-Speed Wi-Fi" },
  { icon: Droplets, label: "Mineral Water" },
  { icon: Clock, label: "24-Hour Water Facility" },
  { icon: Flame, label: "Hot Water" },
  { icon: ShieldCheck, label: "Safe & Disciplined Environment" },
]

export function FacilitiesSection() {
  return (
    <section id="facilities" className="relative overflow-hidden bg-secondary py-16 md:py-24">
      <div className="pointer-events-none absolute -left-24 top-10 size-72 rounded-full bg-primary/8 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 bottom-10 size-72 rounded-full bg-accent/12 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            Facilities
          </span>
          <h2 className="mt-2 text-balance font-heading text-3xl font-bold text-primary sm:text-4xl">
            Essential facilities for comfortable daily living
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Simple, practical facilities for students and working professionals.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {facilities.map((item) => (
            <div
              key={item.label}
              className="group flex min-h-32 flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card/95 p-4 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg sm:p-5"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <item.icon className="size-6" />
              </span>
              <span className="text-sm font-semibold leading-snug text-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
