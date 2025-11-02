import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Authprovider/Authprovider";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
const Login = () => {

  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        if (signIn) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Login",
            showConfirmButton: false,
            timer: 1500
          });
        }
        navigate(from, { replace: true });
      })
  };
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome Back!
            </h1>
            <p className="text-gray-300">Login to your Trips Fables account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
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

            {/* Password Field with Eye Toggle */}
            <div className="relative">
              <label className="block text-white font-semibold mb-2">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
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

            {/* Login Button */}
            <div className="pt-4">
              <button className="w-full py-4 bg-gradient-to-r from-[#2EC1DB] to-sky-500 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-[1.02]">
                Login
              </button>
            </div>

            {/* Signup Link */}
            <div className="text-center">
              <p className="text-gray-300">
                New member?{" "}
                <Link to={"/signup"} className="text-[#2EC1DB] hover:underline font-semibold">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
