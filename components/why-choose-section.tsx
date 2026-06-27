import { ShieldCheck, GraduationCap, Briefcase, Sparkles, BadgeIndianRupee } from "lucide-react"

const reasons = [
  {
    icon: ShieldCheck,
    text: "Clean and spacious boys PG accommodation in Shamshabad",
  },
  {
    icon: GraduationCap,
    text: "Suitable for students and working professionals",
  },
  {
    icon: Briefcase,
    text: "Premium rooms with extra usable entrance space",
  },
  {
    icon: Sparkles,
    text: "Personal locker, almirah storage and attached washrooms",
  },
  {
    icon: ShieldCheck,
    text: "CCTV security, fire extinguisher and lift access",
  },
  {
    icon: BadgeIndianRupee,
    text: "Rooms starting from ₹8,500/month with final pricing confirmed by enquiry",
  },
]

export function WhyChooseSection() {
  return (
    <section className="relative overflow-hidden bg-primary py-16 text-primary-foreground md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid text-primary-foreground/8" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-16 top-10 size-72 rounded-full bg-accent/15 blur-3xl" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            Why Choose Us
          </span>
          <h2 className="mt-2 text-balance font-heading text-2xl font-bold sm:text-3xl">
            A hostel parents trust and students love
          </h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <div
              key={reason.text}
              className="flex items-start gap-3 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/10 p-5 shadow-sm backdrop-blur transition-transform hover:-translate-y-1"
            >
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <reason.icon className="size-5" />
              </span>
              <p className="text-sm leading-relaxed text-primary-foreground/90">
                {reason.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
