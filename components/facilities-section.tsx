import type { LucideIcon } from "lucide-react"
import {
  ArrowUpDown,
  Camera,
  CircleDollarSign,
  Droplets,
  Flame,
  FlameKindling,
  Home,
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
  "Clean dining/common area": Home,
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
  "No brokerage": CircleDollarSign,
  "Family-managed environment": ShieldCheck,
  "Disciplined and clean premises": ShieldCheck,
}

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
            Practical facilities for everyday hostel life
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Food, safety, storage, water, lift access and clean shared spaces
            are available for students and working professionals.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3 min-[380px]:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {siteConfig.facilities.map((item) => {
            const Icon = facilityIcons[item.label] ?? Sparkles

            return (
              <div
                key={item.label}
                className="group flex min-h-28 items-center gap-3 rounded-2xl border border-border bg-card/95 p-4 shadow-sm transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg"
              >
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon className="size-5" />
                </span>
                <span className="text-sm font-semibold leading-snug text-foreground">
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
