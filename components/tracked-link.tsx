"use client"

import { forwardRef, type ComponentPropsWithoutRef } from "react"
import { trackAnalyticsEvent } from "@/lib/analytics"
import type { AnalyticsEventName } from "@/lib/site-config"

type TrackedLinkProps = ComponentPropsWithoutRef<"a"> & {
  eventName: AnalyticsEventName
}

export const TrackedLink = forwardRef<HTMLAnchorElement, TrackedLinkProps>(
  function TrackedLink({ eventName, onClick, ...props }, ref) {
    return (
      <a
        ref={ref}
        {...props}
        onClick={(event) => {
          trackAnalyticsEvent(eventName)
          onClick?.(event)
        }}
      />
    )
  },
)
