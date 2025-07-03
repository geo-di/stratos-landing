
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Store } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Store className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-gray-800">Stratos Market</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('products')}
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Products
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              About Us
            </button>
            <button 
              onClick={() => scrollToSection('reviews')}
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Reviews
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Contact
            </button>
            <Button className="bg-green-600 hover:bg-green-700">
              Visit Our Store
            </Button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-green-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-2">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-left px-4 py-2 text-gray-700 hover:text-green-600 transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('products')}
                className="text-left px-4 py-2 text-gray-700 hover:text-green-600 transition-colors"
              >
                Products
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-left px-4 py-2 text-gray-700 hover:text-green-600 transition-colors"
              >
                About Us
              </button>
              <button 
                onClick={() => scrollToSection('reviews')}
                className="text-left px-4 py-2 text-gray-700 hover:text-green-600 transition-colors"
              >
                Reviews
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-left px-4 py-2 text-gray-700 hover:text-green-600 transition-colors"
              >
                Contact
              </button>
              <div className="px-4 pt-2">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Visit Our Store
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
