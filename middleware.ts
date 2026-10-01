import { NextResponse, type NextRequest } from "next/server";

/** Estonian is served from the root: "/" renders /et, and /et redirects back to "/". */
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  if (url.pathname === "/") {
    url.pathname = "/et";
    return NextResponse.rewrite(url);
  }
  url.pathname = url.pathname.slice(3) || "/";
  return NextResponse.redirect(url, 308);
}

export const config = { matcher: ["/", "/et", "/et/:path*"] };
