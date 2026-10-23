import { NextResponse } from 'next/server'
import { getProductBySku } from '@/lib/catalog'
import { MAX_QTY_PER_ITEM } from '@/lib/format'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+\d][\d\s-]{7,15}$/
const GSTIN_RE = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/

function clean(value: unknown, max = 200) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const name = clean(body.name, 100)
  const company = clean(body.company, 120)
  const email = clean(body.email, 120)
  const phone = clean(body.phone, 20)
  const gstin = clean(body.gstin, 15).toUpperCase()
  const message = clean(body.message, 1000)

  const errors: Record<string, string> = {}
  if (name.length < 2) errors.name = 'Please enter your name'
  if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email'
  if (!PHONE_RE.test(phone)) errors.phone = 'Please enter a valid phone number'
  if (gstin && !GSTIN_RE.test(gstin)) errors.gstin = 'GSTIN format looks incorrect'

  const rawItems = Array.isArray(body.items) ? body.items.slice(0, 100) : []
  const quantities = new Map<string, number>()
  for (const raw of rawItems) {
    if (!raw || typeof raw !== 'object') continue
    const { sku, quantity } = raw as { sku?: unknown; quantity?: unknown }
    if (typeof sku !== 'string' || !Number.isInteger(quantity) || (quantity as number) <= 0) {
      errors.items = 'One or more items are invalid'
      continue
    }
    quantities.set(sku, (quantities.get(sku) ?? 0) + (quantity as number))
  }

  const lines = []
  for (const [sku, quantity] of quantities) {
    const product = getProductBySku(sku)
    if (!product) {
      errors.items = `Unknown product: ${sku}`
      continue
    }
    if (quantity > MAX_QTY_PER_ITEM) {
      errors.items = `Maximum ${MAX_QTY_PER_ITEM} units per product for online enquiries`
      continue
    }
    lines.push({ sku, name: product.name, quantity, unitPrice: product.price, lineTotal: product.price * quantity })
  }
  if (lines.length === 0 && !errors.items) errors.items = 'Your cart is empty'

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: 'Validation failed', fields: errors }, { status: 422 })
  }

  const total = lines.reduce((sum, line) => sum + line.lineTotal, 0)
  const reference = `JDM-${Date.now().toString(36).toUpperCase()}`

  console.log('[enquiry] received', { reference, company: company || null, items: lines.length, total, hasMessage: Boolean(message) })

  return NextResponse.json({ reference, total, lines }, { status: 201 })
}
