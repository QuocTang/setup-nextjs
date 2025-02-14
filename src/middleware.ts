import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { AUTH } from "./config/environment";
import { CookieConfigKeys } from "./config/app-storage/cookie.config";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get(CookieConfigKeys.features.auth.user_token);
  if (!token?.value && request.nextUrl.pathname !== AUTH.login_route) {
    return NextResponse.redirect(new URL(AUTH.login_route, request.url));
  }

  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL(AUTH.login_route, request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
