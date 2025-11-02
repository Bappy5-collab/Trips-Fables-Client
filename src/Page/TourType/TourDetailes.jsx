import { useLoaderData, useParams } from "react-router-dom";
import TourDetailesCart from "./TourDetailesCart";


const TourDetailes = () => {
    const data = useLoaderData();
    const {tourType}=useParams();
    const findData = data?.filter((item) => item.tourType === tourType);
    console.log(findData)
    return (
        <div className="w-full py-12 px-4 md:px-8 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-white mb-4">
              {tourType} <span className="text-[#2EC1DB]">Tours</span>
            </h2>
            <p className="text-gray-300">Discover amazing {tourType} destinations</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {findData?.map(data => <TourDetailesCart key={data._id} data={data}></TourDetailesCart>)}
          </div>
        </div>
    );
};

export default TourDetailes;