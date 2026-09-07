import Image from "next/image"
import {
  ArrowDown,
  Building2,
  BusFront,
  Camera,
  Images,
  MapPin,
  MessageCircle,
  UtensilsCrossed,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { TrackedLink } from "@/components/tracked-link"
import { siteConfig } from "@/lib/site-config"

const trustChips = [
  { icon: Building2, label: "Hotel-style property" },
  { icon: UtensilsCrossed, label: "Food included" },
  { icon: BusFront, label: "Transport available" },
  { icon: Camera, label: "CCTV security" },
]

export function HeroSection() {
  const { roomPlan } = siteConfig

  return (
    <section
      id="home"
      className="relative min-h-[calc(100svh-4rem)] scroll-mt-16 overflow-hidden bg-primary text-primary-foreground lg:min-h-[760px]"
    >
      <Image
        src={siteConfig.images.hero}
        alt={`Illuminated entrance of ${siteConfig.name} in Shamshabad`}
        fill
        priority
        loading="eager"
        fetchPriority="high"
        sizes="100vw"
        className="object-cover object-[52%_64%] lg:object-center"
      />
      <div className="absolute inset-0 bg-primary/40" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/65 to-primary lg:bg-gradient-to-r lg:from-primary lg:via-primary/80 lg:to-primary/15"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-dot-grid text-primary-foreground/8" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl items-end px-4 pb-9 pt-20 sm:px-6 md:pb-14 lg:min-h-[760px] lg:items-center lg:px-8 lg:py-20">
        <div className="w-full max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary/45 px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur-md sm:text-sm">
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            Now open in Shamshabad
          </span>

          <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-accent sm:text-sm">
            Boys and men&apos;s PG - Hotel-style comfort
          </p>
          <h1 className="mt-2 max-w-3xl text-balance font-heading text-3xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
            Comfortable Boys PG in Shamshabad, Hyderabad
          </h1>
          <p className="mt-3 max-w-xl text-pretty text-[15px] leading-6 text-primary-foreground/88 sm:text-lg sm:leading-7">
            {siteConfig.name} offers furnished boys hostel accommodation in
            Brindavan Colony, Shamshabad, for {siteConfig.audience}. Homely food,
            attached washrooms and Wi-Fi are included.
          </p>

          <div className="mt-4 inline-flex rounded-xl border border-accent/40 bg-accent/18 px-3.5 py-2 font-heading text-base font-bold text-accent shadow-sm backdrop-blur sm:text-xl">
            {siteConfig.pricingTeaser}
          </div>

          <dl className="mt-4 grid grid-cols-3 gap-2 sm:max-w-xl sm:gap-3">
            <div className="rounded-xl border border-primary-foreground/20 bg-primary/40 p-3 backdrop-blur-md">
              <dt className="text-[11px] leading-tight text-primary-foreground/68">Rooms</dt>
              <dd className="mt-1 font-heading text-xl font-bold sm:text-2xl">{roomPlan.rooms}</dd>
            </div>
            <div className="rounded-xl border border-primary-foreground/20 bg-primary/40 p-3 backdrop-blur-md">
              <dt className="text-[11px] leading-tight text-primary-foreground/68">Residents</dt>
              <dd className="mt-1 font-heading text-xl font-bold sm:text-2xl">{roomPlan.capacity}</dd>
            </div>
            <div className="rounded-xl border border-primary-foreground/20 bg-primary/40 p-3 backdrop-blur-md">
              <dt className="text-[11px] leading-tight text-primary-foreground/68">Student fee</dt>
              <dd className="mt-1 font-heading text-xl font-bold sm:text-2xl">{siteConfig.startingPriceShort}</dd>
            </div>
          </dl>

          <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
            {trustChips.map((chip) => (
              <span
                key={chip.label}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-primary-foreground/15 bg-primary/35 px-2.5 py-1.5 text-[11px] font-semibold text-primary-foreground/92 backdrop-blur-md sm:text-xs"
              >
                <chip.icon className="size-3.5 shrink-0 text-accent" />
                {chip.label}
              </span>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap">
            <Button
              render={<TrackedLink href={siteConfig.whatsappLink} eventName="click_whatsapp" target="_blank" rel="noopener noreferrer" />}
              nativeButton={false}
              size="lg"
              className="h-12 gap-2 bg-accent px-4 text-accent-foreground shadow-lg shadow-black/15 hover:bg-accent/90"
            >
              <MessageCircle className="size-5" />
              Enquire Now
            </Button>
            <Button
              render={<a href="#rooms" />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="h-12 gap-2 border-primary-foreground/35 bg-primary/35 px-4 text-primary-foreground backdrop-blur hover:bg-primary-foreground/15 hover:text-primary-foreground"
            >
              <ArrowDown className="size-5" />
              Rooms &amp; Fees
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-primary-foreground/78 sm:text-sm">
            <a href="#gallery" className="inline-flex min-h-10 items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              <Images className="size-4 text-accent" />
              View real hostel photos
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 shrink-0 text-accent" />
              Brindavan Colony, Shamshabad
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
