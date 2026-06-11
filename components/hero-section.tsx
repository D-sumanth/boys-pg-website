import Image from "next/image"
import { Phone, MessageCircle, ArrowDown, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PHONE_TEL, WHATSAPP_LINK } from "@/lib/site-config"

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden bg-secondary">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-2 lg:gap-12 lg:px-8">
        <div className="flex flex-col items-start gap-5">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-sm font-semibold text-accent">
            <span className="size-2 rounded-full bg-accent" />
            Opening from 1st July
          </span>

          <h1 className="text-balance font-heading text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl">
            Prince Deluxe PG for Boys in Shamshabad
          </h1>

          <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Safe, clean and homely PG accommodation for students and working
            professionals near GMR Aviation College and Shamshabad Airport area.
          </p>

          <div className="flex items-center gap-2 text-sm font-medium text-foreground/80">
            <MapPin className="size-4 text-accent" />
            Near Commissioner of Police, Shamshabad Zone
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button render={<a href={`tel:${PHONE_TEL}`} />} nativeButton={false} size="lg" className="gap-2">
              <Phone className="size-5" />
              Call Now
            </Button>
            <Button
              render={<a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" />}
              nativeButton={false}
              size="lg"
              className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <MessageCircle className="size-5" />
              WhatsApp Enquiry
            </Button>
            <Button render={<a href="#rooms" />} nativeButton={false} size="lg" variant="outline" className="gap-2">
              <ArrowDown className="size-5" />
              View Rooms
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-border shadow-xl">
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
          <div className="absolute -bottom-4 left-4 rounded-xl border border-border bg-background px-4 py-3 shadow-lg sm:left-6">
            <p className="font-heading text-2xl font-bold text-primary">38</p>
            <p className="text-xs text-muted-foreground">Rooms · 119 Capacity</p>
          </div>
        </div>
      </div>
    </section>
  )
}
