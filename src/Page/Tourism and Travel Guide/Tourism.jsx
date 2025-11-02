import Packags from "../Packags/Packags";

const Tourism = () => {
  return (
    <div className="mb-36 space-y-16">
      {/* Overview Section */}
      <div className="mb-16">
        <h2 className="text-center font-bold text-white text-xl md:text-3xl lg:text-5xl mb-12">
          Tourism <span className="text-[#2EC1DB]">&</span> Travel Guide
        </h2>
        
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
          <div className="mb-8 rounded-xl overflow-hidden shadow-2xl">
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', width: '100%' }}>
              <iframe
                src="https://www.youtube.com/embed/5s8fs_j2xlY?si=IdENqbIe8MVixsbT"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="space-y-4 text-gray-300">
            <p className="leading-relaxed">
              Welcome to <strong className="text-white">Trips Fables</strong>, where every journey is an adventure
              waiting to unfold. We are more than just a tourist agency; we are your
              gateway to immersive travel experiences that linger in your heart and
              memories.
            </p>
            <p className="leading-relaxed">
              <strong className="text-[#2EC1DB]">Our Mission</strong> at <strong className="text-white">Trips Fables</strong> is to
              transform your travel dreams into reality. We believe in curating not
              just itineraries but stories — stories that resonate with the spirit
              of exploration, discovery, and joy.
            </p>
            <p className="leading-relaxed">
              <strong className="text-[#2EC1DB]">What Sets Us Apart</strong><br />
              <em className="text-white">Passionate Experts:</em> Our team consists of passionate travel
              enthusiasts who are dedicated to crafting unique and personalized experiences.
              From off-the-beaten-path adventures to luxurious getaways, we cater to
              diverse interests and preferences.
            </p>
          </div>
        </div>
      </div>

      {/* Packages Section */}
      <div>
        <Packags></Packags>
      </div>
    </div>
  );
};

export default Tourism;
