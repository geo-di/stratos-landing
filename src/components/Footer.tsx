
import { Store, MapPin, Star } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Store className="h-8 w-8 text-green-400" />
              <span className="text-xl font-bold">Local Market</span>
            </div>
            <p className="text-gray-300 mb-4">
              Your neighborhood destination for fresh local products, 
              unique souvenirs, and community connection.
            </p>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-300 ml-2">4.9/5 on Google</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#home" className="hover:text-green-400 transition-colors">Home</a></li>
              <li><a href="#products" className="hover:text-green-400 transition-colors">Products</a></li>
              <li><a href="#about" className="hover:text-green-400 transition-colors">About Us</a></li>
              <li><a href="#reviews" className="hover:text-green-400 transition-colors">Reviews</a></li>
              <li><a href="#contact" className="hover:text-green-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-green-400 mt-0.5" />
                <div>
                  <p>123 Main Street</p>
                  <p>Your City, State 12345</p>
                </div>
              </div>
              <p>Phone: (555) 123-4567</p>
              <p>Email: hello@localmarket.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Local Market. All rights reserved. Supporting our community, one product at a time.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
