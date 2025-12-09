// src/proxy.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default async function proxy(request: NextRequest) {
  // 1. Check the path: Is the user trying to visit /dashboard?
  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");

  // 2. Check the session: Look for the better-auth cookie
  // (Note: ensure this cookie name matches what better-auth sets in v16)
  const sessionCookie = request.cookies.get("better-auth.session_token");

  // 3. The Gatekeeper Logic
  if (isDashboard && !sessionCookie) {
    // Redirect unauthenticated users to the Sign In page
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // 4. Forward the request if allowed
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply this proxy logic only to the dashboard and its sub-pages
    "/dashboard/:path*",
  ],
};
