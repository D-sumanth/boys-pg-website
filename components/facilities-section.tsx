import {
  ArrowUpDown,
  Camera,
  CircleDollarSign,
  Droplets,
  Flame,
  FlameKindling,
  KeyRound,
  ShieldCheck,
  ShowerHead,
  Sparkles,
  UtensilsCrossed,
  WashingMachine,
  Wifi,
} from "lucide-react"

const facilities = [
  { icon: UtensilsCrossed, label: "Food Included" },
  { icon: Wifi, label: "High-Speed Wi-Fi" },
  { icon: Camera, label: "CCTV Security" },
  { icon: FlameKindling, label: "Fire Extinguisher" },
  { icon: ArrowUpDown, label: "Lift Access" },
  { icon: Flame, label: "Hot Water / Geyser" },
  { icon: ShowerHead, label: "Attached Washrooms" },
  { icon: Droplets, label: "Water Filters on Each Floor" },
  { icon: WashingMachine, label: "Common Washing Machine" },
  { icon: KeyRound, label: "Personal Storage" },
  { icon: Sparkles, label: "Cleaning Support" },
  { icon: CircleDollarSign, label: "No Brokerage" },
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
            Daily essentials for a comfortable stay
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Food, Wi-Fi, storage, safety and water facilities are planned for
            practical long-term living.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
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
