import type { ReactNode } from "react";

/**
 * The numbered section kicker, as a pill.
 *
 * The homepage numbers its long-form sections — 02 / The Evolution, 05 /
 * Operating Principles, 06 / Experience, 07 / Academic Foundations — and those
 * numbers used to be loose mono text sitting above each heading. As a chip with
 * a leading dot they read as one recurring device instead of four separate
 * labels, and they echo the year pills on the era cards.
 *
 * This is deliberately a shared component rather than four copies. The repo's
 * house rule is that per-page bespoke work is normal and shared abstraction is
 * the exception — but this *is* the exception: the whole point is that all four
 * are identical in shape. What is not shared is colour. Each section passes its
 * own palette, because they sit on white, on pale blue and on cream, and a
 * single hard-coded ink fails contrast on at least one of them.
 */

type Props = {
  children: ReactNode;
  /** Border + background for the chip, per the section's own palette. */
  chipClassName?: string;
  /** The leading dot. */
  dotClassName?: string;
  /** The label itself. Must clear 4.5:1 against the section's ground. */
  textClassName?: string;
  /** Spacing below, owned by the caller — headings sit at different rhythms. */
  className?: string;
};

export default function SectionKicker({
  children,
  // NB: the opacity must be bracketed. Tailwind's opacity scale runs in steps of
  // five, so `/12` is not a valid modifier — it compiles to nothing and the
  // border silently falls back to the preflight grey (#E5E7EB), which is close
  // enough to the intended hairline that it survived a visual check and was only
  // caught by reading the computed style.
  chipClassName = "border-[#1A1A1A]/[0.12] bg-[#1A1A1A]/[0.03]",
  dotClassName = "bg-[#0A0A0A]/45",
  textClassName = "text-[#4A4A4A]",
  className = "mb-6",
}: Props) {
  return (
    // The margin lives on a block wrapper: a vertical margin on the inline-flex
    // chip itself does not reliably push the heading below it down.
    <div className={className}>
      <span
        className={`inline-flex items-center gap-2.5 rounded-full border pl-3.5 pr-3 py-1.5 ${chipClassName}`}
      >
        <span aria-hidden className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotClassName}`} />
        {/* pr is trimmed against pl because the 0.3em tracking leaves a gap
            after the final character that would otherwise look off-centre. */}
        <span
          className={`font-manrope text-[10px] uppercase tracking-[0.3em] whitespace-nowrap ${textClassName}`}
        >
          {children}
        </span>
      </span>
    </div>
  );
}
