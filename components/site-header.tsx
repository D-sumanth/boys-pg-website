"use client"

import { useState } from "react"
import { Mail, MessageCircle, Menu, Phone, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site-config"

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Rooms", href: "#rooms" },
  { label: "Facilities", href: "#facilities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Location", href: "#location" },
  { label: "Contact", href: "#contact" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex flex-col leading-tight">
          <span className="font-heading text-lg font-bold text-primary sm:text-xl">
            {siteConfig.shortName}
          </span>
          <span className="text-[11px] font-medium uppercase tracking-wide text-accent">
            for Boys
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button render={<a href={siteConfig.phoneLink} />} nativeButton={false} variant="outline" size="sm" className="gap-2">
            <Phone className="size-4" />
            Call Now
          </Button>
          <Button
            render={<a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer" />}
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
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="flex flex-col px-4 py-3" aria-label="Mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm font-medium text-foreground/80 hover:bg-secondary hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 grid grid-cols-3 gap-2">
              <Button render={<a href={siteConfig.phoneLink} />} nativeButton={false} variant="outline" size="sm" className="gap-2">
                <Phone className="size-4" />
                Call
              </Button>
              <Button
                render={<a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer" />}
                nativeButton={false}
                size="sm"
                className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <MessageCircle className="size-4" />
                WhatsApp
              </Button>
              <Button render={<a href={siteConfig.emailLink} />} nativeButton={false} variant="outline" size="sm" className="gap-2">
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
