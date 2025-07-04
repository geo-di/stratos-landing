
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

    console.log('Fetching reviews for place:', placeId);

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`
    );
    
    const data = await response.json();
    
    if (data.status === 'OK' && data.result?.reviews) {
      // Filter to only 5-star reviews
      const fiveStarReviews = data.result.reviews.filter(
        (review: GoogleReview) => review.rating === 5
      );
      
      console.log(`Found ${fiveStarReviews.length} five-star reviews`);
      
      return new Response(JSON.stringify({ reviews: fiveStarReviews }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
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
