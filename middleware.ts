import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Paths that are accessible to the public
  const publicPaths = ["/", "/login", "/signup", "/forgot-password", "/reset-password", "/api/auth"]
  const isPublicPath = publicPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))

  // Check if the path is for API routes that don't need authentication
  const isPublicApiPath = pathname.startsWith("/api/public")

  // Check if the path is for static files
  const isStaticFile =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/fonts")

  if (isPublicPath || isPublicApiPath || isStaticFile) {
    return NextResponse.next()
  }

  // Get the token from the request
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

  // If there's no token and the path isn't public, redirect to login
  if (!token) {
    const url = new URL("/login", request.url)
    url.searchParams.set("callbackUrl", encodeURI(request.url))
    return NextResponse.redirect(url)
  }

  // If there's a token but the user is trying to access auth pages, redirect to dashboard
  if (token && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api/public|_next/static|_next/image|favicon.ico).*)"],
}
