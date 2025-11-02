const About = () => {
  return (
    <div className="w-full min-h-screen py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 md:p-12">
          <h2 className="text-5xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#2EC1DB] to-sky-500 mb-8">
            About Us
          </h2>
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <p className="text-lg">
              Welcome to <strong className="text-white text-xl">Trips Fables</strong>, where every journey is an adventure waiting to unfold. We are more than just a tourist agency; we are your gateway to immersive travel experiences that linger in your heart and memories.
            </p>
            
            <div className="border-l-4 border-[#2EC1DB] pl-6 mt-8">
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p>
                At <strong className="text-white">Trips Fables</strong>, our mission is to transform your travel dreams into reality. We believe in curating not just itineraries but stories — stories that resonate with the spirit of exploration, discovery, and joy.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-bold text-white mb-4">What Sets Us Apart</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✨</span>
                  <div>
                    <strong className="text-[#2EC1DB]">Passionate Experts:</strong> Our team consists of passionate travel enthusiasts who are dedicated to crafting unique and personalized experiences. From off-the-beaten-path adventures to luxurious getaways, we cater to diverse interests and preferences.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🌍</span>
                  <div>
                    <strong className="text-[#2EC1DB]">Local Insights:</strong> We believe in the power of local experiences. Our itineraries are infused with authentic encounters, allowing you to connect with the heart and soul of each destination.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <strong className="text-[#2EC1DB]">Seamless Planning:</strong> Travel planning should be as enjoyable as the journey itself. We take care of the details, ensuring a seamless experience from the moment you envision your trip to the moment you return home with cherished memories.
                  </div>
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-[#2EC1DB] pl-6 mt-8">
              <h3 className="text-2xl font-bold text-white mb-4">Our Commitment</h3>
              <p>
                At <strong className="text-white">Trips Fables</strong>, we are committed to sustainable and responsible tourism. We strive to minimize our environmental impact and contribute positively to the communities we visit. Your travels with us support local economies and promote cultural preservation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
