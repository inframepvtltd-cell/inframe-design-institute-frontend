'use client'
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Swiper CSS
import "swiper/css";

export default function StudyMaterials() {
  const data = [
    {
      heading: "Webinars",
      description:
        "Access a curated collection of free webinars covering key academic topics, exam strategies, and study techniques. Perfect for self-learners, students, and competitive exam aspirants. Learn from qualified educators—anytime, anywhere.",
      src: "https://static.pw.live/5eb393ee95fab7468a79d189/GLOBAL_CMS/f205f69d-b8b3-4f03-b28b-6c6bdd9eeb02.webp",
    },
    {
      heading: "Architecture Series",
      description:
        "Download free study materials on design, planning, and architecture theory. Learn at your own pace—no sign-up needed.",
      src: "https://www.inframedesigninstitute.com/assets/upload/images/WhatsApp%20Image%202021-04-28%20at%2011.34.20%20PM.png",
    },
    {
      heading: "Free Question Papers",
      description:
        "Download subject-wise question papers for practice and self-study. Improve your preparation with quality resources.",
      src: "/study-materials/2.jpg",
    },
    {
      heading: "Current Affairs",
      description:
        "Use Physics Wallah's detailed study materials that simplify complex ideas into easily understandable language",
      src: "https://static.pw.live/5eb393ee95fab7468a79d189/GLOBAL_CMS/3eb5198e-6f36-4df4-ad97-81716b80bab2.webp",
    },
  ];

  return (
    <div className="w-full lg:my-[40px] my-[30px]">
      <div className="max-w-[1320px] lg:p-0 p-3 mx-auto lg:px-6 px-3">
        <h3 className="lg:text-[40px] text-[25px] capitalize text-start font-bold text-black">
          Free Resources
        </h3>
        <p className="text-start text-[20px] mt-[10px]">
          A diverse array of learning materials to enhance your educational journey.
        </p>

        <Swiper
          modules={[Autoplay]}
          slidesPerView={3}          // 3 items in one line by default
          spaceBetween={24}
          loop={true}
          autoplay={{ delay: 1500 }}
          breakpoints={{
            1024: { slidesPerView: 3 }, // Desktop: 3
            768: { slidesPerView: 2 },  // Tablet: 2
            0: { slidesPerView: 1 },    // Mobile: 1
          }}
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="w-full lg:h-[350px] h-auto hover:border-b-2 cursor-pointer group hover:translate-y-[-10px] overflow-hidden transition-all ease-in-out duration-200 rounded-[15px] lg:mt-[30px] hover:bg-gray-100 border-[1px] border-gray-200 hover:border-b-black bg-white p-8">
                <h3 className="text-[25px]">{item.heading}</h3>
                <p className="my-[15px]">{item.description}</p>
                <img
                  className="w-[220px] mx-auto group-hover:scale-[1.05] object-contain duration-300"
                  src={item.src}
                  alt={item.heading}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
