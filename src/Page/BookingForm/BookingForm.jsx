/* eslint-disable react/prop-types */


import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UseAuth from "../Hooks/UseAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import userAxioxSecure from "../Hooks/UserAxioxSecure";




const BookingForm = ({ packags }) => {
  const { price, tripTitle } = packags || {};

  const [startDate, setStartDate] = useState(new Date());
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const { user } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = userAxioxSecure();

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid File',
          text: 'Please select a valid image file'
        });
        return;
      }
      // Max 2MB for base64
      if (file.size > 2 * 1024 * 1024) {
        Swal.fire({
          icon: 'error',
          title: 'File Too Large',
          text: 'Image size should be less than 2MB'
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBookin = async (event) => {
    if (user && user?.email) {
      event.preventDefault();
      const form = event.target;
      
      if (!imagePreview) {
        Swal.fire({
          icon: 'warning',
          title: 'Image Required',
          text: 'Please upload a photo'
        });
        return;
      }

      setUploading(true);

      try {
        // Use base64 image
        const imageUrl = imagePreview;

        const name = form.name.value;
        const email = form.email.value;
        const date = form.date.value;
        const price = form.price.value;
        const guide = form.guide.value;
        const allData = { name, email, image: imageUrl, date, price, guide, tripTitle };

        const res = await axiosSecure.post('/bookings', allData);
        
        console.log(res.data);
        
        if (res.data.insertedId) {
          setUploading(false);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Package Booked Successfully!",
            showConfirmButton: false,
            timer: 1500
          });
          // Reset form
          event.target.reset();
          setImagePreview(null);
        }
      } catch (error) {
        setUploading(false);
        console.error('Booking error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Booking Failed',
          text: error.message || 'Failed to book package. Please try again.'
        });
      }
    }
    else {
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
          navigate('/login', { state: { form: location } })
        }
      });
    }
  }



  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={handleBookin} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          {/* Left Side Inputs */}
          <div>
            <label className="block text-white font-semibold mb-2">Name</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2EC1DB] focus:border-transparent transition-all"
              required
              name="name"
            />
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">E-mail</label>
            <input
              type="email"
              placeholder="Enter Your E-mail"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2EC1DB] focus:border-transparent transition-all"
              required
              name="email"
            />
          </div>
        </div>

        {/* Right Side Inputs */}
        <div>
          <label className="block text-white font-semibold mb-2">Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#2EC1DB] file:text-white hover:file:bg-[#2EC1DB]/90 file:cursor-pointer cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2EC1DB] focus:border-transparent transition-all"
            required
            name="image"
          />
          {imagePreview && (
            <div className="mt-3">
              <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg border-2 border-[#2EC1DB]" />
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-white font-semibold mb-2">Date</label>
            <div className="bg-white/10 border border-white/20 rounded-lg p-2">
              <DatePicker
                name="date"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="w-full bg-transparent text-white border-none outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">Price</label>
            <input
              type="number"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 cursor-not-allowed opacity-70"
              required
              defaultValue={price}
              readOnly
              name="price"
            />
          </div>
        </div>

        <div>
          <label className="block text-white font-semibold mb-2">Guide Name</label>
          <input
            type="text"
            placeholder="Guide Name"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2EC1DB] focus:border-transparent transition-all"
            required
            name="guide"
          />
        </div>

        <div className="pt-4">
          <button 
            disabled={uploading}
            className="w-full py-4 bg-gradient-to-r from-[#2EC1DB] to-sky-500 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? 'Uploading...' : 'Book Now'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;