import { GraduationCap, BedDouble, UtensilsCrossed, ShieldCheck } from "lucide-react"

const highlights = [
  {
    icon: GraduationCap,
    title: "Near GMR Aviation College",
    text: "Walking distance for students and close to the airport area offices.",
  },
  {
    icon: BedDouble,
    title: "3 & 4 Sharing Rooms",
    text: "Comfortable shared rooms with attached washrooms.",
  },
  {
    icon: UtensilsCrossed,
    title: "Food Included",
    text: "Homely breakfast, lunch and dinner — veg & non-veg.",
  },
  {
    icon: ShieldCheck,
    title: "CCTV & Wi-Fi",
    text: "Secure premises with high-speed internet throughout.",
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
              className="group flex flex-col items-start gap-3 rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
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
