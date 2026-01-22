'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";

export default function TrustedPlatform() {
    let data = [
        {
            heading: "5,000+",
            description: "Happy Students",
            src: "/happyStudents.jpg",
        },
        {
            heading: "10,000 +",
            description: "Mock Tests",
            src: "/mockTest-min.JPG",
        },
        {
            heading: "100+",
            description: "Video Lectures",
            src: "/videoLecture-min.JPG",
        },
        {
            heading: "5,000 +",
            description: "Practice Papers",
            src: "/practicePaper-min.JPG",
        },
    ];

    return (
        <div className="lg:py-[40px] py-[30px]">
            <div className="max-w-[1320px] mx-auto lg:px-6 px-3">
                <h3 className="lg:text-[40px] text-[25px] capitalize text-start font-bold text-black pt-5">
                    A Platform trusted by students
                </h3>
                <div className="mb-[55px] w-[100%]">
                    <p className="text-start mt-[10px] text-[20px] text-gray-800 font-normal">
                        Inframe is not just a platform; it is an opportunity for students to upskill and improve yourself.
                    </p>
                </div>

                {/* Swiper Carousel */}
                <Swiper
                    modules={[Autoplay, Navigation]}
                    spaceBetween={20}
                    slidesPerView={1} // mobile default
                    loop={true}
                    autoplay={{ delay: 2000 }}
                    navigation
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 4 },
                    }}
                >
                    {data.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div
                                style={{
                                    backgroundImage: `url(${item.src})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                                className="w-full rounded-[10px] lg:rounded-[5px] flex h-[300px] items-end justify-start p-10 relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/5 rounded-[5px] z-10"></div>

                                <div className="z-40">
                                    <h3 className="text-white font-semibold lg:text-[35px] text-[30px] mb-2">
                                        {item.heading}
                                    </h3>
                                    <p className="text-white text-[20px]">{item.description}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
