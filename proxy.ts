import { NextResponse, type NextRequest } from "next/server";

const prefixedLocales = new Set(["en", "de", "fr", "pl", "lt"]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const berlinObVanAlias = pathname.match(/^\/(?:(en|de|fr|pl|lt)\/)?ob-van-rental-berlin\/?$/);
  if (berlinObVanAlias) {
    const locale = berlinObVanAlias[1];
    const url = request.nextUrl.clone();
    url.pathname = locale && locale !== "en" ? `/${locale}/ob-van` : "/ob-van";
    return NextResponse.redirect(url, 308);
  }

  const legacyNestedLands = pathname.match(/^(?:\/(de|fr|pl|lt))?\/portfolio\/nested-lands-tv-show-teaser-trailer\/?$/);
  if (legacyNestedLands) {
    const url = request.nextUrl.clone();
    url.pathname = `${legacyNestedLands[1] ? `/${legacyNestedLands[1]}` : ""}/portfolio/nested-lands-game-teaser-trailer`;
    return NextResponse.redirect(url, 308);
  }

  const firstSegment = pathname.split("/")[1];
  if (prefixedLocales.has(firstSegment)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api|_next|studio|.*\\..*).*)"],
};
