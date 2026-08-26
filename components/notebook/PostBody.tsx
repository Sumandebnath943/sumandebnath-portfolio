import Link from "next/link";
import { getPage } from "@/lib/pages";
import type { Block } from "@/lib/notebook";

/**
 * Renders a post's typed blocks.
 *
 * Server component, no client bundle: the whole reason /notebook exists is to
 * put citable prose into server-rendered HTML, and a client-rendered article is
 * exactly the thing a non-JavaScript crawler cannot read.
 *
 * Styling is class-based against `notebook.css` rather than Tailwind utilities,
 * because long-form prose wants a handful of typographic rules applied to a lot
 * of elements — the one place in this repo where a stylesheet beats utilities.
 */

// ── Inline markup ──────────────────────────────────────────────────────────
//
// A deliberately tiny subset: [label](href), `code`, **bold**. Not a Markdown
// parser and not trying to become one — if a post needs more than this, that is
// a signal the content wants a real block type instead.
//
// `[label](href)` matters more than it looks. In-paragraph internal links are
// the difference between a post that sits in a corner of the site and one that
// is woven into it, and an authoring format without them quietly produces the
// former.
const INLINE = /(\[[^\]]+\]\([^)]+\))|(`[^`]+`)|(\*\*[^*]+\*\*)/g;

function inline(text: string, keyPrefix: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  let last = 0;
  let i = 0;

  for (const match of text.matchAll(INLINE)) {
    const token = match[0];
    const start = match.index ?? 0;
    if (start > last) out.push(text.slice(last, start));

    const key = `${keyPrefix}-${i++}`;

    if (token.startsWith("[")) {
      const split = token.indexOf("](");
      const label = token.slice(1, split);
      const href = token.slice(split + 2, -1);
      // Internal links go through next/link for client-side navigation;
      // external ones get the usual safety attributes.
      out.push(
        href.startsWith("/") ? (
          <Link key={key} href={href} className="nb-link">
            {label}
          </Link>
        ) : (
          <a
            key={key}
            href={href}
            className="nb-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {label}
          </a>
        ),
      );
    } else if (token.startsWith("`")) {
      out.push(
        <code key={key} className="nb-inline-code">
          {token.slice(1, -1)}
        </code>,
      );
    } else {
      out.push(<strong key={key}>{token.slice(2, -2)}</strong>);
    }

    last = start + token.length;
  }

  if (last < text.length) out.push(text.slice(last));
  return out;
}

function renderBlock(block: Block, i: number): React.ReactNode {
  const key = `b${i}`;

  switch (block.kind) {
    case "p":
      return (
        <p key={key} className="nb-p">
          {inline(block.text, key)}
        </p>
      );

    case "h2":
      return (
        <h2 key={key} id={block.id} className="nb-h2">
          {/* The anchor is the point: a fragment URL is what lets a citation
              land on the exact section that answers the question, rather than
              on the top of a long page. */}
          <a href={`#${block.id}`} className="nb-anchor" aria-label={`Link to ${block.text}`}>
            #
          </a>
          {inline(block.text, key)}
        </h2>
      );

    case "h3":
      return (
        <h3 key={key} id={block.id} className="nb-h3">
          {inline(block.text, key)}
        </h3>
      );

    case "ul":
      return (
        <ul key={key} className="nb-ul">
          {block.items.map((item, j) => (
            <li key={j}>{inline(item, `${key}-${j}`)}</li>
          ))}
        </ul>
      );

    case "ol":
      return (
        <ol key={key} className="nb-ol">
          {block.items.map((item, j) => (
            <li key={j}>{inline(item, `${key}-${j}`)}</li>
          ))}
        </ol>
      );

    case "code":
      return (
        <figure key={key} className="nb-code-fig">
          <pre className="nb-pre">
            <code data-lang={block.lang}>{block.code}</code>
          </pre>
          {block.caption ? <figcaption className="nb-cap">{block.caption}</figcaption> : null}
        </figure>
      );

    case "callout":
      return (
        <aside key={key} className={`nb-callout nb-callout--${block.tone}`}>
          {block.title ? <p className="nb-callout-title">{block.title}</p> : null}
          <p className="nb-callout-text">{inline(block.text, key)}</p>
        </aside>
      );

    case "quote":
      return (
        <blockquote key={key} className="nb-quote">
          <p>{inline(block.text, key)}</p>
          {block.cite ? <cite className="nb-cite">{block.cite}</cite> : null}
        </blockquote>
      );

    case "pullquote":
      // `<aside>`, not `<blockquote>`. The words are already in the article a
      // paragraph away; this is a second presentation of them, not a citation
      // of somebody else. Marking it as an aside is also what keeps a consumer
      // reading the page for prose from counting the sentence twice.
      return (
        <aside key={key} className="nb-pullquote">
          <p>{inline(block.text, key)}</p>
        </aside>
      );

    case "promote": {
      const page = getPage(block.href);
      // Loud, not silent. Every article is generated at build time, so a bad
      // href fails `npm run build` with the path in the message rather than
      // rendering an article with a hole where a card should be. `seeAlso`
      // filters unknown pages away quietly and that has always been a worse
      // trade — AGENTS.md §7 is about exactly this class of thing.
      if (!page) {
        throw new Error(
          `notebook: a "promote" block points at "${block.href}", which is not in lib/pages.ts`,
        );
      }
      return (
        <aside
          key={key}
          className="nb-promote"
          style={{ ["--promo" as string]: page.accent }}
        >
          <p className="nb-promote-kicker">Elsewhere on this site</p>
          <Link href={page.href} className="nb-promote-link">
            <span className="nb-promote-title">{page.label}</span>
            <span className="nb-promote-blurb">{block.note ?? page.blurb}</span>
            <span className="nb-promote-cta">
              Have a look <span aria-hidden="true">→</span>
            </span>
          </Link>
        </aside>
      );
    }

    case "table":
      return (
        <figure key={key} className="nb-table-fig">
          {/* The wrapper scrolls, not the page. A wide table that pushes the
              document into horizontal scroll is a mobile bug on every page it
              appears on. */}
          <div className="nb-table-scroll">
            <table className="nb-table">
              <thead>
                <tr>
                  {block.head.map((h, j) => (
                    <th key={j} scope="col">
                      {inline(h, `${key}-h${j}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, c) => (
                      <td key={c}>{inline(cell, `${key}-${r}-${c}`)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption ? <figcaption className="nb-cap">{block.caption}</figcaption> : null}
        </figure>
      );
  }
}

export default function PostBody({ blocks }: { blocks: Block[] }) {
  return <>{blocks.map(renderBlock)}</>;
}
