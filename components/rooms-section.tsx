import { BedDouble, Check, MessageCircle, Phone, Snowflake } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site-config"

export function RoomsSection() {
  const { roomPlan } = siteConfig
  const stats = [
    { value: String(roomPlan.rooms), label: "Total rooms" },
    { value: "3", label: "Room options" },
    { value: String(roomPlan.capacity), label: "Total capacity" },
    { value: roomPlan.brokerage, label: "Brokerage" },
  ]

  return (
    <section id="rooms" className="relative overflow-hidden bg-background py-16 md:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-secondary to-transparent" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent">
            <span className="h-px w-6 bg-accent" />
            Rooms &amp; Pricing
            <span className="h-px w-6 bg-accent" />
          </span>
          <h2 className="mt-3 text-balance font-heading text-3xl font-bold text-primary sm:text-4xl">
            Multiple room options with clear pricing
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Choose from premium 4-sharing rooms, standard 4-sharing rooms or a
            special 2-bed partitioned room. Non-AC and AC-option pricing is
            shown clearly for enquiry.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {siteConfig.roomCategories.map((room) => (
            <article
              key={room.name}
              className="relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-xl"
            >
              <div className="bg-brand-gradient px-6 py-7 text-primary-foreground">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-bold uppercase tracking-wide">
                  <BedDouble className="size-3.5" />
                  {room.badge}
                </span>
                <h3 className="mt-4 font-heading text-2xl font-bold">{room.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/78">
                  {room.description}
                </p>
              </div>

              <div className="flex flex-1 flex-col px-6 py-6">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-secondary p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Non-AC</p>
                    <p className="mt-1 font-heading text-2xl font-bold text-primary">{room.nonAcPrice}</p>
                    <p className="text-xs text-muted-foreground">per person/month</p>
                  </div>
                  <div className="rounded-2xl bg-accent/12 p-4">
                    <p className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      <Snowflake className="size-3.5" />
                      AC Option
                    </p>
                    <p className="mt-1 font-heading text-2xl font-bold text-primary">{room.acPrice}</p>
                    <p className="text-xs text-muted-foreground">per person/month</p>
                  </div>
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
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-accent/30 bg-accent/10 p-5 text-center text-sm leading-relaxed text-foreground">
          Non-AC and AC-option pricing available. AC availability can be
          confirmed during room enquiry or booking.
        </div>

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border bg-card p-5 text-center shadow-sm">
              <p className="font-heading text-3xl font-bold text-primary">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
          <Button render={<a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer" />} nativeButton={false} size="lg" className="h-12 gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
            <MessageCircle className="size-5" />
            WhatsApp Enquiry
          </Button>
          <Button render={<a href={siteConfig.phoneLink} />} nativeButton={false} size="lg" variant="outline" className="h-12 gap-2">
            <Phone className="size-5" />
            Call Now
          </Button>
        </div>
      </div>
    </section>
  )
}
