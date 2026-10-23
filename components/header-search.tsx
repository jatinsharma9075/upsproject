'use client'

import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

export function HeaderSearch() {
  const router = useRouter()

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const q = String(new FormData(event.currentTarget).get('q') ?? '').trim()
    router.push(q ? `/brands?q=${encodeURIComponent(q)}` : '/brands')
  }

  return (
    <form role="search" onSubmit={onSubmit} className="relative mx-auto w-full max-w-xl">
      <label htmlFor="site-search" className="sr-only">
        Search products
      </label>
      <input
        id="site-search"
        name="q"
        type="search"
        placeholder="Search by model, SKU or brand (e.g. SRV3KL-IN)"
        className="h-10 w-full rounded-md border border-input bg-background pl-3 pr-11 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
      />
      <button
        type="submit"
        className="absolute inset-y-1 right-1 flex w-9 items-center justify-center rounded bg-primary text-primary-foreground hover:bg-primary/90"
      >
        <Search className="size-4" aria-hidden="true" />
        <span className="sr-only">Search</span>
      </button>
    </form>
  )
}
