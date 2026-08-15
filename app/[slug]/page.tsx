import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { LocalSearchPage } from "@/components/local-search-page"
import { getLocalSearchPage, localSearchPages } from "@/lib/local-search-pages"
import { absoluteSiteUrl, siteConfig } from "@/lib/site-config"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return localSearchPages.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = getLocalSearchPage(slug)

  if (!page) {
    return {}
  }

  const pageUrl = absoluteSiteUrl(`/${page.slug}`)
  const imageUrl = absoluteSiteUrl(page.heroImage)

  return {
    title: page.seoTitle,
    description: page.description,
    keywords: [
      page.eyebrow,
      "mens PG in Shamshabad",
      "boys PG in Shamshabad",
      "boys hostel in Shamshabad",
      siteConfig.name,
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: page.seoTitle,
      description: page.description,
      type: "website",
      url: pageUrl,
      siteName: siteConfig.name,
      images: [{ url: imageUrl, alt: page.heroAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.seoTitle,
      description: page.description,
      images: [imageUrl],
    },
  }
}

export default async function LocalPage({ params }: PageProps) {
  const { slug } = await params
  const page = getLocalSearchPage(slug)

  if (!page) {
    notFound()
  }

  return <LocalSearchPage page={page} />
}
