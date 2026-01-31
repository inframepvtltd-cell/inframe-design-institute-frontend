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
import OverLay from "@/app/components/OverLay";
import UserControl from "@/app/common/UserControl";

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

  const [activePage, setActivePage] = useState('login')

  const handleBtn = () => {
    setActivePage('login')
    if (token) {
      //razorypay setupta
      alert('razorypay setup inplement')
      return
    }
    else {
      setActivePage('login')
    }
  }

  {
    activePage && !token &&
      < OverLay />
  }

  <UserControl activePage={activePage} setActivePage={setActivePage} />
  return (
    <>
      <div className="w-full overflow-x-hidden bg-white text-black">
        <section
          className="relative w-full min-h-[50vh] overflow-hidden"
        >
          <img
            loading="lazy"
            src={specificCourseData?.courseHeroImage}
            alt="Course Hero"
            className="object-cover object-center w-full"
          />
        </section>
        {/* <section className="w-[100%] lg:mt-[40px]">
        <img
          className="w-[100%] h-auto object-cover"
          src="https://www.inframedesigninstitute.com/uploads/banner_images/1e0d83620d4bfdb29d0b87cba43fa3e5.jpg"
        />
      </section> */}

        {/* course details section */}
        <section className="w-full bg-gradient-to-b from-gray-50 to-white py-20 text-black">
          <div className="max-w-[1320px] mx-auto px-4">
            <div className="grid lg:grid-cols-[65%_35%] gap-14 items-start">

              {/* ================= LEFT CONTENT ================= */}
              <div>
                <div className="bg-white rounded-3xl p-10 lg:p-12 shadow-[0_30px_80px_rgba(0,0,0,0.08)] border border-gray-100">

                  {/* Badge */}
                  <span className="inline-flex items-center gap-2 mb-5 text-sm font-semibold px-5 py-2 rounded-full bg-orange-600 text-white tracking-wide">
                    ⭐ Premium Course
                  </span>

                  {/* Title */}
                  <h1 className="text-4xl lg:text-5xl capitalize font-extrabold leading-tight tracking-tight mb-6">
                    {specificCourseData?.courseName?.replace(/[^a-zA-Z0-9]/g, " ")}
                  </h1>

                  {/* Description */}
                  <p className="text-lg text-gray-700 leading-relaxed mb-5">
                    {specificCourseData?.courseAbout}
                  </p>

                  {/* Course Points */}
                  <ul className="space-y-3 mb-10">
                    {specificCourseData?.coursePoints?.map((item, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <div className="mt-1 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-sm shadow">
                          <TiTick />
                        </div>
                        <span className="text-gray-800 text-[16px] leading-snug">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  <div className="flex items-center justify-between border-t pt-8">
                    <div>
                      <p className="text-4xl font-extrabold text-black">
                        ₹ {specificCourseData?.coursePrice}/-
                      </p>
                      <p className="text-gray-500 mt-1 text-sm">
                        Lifetime access · All recordings & materials included
                      </p>
                    </div>

                    <div className="hidden lg:block text-sm text-gray-400">
                      100% Practical Learning
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
                    <button
                      onClick={scrollMoment}
                      className="rounded-full px-6 py-3 font-medium border border-gray-300 hover:bg-gray-100 transition"
                    >
                      Preview Course
                    </button>

                    <button onClick={() => addToCart(specificCourseData?._id)} className="rounded-full px-6 py-3 font-medium border border-gray-300 hover:bg-gray-100 transition">
                      Add To Cart
                    </button>

                    <button
                      onClick={handleBtn}
                      className="rounded-full px-8 py-3 font-semibold bg-black text-white hover:bg-black/90 transition shadow-lg hover:shadow-2xl hover:-translate-y-[1px]"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>


                <div className="px-10 py-5 bg-white rounded-xl mt-6 shadow-[0_15px_40px_rgba(0,0,0,0.07)]">
                  <h1 className="font-extrabold text-3xl mb-5 text-black">
                    Why Choose Us
                  </h1>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                    {/* Section 1 */}
                    <div className="p-4 rounded-lg border border-gray-100 hover:shadow-md transition">
                      <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center mb-3 text-lg">
                        🎓
                      </div>
                      <h3 className="text-lg font-bold leading-snug">
                        Industry-Focused Learning
                      </h3>
                    </div>

                    {/* Section 2 */}
                    <div className="p-4 rounded-lg border border-gray-100 hover:shadow-md transition">
                      <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center mb-3 text-lg">
                        🚀
                      </div>
                      <h3 className="text-lg font-bold leading-snug">
                        Learn at Your Own Pace
                      </h3>
                    </div>

                    {/* Section 3 */}
                    <div className="p-4 rounded-lg border border-gray-100 hover:shadow-md transition">
                      <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center mb-3 text-lg">
                        💡
                      </div>
                      <h3 className="text-lg font-bold leading-snug">
                        Expert Mentorship
                      </h3>
                    </div>

                  </div>
                </div>


              </div>

              {/* ================= RIGHT IMAGE ================= */}
              <div className="sticky top-24">
                <div className="relative rounded-3xl overflow-hidden shadow-[0_40px_90px_rgba(0,0,0,0.25)]">

                  {/* Fixed Aspect Ratio */}
                  <div className="overflow-hidden group">
                    <img
                      src={specificCourseData?.courseBannerImage}
                      alt={`${specificCourseData?.courseName} banner`}
                      className="w-full h-fit object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

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
                                    ? "text-orange-600 hover:underline"
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


        {/* 10. Final CTA */}
        <section className="bg-orange-100 text-black text-center py-12 px-4 lg:my-[40] my-[30px]">
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
            <button onClick={handleBtn} className="relative z-10 bg-orange-700 hover:bg-orange-800 text-white text-xl cursor-pointer  px-6 py-3 rounded-full font-medium  shadow-2xl shadow-orange-500 hover:text-white  duration-300 transition">
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
