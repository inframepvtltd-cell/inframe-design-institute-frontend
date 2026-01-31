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
        <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[65vh] lg:h-[70vh] xl:h-[75vh] 2xl:h-[80vh]">
          {/* Image */}
          <img
            loading="lazy"
            src={item.sliderImage}
            alt="Banner"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>

  );
}
