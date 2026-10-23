'use client'

import { useState } from 'react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import type { Product } from '@/lib/types'
import { MAX_QTY_PER_ITEM } from '@/lib/format'
import { AddToCartButton } from './add-to-cart-button'
import { QuantityStepper } from './quantity-stepper'

export function ProductPurchase({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  return (
    <div className="flex flex-wrap items-center gap-3">
      <QuantityStepper value={quantity} onChange={setQuantity} max={MAX_QTY_PER_ITEM} label={`Quantity for ${product.sku}`} />
      <AddToCartButton product={product} quantity={quantity} size="lg" className="flex-1 sm:flex-none" />
      <Link href="/cart" className={buttonVariants({ size: 'lg', variant: 'outline' })}>
        View cart &amp; get quote
      </Link>
    </div>
  )
}
