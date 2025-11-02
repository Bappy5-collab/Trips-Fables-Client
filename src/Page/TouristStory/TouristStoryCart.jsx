/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const TouristStoryCart = ({ storye }) => {
  const {_id, tourType, date, name, photo, story } = storye || {};
  const sort = story.slice(0, 100);

  return (
    <div className="group relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 shadow-xl overflow-hidden">
      <Link to={`/story/${_id}`}>
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[#2EC1DB] line-clamp-1">{tourType}</h2>
          <p className="text-gray-300 line-clamp-3 text-sm leading-relaxed">{sort}...</p>
          <div className="flex items-center gap-3 pt-4 border-t border-white/10">
            <img
              className="h-12 w-12 rounded-full border-2 border-[#2EC1DB]"
              src={photo}
              alt={name}
            />
            <div>
              <p className="text-white font-semibold">{name}</p>
              <p className="text-gray-400 text-xs">📅 {date}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TouristStoryCart;
