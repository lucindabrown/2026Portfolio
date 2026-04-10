import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const basicAuth = request.headers.get('authorization')

  if (basicAuth) {
    const [scheme, encoded] = basicAuth.split(' ')
    if (scheme === 'Basic' && encoded) {
      const decoded = atob(encoded)
      const [user, pass] = decoded.split(':')
      if (
        user === process.env.STUDIO_USERNAME &&
        pass === process.env.STUDIO_PASSWORD
      ) {
        return NextResponse.next()
      }
    }
  }

  return new NextResponse('Unauthorized', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
  })
}

export const config = {
  matcher: '/studio/:path*',
}
