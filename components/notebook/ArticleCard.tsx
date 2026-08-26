import Link from "next/link";
import PostCover from "./PostCover";
import { CATEGORY_ACCENT } from "@/lib/notebook/types";
import type { CardPost } from "@/lib/notebook/card";

/**
 * One article card, as a **server** component.
 *
 * The same markup existed inside `NotebookBrowser`, which is a client component.
 * That was fine while the index was a single filtered grid; it stopped being
 * fine when the front page became a set of server-rendered sections, because a
 * card in a rail has no interactive behaviour and there is no reason to ship it
 * to the browser or to serialise its data across the boundary.
 *
 * Kept deliberately dumb: it takes a `CardPost` and renders. Everything about
 * which cards appear where is decided by `magazine()` in lib/notebook.
 */

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function ArticleCard({
  post,
  priority = false,
}: {
  post: CardPost;
  /** Only the cards above the fold on first paint should set this. */
  priority?: boolean;
}) {
  return (
    <article className="nb-card">
      <Link href={`/notebook/${post.slug}`} className="nb-card-link">
        <PostCover
          slug={post.slug}
          category={post.category}
          cover={post.cover}
          coverAlt={post.coverAlt}
          priority={priority}
          className="nb-card-cover"
        />
        <div className="nb-card-body">
          <p className="nb-card-meta">
            <span className="nb-card-cat" style={{ color: CATEGORY_ACCENT[post.category] }}>
              {post.category}
            </span>
            <span className="nb-card-sep">·</span>
            <span>{formatDate(post.published)}</span>
            <span className="nb-card-sep">·</span>
            <span>{post.readingMinutes} min</span>
          </p>
          <h3 className="nb-card-title">{post.title}</h3>
          <p className="nb-card-excerpt">{post.answer}</p>
        </div>
      </Link>
    </article>
  );
}
