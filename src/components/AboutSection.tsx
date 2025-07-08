
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
                For over three decades, Stratos Market has been the heart of Anaxos, serving both 
                locals and visitors with authentic Greek products and genuine hospitality. What started 
                as a young entrepreneur's dream in the 1990s has grown into a beloved family business 
                that embodies the true spirit of Greek tradition.
              </p>
              <p>
                Founded by Stratos in his twenties, our family-run supermarket in Anaxos, Lesvos 
                has become an essential destination for anyone seeking genuine Greek flavors and 
                handcrafted local souvenirs. We take pride in offering everything from daily 
                essentials to specialty items that capture the authentic taste of the Aegean islands.
              </p>
              <p>
                Our shelves are filled with carefully selected local treasures: golden Lesvos honey, 
                creamy traditional feta cheese, the famous Lesvos PDO Ladotyri cheese, fresh Greek 
                yogurt, and premium olive oil pressed from Stratos's own olive groves. We also offer 
                an extensive selection of Greek wines, authentic ouzo, traditional tsipouro, and 
                classic retsina - perfect for taking home a taste of Greece.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600">30+</div>
                <div className="text-gray-600">Years Serving Anaxos</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600">Family</div>
                <div className="text-gray-600">Owned & Operated</div>
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
