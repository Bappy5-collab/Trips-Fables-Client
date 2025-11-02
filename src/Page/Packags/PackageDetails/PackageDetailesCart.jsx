/* eslint-disable react/prop-types */
import BookingForm from "../../BookingForm/BookingForm";
import { FiCalendar, FiInfo } from "react-icons/fi";

const PackageDetailesCart = ({ packags }) => {
  const { galleryIM1, galleryIM2, galleryIM3, galleryIM4, About, itinerary } = packags || {};
  
  // Handle both old format (day1Title, day1plan, etc.) and new format (itinerary array)
  const days = itinerary || [];
  
  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Gallery Section */}
        <div className="mb-12 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <div className="grid grid-cols-2 gap-4">
              <img className="h-full w-full object-cover rounded-xl shadow-lg" src={galleryIM1} alt="Gallery" />
              <img className="h-full w-full object-cover rounded-xl shadow-lg" src={galleryIM2} alt="Gallery" />
              <img className="h-full w-full object-cover rounded-xl shadow-lg" src={galleryIM3} alt="Gallery" />
              <img className="h-full w-full object-cover rounded-xl shadow-lg" src={galleryIM4} alt="Gallery" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#2EC1DB] mb-4 flex items-center gap-2">
                <FiInfo />
                About This Tour
              </h2>
              <hr className="border-gray-600 mb-4" />
              <p className="text-gray-300 leading-relaxed">{About}</p>
            </div>
          </div>
        </div>

        {/* Tour Plan Section */}
        {days.length > 0 && (
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-3">
              <FiCalendar className="text-[#2EC1DB]" />
              Tour <span className="text-[#2EC1DB]">Plan</span>
            </h2>
            
            <div className="space-y-4">
              {days.map((day, index) => (
                <div
                  key={index}
                  tabIndex={0}
                  className="collapse collapse-arrow bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl"
                >
                  <div className="collapse-title text-xl font-medium text-white flex items-center gap-3">
                    <span className="bg-gradient-to-r from-[#2EC1DB] to-sky-500 px-3 py-1 rounded-lg text-white font-bold">
                      Day {day.day || index + 1}
                    </span>
                    <span className="text-gray-300">{day.title}</span>
                  </div>
                  <div className="collapse-content text-gray-300 leading-relaxed">
                    <p>{day.plan}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Booking Section */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
          <h2 className="text-center text-4xl font-bold text-white mb-8">
            <span className="text-[#2EC1DB]">Book</span> Now
          </h2>
          <div className="flex justify-center">
            <BookingForm packags={packags} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailesCart;