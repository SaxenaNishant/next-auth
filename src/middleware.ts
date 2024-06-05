import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isPublicUrl =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/verifytoken";

  const token = request.cookies.get("token")?.value || "";

  if (isPublicUrl && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!isPublicUrl && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //   const isPrivateUrl = pathname === "/profile";
  //   return NextResponse.redirect(new URL("/home", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login", "/signup", "/verifytoken", "/profile"],
};
