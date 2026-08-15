import type { MetadataRoute } from "next"
import { localSearchPages } from "@/lib/local-search-pages"
import { absoluteSiteUrl } from "@/lib/site-config"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-15T00:00:00.000Z")

  return [
    {
      url: absoluteSiteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...localSearchPages.map((page, index) => ({
      url: absoluteSiteUrl(`/${page.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: index === 0 ? 0.9 : 0.8,
    })),
  ]
}
