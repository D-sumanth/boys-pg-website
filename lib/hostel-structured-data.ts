import { absoluteSiteUrl, siteConfig } from "@/lib/site-config"

export const hostelStructuredData = {
  "@context": "https://schema.org",
  "@type": "Hostel",
  "@id": `${absoluteSiteUrl("/")}#hostel`,
  name: siteConfig.name,
  url: absoluteSiteUrl("/"),
  telephone: siteConfig.phoneNumber,
  description: siteConfig.seo.description,
  image: Object.values(siteConfig.images).map((image) => absoluteSiteUrl(image)),
  hasMap: siteConfig.googleMapsLink,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.streetAddress,
    addressLocality: siteConfig.address.addressLocality,
    addressRegion: siteConfig.address.addressRegion,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.countryCode,
  },
  amenityFeature: siteConfig.facilities.map((facility) => ({
    "@type": "LocationFeatureSpecification",
    name: facility.label,
    value: true,
  })),
} as const

export const serializedHostelStructuredData = JSON.stringify(hostelStructuredData).replace(
  /</g,
  "\\u003c",
)
