import Image from "next/image"
import { Phone, MessageCircle, ArrowDown, MapPin, Star, ShieldCheck, Wifi, UtensilsCrossed } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PHONE_TEL, WHATSAPP_LINK } from "@/lib/site-config"

const trustChips = [
  { icon: UtensilsCrossed, label: "Food Included" },
  { icon: Wifi, label: "High-Speed Wi-Fi" },
  { icon: ShieldCheck, label: "CCTV Secured" },
]

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden bg-brand-gradient text-primary-foreground">
      {/* decorative dotted grid */}
      <div className="pointer-events-none absolute inset-0 text-primary-foreground/10 bg-dot-grid" aria-hidden="true" />
      {/* glow accents */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-accent/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-24 size-80 rounded-full bg-primary-foreground/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:px-8">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3.5 py-1.5 text-sm font-semibold backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            Now Open — Limited Rooms
          </span>

          <h1 className="text-balance font-heading text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
            Prince Deluxe PG <span className="text-gradient-accent">for Boys</span> in Shamshabad
          </h1>

          <p className="max-w-xl text-pretty text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
            Safe, clean and homely PG accommodation for students and working
            professionals near GMR Aviation College and the Shamshabad Airport area.
          </p>

          <div className="flex items-center gap-2 text-sm font-medium text-primary-foreground/90">
            <MapPin className="size-4 text-accent" />
            Near Commissioner of Police, Shamshabad Zone
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {trustChips.map((chip) => (
              <span
                key={chip.label}
                className="inline-flex items-center gap-1.5 rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 px-3 py-1.5 text-xs font-medium text-primary-foreground/90"
              >
                <chip.icon className="size-3.5 text-accent" />
                {chip.label}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap">
            <Button
              render={<a href={`tel:${PHONE_TEL}`} />}
              nativeButton={false}
              size="lg"
              className="gap-2 bg-accent text-accent-foreground shadow-lg shadow-accent/20 hover:bg-accent/90"
            >
              <Phone className="size-5" />
              Call Now
            </Button>
            <Button
              render={<a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="gap-2 border-primary-foreground/30 bg-primary-foreground/5 text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground"
            >
              <MessageCircle className="size-5" />
              WhatsApp Enquiry
            </Button>
            <Button
              render={<a href="#rooms" />}
              nativeButton={false}
              size="lg"
              variant="ghost"
              className="gap-2 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <ArrowDown className="size-5" />
              View Rooms
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl border border-primary-foreground/20 shadow-2xl ring-1 ring-primary-foreground/10">
            {/* Replace /images/hostel-exterior.png with your real hostel building photo */}
            <Image
              src="/images/hostel-exterior.png"
              alt="Prince Deluxe PG for Boys hostel building exterior in Shamshabad"
              width={720}
              height={560}
              priority
              className="h-full w-full object-cover"
            />
          </div>

          {/* floating capacity card */}
          <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3 shadow-xl sm:left-6">
            <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <span className="font-heading text-lg font-bold">24</span>
            </span>
            <div>
              <p className="font-heading text-sm font-bold text-foreground">24 Rooms Available</p>
              <p className="text-xs text-muted-foreground">4-sharing · 96 capacity</p>
            </div>
          </div>

          {/* floating rating card */}
          <div className="absolute -right-2 -top-4 flex items-center gap-2 rounded-2xl border border-border bg-background px-3.5 py-2.5 shadow-xl sm:-right-4">
            <Star className="size-5 fill-accent text-accent" />
            <div className="leading-tight">
              <p className="font-heading text-sm font-bold text-foreground">Homely Living</p>
              <p className="text-[11px] text-muted-foreground">Trusted by parents</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
