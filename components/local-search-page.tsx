import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  BedDouble,
  CheckCircle2,
  ExternalLink,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  UtensilsCrossed,
  Wifi,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { FloatingActions } from "@/components/floating-actions"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { RoomsSection } from "@/components/rooms-section"
import { TrackedLink } from "@/components/tracked-link"
import type { LocalSearchPageContent } from "@/lib/local-search-pages"
import { localSearchPages } from "@/lib/local-search-pages"
import { siteConfig } from "@/lib/site-config"

const benefitIcons = [MapPin, UtensilsCrossed, Wifi, ShieldCheck]

const essentialFacilities = [
  "Furnished shared rooms",
  "Homely breakfast, lunch and dinner",
  "Attached washrooms",
  "High-speed Wi-Fi",
  "CCTV security",
  "Lift access",
  "Hot water and water filters",
  "Personal locker and almirah storage",
]

export function LocalSearchPage({ page }: { page: LocalSearchPageContent }) {
  const relatedPages = localSearchPages.filter((item) => item.slug !== page.slug)

  return (
    <>
      <a
        href="#main-content"
        className="fixed left-3 top-3 z-[60] -translate-y-20 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-lg transition-transform focus:translate-y-0"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content">
        <section className="relative min-h-[680px] overflow-hidden bg-primary text-primary-foreground">
          <Image
            src={page.heroImage}
            alt={page.heroAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-primary/55" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/35 via-primary/75 to-primary lg:bg-gradient-to-r lg:from-primary lg:via-primary/85 lg:to-primary/30" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-0 bg-dot-grid text-primary-foreground/8" aria-hidden="true" />

          <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-end px-4 pb-14 pt-24 sm:px-6 lg:items-center lg:px-8 lg:py-24">
            <div className="max-w-3xl">
              <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold text-primary-foreground/70">
                <Link href="/" className="rounded-sm hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                  Home
                </Link>
                <span aria-hidden="true">/</span>
                <span>{page.eyebrow}</span>
              </nav>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent sm:text-sm">
                {page.eyebrow}
              </p>
              <h1 className="mt-3 text-balance font-heading text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
                {page.title}
              </h1>
              <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-primary-foreground/86 sm:text-lg">
                {page.intro}
              </p>
              <p className="mt-4 inline-flex items-center gap-2 rounded-xl border border-primary-foreground/20 bg-primary/45 px-3.5 py-2 text-sm font-semibold backdrop-blur">
                <MapPin className="size-4 shrink-0 text-accent" />
                {page.distanceLabel}
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
                <Button
                  render={<TrackedLink href={siteConfig.phoneLink} eventName="click_call" />}
                  nativeButton={false}
                  size="lg"
                  className="h-12 gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <Phone className="size-5" />
                  Call Now
                </Button>
                <Button
                  render={<TrackedLink href={siteConfig.whatsappLink} eventName="click_whatsapp" target="_blank" rel="noopener noreferrer" />}
                  nativeButton={false}
                  size="lg"
                  variant="outline"
                  className="h-12 gap-2 border-primary-foreground/35 bg-primary/35 text-primary-foreground backdrop-blur hover:bg-primary-foreground/15 hover:text-primary-foreground"
                >
                  <MessageCircle className="size-5" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background py-14 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent sm:text-sm">Why Prince Deluxe PG</p>
                <h2 className="mt-2 text-balance font-heading text-2xl font-bold leading-tight text-primary sm:text-4xl">
                  {page.sectionTitle}
                </h2>
                <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
                  {page.sectionParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button render={<Link href={page.showRooms ? "#rooms" : "/boys-pg-shamshabad#rooms"} />} nativeButton={false} size="lg" className="h-12 gap-2">
                    <BedDouble className="size-5" />
                    View rooms and fees
                  </Button>
                  <Button
                    render={<TrackedLink href={siteConfig.googleMapsLink} eventName="click_google_maps" target="_blank" rel="noopener noreferrer" />}
                    nativeButton={false}
                    size="lg"
                    variant="outline"
                    className="h-12 gap-2"
                  >
                    <ExternalLink className="size-5" />
                    View location
                  </Button>
                </div>
              </div>

              <figure className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
                <Image
                  src={siteConfig.images.dining}
                  alt={`Dining and common area at ${siteConfig.name} in Shamshabad`}
                  width={720}
                  height={540}
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="aspect-[4/3] h-full w-full object-cover"
                />
                <figcaption className="border-t border-border px-4 py-3 text-sm font-semibold text-foreground">
                  Real dining and common area at the hostel
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {page.showRooms && <RoomsSection />}

        <section className="bg-secondary py-14 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent sm:text-sm">What residents get</p>
              <h2 className="mt-2 text-balance font-heading text-2xl font-bold text-primary sm:text-4xl">
                Rooms, food and essential facilities
              </h2>
            </div>
            <ul className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {essentialFacilities.map((facility) => (
                <li key={facility} className="flex min-h-24 items-start gap-2 rounded-xl border border-border bg-card p-4 text-sm font-semibold leading-6 text-foreground shadow-sm">
                  <CheckCircle2 className="mt-1 size-4 shrink-0 text-accent" />
                  {facility}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-background py-14 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {page.benefits.map((benefit, index) => {
                const Icon = benefitIcons[index]
                return (
                  <article key={benefit.title} className="border-t-2 border-accent pt-5">
                    <Icon className="size-6 text-primary" />
                    <h2 className="mt-4 font-heading text-lg font-bold text-primary">{benefit.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{benefit.description}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="bg-primary py-14 text-primary-foreground md:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Visit or enquire directly</p>
              <h2 className="mt-2 font-heading text-2xl font-bold sm:text-3xl">{siteConfig.name}</h2>
              <address className="mt-3 max-w-xl not-italic text-sm leading-7 text-primary-foreground/75 sm:text-base">
                {siteConfig.address.line1}, {siteConfig.address.line2}, {siteConfig.address.line3}, {siteConfig.address.country}
              </address>
              <p className="mt-2 text-sm text-primary-foreground/75">Phone and WhatsApp: {siteConfig.phoneDisplay}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button
                render={<TrackedLink href={siteConfig.googleMapsLink} eventName="click_google_maps" target="_blank" rel="noopener noreferrer" />}
                nativeButton={false}
                size="lg"
                className="h-12 gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <MapPin className="size-5" />
                Directions
              </Button>
              <Button
                render={<TrackedLink href={siteConfig.whatsappLink} eventName="click_whatsapp" target="_blank" rel="noopener noreferrer" />}
                nativeButton={false}
                size="lg"
                variant="outline"
                className="h-12 gap-2 border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground"
              >
                <MessageCircle className="size-5" />
                Enquire
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-background py-14 md:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent sm:text-sm">Frequently asked questions</p>
            <h2 className="mt-2 text-balance font-heading text-2xl font-bold text-primary sm:text-4xl">Plan your stay</h2>
            <div className="mt-8 space-y-3">
              {page.faqs.map((faq) => (
                <details key={faq.question} className="group rounded-xl border border-border bg-card px-4 shadow-sm open:border-accent/40 sm:px-5">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 font-heading text-sm font-semibold text-foreground marker:content-none sm:text-base">
                    {faq.question}
                    <span className="text-xl text-accent transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="border-t border-border pb-5 pt-4 text-sm leading-7 text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-secondary py-14 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-bold text-primary">Explore nearby accommodation guides</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {relatedPages.map((related) => (
                <Link
                  key={related.slug}
                  href={`/${related.slug}`}
                  className="group flex min-h-28 items-center justify-between gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-accent">{related.eyebrow}</p>
                    <h3 className="mt-2 font-heading text-lg font-bold text-primary">{related.title}</h3>
                  </div>
                  <ArrowRight className="size-5 shrink-0 text-accent transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <FloatingActions />
    </>
  )
}
