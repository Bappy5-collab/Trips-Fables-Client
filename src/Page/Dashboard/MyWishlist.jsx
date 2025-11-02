import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Authprovider/Authprovider";
import MywishCart from "./MywishCart";
import { FiHeart } from "react-icons/fi";

const MyWishlist = () => {
    const {user} = useContext(AuthContext);
    const [booking, setBooking] = useState([]);
    const BookingData = `https://asssignment-12-serverrr.vercel.app/whishlist/${user?.email}`
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
                  <FiHeart className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#2EC1DB] to-sky-500/30">
                    My Wishlist
                  </h2>
                  <p className="text-gray-600">Your saved travel destinations</p>
                </div>
              </div>
              {booking.length > 0 && (
                <div className="mt-4 inline-block px-4 py-2 bg-pink-100 text-pink-700 rounded-full font-semibold">
                  Saved Tours: {booking.length}
                </div>
              )}
            </div>

            {/* Wishlist Grid */}
            {booking.length === 0 ? (
              <div className="text-center py-20">
                <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                  <FiHeart size={48} className="text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Your Wishlist is Empty</h3>
                <p className="text-gray-600">Start exploring and save your favorite tours!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                  booking?.map(book => <MywishCart key={book._id} book={book}></MywishCart>)
                }
              </div>
            )}
          </div>
        </div>
    );
};

export default MyWishlist;