
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const ReviewsSection = () => {
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      text: "Amazing selection of local products! The staff is incredibly friendly and knowledgeable. I always find unique souvenirs here for visiting friends.",
      date: "2 weeks ago"
    },
    {
      id: 2,
      name: "Mike Rodriguez",
      rating: 5,
      text: "Best local market in town! Fresh produce, great prices, and they support local farmers. The homemade preserves are absolutely delicious.",
      date: "1 month ago"
    },
    {
      id: 3,
      name: "Emily Chen",
      rating: 5,
      text: "Love this place! It's my go-to spot for authentic local gifts. The quality is excellent and you can really feel the community spirit here.",
      date: "3 weeks ago"
    },
    {
      id: 4,
      name: "David Thompson",
      rating: 5,
      text: "Family-owned business with heart! They have the freshest vegetables and the most unique local crafts. Highly recommend to anyone visiting the area.",
      date: "1 week ago"
    }
  ];

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section id="reviews" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600">
            Don't just take our word for it - hear from our happy customers!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <Card key={review.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex space-x-1 mr-2">
                    {renderStars(review.rating)}
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-600 mb-4 text-sm">
                  "{review.text}"
                </p>
                <div className="font-medium text-gray-900">
                  {review.name}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Based on 127 Google Reviews
          </p>
          <div className="flex items-center justify-center space-x-2">
            <div className="flex space-x-1">
              {renderStars(5)}
            </div>
            <span className="text-lg font-semibold text-gray-900">4.9/5</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
