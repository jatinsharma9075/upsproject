'use client'

import { useEffect, useState } from 'react'
import { Check, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Product } from '@/lib/types'
import { useCart } from './cart-provider'

type Props = {
  product: Product
  quantity?: number
  size?: 'sm' | 'default' | 'lg'
  className?: string
}

export function AddToCartButton({ product, quantity = 1, size = 'default', className }: Props) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (!added) return
    const timer = setTimeout(() => setAdded(false), 1500)
    return () => clearTimeout(timer)
  }, [added])

  return (
    <Button
      type="button"
      size={size}
      className={className}
      onClick={() => {
        addItem(
          { sku: product.sku, slug: product.slug, name: product.name, image: product.image, price: product.price, mrp: product.mrp },
          quantity,
        )
        setAdded(true)
      }}
    >
      {added ? <Check aria-hidden="true" /> : <ShoppingCart aria-hidden="true" />}
      {added ? 'Added' : 'Add to Cart'}
    </Button>
  )
}
