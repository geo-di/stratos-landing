
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
            Your trusted local market in Anaxos, Lesvos, Greece. Discover authentic Greek specialties, 
            fresh Mediterranean produce, and unique Aegean souvenirs. Experience genuine Greek hospitality in the heart of Anaxos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300">
              <MapPin className="mr-2 h-5 w-5" />
              Visit Our Store
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Greek Products
            </Button>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Store className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fresh Mediterranean Produce</h3>
              <p className="text-gray-600">Local fruits, vegetables, and authentic Greek specialties from Anaxos farmers</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Home className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Aegean Island Souvenirs</h3>
              <p className="text-gray-600">Handcrafted items, traditional Greek gifts, and authentic Anaxos memorabilia</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Star className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Anaxos Local Tradition</h3>
              <p className="text-gray-600">Supporting local farmers and artisans, preserving authentic Greek culture</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
