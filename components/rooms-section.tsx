import { Check, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WHATSAPP_LINK } from "@/lib/site-config"

const includes = [
  "Homely food (breakfast, lunch & dinner)",
  "High-speed Wi-Fi",
  "Daily housekeeping",
  "Attached washroom",
  "Hot water & mineral water",
  "CCTV security",
]

const rooms = [
  {
    title: "3 Sharing Room",
    price: "8,000",
    rooms: "33 rooms available",
    featured: true,
  },
  {
    title: "4 Sharing Room",
    price: "7,000",
    rooms: "5 rooms available",
    featured: false,
  },
]

const stats = [
  { value: "33", label: "Rooms for 3 sharing" },
  { value: "5", label: "Rooms for 4 sharing" },
  { value: "38", label: "Total rooms" },
  { value: "119", label: "Total capacity" },
]

export function RoomsSection() {
  return (
    <section id="rooms" className="bg-background py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            Rooms & Pricing
          </span>
          <h2 className="mt-2 text-balance font-heading text-2xl font-bold text-primary sm:text-3xl">
            Transparent pricing with no brokerage
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Choose the sharing option that suits you. Every room includes food,
            Wi-Fi, housekeeping and security.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
          {rooms.map((room) => (
            <div
              key={room.title}
              className={`relative flex flex-col rounded-2xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg sm:p-8 ${
                room.featured ? "border-accent ring-1 ring-accent" : "border-border"
              }`}
            >
              {room.featured && (
                <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                  Most Popular
                </span>
              )}
              <h3 className="font-heading text-xl font-bold text-foreground">
                {room.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{room.rooms}</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-heading text-4xl font-bold text-primary">
                  ₹{room.price}
                </span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>

              <ul className="mt-6 flex flex-col gap-3">
                {includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>

              <Button
                render={<a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" />}
                nativeButton={false}
                size="lg"
                className="mt-7 w-full gap-2"
              >
                <MessageCircle className="size-5" />
                Enquire Now
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 rounded-2xl border border-border bg-secondary p-6 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-3xl font-bold text-primary">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
