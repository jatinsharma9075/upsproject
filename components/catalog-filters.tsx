'use client'

import { SlidersHorizontal } from 'lucide-react'
import type { FilterOption } from '@/lib/types'

type Props = {
  brands: FilterOption[]
  categories: FilterOption[]
  brand?: string
  category?: string
  q?: string
  onChange: (updates: Record<string, string | undefined>) => void
}

function FilterGroup({
  title,
  name,
  options,
  selected,
  onSelect,
}: {
  title: string
  name: string
  options: FilterOption[]
  selected?: string
  onSelect: (value: string | undefined) => void
}) {
  return (
    <fieldset className="border-b border-border pb-4 last:border-0">
      <legend className="mb-2 text-sm font-semibold text-foreground">{title}</legend>
      <div className="flex flex-col gap-0.5">
        <label className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-muted has-[:checked]:font-medium has-[:checked]:text-primary">
          <input
            type="radio"
            name={name}
            checked={!selected}
            onChange={() => onSelect(undefined)}
            className="accent-primary"
          />
          All
        </label>
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-muted has-[:checked]:font-medium has-[:checked]:text-primary"
          >
            <input
              type="radio"
              name={name}
              checked={selected?.toLowerCase() === opt.value.toLowerCase()}
              onChange={() => onSelect(opt.value)}
              className="accent-primary"
            />
            <span className="flex-1">{opt.value}</span>
            <span className="text-xs text-muted-foreground">{opt.count}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export function CatalogFilters({ brands, categories, brand, category, q, onChange }: Props) {
  function onSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = String(new FormData(event.currentTarget).get('q') ?? '').trim()
    onChange({ q: value || undefined })
  }

  const content = (
    <div className="flex flex-col gap-4">
      <form onSubmit={onSearch} className="border-b border-border pb-4" key={q ?? ''}>
        <label htmlFor="catalog-search" className="mb-2 block text-sm font-semibold">
          Search in results
        </label>
        <input
          id="catalog-search"
          name="q"
          type="search"
          defaultValue={q}
          placeholder="Model or SKU"
          className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </form>
      <FilterGroup
        title="Brand / OEM"
        name="brandoem"
        options={brands}
        selected={brand}
        onSelect={(value) => onChange({ brandoem: value, brandcategory: undefined })}
      />
      <FilterGroup
        title="Category"
        name="brandcategory"
        options={categories}
        selected={category}
        onSelect={(value) => onChange({ brandcategory: value })}
      />
    </div>
  )

  return (
    <aside className="w-full shrink-0 lg:w-64">
      <details className="group rounded-lg border border-border bg-card lg:hidden">
        <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-semibold">
          <SlidersHorizontal className="size-4" aria-hidden="true" />
          Filters
        </summary>
        <div className="border-t border-border p-4">{content}</div>
      </details>
      <div className="sticky top-36 hidden rounded-lg border border-border bg-card p-4 lg:block">{content}</div>
    </aside>
  )
}
