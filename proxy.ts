import { NextResponse, type NextRequest } from "next/server";

const RENAMED_CASES: Record<string, string> = {
  "nested-lands-tv-show-teaser-trailer": "nested-lands-game-teaser-trailer",
  "iem-masters-cologne": "iem-cologne",
};
const RENAMED_EQUIPMENT: Record<string, { category: string; slug: string }> = {
  "fujinon-xa20sx8-5berm-k3-eng-lens": { category: "lenses", slug: "fujinon-xa20sx8-5berm-k32-3-8-5-170mm-eng-xa-exceed-series-hd-zoom-lens" },
  "usb-c-rechargeable-camera-battery-for-sony-np-f970": { category: "power-batteries", slug: "smallrig-np-f970-battery-7800-mah" },
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

  const equipmentAlias = pathname.match(/^\/(?:(en|de|fr|pl|lt)\/)?equipment\/(lenses|power-batteries)\/([^/]+)\/?$/);
  if (equipmentAlias) {
    const target = RENAMED_EQUIPMENT[equipmentAlias[3]];
    if (target && target.category === equipmentAlias[2]) {
      const url = request.nextUrl.clone();
      const locale = equipmentAlias[1];
      url.pathname = `${locale && locale !== "en" ? `/${locale}` : ""}/equipment/${target.category}/${target.slug}`;
      return NextResponse.redirect(url, 308);
    }
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
