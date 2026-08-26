import Link from "next/link";
import PostCover from "./PostCover";
import { CATEGORY_ACCENT } from "@/lib/notebook/types";
import type { CardPost } from "@/lib/notebook/card";

/**
 * Text left, small thumbnail right. A **server** component, like `ArticleCard`.
 *
 * This is the densest card in the system and the one the rail is built from.
 * `ArticleCard` is a cover above a title and needs roughly 20rem of width to
 * work; in a 17rem rail it would render a postage stamp above a headline and
 * fit two of them on a screen. Turning the image ninety degrees — thumbnail
 * right, text left — is how HBR fits four articles into the height its own
 * lead story occupies, and it is the shape the front page will want in step 3
 * as well. It is written here to be reused, not to serve one rail.
 *
 * Deliberately carries less than `ArticleCard`: category, title, date and
 * reading time, and **no excerpt**. A `post.answer` is 40–60 words by
 * specification, which is longer than everything else on the card put together.
 */

// The third copy of this in components/notebook, matching the local ones in
// ArticleCard and magazine.tsx rather than inventing a fourth convention.
// `formatPostDate` in lib/notebook is the long form — "26 August 2026" — which
// is right for a dateline under an H1 and too wide for a card.
function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function CompactCard({
  post,
  sizes,
}: {
  post: CardPost;
  /**
   * The `sizes` hint for the thumbnail. **Required, with no default** — the one
   * lesson PAGE_OPTIMIZATION §4.2b records twice is that a shared image
   * component with a hardcoded hint is correct at the call site it was written
   * for and silently wrong at the next one. A card this small has a lot of room
   * to be wrong in: the thumbnail is 4.5rem in the rail and will be wider on
   * the front page. Making the prop required means a new call site cannot
   * forget it.
   */
  sizes: string;
}) {
  return (
    <article className="nb-compact">
      <Link href={`/notebook/${post.slug}`} className="nb-compact-link">
        <div className="nb-compact-body">
          <p className="nb-compact-cat" style={{ color: CATEGORY_ACCENT[post.category] }}>
            {post.category}
          </p>
          <h4 className="nb-compact-title">{post.title}</h4>
          <p className="nb-compact-meta">
            <span>{formatDate(post.published)}</span>
            <span className="nb-card-sep">·</span>
            <span>{post.readingMinutes} min</span>
          </p>
        </div>
        <PostCover
          slug={post.slug}
          category={post.category}
          cover={post.cover}
          coverAlt={post.coverAlt}
          sizes={sizes}
          className="nb-compact-cover"
        />
      </Link>
    </article>
  );
}
