"use client"

import type React from "react"
import { useState } from "react"
import { Phone, MessageCircle, MapPin, CalendarDays, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  PHONE_DISPLAY,
  PHONE_TEL,
  WHATSAPP_LINK,
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  ADDRESS_LINE_3,
} from "@/lib/site-config"

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="bg-background py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            Contact
          </span>
          <h2 className="mt-2 text-balance font-heading text-2xl font-bold text-primary sm:text-3xl">
            Book your room or ask a question
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            For quick response, please contact us directly on phone or WhatsApp.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          {/* Contact details */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            <div className="flex flex-col gap-3 rounded-2xl border border-border bg-secondary p-6">
              <Button render={<a href={`tel:${PHONE_TEL}`} />} nativeButton={false} size="lg" className="gap-2">
                <Phone className="size-5" />
                Call {PHONE_DISPLAY}
              </Button>
              <Button
                render={<a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" />}
                nativeButton={false}
                size="lg"
                className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <MessageCircle className="size-5" />
                Chat on WhatsApp
              </Button>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-6">
              <MapPin className="mt-0.5 size-5 shrink-0 text-accent" />
              <address className="not-italic leading-relaxed text-muted-foreground">
                {ADDRESS_LINE_1},<br />
                {ADDRESS_LINE_2},<br />
                {ADDRESS_LINE_3}
              </address>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-6">
              <CalendarDays className="size-5 shrink-0 text-accent" />
              <p className="font-medium text-foreground">Opening from 1st July</p>
            </div>
          </div>

          {/* Enquiry form */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 lg:col-span-3">
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center gap-3 py-10 text-center">
                <span className="inline-flex size-14 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Check className="size-7" />
                </span>
                <h3 className="font-heading text-xl font-semibold text-foreground">
                  Thank you for your enquiry!
                </h3>
                <p className="max-w-sm text-sm text-muted-foreground">
                  We&apos;ve received your details. For a quicker response, please
                  call or WhatsApp us directly.
                </p>
                <Button
                  variant="outline"
                  className="mt-2"
                  onClick={() => setSubmitted(false)}
                >
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
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Your phone number"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="type">I am a</Label>
                    <select
                      id="type"
                      name="type"
                      defaultValue=""
                      required
                      className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
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
                      defaultValue=""
                      required
                      className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    >
                      <option value="" disabled>
                        Select room type
                      </option>
                      <option value="3-sharing">3 Sharing — ₹8,000/month</option>
                      <option value="4-sharing">4 Sharing — ₹7,000/month</option>
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

                <Button type="submit" size="lg" className="mt-1 w-full">
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
