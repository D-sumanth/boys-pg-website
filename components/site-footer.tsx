import Link from "next/link"
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import { TrackedLink } from "@/components/tracked-link"
import { siteConfig } from "@/lib/site-config"

export function SiteFooter() {
  return (
    <footer className="bg-primary pb-20 text-primary-foreground md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <p className="font-heading text-xl font-bold">{siteConfig.name}</p>
          <p className="mt-2 text-sm text-primary-foreground/70">
            {siteConfig.businessType} in {siteConfig.location}
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/70">
            {siteConfig.positioning} {siteConfig.pricingTeaser}.
            Transport support is available at reasonable prices.
          </p>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-accent">
            Address
          </h3>
          <div className="mt-3 flex items-start gap-2 text-sm text-primary-foreground/70">
            <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
            <address className="not-italic leading-relaxed">
              {siteConfig.address.line1},<br />
              {siteConfig.address.line2},<br />
              {siteConfig.address.line3},<br />
              {siteConfig.address.country}
              {siteConfig.address.landmark && (
                <>
                  <br />
                  <span className="text-primary-foreground/60">{siteConfig.address.landmark}</span>
                </>
              )}
            </address>
          </div>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-accent">
            Explore
          </h3>
          <nav className="mt-3 flex flex-col gap-3 text-sm" aria-label="Local accommodation guides">
            <Link href="/boys-pg-shamshabad" className="text-primary-foreground/80 hover:text-accent">
              Boys &amp; Men&apos;s PG in Shamshabad
            </Link>
            <Link href="/hostel-near-hyderabad-airport" className="text-primary-foreground/80 hover:text-accent">
              PG near Hyderabad Airport
            </Link>
            <Link href="/hostel-near-gmr-school-of-aviation" className="text-primary-foreground/80 hover:text-accent">
              Hostel near GMR Aviation
            </Link>
          </nav>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-accent">
            Contact
          </h3>
          <div className="mt-3 flex flex-col gap-3 text-sm">
            <TrackedLink href={siteConfig.phoneLink} eventName="click_call" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-accent">
              <Phone className="size-4 text-accent" />
              {siteConfig.phoneDisplay}
            </TrackedLink>
            <TrackedLink href={siteConfig.whatsappLink} eventName="click_whatsapp" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-accent">
              <MessageCircle className="size-4 text-accent" />
              WhatsApp Enquiry
            </TrackedLink>
            <a href={siteConfig.emailLink} className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-accent">
              <Mail className="size-4 text-accent" />
              {siteConfig.email}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-primary-foreground/60 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
