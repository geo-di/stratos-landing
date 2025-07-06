
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Image, Loader2, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { DRIVE_FOLDER_ID, placeholderMessage } from "@/config/gallery";
import { useDriveImages } from "@/hooks/useDriveImages";

const Gallery = () => {
  const { data: driveImages, isLoading, error } = useDriveImages(DRIVE_FOLDER_ID);
  
  // Show text placeholder if no images are loaded
  const images = driveImages && driveImages.length > 0 ? driveImages : [];

  // Helper function to format titles by replacing underscores with spaces
  const formatTitle = (title: string) => {
    return title.replace(/_/g, ' ');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Image className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Stratos Market Gallery
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the beauty of Anaxos, Lesvos, our authentic Greek products, and the warm atmosphere 
              of our traditional market through these captivating photos.
            </p>
            
            {/* Status indicators */}
            {isLoading && (
              <div className="flex items-center justify-center mt-4 text-blue-600">
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                <span>Loading fresh images from our gallery...</span>
              </div>
            )}
            
            {error && (
              <div className="flex items-center justify-center mt-4 text-amber-600">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span>Photos will be added soon - stay tuned!</span>
              </div>
            )}
            
            {driveImages && driveImages.length > 0 && (
              <div className="mt-4 text-green-600">
                <span>✨ Showing {driveImages.length} fresh images from our collection</span>
              </div>
            )}
          </div>
        </div>

        {/* Gallery Grid */}
        {images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((image) => (
              <Dialog key={image.id}>
                <DialogTrigger asChild>
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-0">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                                                  onError={(e) => {
                          console.error('Image failed to load:', image.src);
                          // Hide the image and show text instead
                          e.currentTarget.style.display = 'none';
                          const parent = e.currentTarget.parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div class="flex items-center justify-center h-full bg-gray-100 rounded-lg">
                                <div class="text-center p-4">
                                  <div class="text-gray-400 text-sm mb-2">📷</div>
                                  <div class="text-gray-500 text-xs">${formatTitle(image.title)}</div>
                                </div>
                              </div>
                            `;
                          }
                        }}
                          onLoad={() => {
                            console.log('Image loaded successfully:', image.src);
                          }}
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 text-sm">
                          {formatTitle(image.title)}
                        </h3>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                
                <DialogContent className="max-w-4xl max-h-[90vh] p-0">
                  <div className="relative">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-auto max-h-[80vh] object-contain"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                      <h3 className="text-white text-xl font-semibold mb-2">
                        {formatTitle(image.title)}
                      </h3>
                      <p className="text-gray-200 text-sm">
                        {image.alt}
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="bg-blue-50 rounded-lg p-8 border border-blue-200">
                <Image className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Photos Coming Soon
                </h3>
                <p className="text-gray-600 mb-4">
                  We're preparing to share beautiful photos of our market, products, and the stunning Anaxos landscape. Check back soon!
                </p>
                <div className="text-sm text-blue-600">
                  ✨ Fresh images will be added regularly
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Visit Us in Person
          </h2>
          <p className="text-gray-600 mb-6">
            Experience the authentic atmosphere of Stratos Market and discover all our Greek island treasures firsthand.
          </p>
          <Link to="/#contact">
            <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300">
              Get Directions to Our Anaxos Store
            </Button>
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Gallery;
