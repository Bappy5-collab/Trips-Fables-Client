/* eslint-disable react/prop-types */


const StoryDetalesCart = ({data}) => {
    const { tourType, date, name, photo, story } = data || {};
    

    return (
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-[#2EC1DB]/20 text-[#2EC1DB] rounded-full text-sm font-semibold mb-4">
                📅 {date}
              </span>
              <h2 className="text-3xl font-bold text-[#2EC1DB] mb-4">{tourType}</h2>
              <p className="text-gray-300 leading-relaxed text-lg">{story}</p>
            </div>
            <div className="flex items-center gap-4 pt-6 border-t border-white/10">
              <img
                className="h-16 w-16 rounded-full border-2 border-[#2EC1DB] ring-2 ring-[#2EC1DB]/20"
                src={photo}
                alt={name}
              />
              <div>
                <p className="text-white font-bold text-lg">{name}</p>
                <p className="text-gray-400 text-sm">Story Teller</p>
              </div>
            </div>
          </div>
        </div>
    );
};

export default StoryDetalesCart;