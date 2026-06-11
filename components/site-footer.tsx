import { Phone, MapPin } from "lucide-react"
import {
  PHONE_DISPLAY,
  PHONE_TEL,
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  ADDRESS_LINE_3,
  ADDRESS_LANDMARK,
} from "@/lib/site-config"

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="font-heading text-xl font-bold">Prince Deluxe PG for Boys</p>
          <p className="mt-2 text-sm text-primary-foreground/70">
            Boys PG Hostel in Shamshabad
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/70">
            Safe, clean and homely PG accommodation for students and working
            professionals near GMR Aviation College, Shamshabad.
          </p>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-accent">
            Address
          </h3>
          <div className="mt-3 flex items-start gap-2 text-sm text-primary-foreground/70">
            <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
            <address className="not-italic leading-relaxed">
              {ADDRESS_LINE_1},<br />
              {ADDRESS_LINE_2},<br />
              {ADDRESS_LINE_3}
              <br />
              <span className="text-primary-foreground/60">{ADDRESS_LANDMARK}</span>
            </address>
          </div>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-accent">
            Contact
          </h3>
          <a
            href={`tel:${PHONE_TEL}`}
            className="mt-3 inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-accent"
          >
            <Phone className="size-4 text-accent" />
            {PHONE_DISPLAY}
          </a>
          <p className="mt-3 text-sm font-medium text-accent">Opening from 1st July</p>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-primary-foreground/60 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Prince Deluxe PG for Boys. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
