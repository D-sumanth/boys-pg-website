"use client"

import Link from "next/link"
import { useState } from "react"
import { Mail, MessageCircle, Menu, Phone, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TrackedLink } from "@/components/tracked-link"
import { siteConfig } from "@/lib/site-config"

const navLinks = [
  { label: "Fees", href: "/#rooms" },
  { label: "Food", href: "/#food" },
  { label: "Photos", href: "/#gallery" },
  { label: "Facilities", href: "/#facilities" },
  { label: "PG Guide", href: "/#local-guides" },
  { label: "FAQ", href: "/#faq" },
  { label: "Location", href: "/#location" },
  { label: "Contact", href: "/#contact" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-h-11 flex-col justify-center leading-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <span className="font-heading text-lg font-bold text-primary sm:text-xl">
            {siteConfig.shortName}
          </span>
          <span className="text-[11px] font-medium uppercase tracking-wide text-accent">
            for Boys
          </span>
        </Link>

        <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-1 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button render={<TrackedLink href={siteConfig.phoneLink} eventName="click_call" />} nativeButton={false} variant="outline" size="sm" className="gap-2">
            <Phone className="size-4" />
            Call Now
          </Button>
          <Button
            render={<TrackedLink href={siteConfig.whatsappLink} eventName="click_whatsapp" target="_blank" rel="noopener noreferrer" />}
            nativeButton={false}
            size="sm"
            className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <MessageCircle className="size-4" />
            WhatsApp
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary xl:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-site-menu"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div id="mobile-site-menu" className="border-t border-border bg-background shadow-lg xl:hidden">
          <nav className="flex flex-col px-4 py-3" aria-label="Mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground/80 hover:bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-3 gap-2">
              <Button render={<TrackedLink href={siteConfig.phoneLink} eventName="click_call" />} nativeButton={false} variant="outline" size="sm" className="h-11 gap-2">
                <Phone className="size-4" />
                Call
              </Button>
              <Button
                render={<TrackedLink href={siteConfig.whatsappLink} eventName="click_whatsapp" target="_blank" rel="noopener noreferrer" />}
                nativeButton={false}
                size="sm"
                className="h-11 gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <MessageCircle className="size-4" />
                WhatsApp
              </Button>
              <Button render={<a href={siteConfig.emailLink} />} nativeButton={false} variant="outline" size="sm" className="h-11 gap-2">
                <Mail className="size-4" />
                Email
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
