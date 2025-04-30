import { type NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/cal') {
    return NextResponse.redirect('https://calendly.com/gaboesquivel/30min', {
      status: 301,
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/cal'],
}
