import { NextResponse, type NextRequest } from 'next/server'
import { getFilters } from '@/lib/catalog'

export function GET(request: NextRequest) {
  const brand = request.nextUrl.searchParams.get('brandoem') ?? undefined
  return NextResponse.json(getFilters(brand))
}
