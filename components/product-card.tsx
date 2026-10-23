import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/lib/types'
import { formatINR } from '@/lib/format'
import { AddToCartButton } from './add-to-cart-button'

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-md">
      {product.discount >= 30 && (
        <span className="absolute left-3 top-3 z-10 rounded bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">
          {`Sale ${product.discount}% Off`}
        </span>
      )}
      <Link href={`/product/${product.slug}`} className="block bg-card p-4">
        <div className="relative aspect-square">
          <Image
            src={product.image || '/placeholder.svg'}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-2 border-t border-border p-4">
        <p className="font-mono text-xs text-muted-foreground">{product.sku}</p>
        <h3 className="line-clamp-2 text-sm font-medium leading-snug text-foreground">
          <Link href={`/product/${product.slug}`} className="hover:text-primary">
            {product.name}
          </Link>
        </h3>
        <div className="mt-auto flex flex-wrap items-baseline gap-x-2 pt-1">
          <span className="text-base font-bold text-primary">{formatINR(product.price)}</span>
          <span className="text-xs text-muted-foreground line-through">{formatINR(product.mrp)}</span>
          <span className="text-xs font-semibold text-accent">{`${product.discount}% off`}</span>
        </div>
        <AddToCartButton product={product} size="sm" className="mt-2 w-full" />
      </div>
    </article>
  )
}
