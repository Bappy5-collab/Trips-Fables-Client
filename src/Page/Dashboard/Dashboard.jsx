
import { Link, Outlet, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import { useState } from "react";
import { FiHome, FiUser, FiPlus, FiUsers, FiBook, FiHeart, FiMenu, FiX } from "react-icons/fi";

const Dashboard = () => {

  const [isAdmin] = useAdmin();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path || location.pathname.includes(path);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Mobile Sidebar Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-3 bg-gradient-to-r from-[#2EC1DB] to-sky-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } fixed md:sticky top-0 left-0 h-screen w-64 bg-gradient-to-b from-[#2EC1DB] to-sky-600 shadow-2xl transition-transform duration-300 z-40`}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Logo/Title */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-1">Dashboard</h2>
            <p className="text-blue-100 text-sm">Welcome Back!</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {isAdmin ? (
                <>
                  <li>
                    <Link 
                      to={"/dashboard"} 
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive("/dashboard") && !location.pathname.includes("addpackage") && !location.pathname.includes("manageuser")
                          ? "bg-white text-[#2EC1DB] shadow-lg font-semibold" 
                          : "text-white hover:bg-white/10"
                      }`}
                    >
                      <FiUser size={20} />
                      <span>My Profile</span>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to={"dashboard/addpackage"}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive("/addpackage")
                          ? "bg-white text-[#2EC1DB] shadow-lg font-semibold" 
                          : "text-white hover:bg-white/10"
                      }`}
                    >
                      <FiPlus size={20} />
                      <span>Add Package</span>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to={"dashboard/manageuser"}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive("/manageuser")
                          ? "bg-white text-[#2EC1DB] shadow-lg font-semibold" 
                          : "text-white hover:bg-white/10"
                      }`}
                    >
                      <FiUsers size={20} />
                      <span>Manage Users</span>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link 
                      to={"/dashboard"}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive("/dashboard") && !location.pathname.includes("booking") && !location.pathname.includes("wishlist")
                          ? "bg-white text-[#2EC1DB] shadow-lg font-semibold" 
                          : "text-white hover:bg-white/10"
                      }`}
                    >
                      <FiUser size={20} />
                      <span>My Profile</span>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to={"dashboard/booking"}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive("/booking")
                          ? "bg-white text-[#2EC1DB] shadow-lg font-semibold" 
                          : "text-white hover:bg-white/10"
                      }`}
                    >
                      <FiBook size={20} />
                      <span>My Booking</span>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to={"dashboard/wishlist"}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive("/wishlist")
                          ? "bg-white text-[#2EC1DB] shadow-lg font-semibold" 
                          : "text-white hover:bg-white/10"
                      }`}
                    >
                      <FiHeart size={20} />
                      <span>My Wishlist</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>

          {/* Bottom Navigation */}
          <div className="border-t border-white/20 pt-4">
            <Link 
              to={"/"}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-white/10 transition-all duration-200"
            >
              <FiHome size={20} />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 md:ml-0">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
