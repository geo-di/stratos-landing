
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Store } from "lucide-react";

const ContactSection = () => {
  const handleDirections = () => {
    window.open('https://www.google.com/maps/place/Stratos+Market/@39.3161481,26.1429499,17z/data=!3m1!4b1!4m6!3m5!1s0x14ba90b7da6564c9:0xa0bdf39da3a750df!8m2!3d39.3161481!4d26.1455248!16s%2Fg%2F11fxg0j296?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D', '_blank');
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-50 to-orange-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Visit Stratos Market
          </h2>
          <p className="text-xl text-gray-600">
            Come experience authentic Greek products and warm hospitality - we'd love to welcome you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <Card className="h-full">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Store Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Address</h4>
                      <p className="text-gray-600">
                        Stratos Market<br />
                        Greece<br />
                        (Near coordinates: 39.3161481, 26.1455248)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Store className="h-6 w-6 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Store Hours</h4>
                      <div className="text-gray-600 space-y-1">
                        <p>Monday - Friday: 8:00 AM - 7:00 PM</p>
                        <p>Saturday: 8:00 AM - 8:00 PM</p>
                        <p>Sunday: 9:00 AM - 6:00 PM</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={handleDirections}
                    >
                      <MapPin className="mr-2 h-5 w-5" />
                      Get Directions on Google Maps
                    </Button>
                    <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                      Contact Stratos Market
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="h-full">
              <CardContent className="p-0">
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1466442929976-97f336a657be?w=600&h=400&fit=crop" 
                    alt="Traditional Greek architecture"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Easy to Find in Greece</h4>
                  <p className="text-gray-600">
                    Located in a beautiful area of Greece, Stratos Market is your destination for 
                    authentic Greek products and souvenirs. Look for our welcoming storefront!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
