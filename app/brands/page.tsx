import type { Metadata } from 'next'
import { getFilters, parseQuery, queryProducts } from '@/lib/catalog'
import { BrandsCatalog } from '@/components/brands-catalog'

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> }

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { brand, category } = parseQuery(await searchParams)
  const title = [brand, category].filter(Boolean).join(' ') || 'All Products'
  return {
    title: `${title} — Buy Online`,
    description: `Shop ${title} at the best prices with GST invoice and pan-India delivery from JDM Technologies.`,
  }
}

export default async function BrandsPage({ searchParams }: Props) {
  const query = parseQuery(await searchParams)
  return (
    <BrandsCatalog
      initialQuery={query}
      initialResult={queryProducts(query)}
      initialFilters={getFilters(query.brand)}
    />
  )
}
