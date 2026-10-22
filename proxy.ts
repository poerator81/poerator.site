import { NextResponse, type NextRequest } from "next/server";

const RENAMED_CASES: Record<string, string> = {
  "nested-lands-tv-show-teaser-trailer": "nested-lands-game-teaser-trailer",
  "iem-masters-cologne": "iem-cologne",
};
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

  const renamedCase = pathname.match(/^(?:\/(de|fr|pl|lt))?\/portfolio\/(nested-lands-tv-show-teaser-trailer|iem-masters-cologne)\/?$/);
  if (renamedCase) {
    const url = request.nextUrl.clone();
    url.pathname = `${renamedCase[1] ? `/${renamedCase[1]}` : ""}/portfolio/${RENAMED_CASES[renamedCase[2]]}`;
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
