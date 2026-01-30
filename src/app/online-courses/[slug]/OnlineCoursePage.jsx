"use client";
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
import Image from "next/image";

export default function OnlineCoursePage({ params }) {
  const slug = useParams().slug.replace(/[^a-zA-Z0-9+]/g, " ");
  const [onlineCourseData, setOnlineCourseData] = useState([]);
  const [staticPath, setStaticPath] = useState("");
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const tabs = ["recordings", "study materials", "description"];

  const specificCourseData = onlineCourseData.filter(
    (item) => item.courseName == slug,
  )[0];

  const token = useSelector((store) => store.loginStore.token);
  const userData = useSelector((store) => store.loginStore.user);

  const [currentFaqId, setCurrentFaqId] = useState(null);
  const [activeTab, setActiveTab] = useState("recordings");
  const [showAll, setShowAll] = useState(false);

  const fetchAllOnlineCourses = () => {
    axios
      .get(`${apiBaseUrl}/course/view-online`)
      .then((res) => res.data)
      .then((finalRes) => {
        setOnlineCourseData(finalRes.onlineCourseData);
        setStaticPath(finalRes.staticPath);
      });
  };

  useEffect(() => {
    fetchAllOnlineCourses();
  }, []);

  const scrollMoment = () => {
    document
      .getElementById("recording-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const addToCart = ({ itemId, main }) => {
    if (!token || token === " " || token == undefined) {
      Swal.fire({
        title: "Please login to Add To Cart",
        text: "You must be logged in to add to cart.",
        icon: "warning",
        iconColor: "black",
        background: "white",
        color: "black",
        confirmButtonText: "OK",
      });
    } else {
      const obj = {
        itemId,
        userData,
        main,
      };
      axios
        .post(`${apiBaseUrl}/cart/add-to-cart`, obj, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data)
        .then((finalRes) => {
          if (finalRes.status == 1) {
            Swal.fire({
              title: "Added In Cart Successfully",
              icon: "success",
              iconColor: "black",
              background: "white",
              color: "black",
            }).then((res) => {
              window.location.reload();
            });
          } else {
            Swal.fire({
              title: "Something went wrong",
              icon: "warning",
              text: "Try again later !",
              iconColor: "black",
              background: "white",
              color: "black",
            });
          }
        });
    }
  };

  const cards = [
    {
      number: "01",
      title: "India’s Best Coaching",
      description: "For Design & Architecture Entrance Exams",
      button: "Explore Programs",
    },
    {
      number: "02",
      title: "6,000+ Aspirants Trained",
      description:
        "90% success record with students placed in India’s most eminent design & architecture colleges",
      button: "View Results",
    },
    {
      number: "03",
      title: "Expert Academic Team",
      description:
        "NIFT, NID & IIT alumni with an average of 15+ years teaching experience — one of the highest in the industry",
      button: "Meet Faculty",
    },
  ];

  return (
    <>
      <div className="w-full overflow-x-hidden bg-white text-black">
        <section
          className="relative w-full min-h-[48vh] overflow-hidden"
        >
          <img
            loading="lazy"
            src={specificCourseData?.courseHeroImage}
            alt="Course Hero"
            className="object-cover object-center w-full h-[45vh]"
          />
        </section>
        {/* <section className="w-[100%] lg:mt-[40px]">
        <img
          className="w-[100%] h-auto object-cover"
          src="https://www.inframedesigninstitute.com/uploads/banner_images/1e0d83620d4bfdb29d0b87cba43fa3e5.jpg"
        />
      </section> */}

        {/* course details section */}
        <section className="w-full bg-gray-50 py-16 text-black">
          <div className="max-w-[1320px] mx-auto px-4">
            <div className="grid lg:grid-cols-[68%_32%] gap-12 items-start">
              {/* ================= LEFT CONTENT ================= */}
              <div>
                {/* Course Card */}
                <div className="bg-white rounded-2xl p-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100">
                  {/* Badge */}
                  <span className="inline-block mb-4 text-sm font-semibold px-4 py-1 rounded-full bg-black text-white">
                    Premium Course
                  </span>

                  {/* Title */}
                  <h1 className="text-4xl lg:text-5xl capitalize font-extrabold leading-tight tracking-tight mb-5">
                    {specificCourseData?.courseName?.replace(
                      /[^a-zA-Z0-9]/g,
                      " ",
                    )}
                  </h1>

                  {/* Description */}
                  <p className="text-lg text-black leading-relaxed mb-8">
                    {specificCourseData?.courseAbout}
                  </p>

                  {/* Course Points */}
                  <ul className="space-y-4 mb-8">
                    {specificCourseData?.coursePoints?.map((item, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <div className="mt-1 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-sm">
                          <TiTick />
                        </div>
                        <span className="text-black text-[17px]">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  <div className="border-t pt-6">
                    <p className="text-4xl font-extrabold text-black">
                      ₹ {specificCourseData?.coursePrice}/-
                    </p>
                    <p className="text-gray-500 mt-1">
                      Lifetime access · All recordings & material included
                    </p>
                  </div>

                  {/* CTA Buttons */}
                  <div className="grid grid-cols-3 gap-4 mt-8">
                    <button
                      onClick={scrollMoment}
                      className="border border-gray-400 rounded-full px-6 py-3 font-medium hover:bg-gray-100 transition"
                    >
                      Preview Course
                    </button>
                    <button className="border border-gray-400 rounded-full px-6 py-3 font-medium hover:bg-gray-100 transition">
                      Add To Cart
                    </button>

                    <button
                      onClick={() =>
                        alert("Thank you for purchasing the course!")
                      }
                      className="bg-black text-white rounded-full px-8 py-3 font-semibold hover:bg-black/90 cursor-pointer transition shadow-lg hover:shadow-xl"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>

                {/* ================= KEY FEATURES ================= */}
                <div className="mt-16">
                  <h2 className="text-4xl font-extrabold mb-4">
                    Why Choose This Course?
                  </h2>
                  <p className="text-lg text-black mb-10 max-w-2xl">
                    Designed for serious learners who want real skills, real
                    projects, and real outcomes.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {[
                      {
                        title: "Recorded Classes",
                        desc: "Lifetime access to structured, high-quality sessions.",
                      },
                      {
                        title: "Complete Study Material",
                        desc: "PDFs, assignments & mock tests included.",
                      },
                      {
                        title: "Doubt Support",
                        desc: "Direct mentor support whenever you're stuck.",
                      },
                      {
                        title: "Live Project Reviews",
                        desc: "Industry-level feedback on real projects.",
                      },
                      {
                        title: "Progress Tracking",
                        desc: "Track performance with structured milestones.",
                      },
                      {
                        title: "Certification",
                        desc: "Recognized certificate after course completion.",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="bg-white hover:-mt-1.5 border rounded-full border-gray-200 text-center p-6 shadow-md duration-300 transition-all"
                      >
                        <h3 className="text-xl font-semibold mb-2">
                          {item.title}
                        </h3>
                        <p className="text-black text-sm">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ================= RIGHT IMAGE ================= */}
              <div className="sticky top-24">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={specificCourseData?.courseBannerImage}
                    alt={`${specificCourseData?.courseName} banner`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* recording section */}
        <section id="recording-section" className="pb-12 my-10 bg-white">
          <div className="max-w-[1320px] mx-auto px-4">
            {/* Heading */}
            <div className="mb-10">
              <h2 className="text-4xl text-black font-extrabold mb-2">
                Course Overview
              </h2>
              <p className="text-gray-600 text-lg">
                Explore recordings, study materials, and detailed course content
              </p>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-3 mb-10 border-b border-gray-200 pb-4">
              {tabs?.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(item)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium capitalize transition
            ${item === activeTab
                      ? "bg-black text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-black hover:text-white"
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* ================= RECORDINGS ================= */}
            {activeTab === "recordings" && (
              <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        {["Sr. No", "Title", "Duration", "Action"].map(
                          (head, i) => (
                            <th
                              key={i}
                              className="py-4 px-6 text-sm font-semibold text-gray-700 border-b border-gray-300"
                            >
                              {head}
                            </th>
                          ),
                        )}
                      </tr>
                    </thead>

                    <tbody>
                      {specificCourseData?.courseRecordingTitle?.map(
                        (title, index) => {
                          const duration =
                            specificCourseData?.courseRecordingDuration?.[
                            index
                            ] || "N/A";
                          const url =
                            specificCourseData?.courseRecordingUrl?.[index] ||
                            "#";

                          return (
                            <tr
                              key={index}
                              className="hover:bg-gray-50 transition"
                            >
                              <td className="py-4 px-6 border-b border-gray-300">
                                {index + 1}
                              </td>
                              <td className="py-4 px-6 border-b border-gray-300 font-medium">
                                {title}
                              </td>
                              <td className="py-4 px-6 border-b border-gray-300 text-gray-600">
                                {duration} min
                              </td>
                              <td className="py-4 px-6 border-b border-gray-300">
                                <a
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`font-semibold ${index < 2
                                    ? "text-green-600 hover:underline"
                                    : "text-blue-600 hover:underline"
                                    }`}
                                >
                                  {index < 2 ? "Preview" : "Play"}
                                </a>
                              </td>
                            </tr>
                          );
                        },
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Show More */}
                <div className="py-6 text-center">
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="text-black font-medium hover:underline"
                  >
                    {showAll ? "Show Less" : "Show More"}
                  </button>
                </div>
              </div>
            )}

            {/* ================= STUDY MATERIAL ================= */}
            {activeTab === "study materials" && (
              <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-4 px-6 font-semibold border-b border-gray-300">
                          Sr. No
                        </th>
                        <th className="py-4 px-6 font-semibold border-b border-gray-300">
                          Material Name
                        </th>
                        <th className="py-4 px-6 font-semibold border-b border-gray-300 text-center">
                          Download
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {specificCourseData?.courseStudyMaterialName?.map(
                        (materialName, index) => {
                          const file =
                            specificCourseData?.courseStudyMaterials?.[index];
                          const fileUrl = `http://localhost:9200/uploads/coursesImages/${file}`;

                          return (
                            <tr
                              key={index}
                              className={`transition hover:bg-gray-50 ${index > 1 ? "opacity-50" : "opacity-100"
                                }`}
                            >
                              <td className="py-4 px-6 border-b border-gray-300 ">
                                {index + 1}
                              </td>
                              <td className="py-4 px-6 border-b border-gray-300 font-medium">
                                {materialName}
                              </td>
                              <td className="py-4 px-6 border-b border-gray-300 text-center">
                                <a
                                  href={fileUrl}
                                  download
                                  className="inline-block bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-black/90 transition"
                                >
                                  Download
                                </a>
                              </td>
                            </tr>
                          );
                        },
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ================= DESCRIPTION ================= */}
            {activeTab === "description" && (
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
                <h3 className="text-2xl font-bold mb-6">What You’ll Learn</h3>

                <ul className="space-y-5">
                  {specificCourseData?.courseLearnPoints?.map(
                    (point, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 leading-relaxed">{point}</p>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* cards section  */}
        <section className="relative bg-white py-8 px-6 md:px-12 overflow-hidden">
          {/* subtle background accent */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#00000008,transparent_50%)]" />

          <div className="relative max-w-7xl mx-auto">
            {/* section heading */}
            <div className="max-w-2xl mb-8">
              <h2 className="text-3xl md:text-4xl font-extrabold text-black leading-tight">
                Shaping India's Future
              </h2>
              <p className="mt-4 text-lg text-neutral-600">
                A legacy of excellence, results, and industry-leading
                mentorship.
              </p>
            </div>

            {/* cards */}
            <div className="grid gap-10 md:grid-cols-3">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="group relative border border-neutral-200 p-10 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
                >
                  <h3 className="mt-4 text-2xl font-semibold text-black">
                    {card.title}
                  </h3>

                  <p className="mt-4 text-neutral-700 leading-relaxed">
                    {card.description}
                  </p>

                  <button className="mt-10 inline-flex items-center gap-2 bg-black text-white px-7 py-3 text-sm font-medium transition-all group-hover:gap-4">
                    {card.button}
                    <span>→</span>
                  </button>

                  {/* hover accent line */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-black transition-all duration-500 group-hover:w-full" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 🔸 Content Wrapper */}
        <section className="">
          <div className="max-w-[1320px]  mx-auto ">
            {/* 🔹 Features Section */}

            {/* recording section */}
            <section id="recording-section" className="pb-12 my-10 bg-white">
              <div className="max-w-[1320px] mx-auto px-4">
                {/* Heading */}
                <div className="mb-10">
                  <h2 className="text-4xl text-black font-extrabold mb-2">
                    Course Overview
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Explore recordings, study materials, and detailed course
                    content
                  </p>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-3 mb-10 border-b border-gray-200 pb-4">
                  {tabs?.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTab(item)}
                      className={`px-6 py-2.5 rounded-full text-sm font-medium capitalize transition
            ${item === activeTab
                          ? "bg-black text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-black hover:text-white"
                        }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                {/* ================= RECORDINGS ================= */}
                {activeTab === "recordings" && (
                  <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-left">
                        <thead className="bg-gray-50">
                          <tr>
                            {["Sr. No", "Title", "Duration", "Action"].map(
                              (head, i) => (
                                <th
                                  key={i}
                                  className="py-4 px-6 text-sm font-semibold text-gray-700 border-b border-gray-300"
                                >
                                  {head}
                                </th>
                              ),
                            )}
                          </tr>
                        </thead>

                        <tbody>
                          {specificCourseData?.courseRecordingTitle?.map(
                            (title, index) => {
                              const duration =
                                specificCourseData?.courseRecordingDuration?.[
                                index
                                ] || "N/A";
                              const url =
                                specificCourseData?.courseRecordingUrl?.[
                                index
                                ] || "#";

                              return (
                                <tr
                                  key={index}
                                  className="hover:bg-gray-50 transition"
                                >
                                  <td className="py-4 px-6 border-b border-gray-300">
                                    {index + 1}
                                  </td>
                                  <td className="py-4 px-6 border-b border-gray-300 font-medium">
                                    {title}
                                  </td>
                                  <td className="py-4 px-6 border-b border-gray-300 text-gray-600">
                                    {duration} min
                                  </td>
                                  <td className="py-4 px-6 border-b border-gray-300">
                                    <a
                                      href={url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={`font-semibold ${index < 2
                                        ? "text-green-600 hover:underline"
                                        : "text-blue-600 hover:underline"
                                        }`}
                                    >
                                      {index < 2 ? "Preview" : "Play"}
                                    </a>
                                  </td>
                                </tr>
                              );
                            },
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Show More */}
                    <div className="py-6 text-center">
                      <button
                        onClick={() => setShowAll(!showAll)}
                        className="text-black font-medium hover:underline"
                      >
                        {showAll ? "Show Less" : "Show More"}
                      </button>
                    </div>
                  </div>
                )}

                {/* ================= STUDY MATERIAL ================= */}
                {activeTab === "study materials" && (
                  <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-left">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="py-4 px-6 font-semibold border-b border-gray-300">
                              Sr. No
                            </th>
                            <th className="py-4 px-6 font-semibold border-b border-gray-300">
                              Material Name
                            </th>
                            <th className="py-4 px-6 font-semibold border-b border-gray-300 text-center">
                              Download
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {specificCourseData?.courseStudyMaterialName?.map(
                            (materialName, index) => {
                              const file =
                                specificCourseData?.courseStudyMaterials?.[
                                index
                                ];
                              const fileUrl = `http://localhost:9200/uploads/coursesImages/${file}`;

                              return (
                                <tr
                                  key={index}
                                  className={`transition hover:bg-gray-50 ${index > 1 ? "opacity-50" : "opacity-100"
                                    }`}
                                >
                                  <td className="py-4 px-6 border-b border-gray-300 ">
                                    {index + 1}
                                  </td>
                                  <td className="py-4 px-6 border-b border-gray-300 font-medium">
                                    {materialName}
                                  </td>
                                  <td className="py-4 px-6 border-b border-gray-300 text-center">
                                    <a
                                      href={fileUrl}
                                      download
                                      className="inline-block bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-black/90 transition"
                                    >
                                      Download
                                    </a>
                                  </td>
                                </tr>
                              );
                            },
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* ================= DESCRIPTION ================= */}
                {activeTab === "description" && (
                  <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
                    <h3 className="text-2xl font-bold mb-6">
                      What You’ll Learn
                    </h3>

                    <ul className="space-y-5">
                      {specificCourseData?.courseLearnPoints?.map(
                        (point, index) => (
                          <li key={index} className="flex items-start gap-4">
                            <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold">
                              {index + 1}
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                              {point}
                            </p>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </section>

            {/* 🔹 Why Choose Us Section */}
            <section className="w-full bg-black my-10 text-white rounded-2xl p-10">
              <div className="max-w-[1320px] mx-auto">
                {/* Heading */}
                <div className="mb-14 max-w-3xl">
                  <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">
                    Features of the Program
                  </h2>
                  <p className="text-lg text-gray-300">
                    Tailored for design aspirants with structured training,
                    expert mentorship, and exam-focused practice.
                  </p>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                  {[
                    {
                      title: "Interactive Doubt-Solving Lectures",
                      desc: "Live two-way interactive sessions supported by detailed class notes.",
                    },
                    {
                      title: "Practice eBooks with Video Solutions",
                      desc: "Covers CAT/DAT, GAT, and other design aptitude sections in depth.",
                    },
                    {
                      title: "Comprehensive Study Material",
                      desc: "12+ expertly curated booklets covering the complete CEED syllabus.",
                    },
                    {
                      title: "Previous Year Question Analysis",
                      desc: "Includes detailed video solutions from past CEED examinations.",
                    },
                    {
                      title: "Daily Practice Assignments",
                      desc: "Daily Practice Problems (DPPs) with step-by-step explanations.",
                    },
                    {
                      title: "Personalized Expert Feedback",
                      desc: "Individualized reviews on drawing and creative assignments.",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="
            group
            bg-[#111111]
            border border-gray-800
            rounded-[28px]
            p-8
            transition-all duration-300 ease-out
            hover:-translate-y-1
            hover:border-gray-600
            hover:shadow-[0_20px_60px_rgba(255,255,255,0.06)]
          "
                    >
                      {/* Soft Accent */}
                      <div className="w-12 h-1 bg-white/90 rounded-full mb-6 transition-all duration-300 group-hover:w-20"></div>

                      <h4 className="text-lg font-semibold mb-3">
                        {item.title}
                      </h4>

                      <p className="text-sm text-gray-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* explore more courses section */}
            <section className="w-full lg:my-20 my-12 px-4 lg:px-6">
              <div className="max-w-[1320px] mx-auto">
                {/* Heading */}
                <div className="mb-12 max-w-3xl">
                  <h2 className="text-3xl lg:text-4xl text-black font-extrabold capitalize mb-4">
                    Explore More Courses
                  </h2>
                  <p className="text-lg text-gray-600">
                    Discover expertly curated courses designed to elevate your
                    skills.
                  </p>
                </div>

                {onlineCourseData.length >= 1 ? (
                  <Swiper
                    modules={[Autoplay]}
                    spaceBetween={24}
                    slidesPerView={1}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    breakpoints={{
                      640: { slidesPerView: 1.2 },
                      768: { slidesPerView: 2.2 },
                      1024: { slidesPerView: 4 },
                    }}
                  >
                    {onlineCourseData.map((course) => (
                      <SwiperSlide key={course._id}>
                        <div className="px-2">
                          <div
                            className="
                  group
                  bg-white
                  h-[560px]
                  rounded-[28px] border border-gray-300
                  overflow-hidden
                  transition-all duration-300 ease-out
                  hover:-translate-y-1
                  hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)]
                "
                          >
                            {/* Image */}
                            <div className="overflow-hidden rounded-t-[28px]">
                              <img
                                src={course.courseImage}
                                alt={course.courseName}
                                className="w-full h-[340px] object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                              />
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col justify-between h-[220px]">
                              <div>
                                <Link
                                  href={`/online-courses/${course.courseName
                                    .toLowerCase()
                                    .replace(/[^a-zA-Z0-9]/g, "-")}`}
                                >
                                  <h3 className="text-lg font-semibold capitalize text-black hover:underline">
                                    {course.courseName.replace(
                                      /[^a-zA-Z0-9]/g,
                                      " ",
                                    )}
                                  </h3>
                                </Link>

                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                  {course.cousreHeadline}
                                </p>
                              </div>

                              {/* Price + CTA */}
                              <div>
                                <p className="text-2xl font-bold mt-3 text-black">
                                  ₹ {course.coursePrice} /-
                                </p>

                                <div className="mt-4 grid grid-cols-2 gap-4">
                                  <button
                                    onClick={() =>
                                      addToCart({
                                        itemId: course._id,
                                        main: "online course",
                                      })
                                    }
                                    className="rounded-full bg-gray-100 hover:bg-gray-200 transition py-2 text-sm font-medium"
                                  >
                                    Add to Cart
                                  </button>

                                  <button className="rounded-full bg-black text-white hover:bg-black/90 transition py-2 text-sm font-medium">
                                    Buy Now
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  /* Skeleton Loader */
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[...Array(4)].map((_, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-[28px] p-6 shadow-md animate-pulse"
                      >
                        <div className="h-[220px] bg-gray-200 rounded-[20px] mb-6"></div>
                        <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
                        <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-5/6 mb-6"></div>
                        <div className="h-5 bg-gray-300 rounded w-1/3 mb-6"></div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="h-10 bg-gray-200 rounded-full"></div>
                          <div className="h-10 bg-gray-300 rounded-full"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>
        </section>

        {/* 10. Final CTA */}
        <section className="bg-green-100 text-black text-center py-12 px-4 lg:my-[40] my-[30px]">
          <h2 className="text-[40px] font-extrabold mb-5 capitalize">
            Are you ready to learn this course ?{" "}
          </h2>
          <p className="text-black text-2xl mb-6">
            Get started today with expert-backed materials designed to help you
            succeed.
          </p>
          <div className="relative inline-block">
            {/* Glow Effect Behind the Button */}
            <div className="absolute inset-0 z-0 rounded-full bg-white blur-md opacity-50 animate-glow"></div>

            {/* Actual Button */}
            <button className="relative z-10 bg-green-700 hover:bg-green-800 text-white text-xl cursor-pointer  px-6 py-3 rounded-full font-medium  shadow-2xl shadow-green-500 hover:text-white  duration-300 transition">
              Buy Now for ₹{specificCourseData?.coursePrice}/-
            </button>
          </div>
        </section>

        <section className="w-full bg-[#f7f7f7] py-16 px-4">
          <div className="max-w-[1320px] mx-auto">
            <div className="bg-black rounded-[28px] p-8 lg:p-12 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
              {/* Heading */}
              <h4 className="text-3xl lg:text-4xl font-extrabold text-white mb-10">
                Frequently Asked Questions
              </h4>

              {/* FAQ Items */}
              <div className="space-y-2">
                {specificCourseData?.courseFaqsQuestions?.map(
                  (question, index) => {
                    const answer =
                      specificCourseData?.courseFaqsAnswer?.[index] ||
                      "Answer not available";

                    const isOpen = currentFaqId === index;

                    return (
                      <div
                        key={index}
                        className="
                bg-[#111]
                rounded-[20px]
                px-6
                transition-all duration-300
              "
                      >
                        {/* Question */}
                        <button
                          onClick={() => setCurrentFaqId(isOpen ? null : index)}
                          className="
                  w-full
                  flex
                  items-center
                  justify-between
                  text-left
                  py-5
                  text-base lg:text-lg
                  font-medium
                  text-gray-200
                  hover:text-white
                  transition
                "
                        >
                          <span className="pr-6 ">{question}</span>
                          <span className="text-xl">
                            {isOpen ? <FaMinusCircle /> : <FaPlusCircle />}
                          </span>
                        </button>

                        {/* Answer */}
                        <div
                          className={`grid transition-all duration-300 ease-out ${isOpen
                            ? "grid-rows-[1fr] opacity-100 pb-5"
                            : "grid-rows-[0fr] opacity-0"
                            }`}
                        >
                          <div className="overflow-hidden text-gray-300 text-sm lg:text-base leading-relaxed">
                            {answer}
                          </div>
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
