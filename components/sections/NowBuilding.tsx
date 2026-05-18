// Server component — content lives in initial HTML for indexing.
// The "Now" page is a freshness signal for both search engines and AI search.

const NOW_LAST_UPDATED = "2026-05-19";

const focus = [
  {
    label: "Currently Building",
    text: "ROASmind — a next-generation AI-native operating system. 200,000+ lines of orchestrated architecture, still evolving in stealth.",
  },
  {
    label: "Currently Learning",
    text: "Advanced Certification in Agentic & Generative AI — exploring agentic systems, workflow autonomy, and AI-native infrastructure.",
  },
  {
    label: "Available For",
    text: "AI-native product collaborations, AI generalist consulting, and full-stack AI engineering engagements.",
  },
];

export default function NowBuilding() {
  return (
    <section
      id="now"
      aria-labelledby="now-heading"
      className="relative bg-black text-white border-y border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-20 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#86868B] mb-4">
              Now / Currently
            </p>
            <h2
              id="now-heading"
              className="font-manrope font-semibold text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight"
            >
              What I&rsquo;m focused on{" "}
              <span className="font-serif italic font-normal text-white/70">
                right now
              </span>
              .
            </h2>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#555]">
            Last updated{" "}
            <time dateTime={NOW_LAST_UPDATED}>{NOW_LAST_UPDATED}</time>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {focus.map((f) => (
            <div
              key={f.label}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-7"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#86868B] mb-4">
                {f.label}
              </p>
              <p className="font-manrope text-[15px] leading-[1.7] text-white/85">
                {f.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
