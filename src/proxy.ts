// src/proxy.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default async function proxy(request: NextRequest) {

  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");

 
  const sessionCookie = request.cookies.get("better-auth.session_token");


  if (isDashboard && !sessionCookie) {

    return NextResponse.redirect(new URL("/sign-in", request.url));
  }


  return NextResponse.next();
}

export const config = {
  matcher: [
   
    "/dashboard/:path*",
  ],
};
