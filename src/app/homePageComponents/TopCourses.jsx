'use client';
import { FaIndianRupeeSign } from "react-icons/fa6";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import Image from "next/image";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

export default function TopCourses() {

  let apiBaseUrl = process.env.NEXT_PUBLIC_API_URL

  const token = useSelector((store) => store.loginStore.token)
  const userData = useSelector((store) => store.loginStore.user)

  const addToCart = ({ itemId, main }) => {
    if (!token || token === ' ' || token == undefined) {
      Swal.fire({
        title: 'Please login to Add To Cart',
        text: 'You must be logged in to add to cart.',
        icon: 'warning',
        iconColor: 'black',
        background: 'white',
        color: 'black',
        confirmButtonText: 'OK'
      });
    }
    else {
      const obj = { itemId, userData, main }
      axios.post(`${apiBaseUrl}/cart/add-to-cart`, obj, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.data)
        .then(finalRes => {
          if (finalRes.status == 1) {
            Swal.fire({
              title: 'Added In Cart Successfully',
              icon: 'success',
              iconColor: 'black',
              background: "white",
              color: 'black'
            }).then(() => window.location.reload());
          } else {
            Swal.fire({
              title: 'Something went wrong',
              icon: 'warning',
              text: 'Try again later !',
              iconColor: 'black',
              background: "white",
              color: 'black'
            })
          }
        })
    }
  }

  return (
    <div className="w-full ">
      <div className="max-w-[1320px] lg:px-6 mx-auto px-3">
        <h3 className="lg:text-[40px] text-[30px] text-start font-bold text-black lg:pt-6 bg-white">
          Top Selling Course
        </h3>
        <OnlineCourses addToCart={addToCart} apiBaseUrl={apiBaseUrl} />
        <OfflineCourses addToCart={addToCart} apiBaseUrl={apiBaseUrl} />
      </div>
    </div>
  );
}


export function OnlineCourses({ apiBaseUrl, addToCart }) {
  const [onlineCourseData, setOnlineCourseData] = useState([])

  useEffect(() => {
    axios.get(`${apiBaseUrl}/course/view-online`)
      .then(res => res.data)
      .then(finalRes => setOnlineCourseData(finalRes.onlineCourseData))
  }, [])

  return (
    <div className="my-[0px]">
      <h3 className="text-gray-900 font-normal text-[25px] pt-3 mb-0">
        Best Selling Online Courses
      </h3>

      <div className="my-4">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          loop={true}
          autoplay={{ delay: 2500 }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {onlineCourseData?.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="rounded-[10px] h-[600px] shadow-sm group overflow-hidden hover:shadow-md transition duration-300">
                <Image
                  width={100}
                  height={100}
                  className="w-full h-[350px] object-cover object-top rounded-t-[10px] group-hover:scale-[1.01] transition duration-300"
                  src={item?.courseImage}
                  alt={item?.courseName}
                />
                <div className="p-5 h-auto">
                  <Link href={`/online-courses/${item?.courseName.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-")}`}>
                    <h2 className="text-[18px] capitalize font-semibold mb-2 text-gray-950 hover:underline cursor-pointer">
                      {item?.courseName}
                    </h2>
                  </Link>
                  <p className="text-gray-600 font-normal">{item?.cousreHeadline}</p>
                  <p className="text-[28px] mt-2 font-semibold flex items-center gap-1 text-gray-950">
                    <FaIndianRupeeSign /> {item?.coursePrice}/-
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <button
                      onClick={() => addToCart({ itemId: item._id, main: 'online course' })}
                      className="bg-gray-200 hover:bg-gray-300 cursor-pointer py-[7px] text-[14px] w-full rounded-lg font-medium">
                      Add to Cart
                    </button>
                    <button className="bg-gray-900 hover:bg-gray-800 cursor-pointer py-[7px] text-[14px] rounded-lg text-white font-medium">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}


export function OfflineCourses({ apiBaseUrl, addToCart }) {
  const [offlineCourseData, setOfflineCourseData] = useState([])

  useEffect(() => {
    axios.get(`${apiBaseUrl}/course/view-offline`)
      .then(res => res.data)
      .then(finalRes => setOfflineCourseData(finalRes.offlineCourseData))
  }, [])

  return (
    <div className="my-[0px]">
      <h3 className="text-gray-900 font-normal text-[25px] pt-3 mb-0">
        Best Selling Offline Courses
      </h3>

      <div className="my-4">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          loop={true}
          autoplay={{ delay: 2500 }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {offlineCourseData?.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="rounded-[10px] h-[600px] shadow-sm group overflow-hidden hover:shadow-md transition duration-300">
                <Image
                  width={100}
                  height={100}
                  className="w-full h-[350px] object-cover object-top rounded-t-[10px] group-hover:scale-[1.01] transition duration-300"
                  src={item?.courseImage}
                  alt={item?.courseName}
                />
                <div className="p-5 h-auto">
                  <Link href={`/offline-courses/${item?.courseName.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-")}`}>
                    <h2 className="text-[18px] capitalize font-semibold mb-2 text-gray-950 hover:underline cursor-pointer">
                      {item?.courseName}
                    </h2>
                  </Link>
                  <p className="text-gray-600">{item?.cousreHeadline}</p>
                  <p className="text-[28px] mt-2 font-semibold flex items-center gap-1 text-gray-950">
                    <FaIndianRupeeSign /> {item.coursePrice}/-
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <button
                      onClick={() => addToCart({ itemId: item._id, main: 'offline course' })}
                      className="bg-gray-200 hover:bg-gray-300 cursor-pointer py-[7px] text-[14px] w-full rounded-lg font-medium">
                      Add to Cart
                    </button>
                    <button className="bg-gray-900 hover:bg-gray-800 cursor-pointer py-[7px] text-[14px] rounded-lg text-white font-medium">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
