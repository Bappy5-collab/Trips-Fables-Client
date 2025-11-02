import { useEffect, useState } from "react";

import TouristStoryCart from "./TouristStoryCart";

const AllStory = () => {
  const [storys, setStory] = useState([]);
  useEffect(() => {
    fetch("https://asssignment-12-serverrr.vercel.app/story")
      .then((res) => res.json())
      .then((data) => setStory(data));
  }, []);

  return (
    <div className="w-full py-12 px-4 md:px-8 lg:px-16">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold text-white mb-4">
          All <span className="text-[#2EC1DB]">Stories</span>
        </h2>
        <p className="text-gray-300">Read amazing travel experiences from our community</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {storys?.map((storye) => (
          <TouristStoryCart key={storye._id} storye={storye}></TouristStoryCart>
        ))}
      </div>
    </div>
  );
};

export default AllStory;
