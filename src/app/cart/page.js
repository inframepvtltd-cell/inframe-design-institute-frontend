"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Checkout() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  const token = useSelector((store) => store.loginStore.token);
  const userData = useSelector((store) => store.loginStore.user);
  const cartData = useSelector((store) => store.cartStore.cartAllData);

  const totalAmountInCart = cartData.reduce(
    (prev, curr) => prev + Number(curr.courseDetails?.coursePrice),
    0
  );

  const [onlineCourseData, setOnlineCourseData] = useState([]);
  const [offlineCourseData, setOfflineCourseData] = useState([]);

  const fetchAllOnlineCourses = () => {
    axios
      .get(`${apiBaseUrl}/course/view-online`)
      .then((res) => res.data)
      .then((finalRes) => setOnlineCourseData(finalRes.onlineCourseData));
  };

  const fetchAllOfflineCourses = () => {
    axios
      .get(`${apiBaseUrl}/course/view-offline`)
      .then((res) => res.data)
      .then((finalRes) => setOfflineCourseData(finalRes.offlineCourseData));
  };

  useEffect(() => {
    fetchAllOnlineCourses();
  }, []);

  useEffect(() => {
    fetchAllOfflineCourses();
  }, [])

  const addToCart = ({ itemId, main }) => {
    if (!token) {
      Swal.fire({
        title: "Please login to Add To Cart",
        text: "You must be logged in to add to cart.",
        icon: "warning",
        iconColor: "black",
        background: "white",
        color: "black",
        confirmButtonText: "OK",
      });
      return;
    }

    const obj = { itemId, userData, main };
    axios
      .post(`${apiBaseUrl}/cart/add-to-cart`, obj, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes.status === 1) {
          Swal.fire({
            title: "Added In Cart Successfully",
            icon: "success",
            iconColor: "black",
            background: "white",
            color: "black",
          }).then(() => window.location.reload());
        } else {
          Swal.fire({
            title: "Something went wrong",
            icon: "warning",
            text: "Try again later!",
            iconColor: "black",
            background: "white",
            color: "black",
          });
        }
      });
  };

  const removeFromCart = (courseId) => {
    Swal.fire({
      title: "Are You Sure",
      text: "Do you really want to remove this from cart?",
      icon: "warning",
      iconColor: "black",
      background: "white",
      color: "black",
      showConfirmButton: true,
      confirmButtonColor: "black",
      showCancelButton: true,
      cancelButtonColor: "gray",
      confirmButtonText: "Yes",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .post(
            `${apiBaseUrl}/cart/remove-from-cart`,
            { courseId },
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then((res) => res.data)
          .then((finalRes) => {
            if (finalRes.status === 1) {
              Swal.fire({
                title: "Item Removed Successfully!",
                icon: "success",
                iconColor: "black",
                color: "black",
                confirmButtonColor: "black",
              }).then(() => window.location.reload());
            } else {
              Swal.fire({
                title: "Something went wrong",
                text: "Try again later",
                icon: "error",
                iconColor: "black",
                color: "black",
                confirmButtonColor: "black",
              });
            }
          });
      }
    });
  };

  const swiperBreakpoints = {
    480: { slidesPerView: 1, spaceBetween: 10 },
    768: { slidesPerView: 1, spaceBetween: 15 },
    992: { slidesPerView: 2, spaceBetween: 20 },
    1200: { slidesPerView: 3, spaceBetween: 25 },
  };
  return (
    <div className="w-full bg-[#f7f8fa]">
      <section className="lg:block hidden w-full h-[85vh] overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-5 text-gray-900">

          <div className="grid lg:grid-cols-[70%_auto] gap-6">

            {/* ================= LEFT: COURSES ================= */}
            <div className="py-6 h-[85vh] overflow-y-scroll scrollbar pr-3">

              <h2 className="text-3xl font-semibold mb-6 border-b border-gray-200 pb-3">
                Recommended Courses
              </h2>

              {/* ===== ONLINE COURSES ===== */}
              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 mb-8">
                <h3 className="text-xl font-medium mb-6">
                  Online Courses
                </h3>

                <Swiper
                  modules={[Autoplay]}
                  autoplay={{ delay: 1000 }}
                  loop
                  breakpoints={swiperBreakpoints}
                >
                  {onlineCourseData.map(item => (
                    <SwiperSlide key={item._id}>
                      <div className="
                      bg-white
                      rounded-3xl
                      border border-gray-200
                      shadow-sm
                      hover:shadow-md
                      transition
                      overflow-hidden
                      flex flex-col
                      h-[600px]
                    ">
                        <Image
                          src={item.courseImage}
                          alt={item.courseName}
                          width={800}
                          height={350}
                          className="h-[320px] w-full object-cover"
                        />

                        <div className="p-6 flex flex-col justify-between flex-1">
                          <div>
                            <Link href={`/online-courses/${item.courseName.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-")}`}>
                              <h4 className="text-lg font-semibold mb-2 hover:text-gray-700">
                                {item.courseName.replace(/[^a-zA-Z0-9]/g, " ")}
                              </h4>
                            </Link>

                            <p className="text-gray-500 text-sm mb-4">
                              {item.cousreHeadline}
                            </p>

                            <p className="text-2xl font-semibold">
                              ₹{item.coursePrice}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 gap-2 mt-6">
                            <button
                              onClick={() => addToCart({ itemId: item._id, main: "online course" })}
                              className="
                              rounded-full
                              border border-gray-300
                              py-2.5
                              font-medium
                              hover:bg-gray-100
                              transition
                              px-2
                            "
                            >
                              Add to Cart
                            </button>

                            <button
                              className="
                              rounded-full
                              bg-gradient-to-b from-[#1f1f1f] to-black
                              text-white
                              py-2.5
                              font-medium
                              shadow-sm shadow-black/20
                              hover:shadow-md
                              transition
                            "
                            >
                              Buy Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* ===== OFFLINE COURSES (same theme) ===== */}
              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-xl font-medium mb-6">
                  Offline Courses
                </h3>

                <Swiper modules={[Autoplay]} autoplay={{ delay: 1000 }} loop breakpoints={swiperBreakpoints}>
                  {offlineCourseData.map(item => (
                    <SwiperSlide key={item._id}>
                      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition overflow-hidden h-[600px] flex flex-col">
                        <Image
                          src={item.courseImage}
                          alt={item.courseName}
                          width={800}
                          height={350}
                          className="h-[320px] w-full object-cover"
                        />
                        <div className="p-6 flex flex-col justify-between flex-1">
                          <div>
                            <h4 className="text-lg font-semibold mb-2">
                              {item.courseName.replace(/[^a-zA-Z0-9]/g, " ")}
                            </h4>
                            <p className="text-gray-500 text-sm mb-4">
                              {item.cousreHeadline}
                            </p>
                            <p className="text-xl font-semibold">
                              ₹{item.coursePrice}
                            </p>
                          </div>

                          <button className="
                          w-full
                          rounded-full
                          bg-gradient-to-b from-[#1f1f1f] to-black
                          text-white
                          py-2.5
                          font-medium
                          shadow-sm
                          hover:shadow-md
                          transition
                        ">
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            {/* ================= RIGHT: CART ================= */}
            <div className="h-[85vh] my-10 overflow-y-scroll scrollbar bg-white rounded-3xl border border-gray-200 shadow-sm py-10 px-5">

              <h2 className="text-2xl font-semibold text-center mb-8">
                Cart Summary
              </h2>

              {cartData.length ? cartData.map(item => {
                const { courseDetails } = item;
                return (
                  <div key={item._id} className="mb-6 rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <Image
                      src={courseDetails?.courseImage}
                      alt={courseDetails?.courseName}
                      width={600}
                      height={160}
                      className="h-[200px] w-full object-cover object-top"
                    />
                    <div className="p-5">
                      <span className="inline-block text-xs border border-gray-300 rounded-full px-3 py-1 mb-2">
                        {item.main}
                      </span>
                      <h3 className="text-lg font-semibold mb-1">
                        {courseDetails?.courseName}
                      </h3>
                      <p className="text-gray-500 text-sm mb-2">
                        {courseDetails?.cousreHeadline}
                      </p>
                      <p className="font-semibold mb-3">
                        ₹{courseDetails?.coursePrice}
                      </p>

                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="w-full rounded-full border border-gray-300 py-2 hover:bg-gray-100 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              }) : (
                <p className="text-center text-gray-400 mt-24">
                  Your cart is empty
                </p>
              )}

              {cartData.length > 0 && (
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <p className="text-center text-3xl font-extrabold mb-4">
                    Total: ₹{totalAmountInCart}/-
                  </p>
                  <Link href="/checkout">
                    <button className="
                    w-full
                    rounded-full
                    bg-gradient-to-b from-[#1f1f1f] to-black
                    text-white
                    py-3.5
                    font-semibold
                    shadow-md
                    hover:shadow-lg
                    transition
                    cursor-pointer
                  ">
                      Secure Checkout →
                    </button>
                  </Link>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>
    </div>
  );

}
