import { Loader2 } from "lucide-react";
import { useSharedGoogleData } from "@/hooks/useSharedGoogleData";
import { useState } from "react";
import { STORE_PLACE_ID } from "@/config/store";

const MAX_REVIEW_LENGTH = 160;

const truncateReview = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return { excerpt: text, isTruncated: false };
  const excerpt = text.slice(0, maxLength).trim() + "…";
  return { excerpt, isTruncated: true };
};

const Stars = ({ count = 5, className = "" }: { count?: number; className?: string }) => (
  <div className={`text-[15px] tracking-[2px] ${className}`} aria-hidden="true">
    {"★".repeat(count)}
    <span className="opacity-30">{"★".repeat(5 - count)}</span>
  </div>
);

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
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-10 md:mb-12">
          <h2 className="font-display text-[clamp(2.5rem,6vw,64px)] text-foreground m-0">
            What people<br />say
          </h2>
          {rating != null && (
            <div className="sm:text-right">
              <div className="font-display text-[clamp(2.75rem,5vw,56px)] text-primary leading-none">
                {rating.toFixed(1)}
              </div>
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground mt-1">
                {"★".repeat(Math.round(rating))} · Google reviews
                {totalReviews ? ` (${totalReviews})` : ''}
              </div>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex items-center gap-3 py-16 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            Gathering the latest kind words…
          </div>
        ) : error || reviews.length === 0 ? (
          <div className="bento-card max-w-2xl p-10 md:p-14">
            <p className="font-display text-3xl md:text-4xl text-foreground">
              The guestbook is quiet for a moment.
            </p>
            <p className="mt-4 text-muted-foreground text-pretty">
              We&apos;re still gathering kind words from our visitors — check back soon, or come by
              the shop in Anaxos and leave your own story on the shelf.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.slice(0, 6).map((review, index) => {
              const isFeature = index % 3 === 2;
              const { excerpt, isTruncated } = truncateReview(review.text, MAX_REVIEW_LENGTH);
              const isExpanded = expanded.has(index);

              return (
                <article
                  key={index}
                  className={`rounded-[20px] p-7 flex flex-col ${
                    isFeature
                      ? 'bg-ultramarine text-ultramarine-foreground'
                      : 'bg-card text-card-foreground border border-border'
                  } ${index % 3 === 1 ? 'lg:translate-y-6' : ''}`}
                >
                  <Stars
                    count={review.rating}
                    className={`mb-3 ${isFeature ? 'text-accent' : 'text-primary'}`}
                  />
                  <p className="font-display font-medium normal-case text-[22px] leading-[1.2] tracking-normal m-0 mb-5 flex-1 text-pretty">
                    &ldquo;{isExpanded ? review.text : excerpt}&rdquo;
                  </p>
                  {isTruncated && (
                    <button
                      type="button"
                      onClick={() => toggleExpanded(index)}
                      className={`self-start text-sm font-semibold mb-4 hover:opacity-80 transition-opacity ${
                        isFeature ? 'text-accent' : 'text-primary'
                      }`}
                    >
                      {isExpanded ? "Show less" : "Read more"}
                    </button>
                  )}
                  <div
                    className={`pt-3.5 border-t ${
                      isFeature ? 'border-ultramarine-foreground/20' : 'border-border'
                    }`}
                  >
                    <div className="text-sm font-semibold">{review.author_name}</div>
                    <div
                      className={`text-xs ${
                        isFeature ? 'text-ultramarine-foreground/70' : 'text-muted-foreground'
                      }`}
                    >
                      {review.relative_time_description}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewsSection;
