
import { Store, MapPin, Star } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Store className="h-8 w-8 text-blue-300" />
              <span className="text-xl font-bold">Stratos Market</span>
            </div>
            <p className="text-blue-100 mb-4">
              Your authentic Greek market destination in Anaxos, Lesvos, Greece for fresh Mediterranean products, 
              traditional Aegean souvenirs, and genuine Greek hospitality.
            </p>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm text-blue-100 ml-2">Trusted by Anaxos locals and tourists</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-blue-100">
              <li><a href="#home" className="hover:text-blue-300 transition-colors">Home</a></li>
              <li><a href="#products" className="hover:text-blue-300 transition-colors">Greek Products</a></li>
              <li><a href="#about" className="hover:text-blue-300 transition-colors">About Us</a></li>
              <li><a href="#reviews" className="hover:text-blue-300 transition-colors">Customer Reviews</a></li>
              <li><a href="#contact" className="hover:text-blue-300 transition-colors">Contact & Location</a></li>
              <li><a href="/gallery" className="hover:text-blue-300 transition-colors">Photo Gallery</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-blue-100">
              <div className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-blue-300 mt-0.5" />
                <div>
                  <p>Stratos Market</p>
                  <p>Anaxos, Lesvos, Greece</p>
                  <p>North Aegean Region</p>
                </div>
              </div>
              <p>Visit us for authentic Greek products</p>
              <p>Email: info@stratosmarket.gr</p>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-700 mt-8 pt-8 text-center text-blue-100">
          <p>&copy; 2024 Stratos Market. All rights reserved. Bringing you authentic Greek tradition from Anaxos.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
