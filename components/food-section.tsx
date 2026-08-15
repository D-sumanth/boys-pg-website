import Image from "next/image"
import { CalendarDays, Salad, UtensilsCrossed } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

const mealHighlights = [
  "Breakfast, lunch and dinner",
  "Veg and non-veg options",
  "Menu changes through the week",
]

export function FoodSection() {
  return (
    <section
      id="food"
      className="relative scroll-mt-16 overflow-hidden bg-secondary/70 py-14 md:py-24"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-12 lg:px-8">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-accent sm:text-sm">
            <UtensilsCrossed className="size-4" />
            Food at Prince Deluxe PG
          </span>
          <h2 className="mt-2 text-balance font-heading text-2xl font-bold leading-tight text-primary sm:text-4xl">
            Homely food for residents, served every day
          </h2>
          <p className="mt-3 text-pretty text-sm leading-6 text-muted-foreground sm:text-base sm:leading-relaxed">
            These are real photos of food served at the hostel. Residents receive
            breakfast, lunch and dinner, with the menu changing regularly.
          </p>

          <div className="mt-6 grid gap-2.5 sm:grid-cols-3 lg:grid-cols-1">
            {mealHighlights.map((item, index) => {
              const Icon = index === 1 ? Salad : index === 2 ? CalendarDays : UtensilsCrossed

              return (
                <div
                  key={item}
                  className="flex min-h-12 items-center gap-3 rounded-xl border border-border bg-background/90 px-3.5 py-2.5 text-sm font-semibold text-foreground shadow-sm"
                >
                  <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </span>
                  {item}
                </div>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3">
          {siteConfig.foodGallery.map((item) => (
            <figure
              key={item.src}
              className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-muted shadow-sm ring-1 ring-border sm:aspect-[4/3]"
            >
              <Image
                src={item.src}
                alt={`${item.title} served at ${siteConfig.name}`}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 22vw"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/95 via-primary/55 to-transparent px-3 pb-3 pt-9 text-xs font-semibold text-primary-foreground sm:text-sm">
                {item.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
