import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { HighlightsSection } from "@/components/highlights-section"
import { AboutSection } from "@/components/about-section"
import { RoomsSection } from "@/components/rooms-section"
import { AudienceSection } from "@/components/audience-section"
import { FacilitiesSection } from "@/components/facilities-section"
import { NearbySection } from "@/components/nearby-section"
import { GallerySection } from "@/components/gallery-section"
import { WhyChooseSection } from "@/components/why-choose-section"
import { FaqSection } from "@/components/faq-section"
import { LocationSection } from "@/components/location-section"
import { ContactSection } from "@/components/contact-section"
import { SiteFooter } from "@/components/site-footer"
import { FloatingActions } from "@/components/floating-actions"

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <HighlightsSection />
        <AboutSection />
        <RoomsSection />
        <AudienceSection />
        <FacilitiesSection />
        <NearbySection />
        <GallerySection />
        <WhyChooseSection />
        <FaqSection />
        <LocationSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <FloatingActions />
    </>
  )
}
