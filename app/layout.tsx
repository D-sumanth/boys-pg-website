import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Poppins, Inter } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
})
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const viewport: Viewport = {
  themeColor: '#27408b',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Prince Deluxe PG for Boys in Shamshabad | Hostel near GMR Aviation College',
  description:
    'Prince Deluxe PG for Boys — safe, clean and homely boys PG hostel in Shamshabad, Hyderabad. 3 & 4 sharing rooms with food, Wi-Fi, CCTV near GMR Aviation College and Shamshabad Airport. Opening 1st July.',
  keywords: [
    'boys PG in Shamshabad',
    'hostel near GMR Aviation College',
    'boys hostel in Shamshabad',
    'PG near Shamshabad Airport',
    'student hostel in Shamshabad',
    'PG for working professionals in Shamshabad',
  ],
  openGraph: {
    title: 'Prince Deluxe PG for Boys in Shamshabad',
    description:
      'Safe, clean and homely boys PG accommodation for students and working professionals near GMR Aviation College, Shamshabad. Opening 1st July.',
    type: 'website',
  },
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-background">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
