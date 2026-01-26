"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaLongArrowAltDown,
  FaMinusCircle,
  FaPlusCircle,
} from "react-icons/fa";
import EnquiryForm from "../common/EnquiryNow";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { IoIosCloudDownload } from "react-icons/io";
import axios from "axios";

export default function FreeResClient() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const params = useParams();

  const [activeTab, setActiveTab] = useState("all");
  const [currentFaqId, setCurrentFaqId] = useState(null);
  const [enquiryModel, setEnquiryModel] = useState(false);
  const [freeResData, setFreeResData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [freeResCategories, setFreeResCategories] = useState([]);
  const [specificCategoryData, setSpecificCategoryData] = useState([]);

  const [metatitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  const [faqs, setFaqs] = useState([]);

  const slug = params?.slug
    ? decodeURIComponent(params.slug) // 1. Decode %2B to +
        .replace(/\+/g, " ") // 2. Replace + with space
        .replace(/[^a-zA-Z ]/g, " ") // 3. Remove numbers/symbols
        .replace(/\s+/g, " ") // 4. Normalize spacing
        .trim()
    : "";

  const getFreeResCategories = async () => {
    try {
      const response = await axios.get(
        `${apiBaseUrl}/free-resources/view-categories`,
      );
      // console.log(response)
      if (response.data.status == 1)
        return setFreeResCategories(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(freeResCategoryData)

  const getFreeRes = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${apiBaseUrl}/free-resources/view-res`);
      // console.log(response)

      if (response.data.status == 1) {
        setFreeResData(response.data.result);
      } else {
        setError("No free resources found");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load free resources");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFreeRes();
  }, []);

  useEffect(() => {
    getFreeResCategories();
  }, []);

  const handleCategoryClick = (item) => {
    setActiveTab(item.resCategoryName.toLowerCase());
    axios
      .post(`${apiBaseUrl}/free-resources/category/${item._id}`)
      .then((res) => res.data)
      .then((finalRes) => {
        // console.log(finalRes.result)
        if (finalRes.status == 1) setSpecificCategoryData(finalRes.result);
      });
  };

  const fetchFreeResPageContent = async () => {
    try {
      const res = await axios.get(
        `${apiBaseUrl}/free-resources/page-content-view`,
      );
      if (res.data.status) {
        setMetaTitle(res.data.result[0].metaTitle);
        setMetaDescription(res.data.result[0].metaDescription);
        setFaqs(res.data.result[0].resFaqs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log("all data", metatitle);

  useEffect(() => {
    fetchFreeResPageContent();
  }, []);

  return (
    <div className="bg-white text-black">
      {enquiryModel && (
        <div className="w-[100%] h-[100vh] fixed top-0 left-0 bg-[rgba(0,0,0,0.8)] z-[100]"></div>
      )}
      <EnquiryForm
        enquiryModel={enquiryModel}
        setEnquiryModel={setEnquiryModel}
      />

      {/* 1. Hero Section */}
      <section
        className="w-full min-h-[50vh] flex lg:px-6 px-3 bg-cover bg-top relative"
        style={{
          backgroundImage:
            "url('https://thumbs.dreamstime.com/b/focused-study-background-featuring-elements-like-books-pens-learning-materials-focused-study-background-featuring-elements-374106409.jpg')",
        }}
      >
        {/* 🔹 Gradient Overlay (z-10) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10"></div>

        {/* 🔹 Text Content (z-20) */}
        <div className="w-[1320px] mx-auto">
          <div className="text-white  py-12 relative z-20">
            <h2 className="text-[50px] font-bold capitalize">
              {slug} free resources
            </h2>
            <p className="text-[25px] mt-3 capitalize">
              Best Preparation materials with high quality documents
            </p>
            <button
              // onClick={scrollMoment}
              className="bg-white font-[500] hover:bg-transparent hover:border-white border-transparent border-2 duration-300  hover:text-white text-gray-900  rounded-full py-[10px] px-10 mt-5 text-[18px] cursor-pointer grid grid-cols-[95%_auto] items-center group"
            >
              {" "}
              View Materials Below
              <FaLongArrowAltDown className="opacity-0 -translate-y-4  group-hover:opacity-100 group-hover:translate-y-0 transition-all ease-in-out duration-300" />{" "}
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1320px] mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-black mb-8 border-l-4 border-black pl-4">
            Freely Available for All Students
          </h2>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-3 mb-12">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300
          ${
            activeTab === "all"
              ? "bg-black text-white shadow-lg scale-105"
              : "bg-white text-black border hover:bg-black hover:text-white"
          }`}
            >
              All
            </button>

            {freeResCategories.map((item, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(item)}
                className={`px-6 py-2 rounded-full capitalize font-semibold transition-all duration-300
            ${
              activeTab === item.resCategoryName
                ? "bg-black text-white shadow-lg scale-105"
                : "bg-white text-black border hover:bg-black hover:text-white"
            }`}
              >
                {item.resCategoryName}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {(activeTab === "all" ? freeResData : specificCategoryData).map(
              (item, index) => (
                <div
                  key={index}
                  className="transform hover:-translate-y-2 transition duration-300"
                >
                  <Card item={item} />
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="bg-black text-white text-center py-12 px-4 lg:my-[40px] my-[30px]">
        <h2 className="text-[40px] font-bold mb-5 capitalize">
          Are you ready to prepare for your favourite course ?{" "}
        </h2>
        <p className="text-gray-300 text-2xl mb-6">
          Get started today with expert-backed materials designed to help you
          succeed.
        </p>
        <div className="relative inline-block">
          {/* Glow Effect Behind the Button */}
          <div className="absolute inset-0 z-0 rounded-full bg-white blur-md opacity-50 animate-glow"></div>

          {/* Actual Button */}
          <button
            onClick={() => setEnquiryModel(true)}
            className="relative inline-flex items-center gap-3 bg-white text-black px-10 py-4 rounded-full text-xl font-semibold
                 hover:bg-black hover:text-white border-2 border-white transition-all duration-300"
          >
            Enquiry Now
            <span className="text-2xl">→</span>
          </button>
        </div>
      </section>

      <section>
        <div className="w-full lg:p-3 bg-[#f8f8f8]  text-white rounded-[10px]">
          <div className="max-w-[1320px] mx-auto py-[30px] rounded-[10px]  text-white">
            <div className="bg-black p-6 rounded-[10px]">
              <h4 className="font-bold mb-5 text-[40px] text-white">
                Frequently Asked Questions
              </h4>
              <div>
                {faqs?.map((item, index) => {
                  return (
                    <div key={index}>
                      <h6
                        onClick={() => {
                          setCurrentFaqId(
                            currentFaqId === index ? null : index,
                          );
                        }}
                        className={`w-full lg:text-[20px] text-[16px] hover:text-white text-gray-100 py-[18px] duration-200 cursor-pointer border-b border-gray-800 grid gap-1 grid-cols-[95%_auto] items-center`}
                      >
                        {item.question}
                        {index === currentFaqId ? (
                          <FaMinusCircle />
                        ) : (
                          <FaPlusCircle />
                        )}
                      </h6>
                      <div
                        className={`transition-all overflow-hidden ${
                          currentFaqId === index
                            ? "h-auto opacity-100 scale-100"
                            : "h-0 opacity-0 scale-95"
                        } text-white text-[18px] my-[10px] w-full`}
                      >
                        {item.answer}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Card({ item }) {
  // console.log(item)
  return (
    <div className="w-full max-w-md group cursor-pointer rounded-2xl border border-white/10 bg-black overflow-hidden shadow-lg">
      {/* Header / Banner */}
      <div className="bg-gradient-to-r from-gray-100 to-white h-[200px] flex flex-col justify-center px-6">
        <h2 className="text-3xl font-bold text-black mb-2">{item.resTitle}</h2>
        <p className="text-gray-700 text-sm max-w-[90%]">
          {item.resDescription}.
        </p>
      </div>

      {/* Footer / Actions */}
      <div className="flex bg-black group-hover:border-gray-300  group-hover:bg-gray-100 duration-300  items-center justify-between px-6 py-4">
        <div className="text-gray-300 group-hover:text-black capitalize text-sm">
          get Summries <br />
        </div>

        <a download href={item.resFile}>
          <button
            className="bg-white text-black px-4 flex items-center gap-1 py-1 rounded-full font-semibold 
                        duration-300 group-hover:bg-black group-hover:text-white hover:bg-white hover:text-black border hover:border-black  transition cursor-pointer"
          >
            Download{" "}
            <span>
              {" "}
              <IoIosCloudDownload />
            </span>
          </button>
        </a>
      </div>
    </div>
  );
}

function SpecificCategoryCard({ item }) {
  return (
    <div className="w-full max-w-md group cursor-pointer rounded-2xl border border-white/10 bg-black overflow-hidden shadow-lg">
      {/* Header / Banner */}
      <div className="bg-gradient-to-r from-gray-100 to-white h-[200px] flex flex-col justify-center px-6">
        <h2 className="text-3xl font-bold text-black mb-2">{item.resTitle}</h2>
        <p className="text-gray-700 text-sm max-w-[90%]">
          {item.resDescription}.
        </p>
      </div>

      {/* Footer / Actions */}
      <div className="flex bg-black group-hover:border-gray-300  group-hover:bg-gray-100 duration-300  items-center justify-between px-6 py-4">
        <div className="text-gray-300 group-hover:text-black capitalize text-sm">
          get Summries <br />
        </div>

        <a download href={item.resFile}>
          <button
            className="bg-white text-black px-4 flex items-center gap-1 py-1 rounded-full font-semibold 
                        duration-300 group-hover:bg-black group-hover:text-white hover:bg-white hover:text-black border hover:border-black  transition cursor-pointer"
          >
            Download{" "}
            <span>
              {" "}
              <IoIosCloudDownload />
            </span>
          </button>
        </a>
      </div>
    </div>
  );
}
