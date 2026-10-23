const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
})

export function formatINR(value: number) {
  return inr.format(value)
}

export function catalogHref(params: { brand?: string; category?: string; q?: string }) {
  const search = new URLSearchParams()
  if (params.brand) search.set('brandoem', params.brand)
  if (params.category) search.set('brandcategory', params.category)
  if (params.q) search.set('q', params.q)
  const qs = search.toString()
  return qs ? `/brands?${qs}` : '/brands'
}

export const MAX_QTY_PER_ITEM = 50
