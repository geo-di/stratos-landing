
import { Button } from "@/components/ui/button";
import { MapPin, Store, Home, Star } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to
            <span className="text-blue-600 block">Stratos Market</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your trusted local market in Greece, offering fresh products, authentic Greek specialties, 
            and unique souvenirs. Experience the warmth of Greek hospitality and discover local treasures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
              <MapPin className="mr-2 h-5 w-5" />
              Visit Stratos Market
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-8 py-3"
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Products
            </Button>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Store className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fresh Greek Products</h3>
              <p className="text-gray-600">Local produce and authentic Greek specialties</p>
            </div>
            <div className="text-center">
              <div className="bg-white border-2 border-blue-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Greek Souvenirs</h3>
              <p className="text-gray-600">Handcrafted items and traditional Greek gifts</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Local Tradition</h3>
              <p className="text-gray-600">Supporting local Greek farmers and artisans</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
