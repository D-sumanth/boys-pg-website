import type { MetadataRoute } from "next"
import { localSearchPages } from "@/lib/local-search-pages"
import { absoluteSiteUrl, siteConfig } from "@/lib/site-config"

export default function sitemap(): MetadataRoute.Sitemap {
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
    return []
  }

  // Update only after a meaningful public content change, not on every build.
  const lastModified = new Date("2026-09-07T00:00:00.000Z")

  return [
    {
      url: absoluteSiteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: [...new Set([
        siteConfig.images.hero,
        ...siteConfig.gallery.map((image) => image.src),
        ...siteConfig.foodGallery.map((image) => image.src),
      ])].map((image) => absoluteSiteUrl(image)),
    },
    ...localSearchPages.map((page, index) => ({
      url: absoluteSiteUrl(`/${page.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: index === 0 ? 0.9 : 0.8,
      images: [...new Set([page.heroImage, siteConfig.images.dining])].map((image) => absoluteSiteUrl(image)),
    })),
  ]
}
