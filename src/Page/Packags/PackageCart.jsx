/* eslint-disable react/prop-types */
import { useContext } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Authprovider/Authprovider";

const PackageCart = ({ packag }) => {
  const {user} = useContext(AuthContext)
  const email = user?.email
  const navigate = useNavigate();
  const {_id, image, price, tripTitle,tourType } = packag ||{};
  const alldata = {image,price,tripTitle,tourType,email}

  const handleAdd = () =>{
    fetch('https://asssignment-12-serverrr.vercel.app/whishlist',{
      method:'POST',
      headers:{
        'content-type': 'application/json'
      },
      body: JSON.stringify(alldata),
    })
    .then(res =>res.json())
    .then(data =>{
      console.log(data);
      if(data.insertedId){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added to wishlist",
          showConfirmButton: false,
          timer: 1500
        });
      }
      else{
        Swal.fire({
          title: "You are not Logged in",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, login!"
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/login',{state:{form:location}})
          }
        });
        }
    })
    
  }

  return (
    <div className="group relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-xl">
      {/* Wishlist Button */}
      <button 
        onClick={handleAdd} 
        className="absolute top-4 right-4 z-10 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full transition-all duration-300"
      >
        <FaRegHeart className="text-white hover:text-red-500" size={20} />
      </button>

      {/* Image */}
      <figure className="relative overflow-hidden">
        <img 
          className="h-[250px] w-full object-cover group-hover:scale-110 transition-transform duration-500" 
          src={image} 
          alt={tripTitle} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </figure>

      {/* Content */}
      <div className="p-6 space-y-3">
        <h2 className="text-xl font-bold text-white line-clamp-1">{tripTitle}</h2>
        <p className="text-gray-300 text-sm flex items-center gap-2">
          <span className="text-[#2EC1DB]">📍</span>
          {tourType}
        </p>
        <p className="text-2xl font-extrabold text-white">
          <span className="text-gray-400">৳</span> {price}
        </p>
        <div className="pt-2">
          <Link 
            to={`/detailes/${_id}`}
            className="block w-full text-center py-3 bg-gradient-to-r from-[#2EC1DB] to-sky-500 text-white font-semibold rounded-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300"
          >
            View Package
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PackageCart;
