
import { Card, CardContent } from "@/components/ui/card";
import { Star, Loader2 } from "lucide-react";
import { useGoogleReviewsBackend } from "@/hooks/useGoogleReviewsBackend";

const ReviewsSection = () => {
  const { reviews, rating, totalReviews, loading, error } = useGoogleReviewsBackend('ChIJyWRl2reQuhQR31Cno53zvaA');

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 60) return '1 month ago';
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <section id="reviews" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600">
            Real reviews from Google Maps - hear from our happy customers!
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Loading reviews...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">Error loading reviews: {error}</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Error loading reviews.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {reviews.slice(0, 8).map((review, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="flex space-x-1 mr-2">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm text-gray-500">
                        {review.relative_time_description || formatDate(review.time)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 text-sm line-clamp-4">
                      "{review.text}"
                    </p>
                    <div className="font-medium text-gray-900">
                      {review.author_name}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">
                Total reviews: {totalReviews ?? 'N/A'}
              </p>
              <div className="flex items-center justify-center space-x-2">
                <div className="flex space-x-1">
                  {renderStars(Math.round(rating ?? 0))}
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  {rating ? `${rating.toFixed(1)}/5` : 'N/A'}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ReviewsSection;
