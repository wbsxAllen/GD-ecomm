// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';

// Import Swiper styles
import 'swiper/css';
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules';

import { bannerLists } from '../../utils';
import { Link } from 'react-router-dom';

const colors = ["bg-[#ff3c3c]", "bg-[#1e90ff]", "bg-[#232f3e]"];

const HeroBanner = () => {
    return (
        <div className='py-2 rounded-md'>
            <Swiper
                grabCursor={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                navigation
                modules={[Pagination, EffectFade, Navigation, Autoplay]}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                slidesPerView={1}>
                {bannerLists.map((item, i) => (
                    <SwiperSlide key={item.id}>
                        <div className={`carousel-item rounded-md sm:h-[500px] h-96 ${colors[i % colors.length]}`}>
                            <div className='flex items-center justify-center h-full'>
                                <div className='hidden lg:flex justify-center w-1/2 p-8'>
                                    <div className='text-center'>
                                        <h3 className='text-3xl text-white font-bold drop-shadow mb-2'>
                                            {item.title}
                                        </h3>
                                        <h1 className='text-5xl text-white font-extrabold mt-2 drop-shadow mb-2'>
                                            {item.subtitle}
                                        </h1>
                                        <p className='text-white font-medium mt-4 drop-shadow mb-4'>
                                            {item.description}
                                        </p>
                                        <Link
                                            className='mt-6 inline-block bg-black text-white py-2 px-6 rounded hover:bg-gray-800 font-semibold shadow transition'
                                            to="/products">
                                            Shop
                                        </Link>
                                    </div>
                                </div>
                                <div className='w-full flex justify-center lg:w-1/2 p-4'>
                                    <img src={item?.image} className='max-h-[340px] object-contain rounded shadow-lg bg-white'/>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default HeroBanner; 