import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import Contact from "@/components/sections/Contact";
import RelatedPages from "@/components/ui/RelatedPages";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ArticleCard from "@/components/notebook/ArticleCard";
import { Pagination } from "@/components/notebook/magazine";
import { toCardPost } from "@/lib/notebook/card";
import { archivePage, magazine } from "@/lib/notebook";
import "../../notebook.css";
import "../../blog.css";

/**
 * `/notebook/page/<n>` — the archive, from page two onward.
 *
 * ## Why real routes rather than `?page=2`
 *
 * `AEO_PLAYBOOK.md` §3.4 anticipated this exact moment: query-string variants
 * split the index's link equity across URLs showing subsets of the same content,
 * so when the archive outgrew one page the answer was always going to be real
 * routes with their own metadata.
 *
 * ## Why page one is not here
 *
 * Page one is `/notebook`, and there is deliberately no `/notebook/page/1`. Two
 * addresses for one page is the duplicate this file exists to avoid, and the
 * pager in `magazine.tsx` links `1` back to `/notebook` for the same reason.
 *
 * ## Why these are indexable
 *
 * Each page self-canonicalises and carries `rel="prev"`/`"next"` through the
 * pager. They are not `noindex`: an archive page is the only route by which some
 * articles are reachable by crawl, and hiding it would orphan them.
 *
 * `dynamicParams = false`, so a page number beyond the archive 404s rather than
 * rendering an empty grid — the same decision the category archives make.
 */

export function generateStaticParams() {
  const { totalPages } = magazine();
  // From 2. Page one lives at /notebook.
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({ n: String(i + 2) }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ n: string }>;
}): Promise<Metadata> {
  const { n } = await params;
  const page = Number(n);
  const { totalPages } = magazine();

  return {
    title: { absolute: `Notebook — page ${page} of ${totalPages} · Suman Debnath` },
    description: `Older articles from the notebook — page ${page} of ${totalPages}. First-hand writing on building AI-native products, debugging, and being found by answer engines.`,
    alternates: { canonical: `/notebook/page/${page}` },
  };
}

export default async function NotebookArchivePage({
  params,
}: {
  params: Promise<{ n: string }>;
}) {
  const { n } = await params;
  const page = Number(n);
  if (!Number.isInteger(page) || page < 2) notFound();

  const { posts, totalPages } = archivePage(page);
  if (posts.length === 0) notFound();

  return (
    <MotionProvider>
      <Navigation />

      <main className="nb">
        {/* A plain masthead. The magazine treatment belongs to page one; from
            here the job is a legible list, which is what the reader came for. */}
        <header className="nb-mast nb-mast--archive">
          <div className="nb-wide">
            <Breadcrumbs
              trail={[
                { label: "Notebook", href: "/notebook" },
                { label: `Page ${page}`, href: `/notebook/page/${page}` },
              ]}
              variant="paper"
              className="mb-7"
            />
            <p className="nb-eyebrow">The notebook</p>
            <h1 className="nb-title">Page {page}</h1>
            <p className="nb-standfirst">
              Older articles, newest first. Page {page} of {totalPages}.
            </p>
          </div>
        </header>

        <div className="nb-wide" style={{ paddingBlock: "3rem 5rem" }}>
          <div className="nb-grid">
            {posts.map((p, i) => (
              <ArticleCard key={p.slug} post={toCardPost(p)} priority={i < 3} />
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} />
        </div>
      </main>

      <RelatedPages href="/notebook" variant="paper" surface="#ece5d8" />
      <Contact variant="light" />
    </MotionProvider>
  );
}
