
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const protectedPaths = ["/postblog", "/profile", "/admin", "/dashboard", "/bookmarks"];

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Redirect to login if trying to access a protected path without a token
  if (protectedPaths.some(path => pathname.startsWith(path)) && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Handle profile page access
  if (pathname.startsWith("/profile/")) {
    const profileId = pathname.split('/')[2];
    if (token && token.id !== profileId) {
      // If the user is trying to access someone else's profile, 
      // redirect them to their own profile page.
      return NextResponse.redirect(new URL(`/profile/${token.id}`, req.url));
    }
  }

  // Admin route protection
  if (pathname.startsWith("/admin") && (!token || token.role !== "ADMIN")) {
    return NextResponse.redirect(new URL("/unauthorized", req.url)); 
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/postblog/:path*", "/profile/:path*", "/admin/:path*", "/dashboard/:path*", "/bookmarks/:path*"],
};
