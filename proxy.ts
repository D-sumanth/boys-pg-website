import { NextResponse, type NextRequest } from "next/server"
import { ADMIN_ACCESS_TOKEN_COOKIE } from "@/lib/admin/auth"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === "/admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url))
  }

  if (!pathname.startsWith("/admin") || pathname === "/admin/login") {
    return NextResponse.next()
  }

  const hasSession = Boolean(request.cookies.get(ADMIN_ACCESS_TOKEN_COOKIE)?.value)

  if (!hasSession) {
    const loginUrl = new URL("/admin/login", request.url)
    loginUrl.searchParams.set("next", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
