
import { Button } from "@/components/ui/button";
import { MapPin, Store, Home, Car } from "lucide-react";

const Hero = () => {
  const handleVisitStore = () => {
    window.open('https://www.google.com/maps/place/Stratos+Market/@39.3161481,26.1429499,17z/data=!3m1!4b1!4m6!3m5!1s0x14ba90b7da6564c9:0xa0bdf39da3a750df!8m2!3d39.3161481!4d26.1455248!16s%2Fg%2F11fxg0j296?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D', '_blank');
  };

  return (
    <section id="home" className="relative py-20 px-6 sm:px-8 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 px-4">
            Welcome to
            <span className="text-blue-600 block">Stratos Market</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto px-4">
            Your trusted local market in Anaxos, Lesvos, Greece. Discover authentic Greek specialties, 
            fresh Mediterranean produce, and unique Aegean souvenirs. Experience genuine Greek hospitality in the heart of Anaxos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-64"
              onClick={handleVisitStore}
            >
              <MapPin className="mr-2 h-5 w-5" />
              Visit Our Store
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-64"
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Greek Products
            </Button>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Store className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 px-2">Local Lesvos Products</h3>
              <p className="text-gray-600 px-2">Authentic Lesvos specialties, fresh local produce, and traditional Greek delicacies from our island</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Home className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 px-2">Aegean Island Souvenirs</h3>
              <p className="text-gray-600 px-2">Handcrafted items, traditional Greek gifts, and authentic Anaxos memorabilia</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Car className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 px-2">Free Parking Available</h3>
              <p className="text-gray-600 px-2">Offering free parking for our customers, making your shopping experience convenient and stress-free</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
