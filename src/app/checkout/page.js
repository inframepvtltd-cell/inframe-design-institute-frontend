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
    <div className="w-full bg-white">
      {/* Cart Section for Desktop */}
      <section className="lg:block hidden w-full h-[85vh] overflow-hidden lg:p-0 p-3">
        <div className="max-w-[1320px] mx-auto text-black">
          <div className="grid lg:grid-cols-[70%_auto] grid-cols-1 gap-3">
            {/* Related Courses */}
            <div className="py-6 h-[85vh] scrollbar overflow-y-scroll">
              <h2 className="lg:text-[40px] px-3 text-[30px] capitalize border-b border-gray-200 pb-1 font-bold mb-5">
                More Related Courses & Materials
              </h2>

              {/* Online Courses */}
              <div className="bg-white mb-5 p-3 rounded-lg shadow">
                <h2 className="text-[25px] font-semibold capitalize mb-4">
                  Related Online Courses
                </h2>
                {onlineCourseData.length ? (
                  <Swiper
                    modules={[Autoplay, Navigation, Pagination]}
                    autoplay={{ delay: 1500 }}
                    loop={true}
                    navigation
                    pagination={{ clickable: true }}
                    breakpoints={swiperBreakpoints}
                  >
                    {onlineCourseData.map((item) => (
                      <SwiperSlide key={item._id}>
                        <div className="bg-white h-[600px] border shadow-md border-gray-200 rounded-[10px] overflow-hidden flex flex-col">
                          <Image
                            src={item.courseImage}
                            alt={item.courseName}
                            width={800}
                            height={350}
                            className="object-cover object-top w-full h-[350px]"
                          />
                          <div className="p-5 flex flex-col justify-between flex-1">
                            <div>
                              <Link
                                href={`/online-courses/${item.courseName
                                  .toLowerCase()
                                  .replace(/[^a-zA-Z0-9]/g, "-")}`}
                              >
                                <h3 className="text-[18px] cursor-pointer hover:underline capitalize font-semibold mb-2">
                                  {item.courseName.replace(/[^a-zA-Z0-9]/g, " ")}
                                </h3>
                              </Link>
                              <p className="text-gray-600 mb-4">{item.cousreHeadline}</p>
                              <p className="font-bold text-xl">₹{item.coursePrice}/-</p>
                            </div>
                            <div className="grid grid-cols-2 gap-3 mt-3">
                              <button
                                onClick={() =>
                                  addToCart({ itemId: item._id, main: "online course" })
                                }
                                className="border border-gray-900 text-gray-900 hover:bg-gray-950 hover:text-white py-2 rounded-md font-semibold transition"
                              >
                                Add to Cart
                              </button>
                              <button className="bg-gray-950 hover:bg-gray-950 text-white py-2 rounded-md font-semibold">
                                Buy Now
                              </button>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <p className="text-center text-gray-400">No Online Courses Found</p>
                )}
              </div>

              {/* Offline Courses */}
              <div className="bg-white mb-5 p-3 rounded-lg shadow">
                <h2 className="text-[25px] font-semibold capitalize mb-4">
                  Related Offline Courses
                </h2>
                {offlineCourseData.length ? (
                  <Swiper
                    modules={[Autoplay, Navigation, Pagination]}
                    autoplay={{ delay: 1500 }}
                    loop={true}
                    navigation
                    pagination={{ clickable: true }}
                    breakpoints={swiperBreakpoints}
                  >
                    {offlineCourseData.map((item) => (
                      <SwiperSlide key={item._id}>
                        <div className="bg-white h-[600px] border shadow-md border-gray-200 rounded-[10px] overflow-hidden flex flex-col">
                          <Image
                            src={item.courseImage}
                            alt={item.courseName}
                            width={800}
                            height={350}
                            className="object-cover object-top w-full h-[350px]"
                          />
                          <div className="p-5 flex flex-col justify-between flex-1">
                            <div>
                              <Link
                                href={`/offline-courses/${item.courseName
                                  .toLowerCase()
                                  .replace(/[^a-zA-Z0-9]/g, "-")}`}
                              >
                                <h3 className="text-[18px] cursor-pointer hover:underline capitalize font-semibold mb-2">
                                  {item.courseName.replace(/[^a-zA-Z0-9]/g, " ")}
                                </h3>
                              </Link>
                              <p className="text-gray-600 mb-4">{item.cousreHeadline}</p>
                              <p className="font-bold text-xl">₹{item.coursePrice}/-</p>
                            </div>
                            <div className="grid grid-cols-2 gap-3 mt-3">
                              <button
                                onClick={() =>
                                  addToCart({ itemId: item._id, main: "offline course" })
                                }
                                className="border border-gray-900 text-gray-900 hover:bg-gray-950 hover:text-white py-2 rounded-md font-semibold transition"
                              >
                                Add to Cart
                              </button>
                              <button className="bg-gray-950 hover:bg-gray-950 text-white py-2 rounded-md font-semibold">
                                Buy Now
                              </button>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <p className="text-center text-gray-400">No Offline Courses Found</p>
                )}
              </div>
            </div>

            {/* Cart Items */}
            <div className="lg:block hidden scrollbar w-full h-[85vh] overflow-y-scroll pb-14 py-6 px-6 bg-white shadow-2xl">
              <h2 className="text-[35px] border-b border-gray-200 pb-3 font-bold text-center mb-8 capitalize">
                Your Cart
              </h2>

              {cartData.length ? (
                cartData.map((item) => {
                  const { courseDetails } = item;
                  return (
                    <div
                      key={item._id}
                      className="bg-white mb-6 shadow-lg border border-gray-200 rounded-lg gap-6 items-center"
                    >
                      <Image
                        src={courseDetails?.courseImage}
                        alt={courseDetails?.courseName}
                        width={600}
                        height={160}
                        className="w-full h-[160px] object-cover object-top rounded-t"
                      />
                      <div className="flex flex-col p-4 justify-between h-full">
                        <h2 className="text-md w-fit px-3 py-[1px] rounded-full border-[1.8px] text-black capitalize mb-2">
                          {item.main}
                        </h2>
                        <h3 className="text-2xl capitalize font-semibold mb-1">
                          {courseDetails?.courseName}
                        </h3>
                        <p className="text-gray-600 text-sm mb-1">{courseDetails?.cousreHeadline}</p>
                        <p className="text-lg font-bold text-gray-800 mb-1">Quantity: {item.quantity}</p>
                        <p className="text-lg font-bold text-gray-800 mb-1">Price: ₹{courseDetails?.coursePrice}</p>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="cursor-pointer py-1.5 text-sm bg-gray-950 text-white rounded hover:bg-transparent hover:text-gray-950 mt-2 border border-transparent hover:border-gray-950 transition duration-300"
                        >
                          Remove From Cart
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>
                  <h3 className="text-center font-semibold text-3xl text-gray-400">
                    No Courses Added In Your Cart Yet
                  </h3>
                  <Link href="/">
                    <p className="w-full bg-black text-white text-center py-2 my-5 rounded border-2 cursor-pointer border-transparent hover:border-black hover:bg-white duration-300 hover:text-black">
                      Explore Courses To Add
                    </p>
                  </Link>
                </div>
              )}

              {cartData.length > 0 && (
                <div className="mt-8 border-t border-gray-200 pt-6 text-center md:flex-row items-center justify-between">
                  <p className="text-3xl text-black mb-5">
                    Total Price: <span className="font-bold text-gray-950">₹{totalAmountInCart}</span>
                  </p>
                  <Link href="/order">
                    <button className="hover:bg-white w-full hover:text-gray-900 font-bold px-10 py-3 bg-gray-900 text-white border-transparent shadow-lg border-2 hover:border-gray-950 uppercase cursor-pointer transition duration-200 text-base rounded-lg">
                      Confirm Order
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
