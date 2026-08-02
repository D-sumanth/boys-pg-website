import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import Script from "next/script"
import { absoluteSiteUrl, siteConfig } from "@/lib/site-config"
import "./globals.css"

export const viewport: Viewport = {
  themeColor: "#17315f",
  width: "device-width",
  initialScale: 1,
}

const isPreviewDeployment = Boolean(
  process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production",
)

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  keywords: [...siteConfig.seo.keywords],
  robots: isPreviewDeployment
    ? {
        index: false,
        follow: false,
      }
    : undefined,
  alternates: {
    canonical: absoluteSiteUrl("/"),
  },
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    type: "website",
    url: absoluteSiteUrl("/"),
    siteName: siteConfig.name,
    images: [
      {
        url: absoluteSiteUrl(siteConfig.images.hero),
        width: 941,
        height: 1672,
        alt: `${siteConfig.name} entrance in Shamshabad`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [absoluteSiteUrl(siteConfig.images.hero)],
  },
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-RGY6GRM9ZY" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RGY6GRM9ZY');
          `}
        </Script>
      </head>
      <body className="overflow-x-hidden bg-background font-sans antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
