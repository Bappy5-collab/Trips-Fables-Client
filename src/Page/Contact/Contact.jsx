const Contact = () => {
    return (
        <div className="w-full min-h-screen flex items-center justify-center py-12 px-4 md:px-8 lg:px-16">
            <form className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl">
                <h2 className="text-4xl font-bold text-white mb-2 text-center">Contact Us</h2>
                <p className="text-gray-300 text-center mb-8">We'd love to hear from you!</p>

                <div className="space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-white font-semibold mb-2">Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2EC1DB] focus:border-transparent transition-all"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-white font-semibold mb-2">E-mail</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2EC1DB] focus:border-transparent transition-all"
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-white font-semibold mb-2">Phone Number</label>
                        <input
                            id="phone"
                            type="tel"
                            placeholder="Enter your phone number"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2EC1DB] focus:border-transparent transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-gradient-to-r from-[#2EC1DB] to-sky-500 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-[1.02]"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Contact;
