import type { Metadata } from "next";
import { dbConfigured } from "@/lib/db";

export const metadata: Metadata = {
  title: { absolute: "Visitors" },
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

// Phase 2 lands the gate; the table and filters come next. Kept deliberately
// thin so what is being verified here is the auth, not the UI.
export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-[11px] tracking-[0.2em] text-white/35 uppercase mb-3">
          Dashboard
        </p>
        <h1 className="font-manrope text-2xl tracking-tight mb-2">Visitors</h1>
        <p className="font-manrope text-[15px] text-white/55 leading-[1.8] mb-8">
          You are signed in. The table and filters arrive in the next phase —
          visits are already being recorded, so there will be history waiting.
        </p>

        <dl className="border-t border-white/[0.08] pt-4 space-y-2">
          <div className="flex justify-between font-manrope text-[13px]">
            <dt className="text-white/45">Database</dt>
            <dd className={dbConfigured() ? "text-emerald-400/80" : "text-red-400/80"}>
              {dbConfigured() ? "connected" : "not configured"}
            </dd>
          </div>
        </dl>

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
