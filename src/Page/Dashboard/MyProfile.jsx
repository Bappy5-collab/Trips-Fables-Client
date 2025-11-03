import { useContext } from "react";
import { AuthContext } from "../../Authprovider/Authprovider";
import Swal from "sweetalert2";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
   
  const handleStory = (event) => {
    event.preventDefault();
    const form = event.target;
    const tourType = form.tourType.value;
    const date = form.date.value;
    const name = form.story.value;
    const email = form.email.value;
    const Rate = form.Rate.value;
    const story = form.story.value;
   const photo = form.photo.value;
    const allStory = { tourType, date,name,email,photo, Rate, story};
    console.log(allStory);
   
    fetch("https://asssignment-12-serverrr.vercel.app/story", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(allStory),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Story Added",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className="min-h-screen w-full">
      <div className="w-full px-6 lg:px-8 py-8 flex justify-center">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="mb-8">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#2EC1DB] to-sky-500/30 mb-2">
            My Profile
          </h2>
          <p className="text-gray-600">Manage your profile and share your travel stories</p>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img 
                className="h-24 w-24 rounded-full ring-4 ring-[#2EC1DB] ring-opacity-20" 
                src={user?.photoURL || user?.dbPhoto || "https://cdn-icons-png.flaticon.com/512/4140/4140048.png"} 
                alt="Profile" 
              />
              <div className="absolute bottom-0 right-0 h-8 w-8 bg-green-500 rounded-full border-4 border-white"></div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                {user?.displayName}
              </h2>
              <p className="text-gray-600 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Story Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Share Your Story</h3>
            <p className="text-gray-600">Tell us about your amazing travel experience</p>
          </div>

          <form onSubmit={handleStory} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tour Type
                </label>
                <input
                  type="text"
                  placeholder="e.g., Adventure, Cultural, Beach"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2EC1DB] focus:border-transparent transition-all duration-200"
                  required
                  name="tourType"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2EC1DB] focus:border-transparent transition-all duration-200"
                  required
                  name="date"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter Your Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2EC1DB] focus:border-transparent transition-all duration-200"
                required
                defaultValue={user.displayName}
                name="name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter Your E-mail"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                required
                defaultValue={user.email}
                readOnly
                name="email"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Rating
              </label>
              <input
                type="number"
                placeholder="Rate from 1 to 5"
                min="1"
                max="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2EC1DB] focus:border-transparent transition-all duration-200"
                required
                name="Rate"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Photo URL
              </label>
              <input
                type="text"
                placeholder="https://example.com/photo.jpg"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2EC1DB] focus:border-transparent transition-all duration-200"
                required
                name="photo"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Write Your Story
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2EC1DB] focus:border-transparent transition-all duration-200 resize-none"
                name="story"
                rows="6"
                placeholder="Share your amazing travel experience..."
              ></textarea>
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-[#2EC1DB] to-sky-500 text-white font-semibold py-4 rounded-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                Submit Your Story
              </button>
            </div>
          </form>
        </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
