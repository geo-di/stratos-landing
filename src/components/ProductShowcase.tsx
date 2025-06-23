
import { Card, CardContent } from "@/components/ui/card";

const ProductShowcase = () => {
  const products = [
    {
      id: 1,
      name: "Fresh Local Produce",
      description: "Farm-fresh fruits and vegetables from local growers",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
      category: "Fresh Produce"
    },
    {
      id: 2,
      name: "Artisan Crafts",
      description: "Handmade souvenirs and local artwork",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
      category: "Souvenirs"
    },
    {
      id: 3,
      name: "Local Specialties",
      description: "Regional delicacies and traditional products",
      image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=400&h=300&fit=crop",
      category: "Specialties"
    },
    {
      id: 4,
      name: "Homemade Goods",
      description: "Locally made preserves, baked goods, and treats",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop",
      category: "Homemade"
    }
  ];

  return (
    <section id="products" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Products
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our carefully curated selection of fresh produce, unique souvenirs, 
            and local specialties that celebrate our community's rich heritage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-square overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <span className="text-sm text-green-600 font-medium">{product.category}</span>
                <h3 className="text-lg font-semibold text-gray-900 mt-2 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {product.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            Want to see our full selection? Visit us in store!
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Get Directions
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
