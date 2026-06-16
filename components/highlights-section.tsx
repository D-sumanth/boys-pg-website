import { BedDouble, GraduationCap, ShieldCheck, UtensilsCrossed } from "lucide-react"

const highlights = [
  {
    icon: GraduationCap,
    title: "Near GMR Aviation College",
    text: "Convenient for students and close to Shamshabad airport-area workplaces.",
  },
  {
    icon: BedDouble,
    title: "4-Sharing Rooms Only",
    text: "24 rooms with attached washrooms and a total capacity of 96 residents.",
  },
  {
    icon: UtensilsCrossed,
    title: "Food Included",
    text: "Homely breakfast, lunch and dinner with veg and non-veg options.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Disciplined",
    text: "CCTV camera security and a safe, disciplined hostel environment.",
  },
]

export function HighlightsSection() {
  return (
    <section className="bg-background py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
