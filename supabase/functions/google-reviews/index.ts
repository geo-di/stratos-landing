
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { placeId } = await req.json();

    if (!placeId) {
      throw new Error('Place ID is required');
    }

    const apiKey = Deno.env.get('GOOGLE_PLACES_API_KEY');

    if (!apiKey) {
      throw new Error('Google Places API key not configured');
    }

    console.log('Fetching reviews and hours for place:', placeId);

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total,reviews,opening_hours&key=${apiKey}`
    );

    const data = await response.json();

    if (data.status === 'OK' && data.result) {
      const allReviews: GoogleReview[] = data.result.reviews || [];
      const fiveStarReviews = allReviews.filter((r) => r.rating === 5);

      const rating = data.result.rating;
      const totalReviews = data.result.user_ratings_total;
      const openingHours: OpeningHours | null = data.result.opening_hours || null;

      console.log(`Found ${fiveStarReviews.length} five-star reviews`);
      console.log('Opening hours:', openingHours);

      return new Response(
        JSON.stringify({
          reviews: fiveStarReviews,
          rating,
          totalReviews,
          openingHours,
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    } else {
      throw new Error(data.error_message || 'Failed to fetch reviews');
    }
  } catch (error) {
    console.error('Error in google-reviews function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
