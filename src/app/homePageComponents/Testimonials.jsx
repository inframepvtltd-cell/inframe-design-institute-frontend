'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FaStar, FaPlay } from "react-icons/fa";
import { useState } from "react";
import { Autoplay } from "swiper/modules";

export default function Testimonials() {
    const [activeVideoIndex, setActiveVideoIndex] = useState(null);

    const videos = [
        "https://www.youtube.com/embed/D4gjVOXf9Io",
        "https://www.youtube.com/embed/nQPYYIMWUFk",
        "https://www.youtube.com/embed/8eEjcuKTP9Q",
        "https://www.youtube.com/embed/WGImQEWpfJE",
    ];

    return (
        <div className="w-full bg-gradient-to-b from-[#f9fafb] my-5 to-[#f1f5f9] py-10">
            <div className="max-w-[1320px] mx-auto lg:px-0 px-3">

                {/* Section Header */}
                <div className="max-w-[700px] mb-14">
                    <h3 className="lg:text-4xl text-3xl font-extrabold text-black leading-tight">
                        What Our Students Say
                    </h3>

                    <p className="mt-4 text-[18px] text-gray-600 leading-relaxed">
                        Real stories from learners who transformed their careers with us.
                    </p>
                </div>

                {/* Slider */}
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={32}
                    loop
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 4 },
                    }}
                >
                    {videos.map((video, index) => (
                        <SwiperSlide key={index}>
                            <div className="group relative rounded-3xl overflow-hidden  shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] hover:-translate-y-2 transition-all duration-500">

                                {/* Video Frame */}
                                <div className="relative pt-[150%] overflow-hidden">
                                    <iframe
                                        src={video}
                                        title={`Student testimonial ${index + 1}`}
                                        className="absolute top-0 right-0 w-[130%] h-full rounded-3xl"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>

                                {/* Subtle Premium Overlay */}
                                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-black/5 group-hover:ring-black/10 transition" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>

    );
}
