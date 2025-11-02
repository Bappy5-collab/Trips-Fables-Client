import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../Authprovider/Authprovider";
import Swal from "sweetalert2";
import { BiLogOut } from "react-icons/bi";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import { FiMenu, FiX } from "react-icons/fi";
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  console.log(user)
  
  const handleLogOut = () => {
    logOut()
      .then(
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Log out",
          showConfirmButton: false,
          timer: 1500
        })
      )
      .catch()
  }
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  }
  return (
    <div className="sticky top-0 z-50 bg-black/30 backdrop-blur-md shadow-lg border-b border-white/20 w-full">
      <div className="navbar max-w-[1350px] mx-auto px-4 md:px-8 lg:px-16">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[10]  p-2 shadow bg-black/90 backdrop-blur-lg border border-white/20 text-white rounded-box w-52 text-xl"
            >
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/community"}>Community</Link>
              </li>
              <li>
                <Link to={"/blogs"}>Blogs</Link>
              </li>
              <li>
                <Link to={"/about"}>About Us</Link>
              </li>
              <li>
                <Link to={"/contact"}>Contact Us</Link>
              </li>
              <li>
                {
                  user ? <Link onClick={handleLogOut}>Logout</Link>
                    : <Link to={"/login"}>Login</Link>
                }
              </li>
            </ul>
          </div>
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src="https://i.postimg.cc/qvgWBtWP/Travelite-removebg-preview-1.png" alt="Logo" className="h-12 w-12" />
            <h2 className="text-3xl w-full text-transparent bg-clip-text font-extrabold bg-gradient-to-r from-[#2EC1DB] to-sky-500">Trips Fables</h2>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-base font-medium">
            <li>
              <NavLink to={"/"} className={({ isActive }) =>
                isActive
                  ? "text-[#2EC1DB] font-semibold border-b-2 border-[#2EC1DB]"
                  : "hover:text-[#2EC1DB] transition-colors"}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to={"/community"} className={({ isActive }) =>
                isActive
                  ? "text-[#2EC1DB] font-semibold border-b-2 border-[#2EC1DB]"
                  : "hover:text-[#2EC1DB] transition-colors"}>
                Community
              </NavLink>
            </li>
            <li>
              <NavLink to={"/blogs"} className={({ isActive }) =>
                isActive
                  ? "text-[#2EC1DB] font-semibold border-b-2 border-[#2EC1DB]"
                  : "hover:text-[#2EC1DB] transition-colors"}>
                Blogs
              </NavLink>
            </li>
            <li>
              <NavLink to={"/about"} className={({ isActive }) =>
                isActive
                  ? "text-[#2EC1DB] font-semibold border-b-2 border-[#2EC1DB]"
                  : "hover:text-[#2EC1DB] transition-colors"}>
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to={"/contact"} className={({ isActive }) =>
                isActive
                  ? "text-[#2EC1DB] font-semibold border-b-2 border-[#2EC1DB]"
                  : "hover:text-[#2EC1DB] transition-colors"}>
                Contact Us
              </NavLink>
            </li>
            {
              user ? <>
              </>
                : <li>
                  <NavLink to={"/login"} className={({ isActive }) =>
                    isActive
                      ? "text-[#2EC1DB] font-semibold border-b-2 border-[#2EC1DB]"
                      : "hover:text-[#2EC1DB] transition-colors flex items-center gap-1"
                  }>
                    <FaSignInAlt size={16} />
                    Login
                  </NavLink>
                </li>
            }


            {
              user ? <></>
                :
                <li>
                  <NavLink to={"/signup"} className={({ isActive }) =>
                    isActive
                      ? "bg-[#2EC1DB] text-white font-semibold rounded-lg px-4 py-2"
                      : "bg-gradient-to-r from-[#2EC1DB] to-sky-500 text-white hover:shadow-lg transition-all rounded-lg px-4 py-2 flex items-center gap-1"
                  }>
                    <FaUserPlus size={16} />
                    Sign Up
                  </NavLink>
                </li>
            }
          </ul>

        </div>
        <div className="navbar-end">
          {/* Desktop User Menu */}
          <div className="hidden lg:flex items-center gap-4">
            {user && (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-white font-semibold text-sm">{user.displayName}</p>
                  <p className="text-gray-400 text-xs">{user.email?.split('@')[0]}</p>
                </div>
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#2EC1DB]">
                  <img
                    src={user?.photoURL || "https://cdn-icons-png.flaticon.com/512/4140/4140048.png"}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
            {user && (
              <NavLink 
                to={"/dashboard"} 
                className="px-4 py-2 bg-gradient-to-r from-[#2EC1DB] to-sky-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Dashboard
              </NavLink>
            )}
            {user && (
              <button 
                onClick={handleLogOut} 
                className="px-4 py-2 flex items-center gap-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
              >
                <BiLogOut size={18} />
                Logout
              </button>
            )}
          </div>

          {/* Mobile Hamburger Menu */}
          {user && (
            <div className="lg:hidden">
              <button 
                onClick={toggleMobileMenu}
                className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
              
              {/* Mobile Menu Dropdown */}
              {mobileMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-black/95 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50">
                  <div className="p-4 border-b border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#2EC1DB]">
                        <img
                          src={user?.photoURL || "https://cdn-icons-png.flaticon.com/512/4140/4140048.png"}
                          alt="User Avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-white font-semibold">{user.displayName}</p>
                        <p className="text-gray-400 text-sm">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#2EC1DB] to-sky-500 text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all mb-2"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogOut();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                    >
                      <BiLogOut size={18} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
