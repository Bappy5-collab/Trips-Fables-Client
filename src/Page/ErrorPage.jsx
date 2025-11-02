
import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <div className="mb-8">
              <h1 className="text-9xl font-bold text-[#2EC1DB] mb-4">404</h1>
              <h2 className="text-4xl font-bold text-white mb-4">Page Not Found</h2>
              <p className="text-gray-300 text-xl mb-8">
                Sorry, the page you're looking for doesn't exist or has been moved.
              </p>
            </div>
            
            <Link 
              to={'/'}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#2EC1DB] to-sky-500 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
            >
              <FiHome size={20} />
              Back Home
            </Link>
          </div>
        </div>
    );
};

export default ErrorPage;