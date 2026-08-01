import { BadgeIndianRupee, BusFront, Plane, ShieldCheck, UtensilsCrossed } from "lucide-react"

const highlights = [
  {
    icon: BadgeIndianRupee,
    title: "Student Pricing",
    text: "Eligible students can choose rooms starting from ₹7,500 per month.",
  },
  {
    icon: UtensilsCrossed,
    title: "Food Included",
    text: "Homely breakfast, lunch and dinner with veg and non-veg options.",
  },
  {
    icon: BusFront,
    title: "Transport Available",
    text: "Transport support can be arranged at reasonable prices.",
  },
  {
    icon: Plane,
    title: "7.2 km to Airport",
    text: "Convenient for airport staff, trainees and frequent travellers.",
  },
  {
    icon: ShieldCheck,
    title: "CCTV Security",
    text: "CCTV coverage in key areas for resident and parent confidence.",
  },
]

export function HighlightsSection() {
  return (
    <section className="bg-background py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="group flex flex-col items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <item.icon className="size-6" />
              </span>
              <h3 className="font-heading text-base font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
