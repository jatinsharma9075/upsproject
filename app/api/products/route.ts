import { NextResponse, type NextRequest } from 'next/server'
import { parseQuery, queryProducts } from '@/lib/catalog'

export function GET(request: NextRequest) {
  const params = Object.fromEntries(request.nextUrl.searchParams.entries())
  return NextResponse.json(queryProducts(parseQuery(params)))
}
