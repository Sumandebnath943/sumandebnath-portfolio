import type { Metadata } from "next";
import { dbHealth } from "@/lib/db";

export const metadata: Metadata = {
  title: { absolute: "Visitors" },
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

// Phase 2 lands the gate; the table and filters come next. Kept deliberately
// thin so what is being verified here is the auth, not the UI.
export default async function DashboardPage() {
  const health = await dbHealth();

  // Named for what it actually means. "Connected" previously meant only that an
  // environment variable existed — which reads as healthy while every visit is
  // being dropped for want of a schema.
  const status = health.ok
    ? { label: `ready · ${health.visits} visit${health.visits === 1 ? "" : "s"} stored`, tone: "text-emerald-400/80" }
    : health.reason === "no-schema"
      ? { label: "no tables — run the migration", tone: "text-amber-400/90" }
      : health.reason === "unconfigured"
        ? { label: "DATABASE_URL not set", tone: "text-red-400/80" }
        : { label: "unreachable", tone: "text-red-400/80" };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-[11px] tracking-[0.2em] text-white/35 uppercase mb-3">
          Dashboard
        </p>
        <h1 className="font-manrope text-2xl tracking-tight mb-2">Visitors</h1>
        <p className="font-manrope text-[15px] text-white/55 leading-[1.8] mb-8">
          You are signed in. The table and filters arrive in the next phase.
        </p>

        <dl className="border-t border-white/[0.08] pt-4 space-y-2">
          <div className="flex justify-between gap-4 font-manrope text-[13px]">
            <dt className="text-white/45">Storage</dt>
            <dd className={status.tone}>{status.label}</dd>
          </div>
        </dl>

        {!health.ok && health.reason === "no-schema" ? (
          <p className="mt-4 font-manrope text-[13px] text-white/50 leading-[1.7]">
            The database is reachable but empty, so visits are being recorded
            nowhere. Run{" "}
            <span className="font-mono text-[12px] text-white/75">
              node scripts/db-migrate.mjs
            </span>{" "}
            against this environment.
          </p>
        ) : null}

        <form action="/desk-4f7a/logout" method="post" className="mt-10">
          <button
            type="submit"
            className="rounded-lg border border-white/[0.12] px-4 py-2 font-manrope text-[13px] text-white/70 hover:text-white hover:border-white/30 transition-colors"
          >
            Sign out
          </button>
        </form>
      </div>
    </main>
  );
}
