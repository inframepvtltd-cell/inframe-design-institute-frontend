"use client";
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { motion } from "framer-motion";
import axios from "axios";

export default function BannerSlider() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const [sliderData, setSliderData] = useState([]);

  useEffect(() => {
    axios.get(`${apiBaseUrl}/slider/view`)
      .then(res => setSliderData(res.data.SliderData || []));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    pauseOnHover: false,
  };

  return (
    <>
      {sliderData.length > 0 && (
        <div className="w-full">
          <Slider {...settings}>
            {sliderData.map((item, index) => (
              <div key={index}>
                <div className="relative w-full h-[90vh]">

                  {/* Image */}
                  <img
                    src={item.sliderImage}
                    loading={index === 0 ? "eager" : "lazy"}
                    className="w-full h-full object-cover object-top"
                    alt="Banner"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/10" />

                  {/* Text */}
                  <motion.div
                    key={index}
                    className="absolute top-[15%] left-[5%] max-w-[600px]"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <h2 className="font-bold capitalize lg:text-[45px] text-[30px] tracking-widest text-white">
                      {item.sliderHeadlineFirst}
                      <br />
                      <span className="text-gray-500">
                        {item.sliderHeadlineSecond}
                      </span>
                    </h2>

                    <motion.p
                      className="mt-4 text-[18px] lg:text-[20px] leading-[30px] text-gray-200"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                    >
                      {item.sliderDescription}
                    </motion.p>
                  </motion.div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </>
  );
}
