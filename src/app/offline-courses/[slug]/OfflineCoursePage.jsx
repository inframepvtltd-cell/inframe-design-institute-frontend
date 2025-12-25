'use client'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TiTick } from "react-icons/ti";
import {
    FaLongArrowAltDown,
    FaMinusCircle,
    FaPlusCircle,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Slider from "react-slick";
import Link from "next/link";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";


export default function OfflineCoursePage({ params }) {

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL

    const slug = useParams().slug.replace(/[^a-zA-Z0-9+]/g, " ")
    const [offlineCourseData, setofflineCourseData] = useState([])
    const [staticPath, setStaticPath] = useState('')

    const specificCourseData = offlineCourseData.filter((item) => item.courseName == slug)[0]


    const token = useSelector((store) => store.loginStore.token)
    const userData = useSelector((store) => store.loginStore.user)

    const [currentFaqId, setCurrentFaqId] = useState(null);


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
            console.log(obj)
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


    const fetchAllOfflineCourses = () => {
        axios.get(`${apiBaseUrl}/course/view-offline`)
            .then((res) => res.data)
            .then((finalRes) => {
                setofflineCourseData(finalRes.offlineCourseData)
                setStaticPath(finalRes.staticPath)
                console.log(finalRes.offlineCourseData)
                console.log(finalRes.staticPath)
            })
    }

    useEffect(() => {
        fetchAllOfflineCourses()
    }, [])


    const scrollMoment = () => {
        document
            .getElementById("recording-section")
            ?.scrollIntoView({ behavior: "smooth" });
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4, // default
        slidesToScroll: 1,
        autoplay: true,
        centerPadding: "30px",
        centerMode: true,
        autoplaySpeed: 1500,
        responsive: [
            {
                breakpoint: 1024, // tablets
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 640, // mobile
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    }

    return (
        <div className="w-full bg-white text-gray-900">
            {/* 🔹 Hero Section */}
            <section
                className="w-full min-h-[60vh] flex lg:px-6 px-3 bg-cover bg-top relative"
                style={{
                    backgroundImage: "url('/doubtSolving.JPG')",
                }}
            >
                {/* 🔹 Gradient Overlay (z-10) */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10"></div>

                {/* 🔹 Text Content (z-20) */}
                <div className="text-white py-12 relative z-20 max-w-xl">
                    <h2 className="text-[50px] font-bold capitalize">
                        {specificCourseData?.courseName?.replace(/[^a-zA-Z0-9]/g, " ")}
                    </h2>
                    <p className="text-[25px] mt-3 capitalize">
                        {specificCourseData?.cousreHeadline}
                    </p>
                    <button
                        onClick={scrollMoment}
                        className="bg-white font-[500] hover:bg-transparent hover:border-white border-transparent border-2 duration-300  hover:text-white text-gray-900  rounded-full py-[10px] px-10 mt-5 text-[18px] cursor-pointer grid grid-cols-[95%_auto] items-center group"
                    >
                        {" "}
                        View Course Overview{" "}
                        <FaLongArrowAltDown className="opacity-0 -translate-y-4  group-hover:opacity-100 group-hover:translate-y-0 transition-all ease-in-out duration-300" />{" "}
                    </button>
                </div>
            </section>

            {/* <section className="w-[100%] lg:mt-[40px]">
        <img
          className="w-[100%] h-auto object-cover"
          src="https://www.inframedesigninstitute.com/uploads/banner_images/1e0d83620d4bfdb29d0b87cba43fa3e5.jpg"
        />
      </section> */}

            {/* course details section */}
            <section className="w-full py-[30px] lg:py-[30px] bg-white text-gray-900">
                <div className="max-w-[1320px] mx-auto px-3 lg:px-6">
                    <div className="grid md:grid-cols-[72%_auto] gap-10 items-center md:items-start">
                        {/* === LEFT SIDE: Course Content === */}
                        <div className="w-full h-full">

                            {/* Course Info Card */}
                            <div className="bg-white shadow-md p-10 transition-all duration-300 ">
                                {/* Course Name */}
                                <h3 className="text-[32px] font-bold text-gray-900 mb-4 leading-tight tracking-tight capitalize">
                                    {specificCourseData?.courseName?.replace(/[^a-zA-Z0-9]/g, " ")}
                                </h3>

                                {/* Description */}
                                <p className="text-[18px] text-gray-600 mb-6 leading-relaxed">
                                    {specificCourseData?.courseAbout}
                                    {console.log(specificCourseData?.courseAbout)}
                                </p>

                                { }
                                <ul className="text-[17px] text-gray-700 space-y-2 mb-6 marker:text-gray-400">
                                    {specificCourseData?.coursePoints?.map(
                                        (item, index) => (
                                            <li
                                                className="list-none flex items-center gap-3"
                                                key={index}
                                            >
                                                <div className="flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-gray-950 text-white text-sm flex items-center justify-center">
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
                                        onClick={() => addToCart({ itemId: specificCourseData?._id, main: 'offline course' })}

                                        className="group relative overflow-hidden border border-gray-900 text-gray-900 px-6 py-3 rounded-md font-semibold transition-all duration-300 hover:bg-gray-900 hover:text-white"
                                    >
                                        Add to Cart
                                        <span className="absolute left-0 top-0 w-full h-0 bg-gray-900 transition-all duration-300 group-hover:h-full opacity-10 z-0" />
                                    </button>

                                    <button
                                        onClick={() =>
                                            alert("Thank you for purchasing the course!")
                                        }
                                        className="relative overflow-hidden cursor-pointer bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white px-6 py-3 rounded-md font-semibold transition-all duration-300 shadow-md hover:shadow-xl"
                                    >
                                        Buy Now
                                    </button>


                                </div>
                            </div>

                            {/* Key Features */}
                            <div className="bg-white border border-gray-300 rounded-[10px] shadow-2xl mt-[20px] lg:mt-[40px] py-[20px] lg:py-[60px] px-3 lg:px-6">
                                <h2 className="text-[30px] font-bold mb-3">Our Key Features</h2>
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
                                            className="bg-black lg:bg-white lg:text-black text-white lg:hover:text-white  lg:hover:bg-black duration-500 hover:text-white border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition"
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-3 h-3 rounded-full bg-white "></div>
                                                <h3 className="text-xl font-semibold">{item.title}</h3>
                                            </div>
                                            <p className="text-white text-sm">{item.desc}</p>
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
                                className="w-full h-[100%] object-cover object-top rounded-lg shadow-md"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* hero banner image section  */}

            <section className="w-full  lg:my-[30px] my-[30px] " >
                {/* {console.log( specificCourseData?.courseHeroImage)} */}
                <img src={specificCourseData?.courseHeroImage} className="w-full max-h-[330px] object-cover" />
            </section>

            {/* 🔸 Content Wrapper */}
            <section className="">
                <div className="max-w-[1320px]  mx-auto ">
                    {/* 🔹 Features Section */}




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
                                    <h4 className="text-[18px] font-[500] mb-2 text-gray-900">
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

                        <Slider {...settings}>
                            {offlineCourseData?.map((course) => (
                                <div key={course.id} className="px-2">
                                    <div className="bg-white h-[550px]  shadow-md group rounded-lg overflow-hidden hover:shadow-lg cursor-pointer transition">
                                        <img
                                            src={course?.courseImage}
                                            alt={slug}
                                            className="w-full h-[340px] group-hover:scale-[1.03]  object-center duration-300 object-cover"
                                        />
                                        <div className="p-4">
                                            <Link
                                                href={`/offline-courses/${course.courseName.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-")}`}
                                            >
                                                <h3 className="text-lg capitalize hover:underline cursor-pointer font-semibold  text-gray-900">
                                                    {course?.courseName?.replace(/[^a-zA-Z0-9]/g, " ")}
                                                </h3>
                                            </Link>
                                            <p className="text-sm text-gray-600 ">
                                                {course?.cousreHeadline}
                                            </p>
                                            <p className="text-[22px] font-bold mt-1">
                                                {" "}
                                                ₹ {course.coursePrice} /-
                                            </p>
                                            <div className="grid grid-cols-2 gap-3 mt-3">
                                                <button
                                                    onClick={() => addToCart({ itemId: course?._id, main: 'online course' })}
                                                    className="border border-gray-900 text-gray-900 hover:bg-gray-950 hover:text-white  py-2 cursor-pointer  rounded-md font-semibold transition"
                                                >
                                                    Add to Cart
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        alert("Thank you for purchasing the course!")
                                                    }
                                                    className="bg-gray-950 hover:bg-gray-950 text-white  py-2 cursor-pointer  rounded-md font-semibold transition"
                                                >
                                                    Buy Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </section>
                </div>
            </section>

            {/* 10. Final CTA */}
            <section className="bg-gray-950 text-white text-center py-12 px-4 lg:my-[40px] my-[30px]">
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
                <div className="max-w-7xl mx-auto py-[30px] p-5 rounded-[10px]  text-white">
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
                                                } text-white text-[18px] my-[10px] w-full`}
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
    );
}