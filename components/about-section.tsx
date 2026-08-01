import Image from "next/image"
import { siteConfig } from "@/lib/site-config"

const points = [
  "Food included every day",
  "Personal locker and almirah space",
  "Transport support available",
  "Managed by an on-site hostel in-charge",
]

export function AboutSection() {
  return (
    <section id="about" className="bg-secondary py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative">
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/12 to-accent/12 blur-xl" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
            <Image
              src={siteConfig.images.buildingDay}
              alt="Prince Deluxe PG for Boys building exterior in daylight"
              width={640}
              height={460}
              className="aspect-[4/3] h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            About Us
          </span>
          <h2 className="text-balance font-heading text-3xl font-bold text-primary sm:text-4xl">
            A safe, clean and homely boys hostel in Shamshabad
          </h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            {siteConfig.name} is a boys PG hostel located in Shamshabad,
            Hyderabad. The property is designed for residents looking for a
            clean, secure and comfortable stay with food, personal storage,
            nearby transport support and essential daily facilities.
          </p>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            Student pricing is available for eligible students, while working
            professionals and airport staff can choose a room based on their
            space requirement. A 3-sharing arrangement may be available after
            management confirmation. Call or WhatsApp before visiting to check
            the latest availability.
          </p>
          <ul className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
            {points.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <span className="size-2 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
