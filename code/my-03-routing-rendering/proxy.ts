import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Read auth cookies
  const token = req.cookies.get("auth_token")?.value;
  const role = req.cookies.get("user_role")?.value;

  // Protect pages
  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register");
  const isDashboard = pathname.startsWith("/dashboard");
  const isAdmin = pathname.startsWith("/admin");
  const isOwner = pathname.startsWith("/owner");

  // Redirect unauthenticated
  if (!token && (isDashboard || isAdmin || isOwner)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Redirect authenticated from auth pages
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Role gating
  if (isAdmin && role !== "admin") {
    return NextResponse.redirect(new URL("/403", req.url));
  }

  if (isOwner && role !== "owner" && role !== "admin") {
    return NextResponse.redirect(new URL("/403", req.url));
  }

  // (Optional) You can rewrite paths instead of redirecting:
  // if (pathname === "/old-path") {
  //   return NextResponse.rewrite(new URL("/new-path", req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/news"
  ],
};
