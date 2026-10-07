import { useState, type CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { useSharedGoogleData } from "@/hooks/useSharedGoogleData";
import { STORE_MAPS_URL, STORE_PLACE_ID } from "@/config/store";

/** Long reviews clamp to six lines behind "Read more". */
const LONG_REVIEW = 240;

const revealDelay = (i: number) => ({ "--reveal-delay": `${i * 60}ms` }) as CSSProperties;

// Intl.Segmenter isn't in this project's TS lib yet; declare the slice we use.
type GraphemeSegmenter = { segment(input: string): Iterable<{ segment: string }> };
const SegmenterCtor = (
  Intl as unknown as { Segmenter?: new (locale?: string, opts?: { granularity: "grapheme" }) => GraphemeSegmenter }
).Segmenter;
const segmenter = SegmenterCtor ? new SegmenterCtor(undefined, { granularity: "grapheme" }) : null;

const firstGrapheme = (word: string) => {
  if (segmenter) {
    for (const { segment } of segmenter.segment(word)) return segment;
    return "";
  }
  return Array.from(word)[0] ?? "";
};

/** Name suffixes that aren't a surname: "Montgomery III" → "CM", not "CI". */
const SUFFIX = /^(jr|sr|ii|iii|iv|v|vi)\.?$/i;

/**
 * First grapheme of the first and last words: "Jo" → "J", "Γιώργος
 * Παπαδόπουλος" → "ΓΠ". Words with no letters are skipped and leading emoji
 * or punctuation is stripped, so "🌊 Marina" → "M", and a trailing suffix is
 * ignored.
 */
const initials = (name: string) => {
  const words = name
    .trim()
    .split(/\s+/)
    .filter((w) => /\p{L}/u.test(w))
    .filter((w, i, all) => !(i > 0 && i === all.length - 1 && SUFFIX.test(w)));
  if (words.length === 0) return "";
  const picks = words.length === 1 ? [words[0]] : [words[0], words[words.length - 1]];
  return picks.map((w) => firstGrapheme(w.replace(/^[^\p{L}]+/u, "")).toUpperCase()).join("");
};

const Stars = ({ count, className = "" }: { count: number; className?: string }) => (
  <span className={`tracking-[2px] ${className}`} role="img" aria-label={`${count} out of 5 stars`}>
    {"★".repeat(count)}
    <span className="opacity-30">{"★".repeat(5 - count)}</span>
  </span>
);

/** The rating as a postage stamp's face value. Visual only — see the sr-only line. */
const RatingStamp = ({ rating }: { rating: number }) => (
  <div className="relative w-[64px] h-[76px] shrink-0 rotate-[4deg] drop-shadow-sm" aria-hidden="true">
    <div className="stamp-paper absolute inset-0 bg-background" />
    <div className="absolute inset-[7px] border border-primary/40 bg-card flex flex-col items-center justify-center">
      <span className="font-display font-black text-[28px] leading-none text-primary">{rating}</span>
      <span className="text-[11px] leading-none text-primary mt-0.5">★</span>
    </div>
  </div>
);

/** When it was sent, as a postmark. Visual only — see the sr-only line. */
const Postmark = ({ when }: { when: string }) => (
  <div
    className="h-[68px] w-[68px] shrink-0 rounded-full border-2 border-ultramarine/50 flex items-center justify-center text-center -rotate-[10deg] text-ultramarine/75 font-display font-bold leading-[1.05] text-[10px] tracking-[0.06em] px-2"
    aria-hidden="true"
  >
    {when}
  </div>
);

const QuietGuestbook = () => (
  <div className="max-w-2xl rounded-[6px] bg-card border border-border shadow-soft p-10 md:p-14">
    <p className="font-display text-3xl md:text-4xl text-foreground m-0">The guestbook is quiet for a moment.</p>
    <p className="mt-4 mb-0 text-muted-foreground text-pretty">
      We&apos;re still gathering kind words from our visitors — check back soon, or come by the shop in Anaxos and
      leave your own story on the shelf.
    </p>
  </div>
);

/**
 * Guests: the page's quiet section after the notebook. Straight cream cards
 * that read easily; the only postal props left are the two that carry
 * information — the rating as the stamp's value, the date as the postmark.
 */
const ReviewsSection = () => {
  const { reviews, rating, totalReviews, loading, error } = useSharedGoogleData(STORE_PLACE_ID);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const toggleExpanded = (index: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <section id="reviews" className="py-16 md:py-24 px-5 sm:px-10 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-10 md:mb-14">
          <div>
            <div className="section-index text-ultramarine">03 — Guests</div>
            <h2 className="font-display text-[clamp(2.5rem,6vw,64px)] text-foreground m-0">
              What people<br />say
            </h2>
          </div>
          {rating != null && (
            <div className="sm:text-right">
              <div className="flex sm:justify-end items-baseline gap-3">
                <span className="font-display text-[clamp(2.75rem,5vw,56px)] text-primary leading-none">
                  {rating.toFixed(1)}
                </span>
                <Stars count={Math.round(rating)} className="text-primary text-[15px]" />
              </div>
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground mt-1.5">
                {totalReviews
                  ? `${totalReviews.toLocaleString()} Google ${totalReviews === 1 ? "review" : "reviews"}`
                  : "Google reviews"}
              </div>
              <a
                href={STORE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 mt-3 text-sm font-bold text-primary hover:text-primary-deep"
              >
                Read all on Google
                <ArrowUpRight className="h-4 w-4 transition-transform duration-150 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          )}
        </div>

        {loading ? (
          // Same footprint as the real cards, so the grid doesn't jump when they land
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-busy="true">
            <span className="sr-only">Loading reviews…</span>
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-[280px] rounded-[6px] bg-card border border-border animate-pulse" aria-hidden="true" />
            ))}
          </div>
        ) : error || reviews.length === 0 ? (
          <QuietGuestbook />
        ) : (
          // Columns follow the count, so one or two reviews don't sit stranded in a three-column grid
          <ul
            className={`grid grid-cols-1 gap-6 m-0 p-0 list-none ${
              reviews.length === 1
                ? "max-w-[640px] mx-auto"
                : reviews.length === 2
                  ? "md:grid-cols-2"
                  : "md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {reviews.slice(0, 6).map((review, index) => {
              const isLong = review.text.length > LONG_REVIEW;
              const isExpanded = expanded.has(index);

              return (
                <li key={`${review.author_name}-${review.time}`} data-reveal style={revealDelay(index)}>
                  <article className="h-full rounded-[6px] bg-card border border-border shadow-soft p-6 sm:p-7 flex flex-col">
                    <div className="flex items-start justify-between gap-3 mb-5">
                      <Postmark when={review.relative_time_description} />
                      <RatingStamp rating={review.rating} />
                    </div>
                    <p className="sr-only">
                      Rated {review.rating} out of 5, {review.relative_time_description}.
                    </p>

                    {review.text ? (
                      <blockquote
                        className={`m-0 text-[16px] leading-[1.65] text-foreground/85 text-pretty whitespace-pre-line [overflow-wrap:anywhere] ${
                          isLong && !isExpanded ? "line-clamp-6" : ""
                        }`}
                      >
                        {review.text}
                      </blockquote>
                    ) : (
                      <p className="m-0 text-[16px] italic text-muted-foreground">
                        Left a {review.rating}-star rating, no words needed.
                      </p>
                    )}
                    {isLong && (
                      <button
                        type="button"
                        onClick={() => toggleExpanded(index)}
                        aria-expanded={isExpanded}
                        className="self-start mt-2 text-sm font-bold text-primary hover:text-primary-deep"
                      >
                        {isExpanded ? "Show less" : "Read more"}
                      </button>
                    )}

                    <div className="mt-auto pt-6 flex items-center gap-3">
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-primary text-xs font-bold"
                        aria-hidden="true"
                      >
                        {initials(review.author_name)}
                      </span>
                      <span className="min-w-0 font-display font-bold italic normal-case text-[20px] leading-tight text-ultramarine [overflow-wrap:anywhere]">
                        {review.author_name}
                      </span>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};

export default ReviewsSection;
