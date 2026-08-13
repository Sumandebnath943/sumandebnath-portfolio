import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getVisit } from "@/lib/db";
import { clock, dur, focus, place, verdictTone, when } from "../../format";

export const metadata: Metadata = {
  title: { absolute: "Visit" },
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-6 py-2 border-b border-black/[0.05] last:border-0">
      <dt className="font-manrope text-[13px] text-black/40 shrink-0">{label}</dt>
      <dd className="font-manrope text-[13px] text-[#0b0b0b] text-right break-words min-w-0">{children}</dd>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white border border-black/[0.07] rounded-xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <h2 className="font-mono text-[10px] uppercase tracking-[0.15em] text-black/40 mb-3">{title}</h2>
      <dl>{children}</dl>
    </section>
  );
}

export default async function VisitPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getVisit(decodeURIComponent(id));
  if (!data) notFound();

  const { visit: v, pages, actions } = data;
  const verdict = verdictTone(v.bot_verdict);

  return (
    <main className="min-h-screen bg-[#fcfcfb] text-[#0b0b0b] px-5 py-8">
      <div className="max-w-[900px] mx-auto">
        <Link
          href="/desk-4f7a"
          className="font-manrope text-[13px] text-black/45 hover:text-[#0b0b0b] transition-colors"
        >
          ← All visitors
        </Link>

        <header className="mt-4 mb-6">
          <h1 className="font-mono text-xl tracking-tight">{v.id}</h1>
          <p className="font-manrope text-[13px] text-black/45 mt-1">
            {when(v.started_at)} → {v.ended_at ? when(v.ended_at) : "still here"} ·{" "}
            <span className={verdict.className}>{verdict.label}</span>
          </p>
        </header>

        {/* The journey first: it is the reason to open this page at all. */}
        <section className="bg-white border border-black/[0.07] rounded-xl p-5 mb-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.15em] text-black/40 mb-4">
            Journey · {pages.length} {pages.length === 1 ? "page" : "pages"}
          </h2>
          {pages.length === 0 ? (
            <p className="font-manrope text-[13px] text-black/40">No pages recorded.</p>
          ) : (
            <ol className="space-y-3">
              {pages.map((p) => (
                <li key={p.seq} className="flex items-baseline gap-3">
                  <span className="font-mono text-[10px] text-black/30 w-5 shrink-0">{p.seq + 1}</span>
                  <span className="font-manrope text-[14px] text-[#0b0b0b] break-all">{p.path}</span>
                  <span className="flex-1 border-b border-dashed border-black/[0.12] translate-y-[-3px]" />
                  <span className="font-mono text-[11px] text-black/45 shrink-0">
                    {dur(p.ms)}
                    {p.scroll !== null ? ` · ${p.scroll}% deep` : ""}
                  </span>
                </li>
              ))}
            </ol>
          )}

          {actions.length > 0 ? (
            <div className="mt-5 pt-4 border-t border-black/[0.07]">
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-black/40 mb-2">
                Actions
              </p>
              <ul className="flex flex-wrap gap-2">
                {actions.map((a) => (
                  <li
                    key={a.seq}
                    className="rounded-full bg-emerald-50 px-3 py-1 font-manrope text-[12px] text-emerald-800"
                  >
                    {a.label || a.action}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>

        <div className="grid gap-4 md:grid-cols-2">
          <Section title="Timing">
            <Row label="Arrived">{clock(v.started_at)}</Row>
            <Row label="Left">{v.ended_at ? clock(v.ended_at) : "still here"}</Row>
            <Row label="Total">{dur(v.total_ms)}</Row>
            <Row label="Active">
              {dur(v.active_ms)} <span className="text-black/40">({focus(v.total_ms, v.active_ms)})</span>
            </Row>
          </Section>

          <Section title="Where from">
            <Row label="Location">{place(v)}</Row>
            <Row label="Network">{v.network || "—"}</Row>
            <Row label="IP">
              {v.ip ? (
                <span className="font-mono text-[12px]">{v.ip}</span>
              ) : (
                <span className="text-black/40">removed</span>
              )}
            </Row>
            <Row label="Their timezone">{v.timezone || "—"}</Row>
          </Section>

          <Section title="How they arrived">
            <Row label="Entered on">{v.entry_path || "—"}</Row>
            <Row label="Source">{v.source || "—"}</Row>
            <Row label="Referrer">
              {v.referrer ? <span className="break-all">{v.referrer}</span> : "—"}
            </Row>
            <Row label="Tagged link">{v.tag || "—"}</Row>
          </Section>

          <Section title="Device">
            <Row label="Device">{v.device || "—"}</Row>
            <Row label="Screen">{v.screen || "—"}</Row>
            <Row label="CPU cores">{v.cores ?? "—"}</Row>
            <Row label="Languages">{v.languages || "—"}</Row>
          </Section>

          <Section title="Returning">
            <Row label="Visit number">{v.visit_number ?? "—"}</Row>
            <Row label="Days since last">
              {v.days_since === null || v.days_since === undefined || v.days_since < 0
                ? "first visit"
                : `${v.days_since}`}
            </Row>
          </Section>

          <Section title="Read">
            <Row label="Verdict">
              <span className={verdict.className}>{verdict.label}</span>
            </Row>
            <Row label="Any input">{v.interacted === null ? "unknown" : v.interacted ? "yes" : "no"}</Row>
            <Row label="Automation flag">{v.webdriver ? "webdriver" : "none"}</Row>
            <Row label="User agent">
              <span className="font-mono text-[11px] break-all text-black/50">{v.user_agent || "—"}</span>
            </Row>
          </Section>
        </div>
      </div>
    </main>
  );
}
