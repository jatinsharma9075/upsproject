'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

type Props = { page: number; totalPages: number; onChange: (page: number) => void }

export function CatalogPagination({ page, totalPages, onChange }: Props) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const base =
    'flex size-9 items-center justify-center rounded-md border border-border text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-40'

  return (
    <nav aria-label="Pagination" className="mt-8 flex items-center justify-center gap-1.5">
      <button type="button" className={`${base} bg-card hover:bg-muted`} disabled={page <= 1} onClick={() => onChange(page - 1)}>
        <ChevronLeft className="size-4" aria-hidden="true" />
        <span className="sr-only">Previous page</span>
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          aria-current={p === page ? 'page' : undefined}
          onClick={() => onChange(p)}
          className={`${base} ${p === page ? 'border-primary bg-primary text-primary-foreground' : 'bg-card hover:bg-muted'}`}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        className={`${base} bg-card hover:bg-muted`}
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
      >
        <ChevronRight className="size-4" aria-hidden="true" />
        <span className="sr-only">Next page</span>
      </button>
    </nav>
  )
}
