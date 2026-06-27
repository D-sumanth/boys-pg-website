import Image from "next/image"
import { siteConfig } from "@/lib/site-config"

export function GallerySection() {
  return (
    <section id="gallery" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            Gallery
          </span>
          <h2 className="mt-2 text-balance font-heading text-3xl font-bold text-primary sm:text-4xl">
            Real photos from Prince Deluxe PG
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Exterior, room, dining, washroom, lift and facility photos are shown
            here so students and parents can quickly understand the property.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.gallery.map((item) => (
            <figure
              key={item.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-muted shadow-sm"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.src}
                  alt={`${item.title} at ${siteConfig.name}, Shamshabad`}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/75 via-primary/10 to-transparent" />
              </div>
              <figcaption className="absolute bottom-3 left-3 right-3 rounded-xl bg-background/92 px-3 py-2 text-sm font-semibold text-foreground shadow-sm backdrop-blur">
                {item.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
