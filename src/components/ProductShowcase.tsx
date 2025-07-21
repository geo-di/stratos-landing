
import { Card, CardContent } from "@/components/ui/card";

const ProductShowcase = () => {
  const products = [
    {
      id: 1,
      name: "Premium Greek Olives",
      description: "Fresh Kalamata and green olives from local Lesvos groves, perfect for Mediterranean cuisine",
      image: "/images/olives.webp",
      category: "Fresh Olives & Olive Products"
    },
    {
      id: 2,
      name: "Mediterranean Herbs & Spices",
      description: "Aromatic Greek herbs including oregano, thyme, and mountain tea from the hills of Lesvos",
      image: "/images/herbs.webp",
      category: "Greek Herbs & Spices"
    },
    {
      id: 3,
      name: "Traditional Greek Ouzo",
      description: "Authentic ouzo and traditional Greek spirits, including local Lesvos distillery selections",
      image: "/images/ouzo.webp",
      category: "Greek Spirits & Ouzo"
    },
    {
      id: 4,
      name: "Traditional Lesvos Yogurt",
      description: "Creamy, rich yogurt made from fresh sheep milk by local Lesvos dairy farmers using traditional methods",
      image: "/images/yoghurt.webp",
      category: "Fresh Dairy & Traditional Products"
    }
  ];

  const handleDirectionsClick = () => {
    window.open('https://www.google.com/maps/place/Stratos+Market/@39.3161481,26.1429499,17z/data=!3m1!4b1!4m6!3m5!1s0x14ba90b7da6564c9:0xa0bdf39da3a750df!8m2!3d39.3161481!4d26.1455248!16s%2Fg%2F11fxg0j296?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D', '_blank');
  };

  return (
    <section id="products" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Authentic Greek Products
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our carefully curated selection of fresh Mediterranean produce, unique Greek souvenirs, 
            and local specialties that celebrate our beautiful Greek community's rich Aegean heritage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card 
              key={product.id} 
              className="overflow-hidden hover:shadow-xl transition-all duration-300 border-blue-100 group"
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={product.image} 
                  alt={`${product.name} - Available at Stratos Market in Anaxos, Lesvos, Greece`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
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
            Want to see our full selection of Greek products? Visit us in our Anaxos store!
          </p>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
            onClick={handleDirectionsClick}
          >
            Get Directions to Stratos Market
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
