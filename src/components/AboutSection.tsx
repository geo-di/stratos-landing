
const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              About Stratos Market
            </h2>
            <div className="space-y-4 text-gray-600">
              <p className="text-lg">
                Stratos Market has been proudly serving the Anaxos community and visitors to Lesvos, Greece 
                with authentic Greek products, fresh Mediterranean produce, and unique Aegean souvenirs that 
                capture the essence of our beautiful Greek heritage.
              </p>
              <p>
                Our family-owned market in Anaxos, Lesvos has become a beloved destination for both locals 
                and tourists exploring the Greek islands. We offer everything from traditional Greek delicacies 
                like ouzo and local olive oil to handcrafted souvenirs made by local Aegean artisans.
              </p>
              <p>
                From fresh Mediterranean produce grown in Anaxos' fertile soil to authentic handmade 
                crafts that tell the story of our rich Greek heritage, every item in Stratos Market 
                has been carefully selected with love and respect for Greek traditions and culture.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600">Family</div>
                <div className="text-gray-600">Owned & Operated in Anaxos</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600">100%</div>
                <div className="text-gray-600">Authentic Greek</div>
              </div>
            </div>
          </div>
          <div className="lg:order-first">
            <img 
              src="https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&h=400&fit=crop" 
              alt="Beautiful Anaxos landscape with traditional Greek architecture and Mediterranean scenery"
              className="rounded-lg shadow-xl w-full hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
