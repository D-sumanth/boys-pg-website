import { Phone, MessageCircle } from "lucide-react"
import { PHONE_TEL, WHATSAPP_LINK } from "@/lib/site-config"

export function FloatingActions() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 md:hidden">
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="inline-flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform active:scale-95"
      >
        <MessageCircle className="size-6" />
      </a>
      <a
        href={`tel:${PHONE_TEL}`}
        aria-label="Call now"
        className="inline-flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform active:scale-95"
      >
        <Phone className="size-6" />
      </a>
    </div>
  )
}
