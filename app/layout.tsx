import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Poppins, Inter } from "next/font/google"
import Script from "next/script"
import { siteConfig } from "@/lib/site-config"
import "./globals.css"

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
})
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const viewport: Viewport = {
  themeColor: "#17315f",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  keywords: [...siteConfig.seo.keywords],
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    type: "website",
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
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
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
