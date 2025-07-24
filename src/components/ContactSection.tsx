import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Store, Phone } from "lucide-react";
import { useSharedGoogleData } from "@/hooks/useSharedGoogleData";

const ContactSection = () => {
  const { openingHours, loading, error } = useSharedGoogleData('ChIJyWRl2reQuhQR31Cno53zvaA');

  const handleDirections = () => {
    window.open('https://www.google.com/maps/place/Stratos+Market/@39.3161481,26.1429499,17z/data=!3m1!4b1!4m6!3m5!1s0x14ba90b7da6564c9:0xa0bdf39da3a750df!8m2!3d39.3161481!4d26.1455248!16s%2Fg%2F11fxg0j296?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D', '_blank');
  };

  const handleCallStore = () => {
    window.open('tel:+302253092421', '_self');
  };

  const renderOpeningHours = () => {
    if (loading) {
      return <p className="text-gray-500">Loading hours...</p>;
    }

    if (error || !openingHours?.weekday_text) {
      // Fallback to hardcoded hours if API fails
      return (
        <>
          <p>Monday: 8:00 AM - 9:30 PM</p>
          <p>Tuesday: 8:00 AM - 9:30 PM</p>
          <p>Wednesday: 8:00 AM - 9:30 PM</p>
          <p>Thursday: 8:00 AM - 9:30 PM</p>
          <p>Friday: 8:00 AM - 9:30 PM</p>
          <p>Saturday: 8:00 AM - 10:00 PM</p>
          <p>Sunday: 9:00 AM - 8:00 PM</p>
        </>
      );
    }

    return (
      <>
        {openingHours.weekday_text.map((dayHours, index) => (
          <p key={index}>{dayHours}</p>
        ))}
      </>
    );
  };

  return (
    <section id="contact" className="py-20 px-6 sm:px-8 lg:px-10 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 px-4">
            Visit Stratos Market in Anaxos
          </h2>
          <p className="text-xl text-gray-600 px-4">
            Your trusted local market in beautiful Anaxos, Lesvos. Discover fresh Mediterranean products, authentic Greek specialties, and warm hospitality just steps from the beach.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <Card className="h-full border-blue-100">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 px-2">Store Information - Anaxos, Lesvos, Greece</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                    <div className="px-2">
                      <h4 className="font-semibold text-gray-900">Address</h4>
                      <p className="text-gray-600">
                        Stratos Market<br />
                        Anaxos, Lesvos, Greece<br />
                        North Aegean Region
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Store className="h-6 w-6 text-blue-600 mt-1" />
                    <div className="px-2">
                      <h4 className="font-semibold text-gray-900">Store Hours</h4>
                      <div className="text-gray-600 space-y-1">
                        {renderOpeningHours()}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={handleDirections}
                    >
                      <MapPin className="mr-2 h-5 w-5" />
                      Get Directions to Anaxos Store
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={handleCallStore}
                    >
                      <Phone className="mr-2 h-5 w-5" />
                      Call Stratos Market
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="h-full border-blue-100">
              <CardContent className="p-0">
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3098.8621234567!2d26.1429499!3d39.3161481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ba90b7da6564c9%3A0xa0bdf39da3a750df!2sStratos%20Market!5e0!3m2!1sen!2s!4v1641234567890!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                  />
                </div>
                <div className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-2 px-2">Perfectly Located Near Anaxos Beach</h4>
                  <p className="text-gray-600 mb-4 px-2">
                    Located just 50 meters from the stunning shores of Anaxos Beach in Lesvos, Greece, Stratos Market is your ideal stop for high-quality local products, and charming Greek souvenirs. Whether you're heading to the beach or returning from a relaxing swim, our store is perfectly positioned for a convenient shopping experience.
                  </p>
                  <p className="text-gray-600 mb-4 px-2">
                    We offer free parking for all our customers, making it easy to shop without stress. Combine your beach day with your daily shopping in one easy trip!
                  </p>
                  <p className="text-gray-600 px-2">
                    Look for our friendly and welcoming storefront—Stratos Market is more than just a supermarket; it's a taste of Greek hospitality.
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
