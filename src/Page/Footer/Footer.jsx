import { Link } from "react-router-dom";

import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiPhone, FiMail, FiMapPin } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://i.postimg.cc/qvgWBtWP/Travelite-removebg-preview-1.png"
                alt="Logo"
                className="h-12 w-12"
              />
              <h2 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#2EC1DB] to-sky-400">
                Trips Fables
              </h2>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              The best tourist agency providing unforgettable travel experiences and expert guides for your adventures.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 pt-4">
              <a href="#" className="p-2 bg-white/10 hover:bg-[#2EC1DB] rounded-lg transition-colors">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-[#2EC1DB] rounded-lg transition-colors">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-[#2EC1DB] rounded-lg transition-colors">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-[#2EC1DB] rounded-lg transition-colors">
                <FiLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#2EC1DB]">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-[#2EC1DB] transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-[#2EC1DB] transition-colors">About Us</Link></li>
              <li><Link to="/allpacakge" className="text-gray-300 hover:text-[#2EC1DB] transition-colors">All Packages</Link></li>
              <li><Link to="/blogs" className="text-gray-300 hover:text-[#2EC1DB] transition-colors">Blogs</Link></li>
              <li><Link to="/community" className="text-gray-300 hover:text-[#2EC1DB] transition-colors">Community</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#2EC1DB]">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-300 hover:text-[#2EC1DB] transition-colors">Contact Us</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-[#2EC1DB] transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-[#2EC1DB] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-[#2EC1DB] transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#2EC1DB]">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-300">
                <FiPhone className="mt-1 text-[#2EC1DB]" size={18} />
                <span className="text-sm">+1 234 567 890</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <FiMail className="mt-1 text-[#2EC1DB]" size={18} />
                <span className="text-sm">info@tripsfables.com</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <FiMapPin className="mt-1 text-[#2EC1DB]" size={18} />
                <span className="text-sm">123 Travel Street, Tourism City</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Trips Fables. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
