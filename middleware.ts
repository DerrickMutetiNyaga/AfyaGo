import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if preview gate is enabled via environment variable
  // Default to enabled if not set (for safety)
  // Note: NEXT_PUBLIC_ prefix is required for Edge runtime (middleware)
  const isGateEnabled = process.env.NEXT_PUBLIC_PREVIEW_GATE_ENABLED !== 'false'

  // If gate is disabled, allow all requests through
  if (!isGateEnabled) {
    return NextResponse.next()
  }

  const { pathname } = request.nextUrl

  // Allow access to:
  // - The preview page itself
  // - Static assets (_next, api routes, public files)
  // - Service worker and manifest
  const allowedPaths = [
    '/preview',
    '/_next',
    '/api',
    '/manifest.webmanifest',
    '/sw.js',
    '/icons',
    '/icon-',
    '/apple-icon',
    '/favicon',
    '/_redirects',
  ]

  // Check if the path should be allowed
  const isAllowed = allowedPaths.some((path) => pathname.startsWith(path))

  // If accessing an allowed path, continue
  if (isAllowed) {
    return NextResponse.next()
  }

  // Redirect all other routes to the preview gate
  if (pathname !== '/preview') {
    return NextResponse.redirect(new URL('/preview', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}

