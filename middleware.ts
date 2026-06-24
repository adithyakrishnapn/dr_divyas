import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const ADMIN_SESSION_COOKIE_NAME = "admin_session";
const PORTAL_SESSION_COOKIE_NAME = "portal_session";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;

  if (url.startsWith("/portal")) {
    const isLoginPage = url === "/portal/login";
    const sessionCookie = request.cookies.get(PORTAL_SESSION_COOKIE_NAME)?.value;

    if (isLoginPage) {
      if (sessionCookie) {
        return NextResponse.redirect(new URL("/portal", request.url));
      }
      return NextResponse.next();
    }

    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/portal/login", request.url));
    }

    return NextResponse.next();
  }

  if (url.startsWith("/admin")) {
    const sessionCookie = request.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value;

    if (!sessionCookie) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/dashboard/:path*",
    "/admin/blogs/:path*",
    "/portal",
    "/portal/:path*",
  ],
};

