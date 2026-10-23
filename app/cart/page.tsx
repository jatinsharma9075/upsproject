import type { Metadata } from 'next'
import { CartView } from '@/components/cart-view'

export const metadata: Metadata = {
  title: 'Cart & Request a Quote',
  description: 'Review your selected UPS, batteries and stabilizers and request a GST quotation.',
}

export default function CartPage() {
  return <CartView />
}
