import type { MetadataRoute } from "next"
import { absoluteSiteUrl } from "@/lib/site-config"

export default function robots(): MetadataRoute.Robots {
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    }
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/admin/",
      },
    ],
    sitemap: absoluteSiteUrl("/sitemap.xml"),
  }
}
