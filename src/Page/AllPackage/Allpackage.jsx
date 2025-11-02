import { useEffect, useState } from "react";
import PackageCart from "../Packags/PackageCart";

const Allpackage = () => {
  const [packags, setPackag] = useState([]);

  useEffect(() => {
    fetch("https://asssignment-12-serverrr.vercel.app/all")
      .then((res) => res.json())
      .then((data) => setPackag(data));
  }, []);

  return (
    <div className="w-full py-12 px-4 md:px-8 lg:px-16">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold text-white mb-4">
          All <span className="text-[#2EC1DB]">Packages</span>
        </h2>
        <p className="text-gray-300">Explore all our amazing travel packages</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packags?.map((packag) => (
          <PackageCart key={packag._id} packag={packag}></PackageCart>
        ))}
      </div>
    </div>
  );
};

export default Allpackage;
