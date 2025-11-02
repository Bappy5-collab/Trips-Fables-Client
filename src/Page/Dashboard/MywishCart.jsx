import { Link } from "react-router-dom";
import { FiTrash2, FiEye, FiMapPin, FiDollarSign } from "react-icons/fi";

/* eslint-disable react/prop-types */
const MywishCart = ({book}) => {
    const {_id, image, price, tripTitle,tourType } = book;
    return (
        <div className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          {/* Image */}
          <div className="relative overflow-hidden">
            <img 
              className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-500" 
              src={image} 
              alt={tripTitle} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-[#2EC1DB] transition-colors">
              {tripTitle}
            </h2>
            
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <FiMapPin className="text-[#2EC1DB]" size={16} />
              <span className="text-sm">{tourType}</span>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <FiDollarSign className="text-[#2EC1DB]" size={20} />
              <span className="text-2xl font-bold text-gray-800">{price}</span>
              <span className="text-gray-600">TK</span>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Link 
                to={`/detailes/${_id}`}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#2EC1DB] to-sky-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <FiEye size={18} />
                View Details
              </Link>
              <button className="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105">
                <FiTrash2 size={18} />
              </button>
            </div>
          </div>
        </div>
    );
};

export default MywishCart;