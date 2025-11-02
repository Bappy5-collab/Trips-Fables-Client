import { FiCalendar, FiDollarSign, FiClock, FiCreditCard } from "react-icons/fi";

/* eslint-disable react/prop-types */
const BookingCart = ({book}) => {
    const {price,date,tripTitle}=book;
    console.log(book)
    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              {/* Package Info */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{tripTitle}</h3>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FiCalendar className="text-[#2EC1DB]" />
                    <span>{date || 'Not specified'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiDollarSign className="text-[#2EC1DB]" />
                    <span className="font-semibold">{price} TK</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiClock className="text-[#2EC1DB]" />
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full font-medium">Pending</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2EC1DB] to-sky-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <FiCreditCard size={18} />
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
    );
};

export default BookingCart;