import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: Request) {
  const provided = new URL(request.url).searchParams.get("secret") || "";
  const expected = process.env.SANITY_REVALIDATE_SECRET || "";
  const authorized = provided.length > 0 && expected.length > 0 &&
    Buffer.byteLength(provided) === Buffer.byteLength(expected) &&
    timingSafeEqual(Buffer.from(provided), Buffer.from(expected));
  if (!authorized) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  for (const path of ["/", "/services", "/equipment", "/ob-van", "/video-production", "/portfolio", "/contact"]) revalidatePath(path);
  revalidatePath("/", "layout");
  return NextResponse.json({ revalidated: true });
}
