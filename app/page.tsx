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
import { serializedHostelStructuredData } from "@/lib/hostel-structured-data"

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializedHostelStructuredData }}
      />
      <a
        href="#main-content"
        className="fixed left-3 top-3 z-[60] -translate-y-20 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-lg transition-transform focus:translate-y-0"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content">
        <HeroSection />
        <HighlightsSection />
        <AboutSection />
        <RoomsSection />
        <GallerySection />
        <FacilitiesSection />
        <AudienceSection />
        <NearbySection />
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
