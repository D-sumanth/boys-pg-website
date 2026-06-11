import {
  UtensilsCrossed,
  Beef,
  Wifi,
  ShieldCheck,
  Droplets,
  Flame,
  Sparkles,
  WashingMachine,
  Refrigerator,
  ShowerHead,
  Clock,
  Users,
} from "lucide-react"

const facilities = [
  { icon: UtensilsCrossed, label: "Breakfast, Lunch & Dinner" },
  { icon: Beef, label: "Veg & Non-Veg Food" },
  { icon: Wifi, label: "High-Speed Wi-Fi" },
  { icon: ShieldCheck, label: "CCTV Security" },
  { icon: Droplets, label: "Mineral Water" },
  { icon: Flame, label: "Hot Water" },
  { icon: Sparkles, label: "Housekeeping" },
  { icon: WashingMachine, label: "Washing Machine" },
  { icon: Refrigerator, label: "Refrigerator" },
  { icon: ShowerHead, label: "Attached Washrooms" },
  { icon: Clock, label: "24-Hour Water Facility" },
  { icon: Users, label: "Student-Friendly Environment" },
]

export function FacilitiesSection() {
  return (
    <section id="facilities" className="bg-secondary py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            Facilities
          </span>
          <h2 className="mt-2 text-balance font-heading text-2xl font-bold text-primary sm:text-3xl">
            Everything you need for comfortable living
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {facilities.map((item) => (
            <div
              key={item.label}
              className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 text-center transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <item.icon className="size-6" />
              </span>
              <span className="text-sm font-medium text-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
