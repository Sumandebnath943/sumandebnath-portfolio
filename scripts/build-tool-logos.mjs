/**
 * Fetches the brand marks for the /profile tool wall.
 *
 *   node scripts/build-tool-logos.mjs
 *
 * Writes SVG files into `public/tool-logos/` and a manifest into
 * `lib/tool-logos.ts`. Re-runnable; existing files are overwritten.
 *
 * ── Why two sources ─────────────────────────────────────────────────────
 * **svgl.app** is the primary. It carries full-colour official marks for the
 * modern AI/dev brands, which is what the wall wants.
 *
 * **simple-icons** is the fallback, via its npm package. Its marks are
 * official but monochrome — one path, one brand hex — so a tool sourced here
 * renders flat. That is a deliberate downgrade, not a bug.
 *
 * Neither has everything. Anything in `TOOLS` with no `svgl` and no `si` entry
 * renders as a typographic tile: the name set in DM Mono on paper. Those are
 * marked `kind: "type"` in the manifest and are the ones to replace by hand if
 * the files ever turn up — drop `<slug>.svg` into public/tool-logos/ and add
 * the slug to `svgl` below with `local: true`.
 *
 * ── The one thing to be careful about ───────────────────────────────────
 * A wrong `svgl` title silently fetches the wrong company's logo. `Flux` is
 * the trap that has already been hit: simple-icons' "Flux" is FluxCD, the
 * Kubernetes tool, not Black Forest Labs' image model. When adding a tool,
 * open the fetched SVG and look at it before trusting the name match.
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT_DIR = "public/tool-logos";
const MANIFEST = "lib/tool-logos.ts";
const SVGL_INDEX = "https://api.svgl.app";
const BROWSER_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131 Safari/537.36";

/**
 * The wall, in the order it renders.
 *
 * `svgl`   — exact title in the svgl index (case-sensitive; checked at build).
 * `direct` — an explicit URL, for brands neither library carries. These came
 *            from each product's own site: the `<link rel=icon>` or the
 *            wordmark the marketing page already loads. They are the most
 *            brittle entries here — a redesign moves the file and the fetch
 *            starts 404ing, which the report will say.
 * `si`     — simple-icons export name, used when there is no `svgl`/`direct`.
 * None of the three — typographic tile.
 *
 * `label` is what shows under the tile, which is not always the brand's own
 * title (svgl calls it "Claude AI"; the wall says "Claude").
 */
/* ── This list is the user's, exactly ──
   Thirty-three tools, in the order they gave them. An earlier pass helpfully
   added Figma, Photoshop, Illustrator, Canva, Codex, Grok and Next.js because
   they appear elsewhere on the site. They were not asked for and are gone.
   **Do not add to this list without being asked.** */
const TOOLS = [
  { label: "Claude", svgl: "Claude AI" },
  { label: "OpenAI", svgl: "OpenAI" },
  { label: "Gemini", svgl: "Gemini" },
  { label: "Cursor", svgl: "Cursor" },
  { label: "Replit", svgl: "Replit" },
  { label: "Lovable", svgl: "Lovable" },
  { label: "Emergent", direct: "https://assets.emergent.sh/assets/emergent-logo-new-black.svg" },
  { label: "v0", svgl: "v0" },
  { label: "Render", svgl: "Render" },
  { label: "Resend", svgl: "Resend" },
  { label: "Groq", svgl: "Groq" },
  { label: "Supabase", svgl: "Supabase" },
  { label: "Vercel", svgl: "Vercel" },
  { label: "GitHub", svgl: "GitHub" },
  { label: "Node.js", svgl: "Node.js" },
  { label: "React", svgl: "React" },
  // No standalone Llama mark exists in either source; this is Meta's, which
  // is whose model it is.
  { label: "Llama", svgl: "Meta" },
  { label: "Midjourney", svgl: "Midjourney" },
  { label: "Adobe Firefly" },
  { label: "Seedream" },
  { label: "Nano Banana" },
  { label: "Runway", svgl: "Runway" },
  // Black Forest Labs' image model. NOT simple-icons' "Flux", which is FluxCD
  // — a Kubernetes tool with an entirely different mark.
  { label: "Flux", direct: "https://blackforestlabs.ai/icon0.svg" },
  // No reachable file: app.klingai.com/logo-180x180.png returns the SPA's
  // HTML shell with a 200, and neither library carries the brand. Type tile
  // until somebody drops kling-ai.svg into public/tool-logos/.
  { label: "Kling AI" },
  // Luma Labs' mark — RAY3 is their model and has no separate one.
  { label: "RAY3", direct: "https://lumalabs.ai/images/brand/luma-ai/logo-black.svg" },
  { label: "ElevenLabs", si: "siElevenlabs" },
  { label: "Make", si: "siMake" },
  { label: "Zapier", si: "siZapier" },
  { label: "n8n", svgl: "n8n" },
  { label: "Gamma", direct: "https://static.gamma.app/favicons/favicon_dark.svg" },
  { label: "Wan" },
  { label: "Tailwind", svgl: "Tailwind CSS" },
  { label: "Neon", svgl: "Neon" },
];

const slugify = (s) =>
  s.toLowerCase().replace(/\+/g, "plus").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  console.log(`Fetching svgl index …`);
  const index = await (await fetch(SVGL_INDEX)).json();
  const byTitle = new Map(index.map((e) => [e.title, e]));

  let si = {};
  try {
    si = await import("simple-icons");
  } catch {
    console.warn("! simple-icons not installed — monochrome fallbacks will be skipped");
  }

  const manifest = [];
  const report = { svgl: [], direct: [], si: [], type: [], failed: [] };
  /** slug → the URL it came from, written into the manifest header so the
   *  provenance of every mark on the page is recorded in the repo. */
  const sources = [];

  for (const tool of TOOLS) {
    const slug = slugify(tool.label);

    // 1. svgl, full colour
    if (tool.svgl) {
      const entry = byTitle.get(tool.svgl);
      if (!entry) {
        report.failed.push(`${tool.label} — no svgl entry titled "${tool.svgl}"`);
      } else {
        // `route` is either a string or a {light,dark} pair. The wall sits on
        // cream, so the light-background variant is the one we want.
        const url = typeof entry.route === "string" ? entry.route : entry.route.light;
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const svg = await res.text();
          // Not `startsWith("<svg")`: several of these are Illustrator exports
          // that open with an XML prolog and a generator comment. Cursor and
          // React both failed the stricter check while being perfectly good
          // files.
          if (!svg.includes("<svg")) throw new Error("not an SVG");
          await writeFile(path.join(OUT_DIR, `${slug}.svg`), svg);
          manifest.push({ label: tool.label, slug, kind: "file", ext: "svg" });
          sources.push(`${slug}.svg  ${url}`);
          report.svgl.push(`${tool.label} (${(svg.length / 1024).toFixed(1)} KB)`);
          continue;
        } catch (err) {
          report.failed.push(`${tool.label} — ${url}: ${err.message}`);
        }
      }
    }

    // 2. An explicit URL from the product's own site
    if (tool.direct) {
      try {
        // These are marketing sites rather than an API, and several 403 a
        // bare fetch. A browser UA is the difference between a logo and a
        // "type" tile.
        const res = await fetch(tool.direct, {
          headers: { "user-agent": BROWSER_UA },
          signal: AbortSignal.timeout(20000),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const ext = tool.ext || "svg";
        const body =
          ext === "svg" ? await res.text() : Buffer.from(await res.arrayBuffer());
        // **Validate the bytes, not the status.** Kling's logo path returns a
        // 200 carrying its SPA's HTML shell, which sailed through as a 122 KB
        // "PNG" and rendered as a broken-image icon. An unchecked binary
        // download is the one failure here that looks like success.
        if (ext === "svg") {
          if (!String(body).includes("<svg")) throw new Error("not an SVG");
        } else if (ext === "png") {
          const png = Buffer.from([0x89, 0x50, 0x4e, 0x47]);
          if (!body.subarray(0, 4).equals(png)) {
            throw new Error(`not a PNG (starts "${body.subarray(0, 24)}")`);
          }
        }
        await writeFile(path.join(OUT_DIR, `${slug}.${ext}`), body);
        manifest.push({ label: tool.label, slug, kind: "file", ext });
        sources.push(`${slug}.${ext}  ${tool.direct}`);
        report.direct.push(`${tool.label} (${(body.length / 1024).toFixed(1)} KB, ${ext})`);
        continue;
      } catch (err) {
        report.failed.push(`${tool.label} — ${tool.direct}: ${err.message}`);
      }
    }

    // 3. simple-icons, monochrome
    if (tool.si && si[tool.si]) {
      const icon = si[tool.si];
      manifest.push({
        label: tool.label,
        slug,
        kind: "mono",
        path: icon.path,
        hex: `#${icon.hex}`,
      });
      report.si.push(`${tool.label} (#${icon.hex})`);
      continue;
    }
    if (tool.si) report.failed.push(`${tool.label} — simple-icons has no ${tool.si}`);

    // 4. Typographic tile
    manifest.push({ label: tool.label, slug, kind: "type" });
    report.type.push(tool.label);
  }

  const ts = `/* GENERATED by scripts/build-tool-logos.mjs — do not edit by hand.
 *
 * ${manifest.filter((m) => m.kind === "file").length} full-colour marks in public/tool-logos/,
 * ${manifest.filter((m) => m.kind === "mono").length} monochrome simple-icons paths,
 * ${manifest.filter((m) => m.kind === "type").length} typographic tiles for brands neither source carries.
 *
 * Re-run the script to refresh. To promote a "type" tile to a real mark, drop
 * the SVG into public/tool-logos/ and give its tool an \`svgl\` title.
 *
 * Where each file came from:
${sources.map((l) => ` *   ${l}`).join("\n")}
 */

export type ToolLogo =
  | { label: string; slug: string; kind: "file"; ext: "svg" | "png" }
  | { label: string; slug: string; kind: "mono"; path: string; hex: string }
  | { label: string; slug: string; kind: "type" };

export const toolLogos: ToolLogo[] = ${JSON.stringify(manifest, null, 2)};
`;
  await writeFile(MANIFEST, ts);

  const line = (n) => "─".repeat(n);
  console.log(`\n${line(60)}`);
  console.log(`FULL COLOUR from svgl.app (${report.svgl.length})`);
  console.log(report.svgl.join(", ") || "  none");
  console.log(`
FULL COLOUR direct from the product's own site (${report.direct.length})`);
  console.log(report.direct.join(", ") || "  none");
  console.log(`\nMONOCHROME from simple-icons (${report.si.length})`);
  console.log(report.si.join(", ") || "  none");
  console.log(`\nTYPOGRAPHIC TILE — no mark available (${report.type.length})`);
  console.log(report.type.join(", ") || "  none");
  if (report.failed.length) {
    console.log(`\nFAILED (${report.failed.length})`);
    report.failed.forEach((f) => console.log(`  ${f}`));
  }
  console.log(line(60));
  console.log(`\nWrote ${MANIFEST} and ${report.svgl.length} files to ${OUT_DIR}/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
