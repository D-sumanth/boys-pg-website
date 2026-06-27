import Image from "next/image"
import {
  ArrowDown,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  UtensilsCrossed,
  Wifi,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site-config"

const trustChips = [
  { icon: UtensilsCrossed, label: "Food Included" },
  { icon: Wifi, label: "High-Speed Wi-Fi" },
  { icon: ShieldCheck, label: "CCTV Secured" },
]

export function HeroSection() {
  const { roomPlan } = siteConfig

  return (
    <section id="home" className="relative overflow-hidden bg-brand-gradient text-primary-foreground">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid text-primary-foreground/10" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-accent/25 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 size-96 rounded-full bg-primary-foreground/10 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-12 sm:px-6 md:pb-24 md:pt-20 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3.5 py-1.5 text-sm font-semibold shadow-sm backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            Opening from {siteConfig.openingDate} - limited rooms available
          </span>

          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
              Boys PG in Shamshabad
            </p>
            <h1 className="max-w-3xl text-balance font-heading text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              {siteConfig.name} in Shamshabad
            </h1>
            <p className="max-w-2xl text-pretty text-base leading-relaxed text-primary-foreground/82 sm:text-lg">
              A clean, safe and well-managed boys PG offering spacious rooms,
              homely food, attached washrooms, personal storage, lift access,
              CCTV security and essential daily facilities.
            </p>
            <p className="inline-flex rounded-2xl border border-accent/35 bg-accent/15 px-4 py-2 font-heading text-lg font-bold text-accent sm:text-xl">
              {siteConfig.pricingTeaser}
            </p>
          </div>

          <div className="grid w-full gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/8 p-4 backdrop-blur">
              <p className="font-heading text-2xl font-bold">{roomPlan.rooms}</p>
              <p className="text-xs text-primary-foreground/70">total rooms</p>
            </div>
            <div className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/8 p-4 backdrop-blur">
              <p className="font-heading text-2xl font-bold">{roomPlan.capacity}</p>
              <p className="text-xs text-primary-foreground/70">resident capacity</p>
            </div>
            <div className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/8 p-4 backdrop-blur">
              <p className="font-heading text-2xl font-bold">₹8,500+</p>
              <p className="text-xs text-primary-foreground/70">starting monthly rooms</p>
            </div>
          </div>

          <div className="flex items-start gap-2 text-sm font-medium text-primary-foreground/90">
            <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
            <span>{siteConfig.address.landmark}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {trustChips.map((chip) => (
              <span
                key={chip.label}
                className="inline-flex items-center gap-1.5 rounded-lg border border-primary-foreground/15 bg-primary-foreground/8 px-3 py-1.5 text-xs font-medium text-primary-foreground/90"
              >
                <chip.icon className="size-3.5 text-accent" />
                {chip.label}
              </span>
            ))}
          </div>

          <div className="grid w-full gap-3 pt-1 sm:w-auto sm:grid-cols-2 lg:flex lg:flex-wrap">
            <Button render={<a href={siteConfig.phoneLink} />} nativeButton={false} size="lg" className="h-12 gap-2 bg-accent px-5 text-accent-foreground shadow-lg shadow-accent/20 hover:bg-accent/90">
              <Phone className="size-5" />
              Call Now
            </Button>
            <Button render={<a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer" />} nativeButton={false} size="lg" variant="outline" className="h-12 gap-2 border-primary-foreground/30 bg-primary-foreground/8 px-5 text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground">
              <MessageCircle className="size-5" />
              WhatsApp Enquiry
            </Button>
            <Button render={<a href="#rooms" />} nativeButton={false} size="lg" variant="ghost" className="h-12 gap-2 px-5 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <ArrowDown className="size-5" />
              View Rooms
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-3 rounded-[2rem] bg-primary-foreground/10 blur-xl" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-primary-foreground/20 bg-primary-foreground/10 shadow-2xl ring-1 ring-primary-foreground/10">
            <Image
              src={siteConfig.images.hero}
              alt="Prince Deluxe PG for Boys hostel building exterior in Shamshabad"
              width={720}
              height={560}
              priority
              loading="eager"
              className="aspect-[4/3] h-full w-full object-cover object-[50%_72%] sm:object-center"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
