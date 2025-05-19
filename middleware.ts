import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verify } from "jsonwebtoken"

// Paths that don't require authentication
const publicPaths = ["/", "/login", "/signup", "/about", "/contact", "/privacy", "/terms"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path is public
  if (publicPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    return NextResponse.next()
  }

  // Check for auth token
  const token = request.cookies.get("auth_token")?.value

  if (!token) {
    // Redirect to login if no token
    const url = new URL("/login", request.url)
    url.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(url)
  }

  try {
    // Verify token
    verify(token, process.env.NEXTAUTH_SECRET || "your-fallback-secret")
    return NextResponse.next()
  } catch (error) {
    // Token is invalid, redirect to login
    const url = new URL("/login", request.url)
    url.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes that handle their own authentication
     */
    "/((?!_next/static|_next/image|favicon.ico|public|api).*)",
  ],
}
