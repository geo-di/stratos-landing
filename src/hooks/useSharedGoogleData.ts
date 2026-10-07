
import { useState, useEffect } from 'react';

export interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  relative_time_description: string;
}

export interface OpeningHours {
  open_now: boolean;
  periods: Array<{
    close: { day: number; time: string };
    open: { day: number; time: string };
  }>;
  weekday_text: string[];
}

export interface UseSharedGoogleDataReturn {
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

/**
 * Dev only: `?data=demo|worst|one|empty` swaps the Places response for a
 * fixture (src/dev/googleFixtures.ts), so the reviews and hours can be
 * designed and stress-tested under `vite dev`, where /api isn't served.
 * The branch is dead code in production builds, fixtures included.
 */
const loadDevFixture = async (): Promise<UseSharedGoogleDataReturn | null> => {
  if (!import.meta.env.DEV) return null;
  const name = new URLSearchParams(window.location.search).get('data');
  if (!name) return null;
  const { googleFixtures } = await import('../dev/googleFixtures');
  return googleFixtures[name] ?? null;
};

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
    // Subscribe to updates. Every path below returns this cleanup — an early
    // return without it left unmounted components subscribed forever.
    subscribers.push(setData);
    const unsubscribe = () => {
      subscribers = subscribers.filter(callback => callback !== setData);
    };

    // If we already have data, use it; if a request is in flight, wait for it
    if (sharedData && !sharedData.loading) {
      setData(sharedData);
      return unsubscribe;
    }
    if (isLoading) {
      return unsubscribe;
    }

    // Start loading
    isLoading = true;
    const fetchData = async () => {
      try {
        const fixture = await loadDevFixture();
        if (fixture) {
          sharedData = fixture;
          subscribers.forEach(callback => callback(fixture));
          return;
        }

        console.log('Making single API call for Google data...');

        const response = await fetch('/api/google-reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ placeId }),
        });

        const result = await response.json();

        if (!response.ok) throw new Error(result?.error || 'Failed to fetch Google data');

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

    return unsubscribe;
  }, [placeId]);

  return data;
};
