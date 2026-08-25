import { answerForPage } from "@/lib/page-answers";

/**
 * The extractable answer, rendered directly under a product page's headline.
 *
 * ## What this is for
 *
 * An answer engine assembling a response takes the first self-contained block
 * after the heading. Product pages here open with a designed hero and then run
 * straight into narrative — good to read, and close to unusable to quote,
 * because no single paragraph says what the thing *is*. An audit of the live
 * site found 9 of 41 pages carrying such a block; every product page had FAQs
 * at the foot and no summary at the top.
 *
 * This is the same device as `.nb-answer` on a notebook article and `.ab-answer`
 * on /about, generalised so ten bespoke hero designs can each mount one line
 * instead of ten variations being hand-written into ten stylesheets.
 *
 * ## Why it is a rule and not a card
 *
 * Every one of these heroes already carries gradients, glows and a screenshot.
 * A boxed panel would be one more competing object; a rule down the left edge in
 * the page's own accent reads as emphasis on the text that is already there.
 * It also means the block cannot collide with a hero's existing card styles.
 *
 * ## Placement
 *
 * Immediately after the `</h1>`. Not in the FAQ block at the foot — that answers
 * questions, this states a definition, and the distance from the heading is the
 * whole point.
 *
 * Renders nothing when the route has no entry in lib/page-answers, so mounting
 * it speculatively is harmless.
 */
export default function PageAnswer({
  href,
  className = "",
}: {
  /** The page's path, exactly as keyed in lib/page-answers.ts. */
  href: string;
  className?: string;
}) {
  const answer = answerForPage(href);
  if (!answer) return null;

  const paper = answer.variant === "paper";
  const centred = answer.align === "center";

  /*
    Two layouts, and the centred one is not a variation on the left one.

    A left rule beside centred text reads as a mistake — the rule implies an
    edge the text does not have. So the centred version drops the rule entirely
    and takes its emphasis from being brighter and slightly larger than the deck
    beneath it, which is how every other centred hero on this site distinguishes
    its lines.

    The centred version is also **deliberately tighter**: a wider measure, a
    smaller step and shorter margins. That is not taste, it is arithmetic. Every
    product banner is designed to show through to its CTA without scrolling, and
    adding a breadcrumb and this block pushed the CTA 141px below the fold at
    1365×600. A wider measure costs fewer lines, so the block gives most of that
    back. Do not loosen these values without re-measuring the CTA position.
  */
  const layout = centred
    ? "mx-auto my-5 max-w-4xl text-center text-[14.5px] leading-[1.6] sm:text-[16px]"
    : "mx-auto my-7 max-w-3xl border-l-2 pl-5 text-left text-[15px] leading-[1.75] sm:text-[17px]";

  return (
    <p
      className={`sd-answer relative ${layout} ${
        paper ? "text-[#191512]/[0.82]" : "text-white/[0.82]"
      } ${className}`}
      style={centred ? undefined : { borderColor: answer.accent }}
    >
      {answer.text}
    </p>
  );
}
