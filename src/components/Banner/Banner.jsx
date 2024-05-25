// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Autoplay, Pagination, Navigation, Keyboard } from 'swiper/modules';

// image input
const slide1 =
  'https://img.freepik.com/free-photo/group-friends-eating-restaurant_23-2148006650.jpg?t=st=1716603953~exp=1716607553~hmac=4764ea9afc65730f9c98ddfc402bdd75f3a74bc3d5de7d92934755983a997e2f&w=900';
const slide2 =
  'https://img.freepik.com/free-photo/midsection-men-holding-coffee-cup-near-delicious-breakfast-with-juice-laptop-wooden-table_23-2148195266.jpg?t=st=1716603943~exp=1716607543~hmac=95c1952f78ea99677ed8aeebdca1a2b584309e48fb66e0eddd5320f1a737d44b&w=900';
const slide3 =
  'https://img.freepik.com/free-photo/group-friends-eating-restaurant_23-2148006650.jpg?t=st=1716603953~exp=1716607553~hmac=4764ea9afc65730f9c98ddfc402bdd75f3a74bc3d5de7d92934755983a997e2f&w=900s';

import { Link } from 'react-router-dom';

// import Nav from '../Nav/Nav';

const Banner = () => {
  return (
    <div className="relative text-white ">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        keyboard={{
          enabled: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, Keyboard]}
        className="mySwiper h-[420px] md:min-h-screen"
      >
        <SwiperSlide>
          <div
            className="h-[420px] md:min-h-screen relative overflow-hidden bg-cover bg-no-repeat p-12 text-center"
            style={{
              backgroundImage: `url(${slide1})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div
              className="absolute bottom-0 space-y-2left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
              style={{ backgroundColor: ' rgba(0, 0, 0, 0.6)' }}
            >
              <div className="flex h-full items-center justify-center relative">
                <div className="text-white px-4 max-w-[900px] space-y-0 sm:space-y-5">
                  <h1
                    data-aos="zoom-in-down"
                    data-aos-duration="1000"
                    className="text-3xl md:text-5xl lg:text-6xl leading-loose"
                  >
                    Unraveling the Essence of Exceptional Products
                  </h1>
                  <p
                    data-aos="zoom-in-down"
                    data-aos-duration="900"
                    className="max-w-[700px] mx-auto p-4 text-base md:text-lg"
                  >
                    {`Delve into the essence of each product through comprehensive reviews and insightful recommendations, guiding others toward remarkable discoveries.`}
                  </p>
                  <div data-aos="zoom-in-up" data-aos-duration="1000">
                    <Link to={'/queries'}>
                      <button className="text-xl mt-0 sm:mt-8 py-2 px-11 bg-mainColor rounded duration-300 hover:-skew-x-12 hover:bg-[#1aa3f3]">
                        All Queries
                      </button>{' '}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="h-[420px] md:min-h-screen relative overflow-hidden  bg-cover bg-no-repeat p-12 text-center"
            style={{
              backgroundImage: `url(${slide2})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div
              className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
              style={{ backgroundColor: ' rgba(0, 0, 0, 0.6)' }}
            >
              <div className="flex h-full items-center justify-center relative">
                <div className="text-white px-4 max-w-[900px] space-y-0 sm:space-y-5">
                  <h1
                    data-aos="zoom-in-down"
                    data-aos-duration="3000"
                    className="text-3xl md:text-5xl lg:text-6xl  leading-loose"
                  >
                    Elevate Your Shopping Experience with Insights
                  </h1>
                  <p
                    data-aos="zoom-in-down"
                    data-aos-duration="900"
                    className="max-w-[700px] mx-auto p-4 text-base md:text-lg"
                  >
                    {`Enhance your shopping journey with user-generated insights, empowering you to make informed decisions and uncover the best products suited to your needs.`}
                  </p>

                  <Link to={'/queries'}>
                    <button className="text-xl mt-0 sm:mt-8 py-2 px-11 bg-mainColor rounded duration-300 hover:-skew-x-12 hover:bg-[#1aa3f3]">
                      All Queries
                    </button>{' '}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="h-[420px] md:min-h-screen relative overflow-hidden  bg-cover bg-no-repeat p-12 text-center"
            style={{
              backgroundImage: `url(${slide3})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div
              className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
              style={{ backgroundColor: ' rgba(0, 0, 0, 0.6)' }}
            >
              <div className="flex h-full items-center justify-center relative">
                <div className="text-white px-4 max-w-[900px] space-y-0 sm:space-y-5">
                  <h1 className="text-3xl md:text-5xl lg:text-6xl  leading-loose">
                    Empowering Consumer Voices, Shaping Quality
                  </h1>
                  <p className="max-w-[700px] mx-auto p-4 text-base md:text-lg">
                    Engage in lively discussions, share insights, and influence
                    product standards by contributing your reviews and
                    recommendations within our vibrant community.
                  </p>
                  <Link to={'/all-menu'}>
                    <button className="text-xl mt-0 sm:mt-8 py-2 px-11 bg-mainColor rounded duration-300 hover:-skew-x-12 hover:bg-[#1aa3f3]">
                      ALL MENU
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
