'use client'
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
import { TiTick } from "react-icons/ti";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";


export default function OnlineCoursePage({ params }) {
    const slug = useParams().slug.replace(/[^a-zA-Z0-9+]/g, " ")
    const [onlineCourseData, setOnlineCourseData] = useState([])
    const [staticPath, setStaticPath] = useState('')
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL

    const specificCourseData = onlineCourseData.filter((item) => item.courseName == slug)[0]


    const token = useSelector((store) => store.loginStore.token)
    const userData = useSelector((store) => store.loginStore.user)


    const [currentFaqId, setCurrentFaqId] = useState(null);
    const [activeTab, setActiveTab] = useState("recordings");
    const tabs = ["recordings", "study materials", "description"];
    const [showAll, setShowAll] = useState(false);

    const fetchAllOnlineCourses = () => {
        axios.get(`${apiBaseUrl}/course/view-online`)
            .then((res) => res.data)
            .then((finalRes) => {
                setOnlineCourseData(finalRes.onlineCourseData)
                setStaticPath(finalRes.staticPath)
            })
    }

    useEffect(() => {
        fetchAllOnlineCourses()
    }, [])


    const scrollMoment = () => {
        document
            .getElementById("recording-section")
            ?.scrollIntoView({ behavior: "smooth" });
    };


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
            const obj = {
                itemId,
                userData,
                main
            }
            axios.post(`${apiBaseUrl}/cart/add-to-cart`, obj, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.data)
                .then((finalRes) => {
                    if (finalRes.status == 1) {
                        Swal.fire({
                            title: 'Added In Cart Successfully',
                            icon: 'success',
                            iconColor: 'black',
                            background: "white",
                            color: 'black'
                        }).then((res) => {
                            window.location.reload()
                        })
                    }
                    else {
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
        <>
            <div className="w-full bg-white text-gray-900">
                { }
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

                {/* <section className="w-[100%] lg:mt-[40px]">
        <img
          className="w-[100%] h-auto object-cover"
          src="https://www.inframedesigninstitute.com/uploads/banner_images/1e0d83620d4bfdb29d0b87cba43fa3e5.jpg"
        />
      </section> */}

                {/* course details section */}
                <section className="w-full py-[30px]  lg:pt-[30px] bg-white text-gray-900">
                    <div className="max-w-[1320px] mx-auto px-3 lg:px-3">
                        <div className="grid md:grid-cols-[72%_auto] gap-10 items-center md:items-start">
                            {/* === LEFT SIDE: Course Content === */}
                            <div className="w-full h-full">
                                {/* Course Info Card */}
                                <div className="bg-white p-5 rounded transition-all duration-300 shadow-[0_0_50px_rgba(0,0,0,0.05)]">
                                    {/* Course Name */}
                                    <h3 className="text-[40px] font-bold text-gray-900 mb-4 leading-tight tracking-tight capitalize">
                                        {specificCourseData?.courseName?.replace(/[^a-zA-Z0-9]/g, " ")}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-[18px] text-gray-600 mb-6 leading-relaxed">
                                        {specificCourseData?.courseAbout}
                                    </p>

                                    {/* Structure Points */}
                                    <ul className="text-[17px] text-gray-700 space-y-2 mb-6 marker:text-gray-400">
                                        {specificCourseData?.coursePoints?.map(
                                            (item, index) => (
                                                <li
                                                    className="list-none flex items-center gap-3"
                                                    key={index}
                                                >
                                                    <div className="shrink-0 mt-1 w-6 h-6 rounded-full bg-gray-950 text-white text-sm flex items-center justify-center">
                                                        <TiTick />
                                                    </div>{" "}
                                                    {item}
                                                </li>
                                            )
                                        )}
                                    </ul>

                                    {/* Course Price */}
                                    <p className="text-[36px] font-extrabold text-gray-950 mb-2">
                                        ₹ {specificCourseData?.coursePrice}/-
                                    </p>
                                    <p className="text-gray-700 capitalize text-md mb-6">
                                        Buy Now to access all material and recordings.
                                    </p>

                                    {/* Buttons */}
                                    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-4">

                                        <button
                                            onClick={() =>
                                                alert("Thank you for purchasing the course!")
                                            }
                                            className="relative overflow-hidden cursor-pointer bg-linear-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white px-6 py-3 rounded-md font-semibold transition-all duration-300 shadow-md hover:shadow-xl"
                                        >
                                            Buy Now
                                        </button>

                                        <button
                                            onClick={() => {
                                                scrollMoment();
                                            }}
                                            className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer px-6 py-3 rounded-md font-medium transition"
                                        >
                                            Preview Course
                                        </button>
                                    </div>
                                </div>

                                {/* Key Features */}
                                <h2 className="text-[40px]  font-bold mt-10">Our Key Features</h2>

                                <div className="bg-white border border-gray-300 rounded-[10px] shadow-2xl mt-[20] lg:mt-[20] py-[20] lg:py-[60px] px-3 lg:px-6">
                                    <p className="text-[20px] mb-7">
                                        Experience top-quality courses designed to help you excel
                                        effortlessly
                                    </p>

                                    {/* Feature Cards */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-8">
                                        {[
                                            {
                                                title: "Recorded Classes",
                                                desc: "Interactive sessions with lifetime access to recordings.",
                                            },
                                            {
                                                title: "Complete Study Material",
                                                desc: "PDFs, assignments, and mock tests for all major exams.",
                                            },
                                            {
                                                title: "Doubt Support",
                                                desc: "Expert mentors ready to resolve your questions.",
                                            },
                                            {
                                                title: "Live Project Reviews",
                                                desc: "Get hands-on feedback on your projects from industry experts.",
                                            },
                                            {
                                                title: "Progress Tracking",
                                                desc: "Monitor your learning journey with real-time performance insights.",
                                            },
                                            {
                                                title: "Certification",
                                                desc: "Earn a certificate upon course completion to showcase your skills.",
                                            }
                                        ].map((item, index) => (
                                            <div
                                                key={index}
                                                className="bg-black lg:bg-white lg:text-black text-white lg:hover:text-white  lg:hover:bg-black duration-200 hover:text-white border border-gray-200 p-3 rounded-lg shadow-sm hover:shadow-md transition group "
                                            >
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="w-3 h-3 rounded-full  bg-black group-hover:bg-white duration-300"></div>
                                                    <h3 className="text-xl font-semibold">{item.title}</h3>
                                                </div>
                                                <p className=" text-sm">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* === RIGHT SIDE: Course banner Image === */}
                            <div className="w-full h-full">

                                <img
                                    src={specificCourseData?.courseBannerImage}
                                    alt={specificCourseData?.courseName + " " + "banner"}
                                    className="w-full h-full object-cover object-top rounded-lg shadow-md"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* hero banner image section  */}

                <section className="w-full  lg:my-[30px] my-[30px] " >
                    <img src={specificCourseData?.courseHcourseImageeroImage} className="w-full max-h-[330px] object-cover" />
                </section>

                {/* 🔸 Content Wrapper */}
                <section className="">
                    <div className="max-w-[1320px]  mx-auto ">
                        {/* 🔹 Features Section */}

                        {/* recording section */}
                        <section id="recording-section" className="pb-[50px]">
                            <div className="max-w-[1320px] mx-auto lg:px-0 px-3">
                                <div>
                                    <h2 className="text-[40px] font-bold mb-3"> Course Overview</h2>
                                </div>
                                <div className="">
                                    {tabs?.map((item, index) => {
                                        return (
                                            <button
                                                key={index}
                                                onClick={() => setActiveTab(item)}
                                                className={`${item === activeTab
                                                    ? "bg-gray-950 text-white"
                                                    : "bg-linear-to-r from-gray-300 to-white text-gray-900"
                                                    } lg:px-7 md:px-5 px-2 py-[10] border hover:border-gray-600 cursor-pointer  border-gray-300 hover:bg-gray-950 capitalize  duration-100`}
                                            >
                                                {item}
                                            </button>
                                        );
                                    })}
                                </div>

                                {activeTab === "recordings" && (
                                    <div>
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full border border-gray-200 text-left">
                                                <thead className="bg-gray-100">
                                                    <tr>
                                                        <th className="py-4 px-6 border-b border-gray-200 text-gray-700 font-semibold">
                                                            Sr. No
                                                        </th>
                                                        <th className="py-4 px-6 border-b border-gray-200 text-gray-700 font-semibold">
                                                            Title
                                                        </th>
                                                        <th className="py-4 px-6 border-b border-gray-200 text-gray-700 font-semibold">
                                                            Duration
                                                        </th>
                                                        <th className="py-4 px-6 border-b border-gray-200 text-gray-700 font-semibold">
                                                            Actions
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {specificCourseData?.courseRecordingTitle?.map((title, index) => {
                                                        const duration = specificCourseData?.courseRecordingDuration?.[index] || "N/A";
                                                        const url = specificCourseData?.courseRecordingUrl?.[index] || "#";

                                                        return (
                                                            <tr key={index} className="hover:bg-gray-50 transition">
                                                                <td className="py-4 px-6 border-b border-gray-200">
                                                                    {index + 1}
                                                                </td>
                                                                <td className="py-4 px-6 border-b border-gray-200">
                                                                    {title}
                                                                </td>
                                                                <td className="py-4 px-6 border-b border-gray-200">
                                                                    {duration} min
                                                                </td>
                                                                <td className="py-4 px-6 border-b border-gray-200">
                                                                    <a
                                                                        href={url}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="text-blue-600 hover:underline font-medium"
                                                                    >
                                                                        {index === 0 || index === 1 ? "Preview" : "Play"}
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}



                                                </tbody>
                                            </table>
                                        </div>

                                        {/* Show More / Show Less Button */}

                                        <p className="text-center my-6">
                                            <button
                                                onClick={() => setShowAll(!showAll)}
                                                className="text-gray-600 hover:text-gray-800 font-medium underline cursor-pointer"
                                            >
                                                {showAll ? "Show Less" : "Show More"}
                                            </button>
                                        </p>

                                    </div>
                                )}

                                {activeTab === "study materials" && (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full border border-gray-200 text-left">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="w-[10%] py-4 px-4 border-b border-gray-200 text-gray-700 font-semibold">
                                                        Sr. No
                                                    </th>
                                                    <th className="w-[75%] py-4 px-4 border-b border-gray-200 text-gray-700 font-semibold">
                                                        Material Name
                                                    </th>
                                                    <th className="w-[15%] py-4 px-4 border-b border-gray-200 text-gray-700  font-semibold">
                                                        Click to Get
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {specificCourseData?.courseStudyMaterialName?.map((materialName, index) => {
                                                    const file = specificCourseData?.courseStudyMaterials?.[index];
                                                    const fileUrl = `http://localhost:9200/uploads/coursesImages/${file}`;

                                                    return (
                                                        <tr
                                                            key={index}
                                                            className={`${index <= 1 ? "opacity-100" : "opacity-50"} hover:bg-gray-50 transition`}
                                                        >
                                                            <td className="w-[10%] py-4 px-4 border-b border-gray-200">
                                                                {index + 1}
                                                            </td>
                                                            <td className="w-[75%] py-4 px-4 border-b border-gray-200">
                                                                {materialName}
                                                            </td>
                                                            <td className="w-[15%] py-4 px-4 border-b border-gray-200">
                                                                <a
                                                                    href={fileUrl}
                                                                    download
                                                                    className="bg-gray-950 hover:bg-gray-800 cursor-pointer text-white font-medium py-1.5 px-4 rounded transition"
                                                                >
                                                                    Download
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}

                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {activeTab === "description" && (
                                    <div className="bg-white border border-gray-200 shadow-sm p-6">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                            What You&#39;ll Learn in This Course
                                        </h2>
                                        <ul className="space-y-4">
                                            {specificCourseData?.courseLearnPoints?.map((point, index) => (
                                                <li key={index} className="flex items-start gap-3">
                                                    <div className="shrink-0 mt-1 w-6 h-6 rounded-full bg-gray-950 text-white text-sm flex items-center justify-center">
                                                        {index + 1}
                                                    </div>
                                                    <p className="text-gray-700 leading-relaxed">{point}</p>
                                                </li>
                                            ))}

                                        </ul>
                                    </div>
                                )}
                            </div>
                        </section>



                        {/* 🔹 Why Choose Us Section */}
                        <section className="w-full py-12 bg-gray-950 text-white lg:px-6 px-3 ">
                            <div className="">
                                <h2 className="text-[40px] font-bold mb-3">
                                    {" "}
                                    Features of the Program
                                </h2>
                                <p className="text-[20px] mb-7">
                                    Tailored for design aspirants with focused training, mentorship,
                                    and mock tests.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-8">
                                {[
                                    {
                                        title: "Interactive Doubt-Solving Lectures",
                                        desc: "Two-way live interactive sessions and accompanied by detailed class notes",
                                    },
                                    {
                                        title: "Practice eBooks with Video Solutions",
                                        desc: "Covers Creative/Design Aptitude Test (CAT/DAT), General Ability Test (GAT), and more.",
                                    },
                                    {
                                        title: "Comprehensive Study Material",
                                        desc: "12+ booklets covering the CEED syllabus delivered to your doorstep.",
                                    },
                                    {
                                        title: "Previous Year Questions",
                                        desc: "Includes video solutions for CEED exams.",
                                    },
                                    {
                                        title: "Daily Practice Assignments",
                                        desc: "Daily Practice Problems (DPPs) with in-depth explanations after each class.",
                                    },
                                    {
                                        title: "Personalized Feedback",
                                        desc: "Expert reviews for drawing assignments to refine your skills.",
                                    },
                                ].map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm hover:shadow-md transition"
                                    >
                                        <h4 className="text-[18px] font-medium mb-2 text-gray-900">
                                            {item.title}
                                        </h4>
                                        <p className="text-gray-900 text-sm">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="w-full lg:my-[60px] my-[30px] lg:px-6 px-3">
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
                                onlineCourseData.length >= 1 ? (

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
                                        {onlineCourseData?.map((course) => (
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


                        </section>
                    </div>
                </section>

                {/* 10. Final CTA */}
                <section className="bg-gray-950 text-white text-center py-12 px-4 lg:my-[40] my-[30px]">
                    <h2 className="text-[40px] font-bold mb-5 capitalize">
                        Are you ready to learn this course ?{" "}
                    </h2>
                    <p className="text-gray-300 text-2xl mb-6">
                        Get started today with expert-backed materials designed to help you
                        succeed.
                    </p>
                    <div className="relative inline-block">
                        {/* Glow Effect Behind the Button */}
                        <div className="absolute inset-0 z-0 rounded-full bg-white blur-md opacity-50 animate-glow"></div>

                        {/* Actual Button */}
                        <button className="relative z-10 bg-white text-xl cursor-pointer text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-gray-950 hover:text-white border-2 hover:border-white border-transparent duration-300 transition">
                            Buy Now for ₹{specificCourseData?.coursePrice}/-
                        </button>
                    </div>
                </section>

                <div className="w-full lg:p-3 bg-[#f8f8f8]  text-white rounded-[10px]">
                    <div className="max-w-[1320px] mx-auto py-[30px] rounded-[10px]  text-white">
                        <div className="bg-gray-950 p-6 rounded-[10px]">
                            <h4 className="font-bold mb-5 text-[40px] text-white">
                                Frequently Asked Questions
                            </h4>
                            <div>
                                {specificCourseData?.courseFaqsQuestions?.map((question, index) => {
                                    const answer = specificCourseData?.courseFaqsAnswer?.[index] || "Answer not available";
                                    return (
                                        <div key={index}>
                                            <h6
                                                onClick={() => {
                                                    setCurrentFaqId(currentFaqId === index ? null : index);
                                                }}
                                                className={`w-full lg:text-[20px] text-[16px] hover:text-white text-gray-100 py-[18px] duration-200 cursor-pointer border-b border-gray-800 grid gap-1 grid-cols-[95%_auto] items-center`}
                                            >
                                                {question}
                                                {index === currentFaqId ? (
                                                    <FaMinusCircle />
                                                ) : (
                                                    <FaPlusCircle />
                                                )}
                                            </h6>
                                            <div
                                                className={`transition-all overflow-hidden ${currentFaqId === index
                                                    ? "h-auto opacity-100 scale-100"
                                                    : "h-0 opacity-0 scale-95"
                                                    } text-white text-[18px] my-[10] w-full`}
                                            >
                                                {answer}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}