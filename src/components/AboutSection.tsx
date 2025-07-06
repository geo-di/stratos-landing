
const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              About Stratos Market Lesvos
            </h2>
            <div className="space-y-4 text-gray-600">
              <p className="text-lg">
                Stratos Market has been proudly serving the Mytilene community and visitors to Lesvos Island 
                with authentic Greek products, fresh Mediterranean produce, and unique Aegean souvenirs that 
                capture the essence of our beautiful Greek island heritage.
              </p>
              <p>
                Our family-owned market in Lesvos has become a beloved destination for both locals from Mytilene 
                and tourists exploring the Greek islands. We offer everything from traditional Lesvos delicacies 
                like ouzo and local olive oil to handcrafted souvenirs made by local Aegean artisans.
              </p>
              <p>
                From fresh Mediterranean produce grown in Lesvos' fertile volcanic soil to authentic handmade 
                crafts that tell the story of our rich Greek island heritage, every item in Stratos Market 
                has been carefully selected with love and respect for Lesvos traditions and Greek culture.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">Family</div>
                <div className="text-gray-600">Owned & Operated in Lesvos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">100%</div>
                <div className="text-gray-600">Authentic Greek Island</div>
              </div>
            </div>
          </div>
          <div className="lg:order-first">
            <img 
              src="https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&h=400&fit=crop" 
              alt="Beautiful Lesvos landscape with traditional Greek architecture and Mediterranean scenery"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
