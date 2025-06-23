
const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-50 to-orange-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              About Our Store
            </h2>
            <div className="space-y-4 text-gray-600">
              <p className="text-lg">
                For over 20 years, we've been proud to serve our community with the freshest 
                local produce, unique handcrafted souvenirs, and authentic regional specialties.
              </p>
              <p>
                Our family-owned market has become a cornerstone of the community, connecting 
                local farmers and artisans with neighbors and visitors alike. We believe in 
                supporting our local economy while offering you the highest quality products.
              </p>
              <p>
                From seasonal fruits and vegetables grown just miles away to one-of-a-kind 
                handmade crafts that tell our region's story, every item in our store has 
                been carefully selected with love and attention to quality.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">20+</div>
                <div className="text-gray-600">Years Serving</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">50+</div>
                <div className="text-gray-600">Local Partners</div>
              </div>
            </div>
          </div>
          <div className="lg:order-first">
            <img 
              src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=400&fit=crop" 
              alt="Our store interior"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
