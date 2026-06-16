import { MessageCircle, Phone } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

export function FloatingActions() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-4 py-3 shadow-[0_-12px_30px_rgba(15,23,42,0.12)] backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
        <a
          href={siteConfig.phoneLink}
          aria-label="Call now"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-lg transition-transform active:scale-95"
        >
          <Phone className="size-5" />
          Call Now
        </a>
        <a
          href={siteConfig.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-accent-foreground shadow-lg transition-transform active:scale-95"
        >
          <MessageCircle className="size-5" />
          WhatsApp
        </a>
      </div>
    </div>
  )
}
