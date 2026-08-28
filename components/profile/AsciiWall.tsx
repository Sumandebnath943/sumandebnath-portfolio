import AsciiField from "./AsciiField";
import AsciiLines from "./AsciiLines";
import { ASCII_PORTRAIT } from "@/lib/ascii-portrait";

/* ─────────────────────────────────────────────────────────────────────────
   /profile — the statement wall.

   Modelled on the "Be Real / Be Creative / Be Bold" panel at
   benjamincreative.me. The first version of this section copied the reference's
   arrangement and none of what makes it work, so here is what the live page
   actually does, measured rather than guessed:

   1. **The field is a photograph.** Not noise, not a gradient of characters —
      a picture of a person, dissolved into ASCII, filling the panel edge to
      edge. That is the entire reason it holds the eye. An abstract field in the
      same position reads as texture and the eye slides straight off it.
   2. **It does not animate.** Two hashes of that WebGL canvas 1.2 s apart come
      back byte-identical. It is a still image rendered by a shader.
   3. **The motion is in the type**, and it is a staggered entrance — see
      AsciiLines.tsx, where the "grey third line" turns out to be.

   So: the picture is real, and it is baked. `scripts/build-ascii-portrait.mjs`
   converts `public/profile/portrait.webp` — 170×44 characters of a
   black-and-white profile shot — and commits the result to
   `lib/ascii-portrait.ts`. Nothing is computed at runtime, on the server or in
   the browser, and this component ships **no JavaScript** beyond the three
   lines' observer.

   It is keyed to paper rather than to the reference's black-and-red: /profile
   is the one light page on this site and profile.css says so at the top. Ink is
   shadow, so the dark half of the photograph is where the characters get heavy.
   ───────────────────────────────────────────────────────────────────────── */

export default function AsciiWall() {
  return (
    <section className="pf-ascii" aria-label="Be Curious. Be Useful. Be Relentless.">
      {/* The stage holds both versions of the picture. The `<pre>` is the one
          in the HTML — what a crawler, a reader with JavaScript off, and
          anyone on reduced motion sees. The canvas takes over from it only
          after its first successful frame, and reads its data straight out of
          the `<pre>`, so the photograph is shipped exactly once. */}
      <div className="pf-ascii-stage">
        {/* One text node, one layout box. Per-character spans would be 10,496
            of them, which is how an effect like this ends up costing more than
            the page it decorates. */}
        <pre className="pf-ascii-field" aria-hidden="true">
          {ASCII_PORTRAIT}
        </pre>
        <AsciiField />
      </div>

      <AsciiLines />

      {/* The three lines start at `opacity: 0` and are revealed by an observer.
          With scripting off that class never lands and the statement would
          simply not be there — the words are in the HTML, but nobody could read
          them. Four lines of CSS is a cheaper fix than making the entrance
          depend on hydration. */}
      <noscript>
        <style>{`.pf-ascii-lines .ln { opacity: 1; transform: none; }`}</style>
      </noscript>
    </section>
  );
}
