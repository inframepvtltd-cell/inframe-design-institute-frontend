'use client'
import { TiTick } from "react-icons/ti";
import {
    FaLongArrowAltDown,
    FaMinusCircle,
    FaPlusCircle,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

export default function OfflineCoursePage({ params }) {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
    const slug = useParams().slug.replace(/[^a-zA-Z0-9+]/g, " ");
    const [offlineCourseData, setofflineCourseData] = useState([]);
    const [staticPath, setStaticPath] = useState('');

    const specificCourseData = offlineCourseData.filter((item) => item.courseName == slug)[0];

    const token = useSelector((store) => store.loginStore.token);
    const userData = useSelector((store) => store.loginStore.user);

    const [currentFaqId, setCurrentFaqId] = useState(null);

    // const addToCart = ({ itemId, main }) => {
    //     if (!token || token === ' ' || token == undefined) {
    //         Swal.fire({
    //             title: 'Please login to Add To Cart',
    //             text: 'You must be logged in to add to cart.',
    //             icon: 'warning',
    //             iconColor: 'black',
    //             background: 'white',
    //             color: 'black',
    //             confirmButtonText: 'OK'
    //         });
    //     } else {
    //         const obj = { itemId, userData, main };
    //         axios.post(`${apiBaseUrl}/cart/add-to-cart`, obj, {
    //             headers: { Authorization: `Bearer ${token}` }
    //         })
    //             .then((res) => res.data)
    //             .then((finalRes) => {
    //                 if (finalRes.status == 1) {
    //                     Swal.fire({
    //                         title: 'Added In Cart Successfully',
    //                         icon: 'success',
    //                         iconColor: 'black',
    //                         background: "white",
    //                         color: 'black'
    //                     }).then(() => window.location.reload());
    //                 } else {
    //                     Swal.fire({
    //                         title: 'Something went wrong',
    //                         icon: 'warning',
    //                         text: 'Try again later !',
    //                         iconColor: 'black',
    //                         background: "white",
    //                         color: 'black'
    //                     });
    //                 }
    //             });
    //     }
    // }

    const fetchAllOfflineCourses = () => {
        axios.get(`${apiBaseUrl}/course/view-offline`)
            .then((res) => res.data)
            .then((finalRes) => {
                setofflineCourseData(finalRes.offlineCourseData);
                setStaticPath(finalRes.staticPath);
            });
    }

    useEffect(() => { fetchAllOfflineCourses() }, []);

    const scrollMoment = () => {
        document.getElementById("recording-section")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="w-full bg-white text-gray-900">
            {/* Hero Section */}
            <section
                className="w-full min-h-[60vh] flex lg:px-6 px-3 bg-cover bg-top relative"
                style={{
                    backgroundImage: "url('/doubtSolving.JPG')",
                }}
            >
                {/* 🔹 Gradient Overlay (z-10) */}
                <div className="absolute inset-0 bg-linear-to-r from-black via-black/50 to-transparent z-10"></div>

                {/* 🔹 Text Content (z-20) */}
                <div className="w-[1320px] mx-auto">
                    <div className="text-white  py-12 relative z-20">
                        <h2 className="text-[50px] font-bold capitalize">
                            {specificCourseData?.courseName?.replace(/[^a-zA-Z0-9]/g, " ")}
                        </h2>
                        <p className="text-[25px] mt-3 capitalize">
                            {specificCourseData?.cousreHeadline}
                        </p>
                        <button
                            onClick={scrollMoment}
                            className="bg-white font-medium hover:bg-transparent hover:border-white border-transparent border-2 duration-300  hover:text-white text-gray-900  rounded-full py-[10] px-10 mt-5 text-[18px] cursor-pointer grid grid-cols-[95%_auto] items-center group"
                        >
                            {" "}
                            View Course Overview{" "}
                            <FaLongArrowAltDown className="opacity-0 -translate-y-4  group-hover:opacity-100 group-hover:translate-y-0 transition-all ease-in-out duration-300" />{" "}
                        </button>
                    </div>
                </div>

            </section>

            {/* Course Details */}
            <section className="w-full py-[30px] lg:py-[30px] bg-white text-gray-900">
                <div className="max-w-[1320px] mx-auto px-3 lg:px-0">
                    <div className="grid md:grid-cols-[72%_auto] gap-10 items-center md:items-start">
                        {/* Left Side */}
                        <div className="w-full h-full">
                            <div className="bg-white shadow-md p-10 transition-all duration-300 ">
                                <h3 className="text-[32px] font-bold text-gray-900 mb-4 leading-tight tracking-tight capitalize">{specificCourseData?.courseName?.replace(/[^a-zA-Z0-9]/g, " ")}</h3>
                                <p className="text-[18px] text-gray-600 mb-6 leading-relaxed">{specificCourseData?.courseAbout}</p>

                                <ul className="text-[17px] text-gray-700 space-y-2 mb-6 marker:text-gray-400">
                                    {specificCourseData?.coursePoints?.map((item, index) => (
                                        <li key={index} className="list-none flex items-center gap-3">
                                            <div className="flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-gray-950 text-white text-sm flex items-center justify-center">
                                                <TiTick />
                                            </div> {item}
                                        </li>
                                    ))}
                                </ul>

                                <p className="text-[36px] font-extrabold text-gray-950 mb-2">₹ {specificCourseData?.coursePrice}/-</p>
                                <p className="text-gray-700 capitalize text-md mb-6">Buy Now to access all material and recordings.</p>

                                <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-4">
                                    {/* <button
                                        onClick={() => addToCart({ itemId: specificCourseData?._id, main: 'offline course' })}
                                        className="group relative overflow-hidden border border-gray-900 text-gray-900 px-6 py-3 rounded-md font-semibold transition-all duration-300 hover:bg-gray-900 hover:text-white"
                                    >
                                        Add to Cart
                                        <span className="absolute left-0 top-0 w-full h-0 bg-gray-900 transition-all duration-300 group-hover:h-full opacity-10 z-0" />
                                    </button> */}
                                    <button
                                        onClick={() => alert("Thank you for purchasing the course!")}
                                        className="relative overflow-hidden cursor-pointer bg-black hover:bg-black/90 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-xl"
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Side Image */}
                        <div className="w-full h-full">
                            <img
                                src={specificCourseData?.courseBannerImage}
                                alt={specificCourseData?.courseName + " banner"}
                                className="w-full h-[100%] object-cover object-top rounded-lg shadow-md"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Hero Banner */}
            {/* <section className="w-full lg:my-[30px] my-[30px]">
                <img src={specificCourseData?.courseHeroImage} className="w-full max-h-[330px] object-cover" />
            </section> */}

            {/* Explore More Courses (Swiper) */}
            <section className="w-full lg:my-[60px] my-[30px] lg:px-6 px-3">
                <div className="max-w-[1320] mx-auto">
                    <div className="">
                        <h2 className="text-[40px] capitalize font-bold mb-3">
                            {" "}
                            Explore More courses
                        </h2>
                        <p className="text-[20px] mb-7">
                            Discover a variety of curated courses to boost your skills.
                        </p>
                    </div>

                    {
                        offlineCourseData.length >= 1 ? (

                            <Swiper
                                modules={[Pagination, Autoplay]}
                                spaceBetween={16}
                                slidesPerView={1}
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 3000 }}
                                breakpoints={{
                                    640: { slidesPerView: 1 },
                                    768: { slidesPerView: 2 },
                                    1024: { slidesPerView: 4 },
                                }}
                            >
                                {offlineCourseData?.map((course) => (
                                    <SwiperSlide key={course._id}>
                                        <div className="px-2">
                                            <div className="bg-white h-[550px] shadow-md group rounded-lg overflow-hidden hover:shadow-lg cursor-pointer transition">

                                                <img
                                                    src={course?.courseImage}
                                                    alt={course.courseName}
                                                    className="w-full h-[340px] group-hover:scale-[1.03] object-cover duration-300"
                                                />

                                                <div className="p-4">
                                                    <Link
                                                        href={`/online-courses/${course.courseName
                                                            .toLowerCase()
                                                            .replace(/[^a-zA-Z0-9]/g, "-")}`}
                                                    >
                                                        <h3 className="text-lg capitalize hover:underline font-semibold text-gray-900">
                                                            {course?.courseName?.replace(/[^a-zA-Z0-9]/g, " ")}
                                                        </h3>
                                                    </Link>

                                                    <p className="text-sm text-gray-600">
                                                        {course?.cousreHeadline}
                                                    </p>

                                                    <p className="text-[22px] font-bold mt-1">
                                                        ₹ {course.coursePrice} /-
                                                    </p>

                                                    <div className="mt-4 grid grid-cols-2 gap-4">
                                                        <button
                                                            onClick={() =>
                                                                addToCart({ itemId: course._id, main: "online course" })
                                                            }
                                                            className="bg-gray-200 hover:bg-gray-300 transition py-[7px] text-[14px] rounded-lg font-medium"
                                                        >
                                                            Add to Cart
                                                        </button>

                                                        <button className="bg-gray-900 hover:bg-gray-800 transition py-[7px] text-[14px] rounded-lg text-white font-medium">
                                                            Buy Now
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                        ) : (

                            /* Skeleton Loader */
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                                {[...Array(4)].map((_, index) => (
                                    <div
                                        key={index}
                                        className="border shadow-md rounded-[10px] p-4 animate-pulse bg-white"
                                    >
                                        <div className="w-full h-[200px] bg-gray-200 rounded mb-4"></div>
                                        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                                        <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                                        <div className="h-3 bg-gray-200 rounded w-5/6 mb-4"></div>
                                        <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="h-10 bg-gray-300 rounded"></div>
                                            <div className="h-10 bg-gray-300 rounded"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                    }
                </div>

            </section>
        </div>
    );
}
