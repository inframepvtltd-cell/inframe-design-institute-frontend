"use client";
import { StudyMaterialData } from "@/app/ApiData/StudyMaterialApi";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  FaLongArrowAltDown,
  FaMinusCircle,
  FaPlusCircle,
} from "react-icons/fa";

export default function StudyMaterialPage() {
  //banner.JPG
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [currentFaqId, setCurrentFaqId] = useState(null);

  const params = useParams();

  const slug = params?.slug
    ? decodeURIComponent(params.slug) // 1. Decode %2B to +
      .replace(/\+/g, " ") // 2. Replace + with space
      .replace(/[^a-zA-Z ]/g, " ") // 3. Remove numbers/symbols
      .replace(/\s+/g, " ") // 4. Normalize spacing
      .trim()
    : "";

  const urlSlug = slug.replaceAll(" ", "-").toLowerCase();
  const specificCourseData = StudyMaterialData.filter(
    (item) => item.materialName === urlSlug
  )[0];

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
    <div className="bg-white text-gray-800">
      {/* 1. Hero Section */}
      <section
        className="w-full min-h-[50vh] flex lg:px-6 px-3 bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/study-materials/banner.JPG')",
        }}
      >
        {/* 🔹 Gradient Overlay (z-10) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10"></div>

        {/* 🔹 Text Content (z-20) */}
        <div className="text-white py-12 relative z-20 max-w-xl">
          <h2 className="text-[40px] font-bold capitalize">
            {slug} study materials
          </h2>
          <p className="text-[20px] mt-3">
            {specificCourseData?.materialSummary}
          </p>
          <button
            onClick={scrollMoment}
            className="bg-white font-[500] hover:bg-transparent hover:border-white border-transparent border-2 duration-300  hover:text-white text-gray-900  rounded-full py-[10px] px-10 mt-5 text-[18px] cursor-pointer grid grid-cols-[95%_auto] items-center group"
          >
            {" "}
            View Materials Overview
            <FaLongArrowAltDown className="opacity-0 -translate-y-4  group-hover:opacity-100 group-hover:translate-y-0 transition-all ease-in-out duration-300" />
          </button>
        </div>
      </section>

      <section className="w-[100%] lg:my-[40px] my-[20px]">
        <section className="max-w-[1320px] mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Side: Images (70%) */}
            <div className="w-full md:w-[70%] grid grid-cols-2 md:grid-cols-3 gap-4">
              {specificCourseData?.materialImages.map((src, index) => {
                return (
                  <img
                    key={index}
                    src={src}
                    alt="Product 1"
                    className="rounded-lg border-[1px] border-gray-200 shadow-lg object-contain object-center w-full h-auto"
                  />
                );
              })}
            </div>

            {/* Right Side: Purchase Section (30%) */}
            <div className="w-full md:w-[30%] bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-gray-900">
                  Purchase for More
                </h2>
                <p className="text-gray-900 text-md mb-3">
                  Unlock exclusive deals on our premium products. Limited time
                  offer!
                </p>
                <ul className="list-disc list-inside text-gray-900 mb-4 text-md space-y-1">
                  <li>High-quality materials</li>
                  <li>1-year warranty included</li>
                  <li>Free shipping worldwide</li>
                </ul>
                <p className="text-3xl font-bold py-3 text-gray-800">
                  Only ₹{specificCourseData?.materialPrice} /-
                </p>
              </div>
              <button className="mt-auto bg-gray-950 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded transition duration-300">
                Buy Now
              </button>
            </div>
          </div>
        </section>
      </section>

      {/* Why Choose Us */}
      <div className="w-[100%] lg:my-[60px] my-[30px] bg-gray-950 text-white">
        <section className="max-w-[1320px] mx-auto px-4 py-14">
          <h2 className="text-[40px] font-bold mb-8 ">
            Why Choose Our Material?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-gray-900">
            {[
              "Created by NIFT Experts",
              "Exam-Oriented Approach",
              "Updated Every Year",
              "Printable PDF Format",
              "Includes Practice Sets",
              "Money-back Guarantee",
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white  p-4 text-[18px] border rounded-[10px] shadow-sm"
              >
                {feature}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 7. Add to Cart / Buy Now */}
      <section id="recording-section">
        <section className="max-w-[1320px] mx-auto px-4">
          <h2 className="text-[40px] font-bold text-gray-900 py-3 capitalize">
            material overview
          </h2>
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="bg-white shadow-xl rounded p-5">
              <img
                className="w-full h-[200px] object-cover object-top rounded"
                src="https://www.inframedesigninstitute.com/assets/upload/images/nid%20nift%20ceed%20pg%202026.jpg"
                alt="NIFT Pack"
              />
              <div className="mt-4">
                <p className="text-2xl font-semibold mb-1">NIFT B.FTech Pack</p>
                <span className="text-[25px] text-gray-900 font-semibold block mb-3">
                  ₹{specificCourseData?.materialPrice} /-
                </span>
                <div className="grid grid-cols-2 gap-4">
                  <button className="bg-gray-200 text-gray-900 hover:bg-gray-300 py-2 rounded">
                    Add to Cart
                  </button>
                  <button className="bg-gray-950 text-white hover:bg-gray-800 py-2 rounded">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-md rounded p-5">
              <h3 className="text-[30px] font-semibold mb-4">
                Material Details
              </h3>
              <p className="leading-[33px] text-[18px]">
                {specificCourseData?.materialDetails}
              </p>
            </div>
            <div className="bg-white shadow-md rounded p-5">
              <h3 className="text-[30px] font-semibold mb-4">Summaries</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm">
                {specificCourseData?.materialSummaries.map((item, indx) => {
                  return (
                    <li key={indx} className="text-[18px]">
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
      </section>

      {/* 8. Testimonials */}
      {/* <section className="bg-[#f8f8f8] lg:my-[60px] my-[30px] py-14 px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">
          What Our Students Say
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1320px] mx-auto">
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
              className="bg-white p-5 border rounded shadow-sm text-sm"
            >
              <p className="italic text-gray-700 mb-2">“{student.feedback}”</p>
              <p className="font-semibold text-gray-900">— {student.name}</p>
            </div>
          ))}
        </div>
      </section> */}

      <div className="w-full lg:p-3 lg:my-[60px] my-[30px] bg-[#f8f8f8]  text-white rounded-[10px]">
        <div className="max-w-7xl mx-auto  py-[30px] p-5 rounded-[10px]  text-white">
          <div className="">
            <h4 className="font-bold mb-5 text-[40px] text-gray-900">
              Frequently Asked Questions
            </h4>

            {specificCourseData?.materialFaqs.map((item, index) => {
              return (
                <div key={index}>
                  <h6
                    onClick={() => {
                      if (currentFaqId === index) {
                        setCurrentFaqId(null);
                      } else {
                        setCurrentFaqId(index);
                      }
                    }}
                    className={`${index === currentFaqId ? "" : ""
                      } w-[100%] lg:text-[20px] text-[16px] hover:text-gray-900 text-gray-600 py-[18px]  duration-200 cursor-pointer border-b-[1px] border-[#b1b1b1] mt-[0px] grid gap-1 grid-cols-[95%_auto] items-center `}
                  >
                    {item.question}
                    {index === currentFaqId ? (
                      <FaMinusCircle />
                    ) : (
                      <FaPlusCircle />
                    )}
                  </h6>
                  <div
                    className={`${currentFaqId === index
                      ? "h-auto opacity-[1]"
                      : "h-0 scale-0 opacity-0"
                      } text-gray-900 rounded-b-lg my-[10px]  text-[18px] left-0  w-[100%]  `}
                  >
                    {item.answer}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 10. Final CTA */}
      <section className="bg-gray-950 text-white text-center py-12 px-4 lg:my-[80px] my-[30px]">
        <h2 className="text-[40px] font-bold mb-5">
          Ready to Ace the NIFT Exam?
        </h2>
        <p className="text-gray-300 text-2xl mb-6">
          Get started today with expert-backed materials designed to help you
          succeed.
        </p>
        <button className="bg-white text-xl cursor-pointer text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-gray-950 hover:text-white border-2 hover:border-white border-transparent duration-300 transition">
          Buy Now for ₹{specificCourseData?.materialPrice}
        </button>
      </section>
    </div>
  );
}
