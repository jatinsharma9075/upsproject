import 'server-only'
import type { Product, ProductQuery, ProductQueryResult, FilterOption } from './types'

type Seed = Omit<Product, 'slug' | 'discount'>

const IMG = {
  lineInteractive: '/products/line-interactive.png',
  smart: '/products/smart-ups.png',
  online: '/products/online-ups.png',
  rack: '/products/rack-ups.png',
  industrial: '/products/industrial-ups.png',
  battery: '/products/battery.png',
  stabilizer: '/products/stabilizer.png',
}

const seeds: Seed[] = [
  {
    sku: 'SRC1KUXI',
    name: 'APC - Schneider Electric Make 1 KVA 1:1 Phase On-Line UPS',
    brand: 'APC',
    category: 'UPS',
    type: 'On-Line UPS',
    mrp: 32214,
    price: 19824,
    image: IMG.online,
    specs: { Capacity: '1 KVA / 800 W', Phase: '1:1', Topology: 'Double Conversion On-Line', 'Backup Time': '8 min at half load', Warranty: '2 Years' },
  },
  {
    sku: 'BE700Y-IND',
    name: 'APC - Schneider Electric Make 700 VA Line Interactive UPS',
    brand: 'APC',
    category: 'UPS',
    type: 'Line Interactive UPS',
    mrp: 9982.8,
    price: 6726,
    image: IMG.lineInteractive,
    specs: { Capacity: '700 VA / 405 W', Topology: 'Line Interactive', Outlets: '6 Indian', 'Backup Time': '10 min at half load', Warranty: '2 Years' },
  },
  {
    sku: 'BX1100C-IN',
    name: 'APC - Schneider Electric Make 1100 VA Line Interactive UPS',
    brand: 'APC',
    category: 'UPS',
    type: 'Line Interactive UPS',
    mrp: 11204.1,
    price: 7552,
    image: IMG.lineInteractive,
    specs: { Capacity: '1100 VA / 660 W', Topology: 'Line Interactive', Outlets: '4 Indian', AVR: 'Yes', Warranty: '2 Years' },
  },
  {
    sku: 'BR1000G-IN',
    name: 'APC - Schneider Electric Make 1000 VA Line Interactive UPS',
    brand: 'APC',
    category: 'UPS',
    type: 'Line Interactive UPS',
    mrp: 20237,
    price: 13452,
    image: IMG.lineInteractive,
    specs: { Capacity: '1000 VA / 600 W', Topology: 'Line Interactive', Display: 'LCD', 'USB Port': 'Yes', Warranty: '2 Years' },
  },
  {
    sku: 'BX1000UXI',
    name: 'APC - Schneider Electric Make 1000 VA Line Interactive UPS',
    brand: 'APC',
    category: 'UPS',
    type: 'Line Interactive UPS',
    mrp: 12602.4,
    price: 7670,
    image: IMG.lineInteractive,
    specs: { Capacity: '1000 VA / 600 W', Topology: 'Line Interactive', Outlets: '4 Universal', AVR: 'Yes', Warranty: '2 Years' },
  },
  {
    sku: 'BX2000UXI',
    name: 'APC - Schneider Electric Make 2 KVA Line Interactive UPS',
    brand: 'APC',
    category: 'UPS',
    type: 'Line Interactive UPS',
    mrp: 16638,
    price: 11328,
    image: IMG.lineInteractive,
    specs: { Capacity: '2000 VA / 1200 W', Topology: 'Line Interactive', Outlets: '4 Universal', AVR: 'Yes', Warranty: '2 Years' },
  },
  {
    sku: 'SUA1000I-IN',
    name: 'APC - Schneider Electric Make 1000 VA LI Smart UPS',
    brand: 'APC',
    category: 'UPS',
    type: 'Smart UPS',
    mrp: 37878,
    price: 26786,
    image: IMG.smart,
    specs: { Capacity: '1000 VA / 670 W', Topology: 'Line Interactive', Waveform: 'Pure Sine Wave', Display: 'LCD', Warranty: '2 Years' },
  },
  {
    sku: 'SUA1500I-IN',
    name: 'APC - Schneider Electric Make 1500 VA 1:1 Phase LI Smart UPS',
    brand: 'APC',
    category: 'UPS',
    type: 'Smart UPS',
    mrp: 42362,
    price: 30090,
    image: IMG.smart,
    specs: { Capacity: '1500 VA / 980 W', Phase: '1:1', Waveform: 'Pure Sine Wave', Display: 'LCD', Warranty: '2 Years' },
  },
  {
    sku: 'SUA1000UXI',
    name: 'APC - Schneider Electric Make 1000 VA 1:1 Phase LI Smart UPS',
    brand: 'APC',
    category: 'UPS',
    type: 'Smart UPS',
    mrp: 30916,
    price: 21830,
    image: IMG.smart,
    specs: { Capacity: '1000 VA / 670 W', Phase: '1:1', Waveform: 'Pure Sine Wave', Outlets: '8 IEC C13', Warranty: '2 Years' },
  },
  {
    sku: 'SUA1000UXI-IN',
    name: 'APC - Schneider Electric Make 1000 VA LI Smart UPS',
    brand: 'APC',
    category: 'UPS',
    type: 'Smart UPS',
    mrp: 30847.56,
    price: 21831.18,
    image: IMG.smart,
    specs: { Capacity: '1000 VA / 670 W', Topology: 'Line Interactive', Waveform: 'Pure Sine Wave', Display: 'LCD', Warranty: '2 Years' },
  },
  {
    sku: 'SUA3000UXI',
    name: 'APC - Schneider Electric Make 3000 VA 1:1 Phase LI Smart UPS',
    brand: 'APC',
    category: 'UPS',
    type: 'Smart UPS',
    mrp: 72688,
    price: 51448,
    image: IMG.smart,
    specs: { Capacity: '3000 VA / 2700 W', Phase: '1:1', Waveform: 'Pure Sine Wave', Display: 'LCD', Warranty: '2 Years' },
  },
  {
    sku: 'E3SUPS15KH',
    name: 'Schneider Electric (APC) Make 15 KVA 3:3 Phase Industrial Easy On-Line UPS',
    brand: 'APC',
    category: 'UPS',
    type: 'Industrial UPS',
    mrp: 418900,
    price: 247210,
    image: IMG.industrial,
    specs: { Capacity: '15 KVA / 15 KW', Phase: '3:3', Topology: 'Double Conversion On-Line', Batteries: 'External', Warranty: '1 Year' },
  },
  {
    sku: 'SRV2KL-IN',
    name: 'APC - Schneider Electric Make 2 KVA 1:1 Phase Rack Mountable On-Line UPS (Internal Batteries)',
    brand: 'APC',
    category: 'UPS',
    type: 'Rack Mount UPS',
    mrp: 66198,
    price: 45312,
    image: IMG.rack,
    specs: { Capacity: '2 KVA / 1800 W', Phase: '1:1', 'Form Factor': '2U Rack / Tower', Batteries: 'Internal', Warranty: '2 Years' },
  },
  {
    sku: 'SRV3KL-IN',
    name: 'APC - Schneider Electric Make 3 KVA 1:1 Phase Rack Mountable On-Line UPS (Internal Batteries)',
    brand: 'APC',
    category: 'UPS',
    type: 'Rack Mount UPS',
    mrp: 73514,
    price: 48616,
    image: IMG.rack,
    specs: { Capacity: '3 KVA / 2700 W', Phase: '1:1', 'Form Factor': '2U Rack / Tower', Batteries: 'Internal', Warranty: '2 Years' },
  },
  {
    sku: 'SRV6KRIL-IN',
    name: 'APC - Schneider Electric Make 6 KVA Rack Mountable On-Line UPS with External Batteries Pack',
    brand: 'APC',
    category: 'UPS',
    type: 'Rack Mount UPS',
    mrp: 173342,
    price: 107380,
    image: IMG.rack,
    specs: { Capacity: '6 KVA / 6 KW', Phase: '1:1', 'Form Factor': '4U Rack', Batteries: 'External Pack Included', Warranty: '2 Years' },
  },
  {
    sku: 'E3SUPS30KH',
    name: 'Schneider Electric (APC) Make 30 KVA 3:3 Phase Industrial Easy On Line UPS',
    brand: 'APC',
    category: 'UPS',
    type: 'Industrial UPS',
    mrp: 567462,
    price: 353410,
    image: IMG.industrial,
    specs: { Capacity: '30 KVA / 30 KW', Phase: '3:3', Topology: 'Double Conversion On-Line', Batteries: 'External', Warranty: '1 Year' },
  },
  {
    sku: 'E3SUPS15K3I',
    name: 'APC Make 15 KVA 3:1 Phase Industrial Easy On-Line UPS',
    brand: 'APC',
    category: 'UPS',
    type: 'Industrial UPS',
    mrp: 507400,
    price: 237770,
    image: IMG.industrial,
    specs: { Capacity: '15 KVA / 15 KW', Phase: '3:1', Topology: 'Double Conversion On-Line', Batteries: 'External', Warranty: '1 Year' },
  },
  {
    sku: 'E3MUPS80KHS',
    name: 'Schneider Electric (APC) Make 80 KVA 3:3 Phase Industrial Easy On Line UPS',
    brand: 'APC',
    category: 'UPS',
    type: 'Industrial UPS',
    mrp: 985772,
    price: 702100,
    image: IMG.industrial,
    specs: { Capacity: '80 KVA / 80 KW', Phase: '3:3', Topology: 'Double Conversion On-Line', Batteries: 'External', Warranty: '1 Year' },
  },
  {
    sku: 'E3MUPS100KHS',
    name: 'Schneider Electric (APC) Make 100 KVA 3:3 Phase Industrial Easy On Line UPS',
    brand: 'APC',
    category: 'UPS',
    type: 'Industrial UPS',
    mrp: 1076278,
    price: 755200,
    image: IMG.industrial,
    specs: { Capacity: '100 KVA / 100 KW', Phase: '3:3', Topology: 'Double Conversion On-Line', Batteries: 'External', Warranty: '1 Year' },
  },
  {
    sku: 'E3MUPS120KHS',
    name: 'Schneider Electric Make 120 KVA 3:3 Phase Industrial Easy On Line UPS',
    brand: 'APC',
    category: 'UPS',
    type: 'Industrial UPS',
    mrp: 1207907,
    price: 814200,
    image: IMG.industrial,
    specs: { Capacity: '120 KVA / 120 KW', Phase: '3:3', Topology: 'Double Conversion On-Line', Batteries: 'External', Warranty: '1 Year' },
  },
  {
    sku: 'APCRBC123',
    name: 'APC - Schneider Electric Make Replacement Battery Cartridge #123',
    brand: 'APC',
    category: 'Batteries',
    type: 'Replacement Battery',
    mrp: 14500,
    price: 10150,
    image: IMG.battery,
    specs: { Voltage: '12 V', Chemistry: 'Sealed Lead Acid', Compatibility: 'Smart-UPS 750/1000 RM', Warranty: '1 Year' },
  },
  {
    sku: 'NUM-DIGI-1000',
    name: 'Numeric Make 1 KVA Digital Line Interactive UPS',
    brand: 'Numeric',
    category: 'UPS',
    type: 'Line Interactive UPS',
    mrp: 8900,
    price: 5980,
    image: IMG.lineInteractive,
    specs: { Capacity: '1000 VA / 600 W', Topology: 'Line Interactive', Display: 'LED', Warranty: '2 Years' },
  },
  {
    sku: 'NUM-KEOR-6K',
    name: 'Numeric Make 6 KVA 1:1 Phase Keor On-Line UPS',
    brand: 'Numeric',
    category: 'UPS',
    type: 'On-Line UPS',
    mrp: 128400,
    price: 84750,
    image: IMG.online,
    specs: { Capacity: '6 KVA / 6 KW', Phase: '1:1', Topology: 'Double Conversion On-Line', Batteries: 'External', Warranty: '2 Years' },
  },
  {
    sku: 'NUM-3KVA-RT',
    name: 'Numeric Make 3 KVA Rack / Tower On-Line UPS',
    brand: 'Numeric',
    category: 'UPS',
    type: 'Rack Mount UPS',
    mrp: 58200,
    price: 41340,
    image: IMG.rack,
    specs: { Capacity: '3 KVA / 2700 W', Phase: '1:1', 'Form Factor': '2U Rack / Tower', Batteries: 'Internal', Warranty: '2 Years' },
  },
  {
    sku: 'MTK-LEGEND-1K',
    name: 'Microtek Make Legend 1 KVA On-Line UPS',
    brand: 'Microtek',
    category: 'UPS',
    type: 'On-Line UPS',
    mrp: 26500,
    price: 17220,
    image: IMG.online,
    specs: { Capacity: '1 KVA / 900 W', Phase: '1:1', Topology: 'Double Conversion On-Line', Warranty: '2 Years' },
  },
  {
    sku: 'MTK-SEBZ-1100',
    name: 'Microtek Make 1100 VA Line Interactive UPS',
    brand: 'Microtek',
    category: 'UPS',
    type: 'Line Interactive UPS',
    mrp: 6990,
    price: 4560,
    image: IMG.lineInteractive,
    specs: { Capacity: '1100 VA / 660 W', Topology: 'Line Interactive', Outlets: '3 Indian', Warranty: '2 Years' },
  },
  {
    sku: 'MTK-SMF-12V26',
    name: 'Microtek Make 12V 26Ah SMF VRLA Battery',
    brand: 'Microtek',
    category: 'Batteries',
    type: 'SMF Battery',
    mrp: 8400,
    price: 5880,
    image: IMG.battery,
    specs: { Voltage: '12 V', Capacity: '26 Ah', Chemistry: 'Sealed Maintenance Free VRLA', Warranty: '2 Years' },
  },
  {
    sku: 'EXD-12V42',
    name: 'Exide Make Powersafe Plus 12V 42Ah SMF Battery',
    brand: 'Exide',
    category: 'Batteries',
    type: 'SMF Battery',
    mrp: 12850,
    price: 8740,
    image: IMG.battery,
    specs: { Voltage: '12 V', Capacity: '42 Ah', Chemistry: 'Sealed Maintenance Free VRLA', Warranty: '2 Years' },
  },
  {
    sku: 'EXD-12V65',
    name: 'Exide Make Powersafe Plus 12V 65Ah SMF Battery',
    brand: 'Exide',
    category: 'Batteries',
    type: 'SMF Battery',
    mrp: 18900,
    price: 12950,
    image: IMG.battery,
    specs: { Voltage: '12 V', Capacity: '65 Ah', Chemistry: 'Sealed Maintenance Free VRLA', Warranty: '2 Years' },
  },
  {
    sku: 'EXD-12V100',
    name: 'Exide Make Powersafe Plus 12V 100Ah SMF Battery',
    brand: 'Exide',
    category: 'Batteries',
    type: 'SMF Battery',
    mrp: 27400,
    price: 19120,
    image: IMG.battery,
    specs: { Voltage: '12 V', Capacity: '100 Ah', Chemistry: 'Sealed Maintenance Free VRLA', Warranty: '2 Years' },
  },
  {
    sku: 'AMR-12V7',
    name: 'Amaron Quanta Make 12V 7Ah SMF Battery',
    brand: 'Amaron',
    category: 'Batteries',
    type: 'SMF Battery',
    mrp: 1850,
    price: 1290,
    image: IMG.battery,
    specs: { Voltage: '12 V', Capacity: '7 Ah', Chemistry: 'Sealed Maintenance Free VRLA', Warranty: '1 Year' },
  },
  {
    sku: 'AMR-12V150',
    name: 'Amaron Quanta Make 12V 150Ah SMF Battery',
    brand: 'Amaron',
    category: 'Batteries',
    type: 'SMF Battery',
    mrp: 39800,
    price: 27860,
    image: IMG.battery,
    specs: { Voltage: '12 V', Capacity: '150 Ah', Chemistry: 'Sealed Maintenance Free VRLA', Warranty: '2 Years' },
  },
  {
    sku: 'VG-VNS500',
    name: 'V-Guard Make 5 KVA Servo Voltage Stabilizer',
    brand: 'V-Guard',
    category: 'Stabilizers',
    type: 'Servo Stabilizer',
    mrp: 21500,
    price: 14620,
    image: IMG.stabilizer,
    specs: { Capacity: '5 KVA', 'Input Range': '170 - 270 V', Display: 'Digital', Warranty: '2 Years' },
  },
  {
    sku: 'VG-SVS10K',
    name: 'V-Guard Make 10 KVA Air Cooled Servo Voltage Stabilizer',
    brand: 'V-Guard',
    category: 'Stabilizers',
    type: 'Servo Stabilizer',
    mrp: 38900,
    price: 26840,
    image: IMG.stabilizer,
    specs: { Capacity: '10 KVA', 'Input Range': '140 - 280 V', Cooling: 'Air Cooled', Warranty: '2 Years' },
  },
  {
    sku: 'LUM-SVS3K',
    name: 'Luminous Make 3 KVA Mainline Voltage Stabilizer',
    brand: 'Luminous',
    category: 'Stabilizers',
    type: 'Mainline Stabilizer',
    mrp: 9800,
    price: 6370,
    image: IMG.stabilizer,
    specs: { Capacity: '3 KVA', 'Input Range': '130 - 290 V', Display: 'Digital', Warranty: '3 Years' },
  },
  {
    sku: 'LUM-SC18054',
    name: 'Luminous Make 12V 150Ah Tall Tubular Battery',
    brand: 'Luminous',
    category: 'Batteries',
    type: 'Tubular Battery',
    mrp: 22400,
    price: 15460,
    image: IMG.battery,
    specs: { Voltage: '12 V', Capacity: '150 Ah', Chemistry: 'Tall Tubular Lead Acid', Warranty: '3 Years' },
  },
]

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export const products: Product[] = seeds.map((seed) => ({
  ...seed,
  slug: slugify(seed.sku),
  discount: Math.round(((seed.mrp - seed.price) / seed.mrp) * 100),
}))

const bySlug = new Map(products.map((p) => [p.slug, p]))
const bySku = new Map(products.map((p) => [p.sku, p]))

export const BRAND_INFO: Record<string, string> = {
  APC: 'Schneider Electric',
  Numeric: 'Legrand Group',
  Microtek: 'Power Solutions',
  Exide: 'Industrial Batteries',
  Amaron: 'Amara Raja',
  'V-Guard': 'Voltage Protection',
  Luminous: 'Home & Industrial Power',
}

function countBy(list: Product[], key: 'brand' | 'category'): FilterOption[] {
  const counts = new Map<string, number>()
  for (const p of list) counts.set(p[key], (counts.get(p[key]) ?? 0) + 1)
  return [...counts.entries()].map(([value, count]) => ({ value, count })).sort((a, b) => b.count - a.count)
}

export function getFilters(brand?: string) {
  const scoped = brand ? products.filter((p) => p.brand === brand) : products
  return {
    brands: countBy(products, 'brand'),
    categories: countBy(scoped, 'category'),
  }
}

export const PAGE_SIZE = 12

export function queryProducts(query: ProductQuery): ProductQueryResult {
  const q = query.q?.trim().toLowerCase()
  let items = products.filter((p) => {
    if (query.brand && p.brand.toLowerCase() !== query.brand.toLowerCase()) return false
    if (query.category && p.category.toLowerCase() !== query.category.toLowerCase()) return false
    if (q && !`${p.name} ${p.sku} ${p.type} ${p.brand}`.toLowerCase().includes(q)) return false
    return true
  })

  switch (query.sort) {
    case 'price-asc':
      items = [...items].sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      items = [...items].sort((a, b) => b.price - a.price)
      break
    case 'discount':
      items = [...items].sort((a, b) => b.discount - a.discount)
      break
  }

  const total = items.length
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const page = Math.min(Math.max(1, query.page ?? 1), totalPages)
  return {
    items: items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    total,
    page,
    pageSize: PAGE_SIZE,
    totalPages,
  }
}

export function getProductBySlug(slug: string) {
  return bySlug.get(slug)
}

export function getProductBySku(sku: string) {
  return bySku.get(sku)
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .sort((a, b) => Number(b.brand === product.brand) - Number(a.brand === product.brand))
    .slice(0, limit)
}

export function getTopDeals(limit = 8) {
  return [...products].sort((a, b) => b.discount - a.discount).slice(0, limit)
}

export function parseQuery(params: Record<string, string | string[] | undefined>): ProductQuery {
  const get = (key: string) => {
    const value = params[key]
    return (Array.isArray(value) ? value[0] : value) || undefined
  }
  const sort = get('sort')
  return {
    brand: get('brandoem'),
    category: get('brandcategory'),
    q: get('q')?.slice(0, 100),
    sort: sort === 'price-asc' || sort === 'price-desc' || sort === 'discount' ? sort : undefined,
    page: Number(get('page')) || 1,
  }
}
