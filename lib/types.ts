export type Product = {
  sku: string
  slug: string
  name: string
  brand: string
  category: string
  type: string
  mrp: number
  price: number
  discount: number
  image: string
  specs: Record<string, string>
}

export type ProductQuery = {
  brand?: string
  category?: string
  q?: string
  sort?: 'price-asc' | 'price-desc' | 'discount'
  page?: number
}

export type ProductQueryResult = {
  items: Product[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export type FilterOption = { value: string; count: number }

export type CartItem = {
  sku: string
  slug: string
  name: string
  image: string
  price: number
  mrp: number
  quantity: number
}
