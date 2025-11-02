import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';

const Banner = () => {
  return (
    <div className='relative mb-20 md:mb-36'>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
        className="mySwiper rounded-b-3xl overflow-hidden shadow-2xl"
        style={{
          '--swiper-navigation-color': '#2EC1DB',
          '--swiper-pagination-color': '#2EC1DB',
        }}
      >
        <SwiperSlide>
          <div className="relative h-[400px] md:h-[600px]">
            <img 
              className='h-full w-full object-cover' 
              src="https://i.postimg.cc/Kv13BMsG/Untitled-Export-PQ5-Te-L6-Ie-1.jpg" 
              alt="Travel Destination 1" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute bottom-20 left-10 md:left-20 text-white">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">Discover Amazing Places</h2>
              <p className="text-lg md:text-xl max-w-2xl">Experience the world's most beautiful destinations</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative h-[400px] md:h-[600px]">
            <img 
              className='h-full w-full object-cover' 
              src="https://i.postimg.cc/dQhwLqDd/Untitled-Export-Ewewgk-T1p.jpg" 
              alt="Travel Destination 2" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute bottom-20 left-10 md:left-20 text-white">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">Adventure Awaits</h2>
              <p className="text-lg md:text-xl max-w-2xl">Create unforgettable memories with our curated tours</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative h-[400px] md:h-[600px]">
            <img 
              className='h-full w-full object-cover' 
              src="https://i.postimg.cc/htstV2n7/Untitled-Export-t-Rbp-Z9wj-T.jpg" 
              alt="Travel Destination 3" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute bottom-20 left-10 md:left-20 text-white">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">Travel With Us</h2>
              <p className="text-lg md:text-xl max-w-2xl">Your journey of a thousand miles starts here</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;