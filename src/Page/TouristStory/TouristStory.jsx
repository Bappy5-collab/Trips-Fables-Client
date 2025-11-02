import { useEffect, useState } from "react";
import TouristStoryCart from "./TouristStoryCart";
import { Link } from "react-router-dom";

const TouristStory = () => {
  const [storys, setStory] = useState([]);
  useEffect(() => {
    fetch("https://asssignment-12-serverrr.vercel.app/story")
      .then((res) => res.json())
      .then((data) => setStory(data));
  }, []);

  return (
    <div className="mb-36">
      <div className="mb-12">
        <h2 className="text-center font-bold text-white text-xl md:text-3xl lg:text-5xl">
          Tourist<span className="text-[#2EC1DB]"> Story</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {storys?.slice(0,4).map((storye) => (
          <TouristStoryCart key={storye._id} storye={storye}></TouristStoryCart>
        ))}
      </div>
      <div className="flex justify-center">
        <Link 
          to={'/allstory'}
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#2EC1DB] to-sky-500 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
        >
          View All Stories
        </Link>
      </div>
    </div>
  );
};

export default TouristStory;
