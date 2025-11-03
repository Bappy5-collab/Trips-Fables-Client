/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Authprovider/Authprovider";

import Swal from "sweetalert2";
import axios from "axios";
import UserAxioxPublic from "../Hooks/UserAxioxPublic";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import uploadImageToImgBB from "../Hooks/useImgBB";

const Signup = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [signError, setSignError] = useState('');
  const axiosPublic = UserAxioxPublic();

  // Handle file selection and create preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setSignError('Please select a valid image file');
        return;
      }
      // Validate file size (max 32MB for ImgBB)
      if (file.size > 32 * 1024 * 1024) {
        setSignError('Image size should be less than 32MB');
        return;
      }
      // Store the file object
      setSelectedFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setSignError('');
    }
  };

  // Upload image to ImgBB and get download URL
  const handleImageUpload = async (file) => {
    return await uploadImageToImgBB(file);
  };
  
  const handleSignup = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    
    if (password.length < 6) {
      setSignError("password must be 6 characters")
      return;
    }
    else if (!/[A-Z]/.test(password)) {
      setSignError("Don't have a capital character")
      return
    }
    else if (!/[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(password)) {
      setSignError("Don't have a special character")
      return
    }

    if (!selectedFile) {
      setSignError('Please upload a profile photo');
      return;
    }

    setSignError('');
    setUploading(true);

    try {
      // Step 1: Upload image to ImgBB first
      let photoUrl;
      try {
        photoUrl = await handleImageUpload(selectedFile);
        console.log('Image uploaded successfully to ImgBB:', photoUrl.substring(0, 50) + '...');
      } catch (uploadError) {
        setUploading(false);
        console.error('Image upload error:', uploadError);
        setSignError(`Image upload failed: ${uploadError.message || 'Please try again'}`);
        return;
      }
      
      // Validate URL length for Firebase Auth (max 2048 chars)
      if (photoUrl && photoUrl.length > 2048) {
        console.warn('Photo URL is too long for Firebase Auth:', photoUrl.length);
        // Continue anyway - will skip Firebase Auth photoURL update
      }

      const userInfo = { name, email, password, photo: photoUrl };

      // Step 2: Create user with Firebase
      let result;
      try {
        result = await createUser(email, password);
      } catch (authError) {
        setUploading(false);
        console.error('Firebase Auth error:', authError);
        setSignError(authError.message || 'Failed to create user account. Please try again.');
        return;
      }
      
      // Step 3: Update user profile with the ImgBB URL (will skip if URL is too long)
      try {
        await updateUserProfile(name, photoUrl);
        console.log('Profile updated successfully');
      } catch (profileError) {
        // If profile update fails, log but continue (photo is saved in database)
        console.warn('Profile photo update failed, but user was created:', profileError.message);
        // Still continue - user is created and photo is in database
      }
      
      // Step 4: Save user to database (photo URL is always saved here)
      try {
        await axiosPublic.post('/users', userInfo);
        console.log('User saved to database successfully');
      } catch (dbError) {
        setUploading(false);
        console.error('Database error:', dbError);
        setSignError('Failed to save user data. Please try again.');
        return;
      }
      
      setUploading(false);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Sign up successful!",
        showConfirmButton: false,
        timer: 1500
      });
      navigate(from, { replace: true });
    } catch (error) {
      setUploading(false);
      console.error('Signup error:', error);
      setSignError(error.message || 'Signup failed. Please try again.');
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Join Us!
            </h1>
            <p className="text-gray-300">Create your Trips Fables account</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-white font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2EC1DB] focus:border-transparent transition-all"
                required
                name="name"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2EC1DB] focus:border-transparent transition-all"
                required
                name="email"
              />
            </div>

            <div className="relative">
              <label className="block text-white font-semibold mb-2">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2EC1DB] focus:border-transparent transition-all pr-12"
                required
                name="password"
              />
              <span
                className="absolute right-3 bottom-3 text-gray-400 cursor-pointer hover:text-[#2EC1DB] transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </span>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                Profile Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#2EC1DB] file:text-white hover:file:bg-[#2EC1DB]/90 file:cursor-pointer cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2EC1DB] focus:border-transparent transition-all"
                required
                name="photo"
              />
              {photoPreview && (
                <div className="mt-3">
                  <img src={photoPreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg border-2 border-[#2EC1DB]" />
                </div>
              )}
            </div>

            {signError && (
              <div className="bg-red-500/20 border border-red-500 rounded-lg p-3">
                <p className="text-red-300 text-sm">{signError}</p>
              </div>
            )}

            <div className="pt-4">
              <button 
                disabled={uploading}
                className="w-full py-4 bg-gradient-to-r from-[#2EC1DB] to-sky-500 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? 'Uploading...' : 'Sign Up'}
              </button>
            </div>

            <div className="text-center">
              <p className="text-gray-300">
                Already have an account?{" "}
                <Link to={"/login"} className="text-[#2EC1DB] hover:underline font-semibold">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;