import Image from "next/image"
import { Building2, CheckCircle2 } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

const points = [
  "23 rooms for up to 90 residents",
  "Food included every day",
  "Personal locker and almirah space",
  "Transport support available",
]

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-16 bg-secondary py-14 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
        <div className="relative">
          <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-primary/12 to-accent/12 blur-xl" aria-hidden="true" />
          <figure className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
            <Image
              src={siteConfig.images.buildingDay}
              alt="Prince Deluxe PG for Boys building exterior in daylight"
              width={640}
              height={460}
              className="aspect-[4/3] h-full w-full object-cover"
            />
            <figcaption className="absolute inset-x-3 bottom-3 flex items-center gap-2 rounded-xl bg-primary/88 px-3 py-2.5 text-xs font-semibold text-primary-foreground shadow-lg backdrop-blur">
              <Building2 className="size-4 shrink-0 text-accent" />
              Hotel-style property in Brindavan Colony, Shamshabad
            </figcaption>
          </figure>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-accent sm:text-sm">
            About Us
          </span>
          <h2 className="text-balance font-heading text-2xl font-bold leading-tight text-primary sm:text-4xl">
            Hotel-style comfort with the warmth of PG living
          </h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            {siteConfig.name} is a hotel-style building now offering clean,
            secure and comfortable boys PG accommodation. Residents get
            spacious shared rooms, attached washrooms, personal storage, food
            and practical daily facilities in one well-managed property.
          </p>
          <p className="text-pretty text-sm leading-6 text-muted-foreground sm:text-base sm:leading-relaxed">
            Suitable for students, airport staff and working professionals who
            want more comfort than a basic hostel while keeping the convenience
            and value of PG accommodation.
          </p>
          <ul className="grid grid-cols-2 gap-2 pt-2">
            {points.map((item) => (
              <li key={item} className="flex min-h-16 items-start gap-2 rounded-xl border border-border bg-card p-3 text-xs font-semibold leading-5 text-foreground shadow-sm sm:text-sm">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
