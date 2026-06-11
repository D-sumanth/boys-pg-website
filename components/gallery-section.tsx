import Image from "next/image"

// Replace each `src` with your real photos. Keep the same file names or update paths here.
const gallery = [
  { src: "/images/hostel-exterior.png", title: "Building Exterior", span: "lg:col-span-2 lg:row-span-2" },
  { src: "/images/room.png", title: "Rooms", span: "" },
  { src: "/images/dining.png", title: "Dining Area", span: "" },
  { src: "/images/washroom.png", title: "Washrooms", span: "" },
  { src: "/images/facilities.png", title: "Facilities", span: "" },
  { src: "/images/ambience.png", title: "Hostel Ambience", span: "lg:col-span-2" },
]

export function GallerySection() {
  return (
    <section id="gallery" className="bg-background py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            Gallery
          </span>
          <h2 className="mt-2 text-balance font-heading text-2xl font-bold text-primary sm:text-3xl">
            Take a look around
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Photos coming soon — these placeholders can be replaced with actual
            hostel images.
          </p>
        </div>

        <div className="mt-10 grid auto-rows-[180px] grid-cols-2 gap-4 sm:auto-rows-[200px] lg:grid-cols-4">
          {gallery.map((item) => (
            <figure
              key={item.title}
              className={`group relative overflow-hidden rounded-xl border border-border ${item.span}`}
            >
              <Image
                src={item.src || "/placeholder.svg"}
                alt={`${item.title} at Prince Deluxe PG for Boys, Shamshabad`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
              <figcaption className="absolute bottom-3 left-3 text-sm font-semibold text-primary-foreground">
                {item.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
