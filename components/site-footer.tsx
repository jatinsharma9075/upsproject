import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer id="contact" className="mt-16 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-bold">JDM Technologies</p>
          <p className="mt-3 text-sm leading-relaxed text-primary-foreground/75">
            Authorised channel partner for UPS systems, batteries and power protection products for homes, offices,
            data centres and industry.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider">Shop</p>
          <ul className="mt-3 space-y-2 text-sm text-primary-foreground/75">
            <li><Link href="/brands?brandoem=APC&brandcategory=UPS" className="hover:text-primary-foreground">APC UPS</Link></li>
            <li><Link href="/brands?brandcategory=UPS" className="hover:text-primary-foreground">All UPS Systems</Link></li>
            <li><Link href="/brands?brandcategory=Batteries" className="hover:text-primary-foreground">SMF Batteries</Link></li>
            <li><Link href="/brands?brandcategory=Stabilizers" className="hover:text-primary-foreground">Voltage Stabilizers</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider">Support</p>
          <ul className="mt-3 space-y-2 text-sm text-primary-foreground/75">
            <li><Link href="/cart" className="hover:text-primary-foreground">Request a Quote</Link></li>
            <li>Bulk &amp; Corporate Orders</li>
            <li>Installation &amp; AMC</li>
            <li>Warranty Claims</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider">Contact</p>
          <ul className="mt-3 space-y-3 text-sm text-primary-foreground/75">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>Nehru Place, New Delhi 110019, India</span>
            </li>
            <li>
              <a href="tel:+919999999999" className="flex gap-2 hover:text-primary-foreground">
                <Phone className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                +91 99999 99999
              </a>
            </li>
            <li>
              <a href="mailto:sales@jdmtechnologies.in" className="flex gap-2 hover:text-primary-foreground">
                <Mail className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                sales@jdmtechnologies.in
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <p className="mx-auto max-w-7xl px-4 py-4 text-xs text-primary-foreground/60">
          {`© ${new Date().getFullYear()} JDM Technologies. All brand names and trademarks belong to their respective owners.`}
        </p>
      </div>
    </footer>
  )
}
