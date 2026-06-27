import Image from "next/image"
import { BedDouble, Check, MessageCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site-config"

export function RoomsSection() {
  const { roomPlan } = siteConfig
  const stats = [
    { value: String(roomPlan.rooms), label: "Total rooms" },
    { value: "3", label: "Room categories" },
    { value: String(roomPlan.capacity), label: "Resident capacity" },
    { value: roomPlan.brokerage, label: "Brokerage" },
  ]

  return (
    <section id="rooms" className="relative overflow-hidden bg-background py-16 md:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-secondary to-transparent" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent">
            <span className="h-px w-6 bg-accent" />
            Rooms &amp; Enquiry
            <span className="h-px w-6 bg-accent" />
          </span>
          <h2 className="mt-3 text-balance font-heading text-3xl font-bold text-primary sm:text-4xl">
            Room categories with enquiry-based pricing
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Choose from premium 4-sharing rooms, standard 4-sharing rooms or a
            special partitioned 2-bed room. Contact us for current room
            availability and the latest AC or non-AC option.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {siteConfig.roomCategories.map((room) => (
            <article
              key={room.name}
              className="relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <Image
                  src={room.image}
                  alt={`${room.name} at ${siteConfig.name}`}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-primary/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-foreground shadow-lg">
                  <BedDouble className="size-3.5" />
                  {room.badge}
                </div>
              </div>

              <div className="flex flex-1 flex-col px-6 py-6">
                <h3 className="font-heading text-2xl font-bold text-primary">{room.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {room.description}
                </p>

                <div className="mt-5 rounded-2xl border border-accent/30 bg-accent/10 p-4">
                  <p className="font-heading text-lg font-bold text-primary">
                    Contact for current pricing and availability
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {siteConfig.pricingNote}
                  </p>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl border border-border p-4 text-sm">
                  <div>
                    <p className="font-heading text-xl font-bold text-primary">{room.roomCount}</p>
                    <p className="text-xs text-muted-foreground">rooms</p>
                  </div>
                  <div>
                    <p className="font-heading text-xl font-bold text-primary">{room.setup}</p>
                    <p className="text-xs text-muted-foreground">setup</p>
                  </div>
                </div>

                <ul className="mt-5 grid gap-2.5">
                  {room.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
                      <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                        <Check className="size-3.5" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button render={<a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer" />} nativeButton={false} className="mt-6 h-12 gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
                  <MessageCircle className="size-5" />
                  Enquire Now
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl gap-5 rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/12 via-background to-primary/8 p-5 shadow-lg md:grid-cols-[1fr_auto] md:items-center md:p-7">
          <div>
            <p className="font-heading text-2xl font-bold text-primary">{siteConfig.pricingTeaser}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {siteConfig.pricingNote} Call or WhatsApp for the quickest confirmation.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:min-w-80">
            <Button render={<a href={siteConfig.phoneLink} />} nativeButton={false} size="lg" variant="outline" className="h-12 gap-2 bg-background">
              <Phone className="size-5" />
              Call Now
            </Button>
            <Button render={<a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer" />} nativeButton={false} size="lg" className="h-12 gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
              <MessageCircle className="size-5" />
              WhatsApp
            </Button>
          </div>
        </div>

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border bg-card p-5 text-center shadow-sm">
              <p className="font-heading text-2xl font-bold text-primary sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
