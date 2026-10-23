import Link from 'next/link'
import { Mail, Phone, Zap } from 'lucide-react'
import { HeaderSearch } from './header-search'
import { CartButton } from './cart-button'

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/brands', label: 'All Products' },
  { href: '/brands?brandoem=APC&brandcategory=UPS', label: 'APC UPS' },
  { href: '/brands?brandcategory=UPS', label: 'UPS Systems' },
  { href: '/brands?brandcategory=Batteries', label: 'Batteries' },
  { href: '/brands?brandcategory=Stabilizers', label: 'Stabilizers' },
  { href: '/#contact', label: 'Contact' },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card">
      <div className="hidden bg-primary text-primary-foreground md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs">
          <p>GST invoice on every order · Pan-India delivery · Genuine OEM warranty</p>
          <div className="flex items-center gap-5">
            <a href="tel:+919999999999" className="flex items-center gap-1.5 hover:underline">
              <Phone className="size-3.5" aria-hidden="true" />
              +91 99999 99999
            </a>
            <a href="mailto:sales@jdmtechnologies.in" className="flex items-center gap-1.5 hover:underline">
              <Mail className="size-3.5" aria-hidden="true" />
              sales@jdmtechnologies.in
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="JDM Technologies home">
          <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Zap className="size-5" aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block text-base font-bold tracking-tight text-primary">JDM</span>
            <span className="block text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
              Technologies
            </span>
          </span>
        </Link>
        <HeaderSearch />
        <CartButton />
      </div>

      <nav aria-label="Main" className="border-t border-border">
        <ul className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 text-sm font-medium">
          {NAV.map((item) => (
            <li key={item.href} className="shrink-0">
              <Link
                href={item.href}
                className="block px-3 py-2.5 text-foreground/80 transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
