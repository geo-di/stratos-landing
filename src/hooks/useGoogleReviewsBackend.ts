
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

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

export const useGoogleReviewsBackend = (placeId: string): UseGoogleReviewsReturn => {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        console.log('Calling google-reviews edge function...');
        
        const { data, error } = await supabase.functions.invoke('google-reviews', {
          body: { placeId }
        });

        if (error) {
          throw error;
        }

        if (data?.reviews) {
          setReviews(data.reviews);
        } else {
          throw new Error('No reviews data received');
        }
      } catch (err) {
        console.error('Error fetching Google Reviews:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [placeId]);

  return { reviews, loading, error };
};
