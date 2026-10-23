'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2, ShoppingCart, Trash2 } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { formatINR, MAX_QTY_PER_ITEM } from '@/lib/format'
import { useCart } from './cart-provider'
import { QuantityStepper } from './quantity-stepper'
import { EnquiryForm } from './enquiry-form'

export function CartView() {
  const { items, subtotal, mrpTotal, setQuantity, removeItem, clear } = useCart()
  const [confirmation, setConfirmation] = useState<{ reference: string; total: number } | null>(null)

  if (confirmation) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <CheckCircle2 className="mx-auto size-14 text-accent" aria-hidden="true" />
        <h1 className="mt-4 text-2xl font-bold text-primary">Quote request received</h1>
        <p className="mt-2 text-muted-foreground">
          {`Your reference number is `}
          <span className="font-mono font-semibold text-foreground">{confirmation.reference}</span>
          {`. Our sales team will email a GST quotation for ${formatINR(confirmation.total)} (excl. GST) shortly.`}
        </p>
        <Link href="/brands" className={buttonVariants({ className: 'mt-6' })}>
          Continue shopping
        </Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <ShoppingCart className="mx-auto size-12 text-muted-foreground" aria-hidden="true" />
        <h1 className="mt-4 text-2xl font-bold text-primary">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Add UPS systems, batteries or stabilizers to request a quotation.</p>
        <Link href="/brands?brandoem=APC&brandcategory=UPS" className={buttonVariants({ className: 'mt-6' })}>
          Shop APC UPS
        </Link>
      </div>
    )
  }

  const gst = subtotal * 0.18

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight text-primary md:text-3xl">Your Cart</h1>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_24rem]">
        <section aria-label="Cart items" className="flex flex-col gap-4">
          <ul className="divide-y divide-border rounded-lg border border-border bg-card">
            {items.map((item) => (
              <li key={item.sku} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                <div className="relative size-20 shrink-0 rounded-md bg-muted">
                  <Image src={item.image} alt="" fill sizes="80px" className="object-contain p-1" />
                </div>
                <div className="min-w-0 flex-1">
                  <Link href={`/product/${item.slug}`} className="line-clamp-2 text-sm font-medium hover:text-primary">
                    {item.name}
                  </Link>
                  <p className="mt-0.5 font-mono text-xs text-muted-foreground">{item.sku}</p>
                  <p className="mt-1 text-sm">
                    <span className="font-semibold text-primary">{formatINR(item.price)}</span>
                    <span className="ml-2 text-xs text-muted-foreground line-through">{formatINR(item.mrp)}</span>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <QuantityStepper
                    value={item.quantity}
                    onChange={(q) => setQuantity(item.sku, q)}
                    max={MAX_QTY_PER_ITEM}
                    label={`Quantity for ${item.sku}`}
                  />
                  <p className="w-28 text-right text-sm font-semibold tabular-nums">{formatINR(item.price * item.quantity)}</p>
                  <button
                    type="button"
                    onClick={() => removeItem(item.sku)}
                    className="rounded p-2 text-muted-foreground hover:bg-muted hover:text-destructive"
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                    <span className="sr-only">{`Remove ${item.sku}`}</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between">
            <Link href="/brands" className="text-sm font-medium text-primary hover:underline">
              Continue shopping
            </Link>
            <button type="button" onClick={clear} className="text-sm text-muted-foreground hover:text-destructive">
              Clear cart
            </button>
          </div>
        </section>

        <aside className="flex flex-col gap-6">
          <section aria-labelledby="summary-heading" className="rounded-lg border border-border bg-card p-5">
            <h2 id="summary-heading" className="font-semibold">Order Summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">MRP total</dt><dd className="tabular-nums line-through">{formatINR(mrpTotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Discount</dt><dd className="font-medium tabular-nums text-accent">{`- ${formatINR(mrpTotal - subtotal)}`}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="tabular-nums">{formatINR(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">GST (18%)</dt><dd className="tabular-nums">{formatINR(gst)}</dd></div>
              <div className="flex justify-between border-t border-border pt-3 text-base font-bold"><dt>Total</dt><dd className="tabular-nums text-primary">{formatINR(subtotal + gst)}</dd></div>
            </dl>
          </section>
          <EnquiryForm
            items={items.map((i) => ({ sku: i.sku, quantity: i.quantity }))}
            onSuccess={(result) => {
              clear()
              setConfirmation(result)
            }}
          />
        </aside>
      </div>
    </div>
  )
}
