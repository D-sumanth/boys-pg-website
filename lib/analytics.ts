import type { AnalyticsEventName } from "@/lib/site-config"

declare global {
  interface Window {
    gtag?: (command: "event", eventName: AnalyticsEventName) => void
  }
}

export function trackAnalyticsEvent(eventName: AnalyticsEventName) {
  if (typeof window !== "undefined") {
    window.gtag?.("event", eventName)
  }
}
