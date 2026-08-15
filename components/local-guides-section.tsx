import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { localSearchPages } from "@/lib/local-search-pages"

export function LocalGuidesSection() {
  return (
    <section id="local-guides" className="scroll-mt-16 bg-background py-14 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent sm:text-sm">Shamshabad accommodation guides</p>
          <h2 className="mt-2 text-balance font-heading text-2xl font-bold leading-tight text-primary sm:text-4xl">
            Find the right boys or men&apos;s PG in Shamshabad
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
            Explore practical location information for students, airport staff and working professionals before arranging a visit.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {localSearchPages.map((page) => (
            <article key={page.slug} className="overflow-hidden rounded-2xl border border-border bg-card shadow-md">
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                <Image
                  src={page.heroImage}
                  alt={page.heroAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-accent">{page.eyebrow}</p>
                <h3 className="mt-2 font-heading text-xl font-bold leading-snug text-primary">{page.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{page.intro}</p>
                <Link
                  href={`/${page.slug}`}
                  className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg font-semibold text-primary hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  Read location guide
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
