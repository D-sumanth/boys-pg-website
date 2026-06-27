import Image from "next/image"
import { siteConfig } from "@/lib/site-config"

const aspectClasses = [
  "aspect-[4/5]",
  "aspect-[4/3]",
  "aspect-[3/4]",
  "aspect-[5/4]",
  "aspect-[4/3]",
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[4/5]",
  "aspect-[3/4]",
  "aspect-[4/3]",
  "aspect-[4/5]",
  "aspect-square",
  "aspect-[5/4]",
]

export function GallerySection() {
  return (
    <section id="gallery" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            Gallery
          </span>
          <h2 className="mt-2 text-balance font-heading text-3xl font-bold text-primary sm:text-4xl">
            Explore Prince Deluxe PG
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Take a quick look at our entrance, rooms, dining area, washrooms,
            lift access and daily facilities.
          </p>
        </div>

        <div className="mt-10 columns-1 gap-3 min-[520px]:columns-2 lg:columns-3">
          {siteConfig.gallery.map((item, index) => (
            <figure
              key={item.title}
              className="mb-3 break-inside-avoid overflow-hidden rounded-2xl bg-muted shadow-sm ring-1 ring-border"
            >
              <div className={`relative ${aspectClasses[index % aspectClasses.length]}`}>
                <Image
                  src={item.src}
                  alt={`${item.title} at ${siteConfig.name}, Shamshabad`}
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 520px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
