import { MapPin, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  GOOGLE_MAPS_LINK,
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  ADDRESS_LINE_3,
  ADDRESS_LANDMARK,
} from "@/lib/site-config"

export function LocationSection() {
  return (
    <section id="location" className="bg-secondary py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            Location
          </span>
          <h2 className="mt-2 text-balance font-heading text-2xl font-bold text-primary sm:text-3xl">
            Easy to find in Shamshabad
          </h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col justify-center gap-5 rounded-2xl border border-border bg-card p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <MapPin className="size-6" />
              </span>
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  Our Address
                </h3>
                <address className="mt-1 not-italic leading-relaxed text-muted-foreground">
                  {ADDRESS_LINE_1},<br />
                  {ADDRESS_LINE_2},<br />
                  {ADDRESS_LINE_3}
                </address>
                <p className="mt-2 text-sm font-medium text-accent">{ADDRESS_LANDMARK}</p>
              </div>
            </div>
            <Button
              render={<a href={GOOGLE_MAPS_LINK} target="_blank" rel="noopener noreferrer" />}
              nativeButton={false}
              size="lg"
              className="gap-2 self-start"
            >
              <ExternalLink className="size-5" />
              Open in Google Maps
            </Button>
          </div>

          {/* Replace this placeholder with your Google Maps embed iframe later */}
          <div className="flex min-h-[260px] items-center justify-center rounded-2xl border border-dashed border-border bg-muted text-center">
            <div className="flex flex-col items-center gap-2 px-6 py-10 text-muted-foreground">
              <MapPin className="size-8 text-accent" />
              <p className="font-medium text-foreground">Google Maps embed</p>
              <p className="max-w-xs text-sm">
                Paste your Google Maps embed iframe here to show the exact location.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
