
const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              About Stratos Market
            </h2>
            <div className="space-y-4 text-gray-600">
              <p className="text-lg">
                Stratos Market has been serving the local community in Greece with authentic products, 
                fresh local produce, and unique Greek souvenirs that capture the essence of our beautiful country.
              </p>
              <p>
                Our family-owned market has become a beloved destination for both locals and visitors, 
                offering everything from traditional Greek delicacies to handcrafted souvenirs. 
                We take pride in supporting local Greek farmers and artisans.
              </p>
              <p>
                From fresh Mediterranean produce grown in our fertile Greek soil to authentic handmade 
                crafts that tell the story of our rich heritage, every item in Stratos Market has 
                been carefully selected with love and respect for Greek tradition.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">Family</div>
                <div className="text-gray-600">Owned & Operated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">100%</div>
                <div className="text-gray-600">Authentic Greek</div>
              </div>
            </div>
          </div>
          <div className="lg:order-first">
            <img 
              src="https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=600&h=400&fit=crop" 
              alt="Greek landscape with traditional architecture"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
