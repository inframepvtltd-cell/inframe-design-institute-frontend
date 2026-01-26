"use client";
import CourseNotFound from "@/app/common/CourseNotFound";
import axios from "axios";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaLongArrowAltDown,
  FaMinusCircle,
  FaPlusCircle,
} from "react-icons/fa";

export default function StudyMaterialPage() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const [studyMaterialData, setstudyMaterialData] = useState([]);
  //banner.JPG
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [currentFaqId, setCurrentFaqId] = useState(null);
  const slug = useParams().slug;

  const [loading, setLoading] = useState(true);

  const getAllStudyMaterials = async () => {
    try {
      const res = await axios.get(`${apiBaseUrl}/study-material/view-all`);
      if (res.data.status == 1) setstudyMaterialData(res.data.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllStudyMaterials();
  }, []);

  const specificCourseData =
    !loading && studyMaterialData.length > 0
      ? studyMaterialData.find(
          (item) => item.materialSlug.toString() === slug.toString(),
        )
      : null;

  if (!loading && !specificCourseData) {
    return <CourseNotFound />;
  }

  console.log("specific ", specificCourseData);

  const scrollMoment = () => {
    document
      .getElementById("recording-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const faqs = [
    { question: "questions", answer: "answer" },
    { question: "questions", answer: "answer" },
    { question: "questions", answer: "answer" },
    { question: "questions", answer: "answer" },
    { question: "questions", answer: "answer" },
    { question: "questions", answer: "answer" },
    { question: "questions", answer: "answer" },
  ];
  return (
    <>
      {/* {specificCourseData ? */}

      <div className="bg-white text-black">
        {/* 1. Hero Section */}
        <section
          className="w-full min-h-[60vh] flex lg:px-6 px-3 bg-cover bg-top relative"
          style={{
            backgroundImage:
              "url('https://thumbs.dreamstime.com/b/focused-study-background-featuring-elements-like-books-pens-learning-materials-focused-study-background-featuring-elements-374106409.jpg')",
          }}
        >
          {/* 🔹 Gradient Overlay (z-10) */}
          <div className="absolute inset-0 bg-linear-to-r from-black via-black/50 to-transparent z-10"></div>

          {/* 🔹 Text Content (z-20) */}
          <div className="w-[1320px] mx-auto">
            <div className="text-white  py-12 relative z-20">
              <h2 className="text-[50px] font-bold capitalize">
                {specificCourseData?.materialTitle} study materials
              </h2>
              <p className="text-[25px] mt-3 capitalize">
                {specificCourseData?.materialDescription}
              </p>
              <button
                onClick={scrollMoment}
                className="bg-white font-medium hover:bg-transparent hover:border-white border-transparent border-2 duration-300  hover:text-white text-black  rounded-full py-[10] px-10 mt-5 text-[18px] cursor-pointer grid grid-cols-[95%_auto] items-center group"
              >
                {" "}
                View Course Overview{" "}
                <FaLongArrowAltDown className="opacity-0 -translate-y-4  group-hover:opacity-100 group-hover:translate-y-0 transition-all ease-in-out duration-300" />{" "}
              </button>
            </div>
          </div>
        </section>

        <section className="w-full lg:my-[40p] my-[20]">
          <section className="max-w-[1320px] mx-auto py-12">
            <div className="grid grid-cols-[70%_auto]  justify-between gap-8">
              {/* Left Side: Images (70%) */}
              <div className="">
                <img
                  loading="lazy"
                  src="https://www.shutterstock.com/image-vector/set-school-items-doodle-style-260nw-2650809637.jpg"
                  alt="Product 1"
                  className="rounded-lg w-full border border-gray-200 shadow-lg object-contain object-center "
                />
              </div>

              {/* Right Side: Purchase Section (30%) */}
              <div className="w-full  bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-4 text-black">
                    Purchase for More
                  </h2>
                  <p className="text-black text-md mb-3">
                    Unlock exclusive deals on our premium products. Limited time
                    offer!
                  </p>
                  <ul className="list-disc list-inside text-black mb-4 text-md space-y-1">
                    <li>High-quality materials</li>
                    <li>1-year warranty included</li>
                    <li>Free shipping worldwide</li>
                  </ul>
                  <p className="text-3xl font-bold py-3 text-black">
                    Only ₹{specificCourseData?.materialPrice} /-
                  </p>
                </div>
                <button className="mt-auto bg-black hover:bg-black text-white font-semibold py-3 px-6 rounded transition duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          </section>
        </section>

        {/* 7. Add to Cart / Buy Now */}
        <section id="recording-section" className="bg-[#f8f8f8] py-16">
          <section className="max-w-[1320px] mx-auto px-4">
            <h2 className="lg:text-4xl text-3xl font-extrabold text-black mb-8">
              Material Overview
            </h2>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Material Card */}
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.01] hover:shadow-2xl transition-all duration-500">
                <div className="relative">
                  <img
                    className="w-full h-[220px] lg:h-[250px] object-cover object-top"
                    src="https://www.inframedesigninstitute.inframecollege.org/assets/upload/images/NATA%20JEE%20B.ARCH-10.jpg"
                    alt="NIFT Pack"
                  />
                  <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                </div>
                <div className="p-5 lg:p-6">
                  <p className="text-xl lg:text-2xl font-bold mb-1 capitalize text-black">
                    {specificCourseData?.materialTitle}
                  </p>
                  <span className="text-xl lg:text-2xl text-black font-semibold block mb-4">
                    ₹ {specificCourseData?.materialPrice} /-
                  </span>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-gray-100 text-black py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 shadow-sm">
                      Add to Cart
                    </button>
                    <button className="flex-1 bg-black text-white py-2.5 rounded-lg font-semibold hover:bg-black transition-all duration-300 shadow-md">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Material Details */}
              <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 transform hover:-translate-y-1 hover:shadow-xl transition-all duration-500">
                <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-black border-b pb-2 border-gray-200">
                  Material Details
                </h3>
                <p className="leading-relaxed text-gray-700 text-base lg:text-lg">
                  {specificCourseData?.materialDescription}
                </p>
              </div>

              {/* Summaries */}
              <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 transform hover:-translate-y-1 hover:shadow-xl transition-all duration-500">
                <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-black border-b pb-2 border-gray-200">
                  Summaries
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 text-base lg:text-lg">
                  {specificCourseData?.materialSummeries.map((item, index) => (
                    <li
                      key={index}
                      className="hover:text-blue-500 transition-colors duration-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </section>

        {/* Premium Books Section - Only Book Number & Description */}
        <section className="bg-[#f8f8f8] py-16">
          <section className="max-w-[1320px] mx-auto px-4">
            <h2 className="lg:text-4xl text-3xl font-extrabold capitalize text-black mb-8">
              {specificCourseData?.materialTitle} Study Materials
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {specificCourseData?.materialBooksDescription?.map(
                (book, index) => (
                  <div
                    key={index}
                    className="relative bg-white rounded-2xl shadow-2xl p-6 flex flex-col justify-between transform hover:scale-[1.01] hover:shadow-3xl transition-all duration-300 border-r-4 border-b-4 "
                  >
                    {/* Book Number */}
                    <div className="text-blue-600 font-bold text-xl mb-4">
                      Book {index + 1}
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 text-sm lg:text-base leading-relaxed">
                      {book}
                    </p>
                  </div>
                ),
              )}
            </div>
          </section>
        </section>

        {/* Why Choose Us */}
        <div className="w-full lg:my-[60px] my-[30px] bg-black text-white">
          <section className="max-w-[1320px] mx-auto px-4 py-16">
            <h2 className="text-[42px] font-bold mb-8 text-center tracking-wide">
              Why Choose Our Material?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                { icon: "📘", title: "Created by NIFT Experts" },
                { icon: "📝", title: "Exam-Oriented Approach" },
                { icon: "🔄", title: "Updated Every Year" },
                { icon: "📄", title: "Printable PDF Format" },
                { icon: "🎯", title: "Includes Practice Sets" },
                { icon: "💰", title: "Money-back Guarantee" },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="bg-white text-black p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-300 flex flex-col items-center justify-center text-center"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <p className="text-lg font-semibold">{feature.title}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="bg-[#f8f8f8] lg:my-[60px] my-[30px] py-14 px-4">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-center text-black">
            What Our Students Say
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1320px] mx-auto">
            {[
              {
                name: "Aditi Sharma",
                feedback:
                  "Helped me clear NIFT in my first attempt. Study material was very focused.",
              },
              {
                name: "Rohit Yadav",
                feedback:
                  "Very organized and updated. The mock papers made a huge difference.",
              },
              {
                name: "Sneha Patil",
                feedback:
                  "Best investment I made. Loved the portfolio prep guide!",
              },
            ].map((student, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Optional star rating */}
                <div className="flex mb-4">
                  {[...Array(5)].map((_, idx) => (
                    <svg
                      key={idx}
                      className="w-5 h-5 text-yellow-400 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.148c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.286 3.947c.3.921-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 00-1.175 0l-3.36 2.44c-.784.57-1.838-.197-1.539-1.118l1.285-3.947a1 1 0 00-.364-1.118L2.037 9.373c-.783-.57-.38-1.81.588-1.81h4.148a1 1 0 00.95-.69l1.286-3.946z" />
                    </svg>
                  ))}
                </div>

                {/* Feedback */}
                <p className="text-gray-700 font-semibold text-lg mb-6 leading-relaxed">
                  “{student.feedback}”
                </p>

                {/* Student Name */}
                <p className="font-bold text-black text-right text-2xl">
                  ~ {student.name}
                </p>
              </div>
            ))}
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
                {specificCourseData?.materialFaqs?.map((item, index) => {
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
                        <span className="pr-6 ">{item.question}</span>
                        <span className="text-xl">
                          {isOpen ? <FaMinusCircle /> : <FaPlusCircle />}
                        </span>
                      </button>

                      {/* Answer */}
                      <div
                        className={`grid transition-all duration-300 ease-out ${
                          isOpen
                            ? "grid-rows-[1fr] opacity-100 pb-5"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden text-gray-300 text-sm lg:text-base leading-relaxed">
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 10. Final CTA */}
        <section className="bg-black text-white text-center py-16 px-6 lg:my-24">
          <h2 className="lg:text-4xl text-3xl font-extrabold mb-6">
            Ready to Purchase This Material?
          </h2>
          <p className="text-gray-300 text-xl lg:text-xl mb-10 max-w-3xl mx-auto">
            Get instant access to expert-backed study materials designed to help
            you succeed and stay ahead in your preparation.
          </p>

          <div className="inline-flex flex-col md:flex-row justify-center gap-6">
            {/* Buy Now Button */}
            <button className="bg-white text-black text-xl lg:text-xl px-10 py-4 rounded-full font-semibold shadow-xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300">
              Buy Now for ₹{specificCourseData?.materialPrice}/-
            </button>

            {/* Add to Cart Button */}
            <button className="bg-transparent border-2 border-white text-white text-xl lg:text-xl px-10 py-4 rounded-full font-semibold shadow hover:bg-white hover:text-black transform hover:-translate-y-1 hover:scale-105 transition-all duration-300">
              Add to Cart
            </button>
          </div>

          <p className="mt-6 text-gray-400 text-sm">
            100% secure purchase. Instant PDF access after payment.
          </p>
        </section>
      </div>

      {/* :
            <div><CourseNotFound /></div>

            } */}
    </>
  );
}
