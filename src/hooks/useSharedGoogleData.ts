
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  relative_time_description: string;
}

interface OpeningHours {
  open_now: boolean;
  periods: Array<{
    close: { day: number; time: string };
    open: { day: number; time: string };
  }>;
  weekday_text: string[];
}

interface UseSharedGoogleDataReturn {
  reviews: GoogleReview[];
  rating: number | null;
  totalReviews: number | null;
  openingHours: OpeningHours | null;
  loading: boolean;
  error: string | null;
}

let sharedData: UseSharedGoogleDataReturn | null = null;
let isLoading = false;
let subscribers: Array<(data: UseSharedGoogleDataReturn) => void> = [];

export const useSharedGoogleData = (placeId: string): UseSharedGoogleDataReturn => {
  const [data, setData] = useState<UseSharedGoogleDataReturn>(() => 
    sharedData || {
      reviews: [],
      rating: null,
      totalReviews: null,
      openingHours: null,
      loading: true,
      error: null,
    }
  );

  useEffect(() => {
    // Subscribe to updates
    subscribers.push(setData);

    // If we already have data, return it
    if (sharedData && !sharedData.loading) {
      return;
    }

    // If already loading, don't start another request
    if (isLoading) {
      return;
    }

    // Start loading
    isLoading = true;
    const fetchData = async () => {
      try {
        console.log('Making single API call for Google data...');
        
        const { data: result, error } = await supabase.functions.invoke('google-reviews', {
          body: { placeId }
        });

        if (error) throw error;

        const newData: UseSharedGoogleDataReturn = {
          reviews: result?.reviews || [],
          rating: result?.rating ?? null,
          totalReviews: result?.totalReviews ?? null,
          openingHours: result?.openingHours ?? null,
          loading: false,
          error: null,
        };

        sharedData = newData;
        
        // Notify all subscribers
        subscribers.forEach(callback => callback(newData));
      } catch (err) {
        console.error('Error fetching shared Google data:', err);
        const errorData: UseSharedGoogleDataReturn = {
          reviews: [],
          rating: null,
          totalReviews: null,
          openingHours: null,
          loading: false,
          error: err instanceof Error ? err.message : 'Unknown error occurred',
        };

        sharedData = errorData;
        subscribers.forEach(callback => callback(errorData));
      } finally {
        isLoading = false;
      }
    };

    fetchData();

    // Cleanup subscription
    return () => {
      subscribers = subscribers.filter(callback => callback !== setData);
    };
  }, [placeId]);

  return data;
};
