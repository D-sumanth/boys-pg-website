import { BriefcaseBusiness, BusFront, CheckCircle2, GraduationCap, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site-config"

const audienceGroups = [
  {
    icon: GraduationCap,
    eyebrow: "For Students",
    title: "Ideal for students near Shamshabad",
    description:
      "A practical boys hostel option for students attending GMR School of Aviation, Vardhaman College of Engineering and Amity University.",
    benefits: [
      "Student pricing available",
      "Food included",
      "Study-friendly rooms",
      "Personal storage",
      "Transport support available",
      "Clean and disciplined environment",
    ],
    cta: "Ask About Student Offer",
  },
  {
    icon: BriefcaseBusiness,
    eyebrow: "For Professionals",
    title: "Suitable for airport staff and working professionals",
    description:
      "Convenient PG accommodation in Shamshabad for airport-related employees and professionals who want food, security and daily facilities.",
    benefits: [
      "Airport terminal: 7.2 km",
      "Financial District: 20 km",
      "Monthly room options",
      "Homely food included",
      "CCTV security",
      "Transport support available",
    ],
    cta: "Check Room Availability",
  },
] as const

export function AudienceSection() {
  return (
    <section className="bg-primary py-16 text-primary-foreground md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">Who We Welcome</span>
          <h2 className="mt-2 text-balance font-heading text-3xl font-bold sm:text-4xl">
            A comfortable stay for study and work
          </h2>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {audienceGroups.map((group) => (
            <article key={group.eyebrow} className="rounded-3xl border border-primary-foreground/15 bg-primary-foreground/10 p-6 shadow-lg backdrop-blur sm:p-8">
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                <group.icon className="size-6" />
              </span>
              <p className="mt-5 text-sm font-bold uppercase tracking-wide text-accent">{group.eyebrow}</p>
              <h3 className="mt-2 font-heading text-2xl font-bold">{group.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-primary-foreground/75">{group.description}</p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {group.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2 text-sm text-primary-foreground/90">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <Button
                render={<a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer" />}
                nativeButton={false}
                size="lg"
                className="mt-6 h-12 gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <MessageCircle className="size-5" />
                {group.cta}
              </Button>
            </article>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-accent/30 bg-accent/15 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <BusFront className="mt-0.5 size-5 shrink-0 text-accent" />
            <div>
              <p className="font-heading font-bold">Need transport to college or work?</p>
              <p className="mt-1 text-sm text-primary-foreground/75">
                Speak to us about available routes and transport options at reasonable prices.
              </p>
            </div>
          </div>
          <a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer" className="shrink-0 text-sm font-bold text-accent underline underline-offset-4">
            Ask About Transport
          </a>
        </div>
      </div>
    </section>
  )
}
