import { Card, CardContent } from "@/components/ui/card";
import { Star, Loader2, Quote } from "lucide-react";
import { useSharedGoogleData } from "@/hooks/useSharedGoogleData";

const ReviewsSection = () => {
  const { reviews, rating, totalReviews, loading, error } = useSharedGoogleData('ChIJyWRl2reQuhQR31Cno53zvaA');

  const renderStars = (r: number) =>
    [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-3.5 w-3.5 ${i < r ? 'text-primary fill-current' : 'text-muted-foreground/30'}`}
      />
    ));

  return (
    <section id="reviews" className="py-20 md:py-28 px-5 sm:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-14">
          <span className="text-xs uppercase tracking-[0.28em] text-primary font-medium">
            Kind words · Guests
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-foreground mt-4 mb-5 leading-[1.05] text-balance">
            Told better
            <span className="italic text-primary"> by our guests.</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            A few notes left on Google by people who wandered in for a bottle of water and stayed for the yoghurt.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center gap-3 py-16 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            Gathering the latest kind words…
          </div>
        ) : error || reviews.length === 0 ? (
          <div className="bento-card p-10 md:p-14 max-w-2xl bg-muted/40 border-none">
            <Quote className="h-8 w-8 text-primary mb-4" />
            <p className="font-display text-2xl md:text-3xl text-foreground leading-snug text-balance">
              The guestbook is quiet for a moment.
            </p>
            <p className="mt-4 text-muted-foreground text-pretty">
              We&apos;re still gathering kind words from our visitors — check back soon, or come by the shop in Anaxos and leave your own story on the shelf.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
              {reviews.slice(0, 8).map((review, index) => (
                <Card
                  key={index}
                  className={`bento-card border-none p-6 flex flex-col ${index % 3 === 1 ? 'lg:translate-y-6' : ''}`}
                >
                  <CardContent className="p-0 flex-1 flex flex-col">
                    <Quote className="h-5 w-5 text-primary/60 mb-3" />
                    <p className="font-display text-lg md:text-xl text-foreground leading-snug mb-6 text-pretty flex-1">
                      &ldquo;{review.text}&rdquo;
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/60">
                      <div>
                        <div className="text-sm font-medium text-foreground">{review.author_name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {review.relative_time_description}
                        </div>
                      </div>
                      <div className="flex gap-0.5">{renderStars(review.rating)}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-14 rounded-3xl bg-primary text-primary-foreground p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between grain">
              <div>
                <div className="text-xs uppercase tracking-[0.28em] opacity-80">Google Reviews</div>
                <div className="font-display text-3xl md:text-4xl mt-2 leading-tight">
                  {rating ? `${rating.toFixed(1)} out of 5` : 'Loved by our guests'}
                </div>
                <p className="text-sm opacity-90 mt-1">
                  Based on {totalReviews ?? '—'} verified reviews.
                </p>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-6 w-6 ${i < Math.round(rating ?? 0) ? 'fill-current' : 'opacity-40'}`}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ReviewsSection;
