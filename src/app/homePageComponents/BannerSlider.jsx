"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Swiper styles
import "swiper/css";
import Image from "next/image";
export default function BannerSlider() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const [sliderData, setSliderData] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/slider/view`)
      .then((res) => setSliderData(res.data.SliderData || []))
      .catch((err) => console.error(err));
  }, [apiBaseUrl]);

  if (sliderData.length === 0) return null;

  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={500}
        slidesPerView={1}
        className="w-full"
      >
        {sliderData.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[90vh]">

              {/* Image */}
              <Image
                width={1320}
                height={1000}
                src={item.sliderImage}
                alt="Banner"
                className="w-full h-full object-cover object-top"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/10" />

              {/* Text Content */}
              <div className="absolute top-[15%] left-[5%] max-w-[600px] text-white">
                <h2 className="font-bold uppercase lg:text-[45px] text-[30px]">
                  {item.sliderHeadlineFirst}
                  <br />
                  <span className="text-gray-200 uppercase font-bold animate-pulse">
                    {item.sliderHeadlineSecond}
                  </span>
                </h2>

                <p className="mt-4 text-gray-200 lg:text-[20px] text-[18px] leading-[30px]">
                  {item.sliderDescription}
                </p>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
