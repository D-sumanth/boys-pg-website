"use client"

import type React from "react"
import { useState } from "react"
import { CalendarDays, Check, Mail, MapPin, MessageCircle, Phone, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { siteConfig } from "@/lib/site-config"

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="bg-background py-16 pb-28 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            Contact
          </span>
          <h2 className="mt-2 text-balance font-heading text-3xl font-bold text-primary sm:text-4xl">
            Book your room or ask a question
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Contact {siteConfig.ownerName} directly for room availability,
            pricing and visit details.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          <div className="flex flex-col gap-4 lg:col-span-2">
            <div className="rounded-3xl border border-border bg-secondary p-5 shadow-lg">
              <div className="grid gap-3">
                <Button render={<a href={siteConfig.phoneLink} />} nativeButton={false} size="lg" className="h-12 gap-2">
                  <Phone className="size-5" />
                  Call {siteConfig.phoneDisplay}
                </Button>
                <Button render={<a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer" />} nativeButton={false} size="lg" className="h-12 gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
                  <MessageCircle className="size-5" />
                  WhatsApp Enquiry
                </Button>
                <Button render={<a href={siteConfig.emailLink} />} nativeButton={false} size="lg" variant="outline" className="h-12 gap-2 bg-card">
                  <Mail className="size-5" />
                  Email Us
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-3xl border border-border bg-card p-6 shadow-sm">
              <User className="mt-0.5 size-5 shrink-0 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Contact person</p>
                <p className="font-heading font-semibold text-foreground">{siteConfig.ownerName}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-3xl border border-border bg-card p-6 shadow-sm">
              <MapPin className="mt-0.5 size-5 shrink-0 text-accent" />
              <address className="not-italic leading-relaxed text-muted-foreground">
                {siteConfig.address.line1},<br />
                {siteConfig.address.line2},<br />
                {siteConfig.address.line3}
                {siteConfig.address.landmark && (
                  <>
                    <br />
                    <span className="font-medium text-accent">{siteConfig.address.landmark}</span>
                  </>
                )}
              </address>
            </div>

            <div className="flex items-center gap-3 rounded-3xl border border-border bg-card p-6 shadow-sm">
              <CalendarDays className="size-5 shrink-0 text-accent" />
              <p className="font-medium text-foreground">Opening from {siteConfig.openingDate}</p>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-xl sm:p-8 lg:col-span-3">
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center gap-3 py-10 text-center">
                <span className="inline-flex size-14 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Check className="size-7" />
                </span>
                <h3 className="font-heading text-xl font-semibold text-foreground">
                  Thank you for your enquiry!
                </h3>
                <p className="max-w-sm text-sm text-muted-foreground">
                  Your details are saved on this page for now. For the quickest
                  response, please call or message on WhatsApp directly.
                </p>
                <Button variant="outline" className="mt-2" onClick={() => setSubmitted(false)}>
                  Submit another enquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" placeholder="Your full name" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="Your phone number" required />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="type">I am a</Label>
                    <select
                      id="type"
                      name="type"
                      defaultValue=""
                      required
                      className="h-11 rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      <option value="student">Student</option>
                      <option value="working">Working Professional</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="room">Preferred Room Type</Label>
                    <select
                      id="room"
                      name="room"
                      defaultValue="4-sharing"
                      required
                      className="h-11 rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    >
                      {siteConfig.roomCategories.map((room) => (
                        <option key={room.name} value={room.shortName}>
                          {room.shortName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="ac-option">Room Option</Label>
                    <select
                      id="ac-option"
                      name="ac-option"
                      defaultValue="non-ac"
                      required
                      className="h-11 rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    >
                      <option value="non-ac">Non-AC</option>
                      <option value="ac-option">AC Option</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your requirement or preferred move-in date"
                  />
                </div>

                <Button type="submit" size="lg" className="mt-1 h-12 w-full">
                  Send Enquiry
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
