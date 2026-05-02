import { NextResponse } from "next/server";

/**
 * Auth gates for the (learn) section.
 *
 * Firebase auth is client-side — server-side verification would require
 * the Firebase Admin SDK + session cookies. Until that is wired up,
 * this middleware adds x-auth-required headers for the client to act on,
 * and hard-redirects the /admin routes if no session cookie is present.
 *
 * Route tiers:
 *   Viewer   — public, no auth  (all /general-english/* overview + topic tabs)
 *   Learner  — requires sign-in (practice tabs — gated client-side via AuthGate)
 *   Premium  — reserved for Phase 5
 */
export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Admin routes — require auth (redirect to login if no session)
  if (pathname.startsWith("/admin")) {
    const session = request.cookies.get("__session");
    if (!session) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Annotate (learn) routes with auth tier header for client components
  const response = NextResponse.next();
  if (pathname.startsWith("/general-english")) {
    response.headers.set("x-auth-tier", "viewer");
  }

  return response;
}

export const config = {
  matcher: [
    // Run on all routes except static files and Next.js internals
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
