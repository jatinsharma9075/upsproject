import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BadgeCheck, FileText, Headset, Truck } from 'lucide-react'
import { BRAND_INFO, getFilters, getTopDeals } from '@/lib/catalog'
import { catalogHref } from '@/lib/format'
import { ProductCard } from '@/components/product-card'
import { buttonVariants } from '@/components/ui/button'

const CATEGORIES = [
  { name: 'UPS', label: 'UPS Systems', image: '/products/online-ups.png', blurb: 'Line interactive, on-line, rack & industrial' },
  { name: 'Batteries', label: 'Batteries', image: '/products/battery.png', blurb: 'SMF, VRLA & tubular batteries' },
  { name: 'Stabilizers', label: 'Stabilizers', image: '/products/stabilizer.png', blurb: 'Servo & mainline voltage stabilizers' },
]

const PERKS = [
  { icon: BadgeCheck, title: 'Genuine Products', text: 'Sourced directly with full OEM warranty' },
  { icon: FileText, title: 'GST Invoice', text: 'Claim input tax credit on every order' },
  { icon: Truck, title: 'Pan-India Delivery', text: 'Fast, insured shipping to your site' },
  { icon: Headset, title: 'Expert Support', text: 'Sizing help, installation & AMC' },
]

export default function HomePage() {
  const { brands } = getFilters()
  const deals = getTopDeals(8)

  return (
    <>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-16">
          <div className="flex flex-col gap-5">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">Power protection, simplified</p>
            <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              UPS, batteries &amp; stabilizers at the best B2B prices
            </h1>
            <p className="max-w-lg text-pretty leading-relaxed text-primary-foreground/80">
              Shop APC by Schneider Electric, Numeric, Microtek, Exide and more. Save up to 50% off MRP with GST
              invoicing and nationwide delivery.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/brands?brandoem=APC&brandcategory=UPS"
                className={buttonVariants({ size: 'lg', className: 'bg-accent text-accent-foreground hover:bg-accent/90' })}
              >
                Shop APC UPS
                <ArrowRight aria-hidden="true" />
              </Link>
              <Link
                href="/brands"
                className={buttonVariants({
                  size: 'lg',
                  variant: 'outline',
                  className: 'border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground',
                })}
              >
                Browse all products
              </Link>
            </div>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-md rounded-2xl bg-card p-6">
            <Image
              src="/products/industrial-ups.png"
              alt="Industrial three-phase on-line UPS"
              fill
              priority
              sizes="(min-width: 768px) 28rem, 90vw"
              className="object-contain p-6"
            />
          </div>
        </div>
      </section>

      <section aria-label="Why buy from us" className="border-b border-border bg-card">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-6 lg:grid-cols-4">
          {PERKS.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-start gap-3">
              <Icon className="mt-0.5 size-6 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-xs text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="brands-heading" className="mx-auto max-w-7xl px-4 pt-12">
        <h2 id="brands-heading" className="text-2xl font-bold tracking-tight text-primary">
          Shop by Brand
        </h2>
        <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {brands.map((b) => (
            <li key={b.value}>
              <Link
                href={catalogHref({ brand: b.value })}
                className="flex h-full flex-col items-center justify-center rounded-lg border border-border bg-card px-3 py-5 text-center transition-colors hover:border-primary"
              >
                <span className="text-lg font-bold text-primary">{b.value}</span>
                <span className="mt-0.5 text-xs text-muted-foreground">{BRAND_INFO[b.value]}</span>
                <span className="mt-2 text-xs font-medium text-accent">{`${b.count} products`}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="categories-heading" className="mx-auto max-w-7xl px-4 pt-12">
        <h2 id="categories-heading" className="text-2xl font-bold tracking-tight text-primary">
          Shop by Category
        </h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-3">
          {CATEGORIES.map((c) => (
            <li key={c.name}>
              <Link
                href={catalogHref({ category: c.name })}
                className="group flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary"
              >
                <div className="relative size-24 shrink-0">
                  <Image src={c.image} alt="" fill sizes="96px" className="object-contain" />
                </div>
                <div>
                  <p className="font-semibold text-foreground group-hover:text-primary">{c.label}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{c.blurb}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Shop now <ArrowRight className="size-3.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="deals-heading" className="mx-auto max-w-7xl px-4 pt-12">
        <div className="flex items-end justify-between gap-4">
          <h2 id="deals-heading" className="text-2xl font-bold tracking-tight text-primary">
            Top Deals
          </h2>
          <Link href="/brands?sort=discount" className="text-sm font-medium text-primary hover:underline">
            View all deals
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {deals.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </>
  )
}
