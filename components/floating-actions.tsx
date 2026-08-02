import { MessageCircle, Phone } from "lucide-react"
import { TrackedLink } from "@/components/tracked-link"
import { siteConfig } from "@/lib/site-config"

export function FloatingActions() {
  return (
    <nav aria-label="Quick contact" className="safe-bottom-bar fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/96 px-3 pt-2.5 shadow-[0_-12px_30px_rgba(15,23,42,0.14)] backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-2.5">
        <TrackedLink
          href={siteConfig.phoneLink}
          eventName="click_call"
          aria-label="Call now"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground shadow-md transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <Phone className="size-5" />
          Call Now
        </TrackedLink>
        <TrackedLink
          href={siteConfig.whatsappLink}
          eventName="click_whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-accent px-4 text-sm font-bold text-accent-foreground shadow-md transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          <MessageCircle className="size-5" />
          WhatsApp
        </TrackedLink>
      </div>
    </nav>
  )
}
