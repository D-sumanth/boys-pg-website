import { Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

export function SiteFooter() {
  return (
    <footer className="bg-primary pb-20 text-primary-foreground md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="font-heading text-xl font-bold">{siteConfig.name}</p>
          <p className="mt-2 text-sm text-primary-foreground/70">
            {siteConfig.businessType} in {siteConfig.location}
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/70">
            {siteConfig.positioning} Suitable for students and working
            professionals.
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
              {siteConfig.address.line3}
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
            Contact
          </h3>
          <div className="mt-3 flex flex-col gap-3 text-sm">
            <a href={siteConfig.phoneLink} className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-accent">
              <Phone className="size-4 text-accent" />
              {siteConfig.phoneDisplay}
            </a>
            <a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-accent">
              <MessageCircle className="size-4 text-accent" />
              WhatsApp Enquiry
            </a>
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
