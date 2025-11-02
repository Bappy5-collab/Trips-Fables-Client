import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Authprovider/Authprovider";
import BookingCart from "./BookingCart";
import { FiBook } from "react-icons/fi";

const MyBooking = () => {

    const {user} = useContext(AuthContext);
    const [booking, setBooking] = useState([]);
    const BookingData = `https://asssignment-12-serverrr.vercel.app/bookings/${user?.email}`
    useEffect(()=>{
      fetch(BookingData)
      .then(res =>res.json())
      .then(data =>setBooking(data))
    },[BookingData])
    return (
        <div className="min-h-screen w-full">
          <div className="w-full px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-gradient-to-r from-[#2EC1DB] to-sky-500 rounded-xl shadow-lg">
                  <FiBook className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#2EC1DB] to-sky-500/30">
                    My Bookings
                  </h2>
                  <p className="text-gray-600">Manage your tour bookings</p>
                </div>
              </div>
              {booking.length > 0 && (
                <div className="mt-4 inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold">
                  Total Bookings: {booking.length}
                </div>
              )}
            </div>

            {/* Bookings List */}
            {booking.length === 0 ? (
              <div className="text-center py-20">
                <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                  <FiBook size={48} className="text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Bookings Yet</h3>
                <p className="text-gray-600">Start exploring amazing tours and book your next adventure!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {
                  booking?.map(book => <BookingCart key={book._id} book={book}></BookingCart>)
                }
              </div>
            )}
          </div>
        </div>
    );
};

export default MyBooking;