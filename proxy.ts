import { NextResponse, type NextRequest } from "next/server";

const prefixedLocales = new Set(["en", "de", "fr", "pl", "lt"]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];
  if (prefixedLocales.has(firstSegment)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api|_next|studio|.*\\..*).*)"],
};
