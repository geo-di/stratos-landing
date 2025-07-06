
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Image } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&h=600&fit=crop",
      alt: "Fresh Mediterranean oranges and citrus fruits at Stratos Market Lesvos",
      category: "produce",
      title: "Fresh Lesvos Citrus"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=600&fit=crop",
      alt: "Beautiful Lesvos landscape with mountains and Mediterranean scenery",
      category: "landscape",
      title: "Lesvos Island Beauty"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop",
      alt: "Traditional Greek countryside near Mytilene, Lesvos",
      category: "landscape",
      title: "Mytilene Countryside"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=800&h=600&fit=crop",
      alt: "Mediterranean wildlife and nature around Lesvos Island",
      category: "landscape",
      title: "Lesvos Nature"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800&h=600&fit=crop",
      alt: "Fresh local produce and vegetables at Stratos Market",
      category: "produce",
      title: "Local Market Produce"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1452960962994-acf4fd70b632?w=800&h=600&fit=crop",
      alt: "Traditional Greek artisan crafts and souvenirs from Lesvos",
      category: "crafts",
      title: "Greek Island Crafts"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?w=800&h=600&fit=crop",
      alt: "Traditional Greek delicacies and Mediterranean specialties",
      category: "food",
      title: "Greek Specialties"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937?w=800&h=600&fit=crop",
      alt: "Natural honey and preserves from Lesvos local producers",
      category: "food",
      title: "Lesvos Honey"
    }
  ];

  const categories = [
    { id: "all", label: "All Photos" },
    { id: "produce", label: "Fresh Produce" },
    { id: "food", label: "Greek Specialties" },
    { id: "crafts", label: "Artisan Crafts" },
    { id: "landscape", label: "Lesvos Scenery" }
  ];

  const filteredImages = selectedCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

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
              Discover the beauty of Lesvos Island, our authentic Greek products, and the warm atmosphere 
              of our traditional market in Mytilene through these captivating photos.
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={selectedCategory === category.id 
                ? "bg-blue-600 hover:bg-blue-700" 
                : "border-blue-200 text-blue-600 hover:bg-blue-50"
              }
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
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
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {image.title}
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
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <h3 className="text-white text-xl font-semibold mb-2">
                      {image.title}
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

        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No images found in this category.</p>
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
            <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
              Get Directions to Our Lesvos Store
            </Button>
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Gallery;
