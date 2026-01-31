"use client";
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
  const [staticPath, setStaticPath] = useState("");

  const specificCourseData = offlineCourseData.filter(
    (item) => item.courseName == slug,
  )[0];

  const token = useSelector((store) => store.loginStore.token);
  const userData = useSelector((store) => store.loginStore.user);

  const [currentFaqId, setCurrentFaqId] = useState(null);


  const fetchAllOfflineCourses = () => {
    axios
      .get(`${apiBaseUrl}/course/view-offline`)
      .then((res) => res.data)
      .then((finalRes) => {
        setofflineCourseData(finalRes.offlineCourseData);
        setStaticPath(finalRes.staticPath);
      });
  };

  useEffect(() => {
    fetchAllOfflineCourses();
  }, []);

  const scrollMoment = () => {
    document
      .getElementById("recording-section")
      ?.scrollIntoView({ behavior: "smooth" });
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

  const [activePage, setActivePage] = useState('')

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



  return (
    <div className="w-full bg-white text-gray-900">
      {/* Hero Section */}
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

      {/* Course Details */}
      <section className="w-full bg-gray-50 py-16 text-black">
        <div className="max-w-[1320px] mx-auto px-4">
          <div className="grid lg:grid-cols-[68%_32%] gap-12 items-start">
            {/* ================= LEFT CONTENT ================= */}
            <div>
              {/* Course Card */}
              <div className="bg-white rounded-2xl p-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100">
                {/* Badge */}
                <span className="inline-flex items-center gap-2 mb-5 text-sm font-semibold px-5 py-2 rounded-full bg-green-700 text-white tracking-wide">
                  ⭐ Premium Course
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
                <ul className="space-y-3 mb-8">
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
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                  <button
                    onClick={scrollMoment}
                    className="border border-gray-400 rounded-full px-6 py-3 font-medium hover:bg-gray-100 transition"
                  >
                    Preview Course
                  </button>

                  <button
                    onClick={handleBtn}
                    className="col-span-2 bg-black text-white rounded-full px-8 py-3 font-semibold hover:bg-black/90 cursor-pointer transition shadow-lg hover:shadow-xl"
                  >
                    Buy Now
                  </button>
                </div>
              </div>

              {/* ================= KEY FEATURES ================= */}
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

      {/* cards section  */}
      <section className="relative bg-white py-8 px-6 md:px-12 overflow-hidden">
        {/* subtle background accent */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#00000008,transparent_50%)]" />

        <div className="relative max-w-[1320] mx-auto">
          {/* section heading */}
          <div className="max-w-2xl mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-black leading-tight">
              Shaping India's Future
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              A legacy of excellence, results, and industry-leading mentorship.
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

      <section className="w-full lg:my-20 my-12 px-4 lg:px-6">
        <div className="max-w-[1320px] mx-auto">
          {/* Heading */}
          <div className="mb-12 max-w-3xl">
            <h2 className="text-4xl  lg:text-5xl text-black font-extrabold capitalize mb-4">
              Explore More Courses
            </h2>
            <p className="text-lg text-gray-600">
              Discover expertly curated courses designed to elevate your skills.
            </p>
          </div>

          {offlineCourseData.length >= 1 ? (
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
              {offlineCourseData.map((course) => (
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
                              {course.courseName.replace(/[^a-zA-Z0-9]/g, " ")}
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

                            <button
                              onClick={handleBtn}
                              className="rounded-full bg-black text-white hover:bg-black/90 transition py-2 text-sm font-medium">
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
            <h4 className="text-4xl lg:text-5xl font-extrabold text-white mb-10">
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
  );
}
