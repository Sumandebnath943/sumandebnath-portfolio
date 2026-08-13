import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { IP_RETENTION_DAYS, VISIT_RETENTION_DAYS, purgeVisits } from "@/lib/db";

// Deleting rows can take a moment once there is a year of them.
export const maxDuration = 30;
export const dynamic = "force-dynamic";

/**
 * Enforces retention, once a day, driven by the schedule in vercel.json.
 *
 * Vercel sends `Authorization: Bearer $CRON_SECRET` when that variable is set.
 * Without it this route refuses to run at all rather than leaving a public
 * endpoint that deletes data — failing closed is the only sane default when the
 * thing on the other side is a DELETE.
 */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: "CRON_SECRET is not set" }, { status: 503 });
  }
  if (request.headers.get("authorization") !== `Bearer ${secret}`) {
    // Nothing to learn from the response: same body either way.
    return new NextResponse("Not found", { status: 404 });
  }

  const result = await purgeVisits();
  return NextResponse.json(
    {
      ...result,
      policy: { ipRemovedAfterDays: IP_RETENTION_DAYS, visitDeletedAfterDays: VISIT_RETENTION_DAYS },
    },
    { status: result.ok ? 200 : 500, headers: { "Cache-Control": "no-store" } },
  );
}
