import Swal from "sweetalert2";
import { FiPackage, FiImage, FiCalendar, FiDollarSign, FiFileText, FiPlus, FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import uploadImageToImgBB from "../Hooks/useImgBB";

const AddPackage = () => {
    const [days, setDays] = useState([{ id: 1, title: '', plan: '' }]);
    const [uploading, setUploading] = useState(false);
    const [imagePreviews, setImagePreviews] = useState({
        main: null,
        gallery1: null,
        gallery2: null,
        gallery3: null,
        gallery4: null
    });
    const [selectedFiles, setSelectedFiles] = useState({
        main: null,
        gallery1: null,
        gallery2: null,
        gallery3: null,
        gallery4: null
    });

    const addDay = () => {
        setDays([...days, { id: days.length + 1, title: '', plan: '' }]);
    };

    const removeDay = (id) => {
        if (days.length > 1) {
            setDays(days.filter(day => day.id !== id));
        }
    };

    // Handle image file changes with preview
    const handleImageChange = (e, imageKey) => {
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
            // Max 32MB for ImgBB
            if (file.size > 32 * 1024 * 1024) {
                Swal.fire({
                    icon: 'error',
                    title: 'File Too Large',
                    text: 'Image size should be less than 32MB'
                });
                return;
            }
            // Store the file object
            setSelectedFiles({ ...selectedFiles, [imageKey]: file });
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews({ ...imagePreviews, [imageKey]: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAdd = async (event) => {
        event.preventDefault();
        const form = event.target;
        
        // Check if all images are provided
        if (!selectedFiles.main || !selectedFiles.gallery1 || !selectedFiles.gallery2 || !selectedFiles.gallery3 || !selectedFiles.gallery4) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Images',
                text: 'Please upload all required images'
            });
            return;
        }

        setUploading(true);

        try {
            // Upload all images to ImgBB
            let image, galleryIM1, galleryIM2, galleryIM3, galleryIM4;
            try {
                [image, galleryIM1, galleryIM2, galleryIM3, galleryIM4] = await Promise.all([
                    uploadImageToImgBB(selectedFiles.main),
                    uploadImageToImgBB(selectedFiles.gallery1),
                    uploadImageToImgBB(selectedFiles.gallery2),
                    uploadImageToImgBB(selectedFiles.gallery3),
                    uploadImageToImgBB(selectedFiles.gallery4)
                ]);
            } catch (uploadError) {
                setUploading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Image Upload Failed',
                    text: uploadError.message || 'Failed to upload one or more images. Please try again.'
                });
                return;
            }

            const tourType = form.tourType.value;
            const tripTitle = form.tripTitle.value;
            const price = form.price.value;
            const About = form.About.value;
            
            // Collect itinerary data
            const itinerary = days.map((day, index) => ({
                day: index + 1,
                title: form[`day${day.id}Title`]?.value || '',
                plan: form[`day${day.id}plan`]?.value || ''
            }));
        
            const addData = {
                image,
                tourType,
                tripTitle,
                price,
                galleryIM1,
                galleryIM2,
                galleryIM3,
                galleryIM4,
                itinerary,
                About
            };
            
            console.log(addData);
            
            const response = await fetch('https://asssignment-12-serverrr.vercel.app/all', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(addData)
            });

            const data = await response.json();
            console.log(data);
            
            if (data.insertedId) {
                setUploading(false);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: 'Package Added Successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
                // Reset form
                event.target.reset();
                setImagePreviews({
                    main: null,
                    gallery1: null,
                    gallery2: null,
                    gallery3: null,
                    gallery4: null
                });
                setSelectedFiles({
                    main: null,
                    gallery1: null,
                    gallery2: null,
                    gallery3: null,
                    gallery4: null
                });
                setDays([{ id: 1, title: '', plan: '' }]);
            }
        } catch (error) {
            setUploading(false);
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Upload Failed',
                text: error.message || 'Failed to add package. Please try again.'
            });
        }
    }

  return (
    <div className="min-h-screen w-full">
      <div className="w-full px-6 lg:px-8 py-8 flex justify-center">
        <div className="w-full max-w-5xl">
          {/* Header */}
          <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-r from-[#2EC1DB] to-sky-500 rounded-xl shadow-lg">
              <FiPackage className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#2EC1DB] to-sky-500/30">
                Add New Package
              </h2>
              <p className="text-gray-600">Create an amazing travel package</p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleAdd} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FiFileText className="text-[#2EC1DB]" />
                Basic Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FiImage className="inline mr-2" /> Main Tour Image
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2EC1DB] focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#2EC1DB] file:text-white hover:file:bg-[#2EC1DB]/90 file:cursor-pointer cursor-pointer"
                    required
                    accept="image/*"
                    name="image"
                    type="file"
                    onChange={(e) => handleImageChange(e, 'main')}
                  />
                  {imagePreviews.main && (
                    <div className="mt-3">
                      <img src={imagePreviews.main} alt="Preview" className="w-full h-48 object-cover rounded-lg border-2 border-[#2EC1DB]" />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tour Type
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2EC1DB] focus:border-transparent transition-all duration-200"
                    required
                    name="tourType"
                    type="text"
                    placeholder="e.g., Adventure, Cultural"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tour Name
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2EC1DB] focus:border-transparent transition-all duration-200"
                    type="text"
                    name="tripTitle"
                    placeholder="Enter tour title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FiDollarSign className="inline mr-2" /> Price (TK)
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2EC1DB] focus:border-transparent transition-all duration-200"
                    name="price"
                    type="number"
                    placeholder="Enter price"
                  />
                </div>
              </div>
            </div>

            {/* Gallery Images */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FiImage className="text-[#2EC1DB]" />
                Gallery Images
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Gallery Image 1
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2EC1DB] focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#2EC1DB] file:text-white hover:file:bg-[#2EC1DB]/90 file:cursor-pointer cursor-pointer"
                    required
                    accept="image/*"
                    name="galleryIM1"
                    type="file"
                    onChange={(e) => handleImageChange(e, 'gallery1')}
                  />
                  {imagePreviews.gallery1 && (
                    <div className="mt-3">
                      <img src={imagePreviews.gallery1} alt="Preview" className="w-full h-48 object-cover rounded-lg border-2 border-[#2EC1DB]" />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Gallery Image 2
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2EC1DB] focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#2EC1DB] file:text-white hover:file:bg-[#2EC1DB]/90 file:cursor-pointer cursor-pointer"
                    required
                    accept="image/*"
                    name="galleryIM2"
                    type="file"
                    onChange={(e) => handleImageChange(e, 'gallery2')}
                  />
                  {imagePreviews.gallery2 && (
                    <div className="mt-3">
                      <img src={imagePreviews.gallery2} alt="Preview" className="w-full h-48 object-cover rounded-lg border-2 border-[#2EC1DB]" />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Gallery Image 3
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2EC1DB] focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#2EC1DB] file:text-white hover:file:bg-[#2EC1DB]/90 file:cursor-pointer cursor-pointer"
                    required
                    accept="image/*"
                    name="galleryIM3"
                    type="file"
                    onChange={(e) => handleImageChange(e, 'gallery3')}
                  />
                  {imagePreviews.gallery3 && (
                    <div className="mt-3">
                      <img src={imagePreviews.gallery3} alt="Preview" className="w-full h-48 object-cover rounded-lg border-2 border-[#2EC1DB]" />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Gallery Image 4
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2EC1DB] focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#2EC1DB] file:text-white hover:file:bg-[#2EC1DB]/90 file:cursor-pointer cursor-pointer"
                    required
                    accept="image/*"
                    name="galleryIM4"
                    type="file"
                    onChange={(e) => handleImageChange(e, 'gallery4')}
                  />
                  {imagePreviews.gallery4 && (
                    <div className="mt-3">
                      <img src={imagePreviews.gallery4} alt="Preview" className="w-full h-48 object-cover rounded-lg border-2 border-[#2EC1DB]" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Itinerary */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <FiCalendar className="text-[#2EC1DB]" />
                  Itinerary
                </h3>
                <button
                  type="button"
                  onClick={addDay}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#2EC1DB] to-sky-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <FiPlus size={18} />
                  Add Day
                </button>
              </div>
              <div className="space-y-6">
                {days.map((day, index) => (
                  <div key={day.id} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-700">Day {index + 1}</h4>
                      {days.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeDay(day.id)}
                          className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      )}
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Day {index + 1} Title
                        </label>
                        <input
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2EC1DB] focus:border-transparent transition-all duration-200"
                          required
                          name={`day${day.id}Title`}
                          type="text"
                          placeholder={`Day ${index + 1} activities`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Day {index + 1} Plan
                        </label>
                        <textarea
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2EC1DB] focus:border-transparent transition-all duration-200 resize-none"
                          required
                          name={`day${day.id}plan`}
                          rows="3"
                          placeholder={`Describe day ${index + 1} activities...`}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-gray-200 pt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FiFileText className="inline mr-2" /> Description
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2EC1DB] focus:border-transparent transition-all duration-200 resize-none"
                required
                name="About"
                rows="5"
                placeholder="Write a detailed description of your package..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <button 
                type="submit"
                disabled={uploading}
                className="w-full bg-gradient-to-r from-[#2EC1DB] to-sky-500 text-white font-semibold py-4 rounded-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? 'Adding Package...' : 'Add Package'}
              </button>
            </div>
          </form>
        </div>
        </div>
      </div>
    </div>
  );
};

export default AddPackage;
