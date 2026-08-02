import {
  BadgeIndianRupee,
  Building2,
  BusFront,
  ShieldCheck,
  UtensilsCrossed,
  UsersRound,
} from "lucide-react"
import { siteConfig } from "@/lib/site-config"

const highlights = [
  {
    icon: Building2,
    title: "Hotel-style property",
    text: "A premium building adapted for comfortable PG living.",
  },
  {
    icon: UsersRound,
    title: `${siteConfig.roomPlan.rooms} rooms • ${siteConfig.roomPlan.capacity} residents`,
    text: "A spacious setup for students and working professionals.",
  },
  {
    icon: BadgeIndianRupee,
    title: "Student pricing",
    text: `${siteConfig.pricingTeaser}.`,
  },
  {
    icon: UtensilsCrossed,
    title: "Food included",
    text: "Homely breakfast, lunch and dinner every day.",
  },
  {
    icon: BusFront,
    title: "Transport available",
    text: "Support for nearby college and work routes.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & disciplined",
    text: "CCTV security and an on-site hostel in-charge.",
  },
] as const

export function HighlightsSection() {
  return (
    <section aria-label="Hostel highlights" className="bg-background py-10 sm:py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="flex min-h-36 flex-col rounded-2xl border border-border bg-card p-4 shadow-sm transition-colors hover:border-accent/40"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <item.icon className="size-5" />
              </span>
              <h2 className="mt-3 font-heading text-sm font-bold leading-snug text-foreground">
                {item.title}
              </h2>
              <p className="mt-1.5 text-xs leading-5 text-muted-foreground">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
