import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

/* eslint-disable react/prop-types */
const TypeData = ({ type }) => {
    const { image, tourType } = type;
    return (
        <div className="group relative overflow-hidden rounded-2xl h-[250px] hover:scale-105 transition-transform duration-500">
            <Link to={`/tourDetails/${tourType}`}>
                <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src={image}
                    alt={tourType}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg flex items-center gap-2">
                        {tourType} 
                        <span className="bg-[#2EC1DB] p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <FaArrowRight size={16} />
                        </span>
                    </h3>
                </div>
            </Link>
        </div>
    );
};

export default TypeData;