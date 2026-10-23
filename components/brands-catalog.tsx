'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import { ChevronRight, Loader2, X } from 'lucide-react'
import type { FilterOption, ProductQuery, ProductQueryResult } from '@/lib/types'
import { ProductCard } from './product-card'
import { CatalogFilters } from './catalog-filters'
import { CatalogPagination } from './catalog-pagination'

type Filters = { brands: FilterOption[]; categories: FilterOption[] }

type Props = {
  initialQuery: ProductQuery
  initialResult: ProductQueryResult
  initialFilters: Filters
}

const fetcher = async <T,>(url: string): Promise<T> => {
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to load products')
  return res.json()
}

const PARAM_KEYS = ['brandoem', 'brandcategory', 'q', 'sort', 'page'] as const

function toQueryString(params: URLSearchParams) {
  const clean = new URLSearchParams()
  for (const key of PARAM_KEYS) {
    const value = params.get(key)
    if (value) clean.set(key, value)
  }
  return clean.toString()
}

function initialQueryString(query: ProductQuery) {
  const params = new URLSearchParams()
  if (query.brand) params.set('brandoem', query.brand)
  if (query.category) params.set('brandcategory', query.category)
  if (query.q) params.set('q', query.q)
  if (query.sort) params.set('sort', query.sort)
  if (query.page && query.page > 1) params.set('page', String(query.page))
  return toQueryString(params)
}

export function BrandsCatalog({ initialQuery, initialResult, initialFilters }: Props) {
  const searchParams = useSearchParams()
  const qs = toQueryString(searchParams)
  const isInitial = qs === initialQueryString(initialQuery)

  const brand = searchParams.get('brandoem') ?? undefined
  const category = searchParams.get('brandcategory') ?? undefined
  const q = searchParams.get('q') ?? undefined
  const sort = searchParams.get('sort') ?? ''

  const { data, error, isLoading, isValidating } = useSWR<ProductQueryResult>(`/api/products?${qs}`, fetcher, {
    fallbackData: isInitial ? initialResult : undefined,
    keepPreviousData: true,
    revalidateOnFocus: false,
  })

  const { data: filters } = useSWR<Filters>(`/api/filters?brandoem=${encodeURIComponent(brand ?? '')}`, fetcher, {
    fallbackData: brand === initialQuery.brand ? initialFilters : undefined,
    keepPreviousData: true,
    revalidateOnFocus: false,
  })

  function updateParams(updates: Record<string, string | undefined>) {
    const next = new URLSearchParams(searchParams.toString())
    for (const [key, value] of Object.entries(updates)) {
      if (value) next.set(key, value)
      else next.delete(key)
    }
    if (!('page' in updates)) next.delete('page')
    const nextQs = toQueryString(next)
    window.history.pushState(null, '', nextQs ? `/brands?${nextQs}` : '/brands')
    if ('page' in updates) window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const heading = [brand, category].filter(Boolean).join(' ') || 'All Products'

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          <li><Link href="/" className="hover:text-primary">Home</Link></li>
          <li aria-hidden="true"><ChevronRight className="size-3.5" /></li>
          <li><Link href="/brands" className="hover:text-primary">Brands</Link></li>
          {brand && (
            <>
              <li aria-hidden="true"><ChevronRight className="size-3.5" /></li>
              <li className={category ? '' : 'text-foreground'}>{brand}</li>
            </>
          )}
          {category && (
            <>
              <li aria-hidden="true"><ChevronRight className="size-3.5" /></li>
              <li className="text-foreground" aria-current="page">{category}</li>
            </>
          )}
        </ol>
      </nav>

      <div className="mb-6 flex flex-col gap-1">
        <h1 className="text-balance text-2xl font-bold tracking-tight text-primary md:text-3xl">{heading}</h1>
        <p className="text-sm text-muted-foreground">
          Genuine products with OEM warranty, GST invoice and fast delivery across India.
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <CatalogFilters
          brands={filters?.brands ?? initialFilters.brands}
          categories={filters?.categories ?? initialFilters.categories}
          brand={brand}
          category={category}
          q={q}
          onChange={updateParams}
        />

        <section aria-labelledby="results-heading" className="min-w-0 flex-1">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3">
            <div className="flex flex-wrap items-center gap-2">
              <h2 id="results-heading" className="text-sm text-muted-foreground" aria-live="polite">
                {data ? (
                  <>
                    <span className="font-semibold text-foreground">{data.total}</span>
                    {data.total === 1 ? ' product found' : ' products found'}
                  </>
                ) : (
                  'Loading products…'
                )}
              </h2>
              {isValidating && <Loader2 className="size-4 animate-spin text-muted-foreground" aria-hidden="true" />}
              {q && (
                <button
                  type="button"
                  onClick={() => updateParams({ q: undefined })}
                  className="flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground hover:bg-secondary/70"
                >
                  {`"${q}"`}
                  <X className="size-3" aria-hidden="true" />
                  <span className="sr-only">Clear search</span>
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm text-muted-foreground">
                Sort by
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => updateParams({ sort: e.target.value || undefined })}
                className="h-9 rounded-md border border-input bg-background px-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Relevance</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="discount">Biggest Discount</option>
              </select>
            </div>
          </div>

          {error && (
            <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
              We couldn&apos;t load products right now. Please try again.
            </p>
          )}

          {!data && isLoading && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-96 animate-pulse rounded-lg border border-border bg-muted" />
              ))}
            </div>
          )}

          {data && data.items.length === 0 && (
            <div className="rounded-lg border border-dashed border-border bg-card p-10 text-center">
              <p className="font-medium">No products match these filters.</p>
              <Link href="/brands" className="mt-2 inline-block text-sm font-medium text-primary underline">
                View all products
              </Link>
            </div>
          )}

          {data && data.items.length > 0 && (
            <div
              className={`grid grid-cols-1 gap-4 transition-opacity sm:grid-cols-2 xl:grid-cols-3 ${isValidating ? 'opacity-60' : ''}`}
            >
              {data.items.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          )}

          {data && data.totalPages > 1 && (
            <CatalogPagination
              page={data.page}
              totalPages={data.totalPages}
              onChange={(page) => updateParams({ page: page > 1 ? String(page) : undefined })}
            />
          )}
        </section>
      </div>
    </div>
  )
}
