import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BadgeCheck, ChevronRight, FileText, Truck } from 'lucide-react'
import { getProductBySlug, getRelatedProducts, products } from '@/lib/catalog'
import { catalogHref, formatINR } from '@/lib/format'
import { ProductCard } from '@/components/product-card'
import { ProductPurchase } from '@/components/product-purchase'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug((await params).slug)
  if (!product) return { title: 'Product not found' }
  return {
    title: `${product.name} (${product.sku})`,
    description: `Buy ${product.name} at ${formatINR(product.price)} — ${product.discount}% off MRP. GST invoice and pan-India delivery.`,
  }
}

export default async function ProductPage({ params }: Props) {
  const product = getProductBySlug((await params).slug)
  if (!product) notFound()
  const related = getRelatedProducts(product)
  const savings = product.mrp - product.price

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          <li><Link href="/" className="hover:text-primary">Home</Link></li>
          <li aria-hidden="true"><ChevronRight className="size-3.5" /></li>
          <li><Link href={catalogHref({ brand: product.brand })} className="hover:text-primary">{product.brand}</Link></li>
          <li aria-hidden="true"><ChevronRight className="size-3.5" /></li>
          <li>
            <Link href={catalogHref({ brand: product.brand, category: product.category })} className="hover:text-primary">
              {product.category}
            </Link>
          </li>
          <li aria-hidden="true"><ChevronRight className="size-3.5" /></li>
          <li className="font-mono text-foreground" aria-current="page">{product.sku}</li>
        </ol>
      </nav>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-card">
          {product.discount >= 30 && (
            <span className="absolute left-4 top-4 z-10 rounded bg-accent px-2.5 py-1 text-sm font-semibold text-accent-foreground">
              {`Sale ${product.discount}% Off`}
            </span>
          )}
          <Image src={product.image} alt={product.name} fill priority sizes="(min-width: 768px) 45vw, 95vw" className="object-contain p-8" />
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <p className="text-sm font-medium text-accent">{`${product.brand} · ${product.type}`}</p>
            <h1 className="mt-1 text-pretty text-2xl font-bold leading-snug text-primary md:text-3xl">{product.name}</h1>
            <p className="mt-2 font-mono text-sm text-muted-foreground">{`SKU: ${product.sku}`}</p>
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-3xl font-bold text-primary">{formatINR(product.price)}</span>
              <span className="text-muted-foreground line-through">{formatINR(product.mrp)}</span>
              <span className="rounded bg-accent/10 px-2 py-0.5 text-sm font-semibold text-accent">
                {`${product.discount}% off`}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {`You save ${formatINR(savings)}. Price exclusive of GST.`}
            </p>
          </div>

          <ProductPurchase product={product} />

          <ul className="grid gap-3 text-sm sm:grid-cols-3">
            <li className="flex items-center gap-2"><BadgeCheck className="size-4 text-accent" aria-hidden="true" />OEM warranty</li>
            <li className="flex items-center gap-2"><FileText className="size-4 text-accent" aria-hidden="true" />GST invoice</li>
            <li className="flex items-center gap-2"><Truck className="size-4 text-accent" aria-hidden="true" />Pan-India delivery</li>
          </ul>

          <section aria-labelledby="specs-heading">
            <h2 id="specs-heading" className="mb-2 text-lg font-semibold">Specifications</h2>
            <dl className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-card text-sm">
              {[['Brand', product.brand], ['Category', product.category], ['Type', product.type], ...Object.entries(product.specs)].map(
                ([label, value]) => (
                  <div key={label} className="grid grid-cols-[10rem_1fr] gap-4 px-4 py-2.5">
                    <dt className="text-muted-foreground">{label}</dt>
                    <dd className="font-medium">{value}</dd>
                  </div>
                ),
              )}
            </dl>
          </section>
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="mt-14">
          <h2 id="related-heading" className="text-xl font-bold text-primary">Related Products</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
