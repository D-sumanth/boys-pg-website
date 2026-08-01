import type { LucideIcon } from "lucide-react"
import {
  ArrowUpDown,
  BusFront,
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
import { siteConfig } from "@/lib/site-config"

const facilityIcons: Record<string, LucideIcon> = {
  "Homely food": UtensilsCrossed,
  "Breakfast, lunch and dinner": UtensilsCrossed,
  "Veg and non-veg food": UtensilsCrossed,
  "Attached washrooms": ShowerHead,
  "Hot water / geyser support": Flame,
  "High-speed Wi-Fi": Wifi,
  "CCTV security": Camera,
  "Fire extinguisher": FlameKindling,
  "Lift access": ArrowUpDown,
  "24-hour water availability": Droplets,
  "Water filters": Droplets,
  "Common washing machine": WashingMachine,
  "Personal locker for each bed": KeyRound,
  "4-door almirah storage": KeyRound,
  "Housekeeping / cleaning support": Sparkles,
  "Transport at reasonable prices": BusFront,
  "No brokerage": CircleDollarSign,
  "Disciplined and clean premises": ShieldCheck,
}

export function FacilitiesSection() {
  return (
    <section id="facilities" className="relative scroll-mt-16 overflow-hidden bg-secondary py-14 md:py-24">
      <div className="pointer-events-none absolute -left-24 top-10 size-72 rounded-full bg-primary/8 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 bottom-10 size-72 rounded-full bg-accent/12 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl sm:mx-auto sm:text-center">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-accent sm:text-sm">
            Facilities
          </span>
          <h2 className="mt-2 text-balance font-heading text-2xl font-bold leading-tight text-primary sm:text-4xl">
            Daily essentials with hotel-style convenience
          </h2>
          <p className="mt-3 text-pretty text-sm leading-6 text-muted-foreground sm:text-base sm:leading-relaxed">
            Food, safety, storage, water, transport and practical daily support
            for students, airport staff and working professionals.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {siteConfig.facilities.map((item) => {
            const Icon = facilityIcons[item.label] ?? Sparkles

            return (
              <div
                key={item.label}
                className="group flex min-h-24 items-center gap-2.5 rounded-xl border border-border bg-card/95 p-3 shadow-sm transition-colors hover:border-accent/40 sm:min-h-28 sm:gap-3 sm:p-4"
              >
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground sm:size-11">
                  <Icon className="size-4 sm:size-5" />
                </span>
                <span className="text-xs font-semibold leading-snug text-foreground sm:text-sm">
                  {item.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
