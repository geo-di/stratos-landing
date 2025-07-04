
import { useState, useEffect } from 'react';

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  relative_time_description: string;
}

interface UseGoogleReviewsReturn {
  reviews: GoogleReview[];
  loading: boolean;
  error: string | null;
}

export const useGoogleReviews = (placeId: string, apiKey: string | null): UseGoogleReviewsReturn => {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!apiKey) {
        setError('Google Places API key is required');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`
        );
        
        const data = await response.json();
        
        if (data.status === 'OK' && data.result?.reviews) {
          // Filter to only 5-star reviews
          const fiveStarReviews = data.result.reviews.filter(
            (review: GoogleReview) => review.rating === 5
          );
          setReviews(fiveStarReviews);
        } else {
          throw new Error(data.error_message || 'Failed to fetch reviews');
        }
      } catch (err) {
        console.error('Error fetching Google Reviews:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [placeId, apiKey]);

  return { reviews, loading, error };
};
