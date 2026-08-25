import Link from "next/link";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import NotFoundStage from "@/components/not-found/NotFoundStage";
import { DESTINATIONS } from "@/components/not-found/not-found-data";

/**
 * The 404.
 *
 * `app/not-found.tsx` catches every unmatched URL for the whole app (Next 16
 * file-conventions docs, `not-found.md`) and renders *inside* the root layout —
 * so the mascot, chat and tour are all mounted here too. `NotFoundStage` stands
 * all three down via `RobotChatContext.solo`, and this page draws the one
 * canvas, at size. No `metadata` export: Next supports that only on
 * `global-not-found`, and injects `noindex` for a 404 anyway.
 *
 * Light on purpose. The site is almost entirely dark and `Film` is the only
 * other daylight band, so cream reads as somewhere else rather than as a page
 * that lost its background.
 *
 * **It is one screen and it does not scroll**, which is the constraint every
 * size below is derived from — there is no footer, and the copy is deliberately
 * thin. `100svh` rather than `100vh` because mobile browsers report `vh`
 * including the retracting URL bar, which would guarantee a scrollbar on the
 * one page that must not have one.
 */

const NF_CSS = `
.nf-bubble { animation: nf-bubble 0.42s cubic-bezier(0.22, 1, 0.36, 1) backwards; }
@keyframes nf-bubble {
  from { opacity: 0; transform: translateY(6px) scale(0.96); }
  to   { opacity: 1; transform: none; }
}

/* Fill mode is \`backwards\`, never \`both\` — an animated value outranks a
   normal declaration, so a forwards fill would pin these under the keyframe's
   end state and kill every hover below. PROJECT_BIBLE.md §5, trap 4. */
.nf-chip { transition: transform 0.2s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.2s, border-color 0.2s; }
.nf-chip:hover { transform: translateY(-1px); }

@media (prefers-reduced-motion: reduce) {
  .nf-bubble { animation: none; }
  .nf-chip, .nf-chip:hover { transition: none; transform: none; }
}
`;

export default function NotFound() {
  return (
    <MotionProvider>
      <Navigation />

      {/*
        `h-[100svh]` + `overflow-hidden` is the no-scroll contract.

        `min-h-[34rem]` is the escape hatch and it is deliberate: below roughly
        544px of viewport height the robot and the copy cannot both fit, and at
        that point the page grows and scrolls rather than clipping content out
        of reach. Content nobody can scroll to is the failure the pinned era
        rail's fit-guard exists to avoid (HANDOFF §2) — a short window is the
        one case where scrolling is the kinder answer.

        overflow-hidden also clips the oversized numeral. Nothing here is
        sticky; see PROJECT_BIBLE.md §5 trap 1 before adding anything that is.
      */}
      <main className="relative flex h-[100svh] min-h-[34rem] flex-col overflow-hidden bg-[#F4F3ED] text-[#12161A] selection:bg-[#12161A] selection:text-[#F4F3ED]">
        <style dangerouslySetInnerHTML={{ __html: NF_CSS }} />

        {/* Decorative watermark. The kicker carries the real "404", so this is
            hidden from assistive tech and is allowed to fail contrast — the
            same standing decision as the brand ordinals, PROJECT_BIBLE.md §4. */}
        <span
          aria-hidden="true"
          // `tracking-tighter` on Anton at 26vw ran the digits into each other —
          // the 4s overlapped the 0. Anton is already condensed; at display size
          // it needs the opposite of tightening.
          className="pointer-events-none absolute left-1/2 top-1/2 -z-0 -translate-x-1/2 -translate-y-1/2 select-none font-anton text-[46vw] leading-none tracking-[0.06em] text-[#12161A]/[0.05] lg:text-[26vw]"
        >
          404
        </span>

        <div className="relative z-[1] mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 items-center gap-4 px-6 pb-6 pt-20 md:px-10 md:pb-8 md:pt-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:gap-8 lg:pb-10">
          {/* ── Copy ─────────────────────────────────────────────────────── */}
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <div className="flex items-center justify-center gap-3 lg:justify-start">
              <span className="hidden h-px w-8 bg-[#12161A]/25 lg:block" />
              <p className="font-dmmono text-[9.5px] font-medium uppercase tracking-[0.3em] text-[#4A5157] sm:text-[10px]">
                Error 404 · route not found
              </p>
            </div>

            <h1 className="mt-3 font-manrope text-[clamp(1.75rem,4.4vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.035em]">
              You found a route{" "}
              <br />
              {/* Red, because this is the error. #C1121F measures 6.4:1 on the
                  cream — comfortably past the 4.5 floor, let alone the 3.0 a
                  headline this size would be held to. */}
              <span className="font-serif font-normal italic text-[#C1121F]">
                that doesn’t exist.
              </span>
            </h1>

            <p className="mx-auto mt-3 max-w-[30rem] font-manrope text-[13.5px] leading-relaxed text-[#3F464C] sm:text-[15px] lg:mx-0">
              Every other address here leads to something real. This one leads to
              a sleeping robot.
            </p>

            <ul className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start">
              {DESTINATIONS.map((d) => (
                <li key={d.href}>
                  <Link
                    href={d.href}
                    className="nf-chip inline-flex items-center rounded-full border border-[#12161A]/[0.14] bg-white/70 px-3.5 py-1.5 font-manrope text-[13px] font-medium text-[#12161A] hover:border-[#12161A]/35 hover:bg-white sm:text-[13.5px]"
                  >
                    {d.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* The honest postscript — a house convention, and the most
                credible device on this site. Kept to one line. */}
            <p className="mx-auto mt-5 max-w-[30rem] font-manrope text-[12px] leading-relaxed text-[#4A5157] lg:mx-0">
              Typed it by hand? It never existed. Followed a link?{" "}
              <Link
                href="/contact"
                className="font-medium text-[#12161A] underline decoration-[#12161A]/30 underline-offset-4 transition-colors hover:decoration-[#12161A]"
              >
                That one’s mine to fix.
              </Link>
            </p>

            {/*
              Recovery for a reader that is not a person. Last, because the
              human copy above it is the page — this is the footnote.

              A 404 that only apologises is a dead end for an agent: it holds a
              URL that does not exist and no route to the ones that do. Both
              files here are the real index — the sitemap for every URL, llms.txt
              for the whole site written to be read by a model.

              **Plain <a>, not <Link>.** Both are route handlers, not pages;
              next/link would try to client-navigate to them and fail. Everything
              else on this page routes through Link, so this exception is exactly
              the kind of thing that gets "tidied" later — it must not be.

              **It is height-gated, and that is the whole reason it fits.** At
              375×667 this page has ~2px of slack: pt-20 + a 36svh robot + gap +
              this column already lands within a couple of pixels of the padding
              edge, and `overflow-hidden` means anything past that is clipped
              rather than scrolled to — the exact bug the 40svh → 36svh change
              was made to fix. Content height here is roughly 423 + 0.36h, so
              the line only has room once h ≳ 716; 760 leaves a real margin
              rather than a rounding error. Every current phone (390×844,
              412×915) shows it; a 667-tall SE and the 1280×600 desktop case do
              not, and both keep the layout they were measured into. The markup
              is in the response at every size regardless, which is what a
              fetcher reads — this gate is about what is *painted*, not about
              what is served.
            */}
            <p className="mx-auto mt-3 hidden max-w-[30rem] font-manrope text-[12px] leading-relaxed text-[#4A5157] lg:mx-0 [@media(min-height:760px)]:block">
              Reading this as a machine?{" "}
              <a
                href="/sitemap.xml"
                className="font-medium text-[#12161A] underline decoration-[#12161A]/30 underline-offset-4 transition-colors hover:decoration-[#12161A]"
              >
                sitemap.xml
              </a>{" "}
              lists every real URL, and{" "}
              <a
                href="/llms.txt"
                className="font-medium text-[#12161A] underline decoration-[#12161A]/30 underline-offset-4 transition-colors hover:decoration-[#12161A]"
              >
                llms.txt
              </a>{" "}
              is the whole site, written for you.
            </p>
          </div>

          {/* ── The robot ────────────────────────────────────────────────────
              Height is viewport-driven so it is fully visible without scrolling
              at 1280×600 — a real desktop size on a 1080p Windows machine at the
              150% scaling Windows itself recommends (HANDOFF §2). It never
              exceeds the space the grid row gives it. */}
          {/* 36svh, not 40: at 375×667 — the commonest small phone — 40svh
              pushed the postscript's baseline to 678px inside a 667px viewport.
              `overflow-hidden` then *hid* it rather than scrolling to it, which
              is content nobody can reach. Measured, not guessed. */}
          {/* The desktop cap is 32rem against a 34rem-wide column, which keeps
              the canvas at least as wide as it is tall. That is a hard
              requirement of the sleeping pose, not a style choice: horizontal
              framing is `visible height × aspect`, so a taller window would
              otherwise narrow the frame in proportion and clip his feet — a bug
              that only appears on tall screens and looks fine everywhere else. */}
          <div className="order-1 h-[clamp(11rem,36svh,20rem)] w-full lg:order-2 lg:h-[clamp(16rem,72svh,32rem)]">
            <NotFoundStage />
          </div>
        </div>
      </main>
    </MotionProvider>
  );
}
