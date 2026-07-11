import type { VercelRequest, VercelResponse } from '@vercel/node';

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  relative_time_description: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { placeId } = req.body ?? {};
  if (!placeId) {
    return res.status(400).json({ error: 'Place ID is required' });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Google Places API key not configured' });
  }

  try {
    const params = new URLSearchParams({
      place_id: placeId,
      fields: 'rating,user_ratings_total,reviews,opening_hours',
      key: apiKey,
    });

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?${params.toString()}`
    );
    const data = await response.json();

    if (data.status !== 'OK' || !data.result) {
      return res.status(502).json({ error: data.error_message || 'Failed to fetch reviews' });
    }

    const allReviews: GoogleReview[] = data.result.reviews || [];
    const fiveStarReviews = allReviews.filter((review) => review.rating === 5);

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
    return res.status(200).json({
      reviews: fiveStarReviews,
      rating: data.result.rating,
      totalReviews: data.result.user_ratings_total,
      openingHours: data.result.opening_hours || null,
    });
  } catch (error) {
    console.error('Error in google-reviews function:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
