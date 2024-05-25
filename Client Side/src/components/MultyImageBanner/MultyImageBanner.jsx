// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Autoplay } from 'swiper/modules';
import { PropTypes } from 'prop-types';

const MultyImageBanner = ({ img1, img2, img3, img4, img5 }) => {
  return (
    <div className="h-full w-full grid grid-cols-4 grid-rows-2">
      <div className="w-full bg-red-400 row-span-2 col-span-2">
        <Swiper
          className="mySwiper h-full"
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          <SwiperSlide
            className="h-full w-full"
            style={{
              backgroundImage: `url(${img1})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          ></SwiperSlide>
          <SwiperSlide
            className="h-full w-full"
            style={{
              backgroundImage: `url(${img2})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          ></SwiperSlide>
          <SwiperSlide
            className="h-full w-full"
            style={{
              backgroundImage: `url(${img3})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          ></SwiperSlide>
        </Swiper>
      </div>
      <div className="w-full bg-yellow-400">
        <Swiper
          className="mySwiper h-full"
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 1700,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          <SwiperSlide
            className="h-full w-full"
            style={{
              backgroundImage: `url(${img4})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          ></SwiperSlide>
          <SwiperSlide
            className="h-full w-full"
            style={{
              backgroundImage: `url(${img5})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          ></SwiperSlide>
          <SwiperSlide
            className="h-full w-full"
            style={{
              backgroundImage: `url(${img1})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          ></SwiperSlide>
        </Swiper>
      </div>
      <div className="w-full bg-green-400">
        <Swiper
          className="mySwiper h-full"
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          <SwiperSlide
            className="h-full w-full"
            style={{
              backgroundImage: `url(${img3})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          ></SwiperSlide>
          <SwiperSlide
            className="h-full w-full"
            style={{
              backgroundImage: `url(${img5})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          ></SwiperSlide>
          <SwiperSlide
            className="h-full w-full"
            style={{
              backgroundImage: `url(${img1})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          ></SwiperSlide>
        </Swiper>
      </div>
      <div className="w-full bg-emerald-800">
        <Swiper
          className="mySwiper h-full"
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          <SwiperSlide
            className="h-full w-full"
            style={{
              backgroundImage: `url(${img2})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          ></SwiperSlide>
          <SwiperSlide
            className="h-full w-full"
            style={{
              backgroundImage: `url(${img4})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          ></SwiperSlide>
          <SwiperSlide
            className="h-full w-full"
            style={{
              backgroundImage: `url(${img1})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          ></SwiperSlide>
        </Swiper>
      </div>
      <div className="w-full bg-purple-500">
        <Swiper
          className="mySwiper h-full"
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          <SwiperSlide
            className="h-full w-full"
            style={{
              backgroundImage: `url(${img3})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          ></SwiperSlide>
          <SwiperSlide
            className="h-full w-full"
            style={{
              backgroundImage: `url(${img5})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          ></SwiperSlide>
          <SwiperSlide
            className="h-full w-full"
            style={{
              backgroundImage: `url(${img2})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          ></SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default MultyImageBanner;

MultyImageBanner.propTypes = {
  img1: PropTypes.string,
  img2: PropTypes.string,
  img3: PropTypes.string,
  img4: PropTypes.string,
  img5: PropTypes.string,
};
