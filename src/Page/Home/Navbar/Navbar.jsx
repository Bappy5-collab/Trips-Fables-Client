import { useContext, useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../Authprovider/Authprovider";
import Swal from "sweetalert2";
import { BiLogOut } from "react-icons/bi";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { FiMenu, FiX, FiUser, FiHome, FiSettings } from "react-icons/fi";
import { HiOutlineChevronDown } from "react-icons/hi";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  
  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);
  
  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logged out successfully",
          showConfirmButton: false,
          timer: 1500
        });
        setUserMenuOpen(false);
        setMobileMenuOpen(false);
        })
      .catch(() => {})
  }
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  }
  
  return (
    <nav className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Glassmorphism background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/50 to-black/40 backdrop-blur-xl border-b border-white/10 shadow-2xl"></div>
      
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center flex-shrink-0">
            <Link 
              to="/" 
              className="flex items-center gap-3 group transition-transform hover:scale-105 duration-300"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#2EC1DB] to-sky-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <img 
                  src="https://i.postimg.cc/qvgWBtWP/Travelite-removebg-preview-1.png" 
                  alt="Logo" 
                  className="relative h-12 w-12 object-contain drop-shadow-lg"
                />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#2EC1DB] via-sky-400 to-[#2EC1DB] bg-[length:200%_auto] animate-gradient">
                Trips Fables
              </h2>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavLink 
              to="/" 
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 relative group ${
                  isActive 
                    ? "text-[#2EC1DB] bg-[#2EC1DB]/10" 
                    : "text-white/80 hover:text-white hover:bg-white/5"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="relative z-10 flex items-center gap-2">
                    <FiHome size={16} />
                    Home
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-[#2EC1DB] to-sky-500 rounded-full"></span>
                  )}
                </>
              )}
            </NavLink>
            
            <NavLink 
              to="/community" 
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                  isActive 
                    ? "text-[#2EC1DB] bg-[#2EC1DB]/10" 
                    : "text-white/80 hover:text-white hover:bg-white/5"
                }`
              }
            >
              Community
            </NavLink>
            
            <NavLink 
              to="/blogs" 
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                  isActive 
                    ? "text-[#2EC1DB] bg-[#2EC1DB]/10" 
                    : "text-white/80 hover:text-white hover:bg-white/5"
                }`
              }
            >
              Blogs
            </NavLink>
            
            <NavLink 
              to="/about" 
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                  isActive 
                    ? "text-[#2EC1DB] bg-[#2EC1DB]/10" 
                    : "text-white/80 hover:text-white hover:bg-white/5"
                }`
              }
            >
              About
            </NavLink>
            
            <NavLink 
              to="/contact" 
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                  isActive 
                    ? "text-[#2EC1DB] bg-[#2EC1DB]/10" 
                    : "text-white/80 hover:text-white hover:bg-white/5"
                }`
              }
            >
              Contact
            </NavLink>
          </div>

          {/* Right Side - Auth & User Menu */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                {/* Desktop User Menu */}
                <div className="hidden lg:flex items-center gap-3">
                  {/* User Dropdown */}
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 group"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#2EC1DB] to-sky-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                        <img
                          src={user?.photoURL || user?.dbPhoto || "https://cdn-icons-png.flaticon.com/512/4140/4140048.png"}
                          alt="User Avatar"
                          className="relative w-10 h-10 rounded-full object-cover border-2 border-[#2EC1DB]/50 group-hover:border-[#2EC1DB] transition-all"
                        />
                      </div>
                      <span className="text-white font-medium text-sm hidden xl:block max-w-[120px] truncate">
                        {user.displayName || user.email?.split('@')[0]}
                      </span>
                      <HiOutlineChevronDown 
                        className={`text-white/70 transition-transform duration-300 ${userMenuOpen ? 'rotate-180' : ''}`} 
                        size={18}
                      />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {userMenuOpen && (
                      <div className="absolute right-0 mt-2 w-64 bg-black/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="p-4 border-b border-white/10">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="absolute inset-0 bg-gradient-to-r from-[#2EC1DB] to-sky-500 rounded-full blur-lg opacity-50"></div>
                              <img
                                src={user?.photoURL || user?.dbPhoto || "https://cdn-icons-png.flaticon.com/512/4140/4140048.png"}
                                alt="User Avatar"
                                className="relative w-14 h-14 rounded-full object-cover border-2 border-[#2EC1DB]"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white font-semibold truncate">{user.displayName || 'User'}</p>
                              <p className="text-gray-400 text-sm truncate">{user.email}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-2">
                          <Link
                            to="/dashboard"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-white/90 hover:bg-white/10 rounded-xl transition-all duration-200 group"
                          >
                            <FiSettings className="group-hover:rotate-90 transition-transform duration-300" size={18} />
                            <span>Dashboard</span>
                          </Link>
                          <button
                            onClick={handleLogOut}
                            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-all duration-200 group mt-1"
                          >
                            <BiLogOut className="group-hover:translate-x-1 transition-transform duration-300" size={18} />
                            <span>Logout</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden mobile-menu-container">
                  <button
                    onClick={toggleMobileMenu}
                    className="p-2.5 text-white hover:bg-white/10 rounded-xl transition-all duration-300 relative"
                  >
                    {mobileMenuOpen ? (
                      <FiX className="rotate-90 transition-transform duration-300" size={24} />
                    ) : (
                      <FiMenu className="transition-transform duration-300" size={24} />
                    )}
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Login/Signup for non-authenticated users */}
                <div className="hidden lg:flex items-center gap-3">
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                        isActive
                          ? "text-[#2EC1DB] bg-[#2EC1DB]/10"
                          : "text-white/80 hover:text-white hover:bg-white/5"
                      }`
                    }
                  >
                    <FaSignInAlt size={16} />
                    Login
                  </NavLink>
                  
                  <NavLink
                    to="/signup"
                    className="px-5 py-2.5 bg-gradient-to-r from-[#2EC1DB] to-sky-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#2EC1DB]/50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                  >
                    <FaUserPlus size={16} />
                    Sign Up
                  </NavLink>
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={toggleMobileMenu}
                  className="lg:hidden p-2.5 text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                >
                  {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mobile-menu-container border-t border-white/10 mt-2 pt-4 pb-4 animate-in slide-in-from-top-2 duration-300">
            <div className="flex flex-col space-y-2">
              {user && (
                <div className="px-4 py-3 bg-white/5 rounded-xl mb-2 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#2EC1DB] to-sky-500 rounded-full blur-md opacity-50"></div>
                      <img
                        src={user?.photoURL || user?.dbPhoto || "https://cdn-icons-png.flaticon.com/512/4140/4140048.png"}
                        alt="User Avatar"
                        className="relative w-12 h-12 rounded-full object-cover border-2 border-[#2EC1DB]"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold truncate">{user.displayName || 'User'}</p>
                      <p className="text-gray-400 text-sm truncate">{user.email}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-3 ${
                    isActive
                      ? "text-[#2EC1DB] bg-[#2EC1DB]/10"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                <FiHome size={20} />
                Home
              </NavLink>
              
              <NavLink
                to="/community"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isActive
                      ? "text-[#2EC1DB] bg-[#2EC1DB]/10"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                Community
              </NavLink>
              
              <NavLink
                to="/blogs"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isActive
                      ? "text-[#2EC1DB] bg-[#2EC1DB]/10"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                Blogs
              </NavLink>
              
              <NavLink
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isActive
                      ? "text-[#2EC1DB] bg-[#2EC1DB]/10"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                About
              </NavLink>
              
              <NavLink
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isActive
                      ? "text-[#2EC1DB] bg-[#2EC1DB]/10"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                Contact
              </NavLink>
              
              {user ? (
                <>
                  <button
                    onClick={handleLogOut}
                    className="px-4 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 font-semibold rounded-xl transition-all duration-300 flex items-center gap-3 border border-red-500/30 mt-2"
                  >
                    <BiLogOut size={20} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-all duration-300 flex items-center gap-3 mt-2"
                  >
                    <FaSignInAlt size={20} />
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 bg-gradient-to-r from-[#2EC1DB] to-sky-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-3"
                  >
                    <FaUserPlus size={20} />
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
