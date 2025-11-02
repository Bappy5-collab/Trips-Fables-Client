import { useEffect, useState } from "react";
import PackageCart from "./PackageCart";
import { Link } from "react-router-dom";

const Packags = () => {
  const [packags, setPackag] = useState([]);

  useEffect(() => {
    fetch("https://asssignment-12-serverrr.vercel.app/all")
      .then((res) => res.json())
      .then((data) => setPackag(data));
  }, []);

  
  return (
    <div className="py-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packags.slice(0, 3).map((packag) => (
          <PackageCart key={packag._id} packag={packag}></PackageCart>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Link 
          to={'/allpacakge'}
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#2EC1DB] to-sky-500 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
        >
          View All Packages
        </Link>
      </div>
    </div>
  );
};

export default Packags;
