'use client';

import { FaChalkboardTeacher, FaBookOpen, FaTrophy } from 'react-icons/fa';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function Facility() {

    const highlights = [
        {
            id: '1',
            heading: 'Best Faculty',
            description:
                "Learn from seasoned professionals from top design institutes. Our passionate instructors ensure you're ready for every challenge.",
            icon: <FaChalkboardTeacher />,
            src: '/bestFaculty.jpg'
        },
        {
            id: '2',
            heading: 'Best Guidance',
            description:
                'Access exclusive study resources curated by experts. Stay ahead with content tailored for NIFT, NID, NATA, and UCEED.',
            icon: <FaBookOpen />,
            src: '/bestGuidence-min.jpg'
        },
        {
            id: '3',
            heading: 'Best Results',
            description:
                'Join a legacy of 100% success stories. Our students make it to the top design schools — and so can you.',
            icon: <FaTrophy />,
            src: '/bestResult-min.JPG'
        },
    ];

    return (
        <div className="w-full lg:my-[60px] my-[30px] bg-[#F4F4F4]">

            <div className="max-w-[1320px] lg:px-6 px-3 lg:pb-[60px] pb-[30px] mx-auto">
                <h3 className="lg:text-[40px] text-[25px] font-bold text-black py-5">
                    Why Student Choose Us
                </h3>

                <p className="text-gray-800 mb-10 text-lg">
                    We're not just another coaching institute — we're your launchpad to success.
                </p>

                {/* Desktop Grid */}
                <div className="hidden lg:grid lg:grid-cols-3 gap-12">
                    {highlights.map((item) => (
                        <div
                            key={item.id}
                            style={{ backgroundImage: `url(${item.src})` }}
                            className="h-[500px] relative bg-cover bg-center rounded-3xl shadow-lg border border-red-100 flex items-end p-8"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent rounded-3xl" />

                            <div className="relative z-10 max-w-lg">
                                <h3 className="text-[30px] font-bold text-white mb-3">
                                    {item.heading}
                                </h3>
                                <p className="text-white text-[15px]">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile Swiper */}
                <div className="lg:hidden block">
                    <Swiper
                        modules={[Autoplay]}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                        loop
                        speed={600}
                        slidesPerView={1}
                    >
                        {highlights.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div
                                    style={{ backgroundImage: `url(${item.src})` }}
                                    className="h-[500px] relative bg-cover bg-center rounded-3xl shadow-lg border border-red-100 flex items-end p-8"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-3xl" />

                                    <div className="relative z-10 max-w-lg">
                                        <h3 className="text-[30px] font-bold text-white mb-3">
                                            {item.heading}
                                        </h3>
                                        <p className="text-white text-[15px]">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

            </div>
        </div>
    );
}
