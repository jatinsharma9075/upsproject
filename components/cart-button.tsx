'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useCart } from './cart-provider'

export function CartButton() {
  const { count } = useCart()
  return (
    <Link
      href="/cart"
      className="relative flex shrink-0 items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-foreground hover:text-primary"
    >
      <ShoppingCart className="size-5" aria-hidden="true" />
      <span className="hidden sm:inline">Cart</span>
      <span className="sr-only">{`, ${count} items`}</span>
      {count > 0 && (
        <span
          aria-hidden="true"
          className="absolute -top-0.5 left-5 flex min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-semibold text-accent-foreground"
        >
          {count}
        </span>
      )}
    </Link>
  )
}
