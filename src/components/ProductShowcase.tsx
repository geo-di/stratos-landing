
import { Card, CardContent } from "@/components/ui/card";

const ProductShowcase = () => {
  const products = [
    {
      id: 1,
      name: "Fresh Lesvos Produce",
      description: "Farm-fresh Mediterranean fruits and vegetables from local Lesvos growers and Mytilene farmers",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
      category: "Local Mediterranean Produce"
    },
    {
      id: 2,
      name: "Greek Island Artisan Crafts",
      description: "Handmade Lesvos souvenirs, traditional Aegean artwork, and authentic Greek island memorabilia",
      image: "https://images.unsplash.com/photo-1452960962994-acf4fd70b632?w=400&h=300&fit=crop",
      category: "Lesvos Souvenirs"
    },
    {
      id: 3,
      name: "Traditional Greek Specialties",
      description: "Authentic Lesvos delicacies including local ouzo, olive oil, and regional Greek island products",
      image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?w=400&h=300&fit=crop",
      category: "Greek Island Specialties"
    },
    {
      id: 4,
      name: "Lesvos Honey & Preserves",
      description: "Natural Mediterranean honey and homemade preserves from local Lesvos producers and beekeepers",
      image: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937?w=400&h=300&fit=crop",
      category: "Natural Lesvos Products"
    }
  ];

  return (
    <section id="products" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Authentic Greek Products
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our carefully curated selection of fresh Mediterranean produce, unique Lesvos souvenirs, 
            and local specialties that celebrate our beautiful Greek island community's rich Aegean heritage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-blue-100">
              <div className="aspect-square overflow-hidden">
                <img 
                  src={product.image} 
                  alt={`${product.name} - Available at Stratos Market Lesvos`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <span className="text-sm text-blue-600 font-medium">{product.category}</span>
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
            Want to see our full selection of Greek island products? Visit us in our Lesvos store!
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Get Directions to Mytilene
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
