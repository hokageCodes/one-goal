import { NextResponse } from "next/server";

export function middleware(request) {
  // Redirect root URL to /waitlist
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/waitlist", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/"]
};
