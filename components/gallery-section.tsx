import Image from "next/image"
import { Camera, Images } from "lucide-react"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"

export function GallerySection() {
  return (
    <section id="gallery" className="scroll-mt-16 bg-background py-14 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl sm:mx-auto sm:text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-accent sm:text-sm">
            <Camera className="size-4" />
            Real Hostel Photos
          </span>
          <h2 className="mt-2 text-balance font-heading text-2xl font-bold leading-tight text-primary sm:text-4xl">
            See the rooms and hotel-style property before you visit
          </h2>
          <p className="mt-3 text-pretty text-sm leading-6 text-muted-foreground sm:text-base sm:leading-relaxed">
            Every photo below is from Prince Deluxe PG. Explore the entrance,
            shared rooms, dining spaces, washrooms, lift and daily facilities.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 lg:auto-rows-[230px] lg:grid-cols-4">
          {siteConfig.gallery.map((item, index) => (
            <figure
              key={item.title}
              className={cn(
                "group relative overflow-hidden rounded-xl bg-muted shadow-sm ring-1 ring-border",
                index === 0
                  ? "col-span-2 aspect-[4/3] sm:aspect-[16/10] lg:row-span-2 lg:aspect-auto"
                  : "aspect-[4/5] lg:aspect-auto",
              )}
            >
              <Image
                src={item.src}
                alt={`${item.title} at ${siteConfig.name}, Shamshabad`}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
                sizes={
                  index === 0
                    ? "(max-width: 768px) 100vw, (max-width: 1024px) 66vw, 50vw"
                    : "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                }
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent px-3 pb-3 pt-10 text-primary-foreground sm:px-4 sm:pb-4">
                <figcaption className="flex items-center gap-2 text-xs font-semibold leading-snug sm:text-sm">
                  {index === 0 && <Images className="size-4 shrink-0 text-accent" />}
                  {item.title}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
