'use client'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaLongArrowAltDown, FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import EnquiryForm from "../common/EnquiryNow";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { IoIosCloudDownload } from "react-icons/io";
import axios from "axios";

export default function FreeResources() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL
    const params = useParams();

    const [activeTab, setActiveTab] = useState('all')
    const [currentFaqId, setCurrentFaqId] = useState(null);
    const [enquiryModel, setEnquiryModel] = useState(false);
    const [freeResData, setFreeResData] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [freeResCategories, setFreeResCategories] = useState([])
    const [specificCategoryData, setSpecificCategoryData] = useState([])

    const faqs = [
        { question: "questions", answer: "answer" },
        { question: "questions", answer: "answer" },
        { question: "questions", answer: "answer" },
        { question: "questions", answer: "answer" },
        { question: "questions", answer: "answer" },
        { question: "questions", answer: "answer" },
        { question: "questions", answer: "answer" },
    ];

    const slug = params?.slug
        ? decodeURIComponent(params.slug) // 1. Decode %2B to +
            .replace(/\+/g, " ") // 2. Replace + with space
            .replace(/[^a-zA-Z ]/g, " ") // 3. Remove numbers/symbols
            .replace(/\s+/g, " ") // 4. Normalize spacing
            .trim()
        : "";

    const getFreeResCategories = async () => {
        try {
            const response = await axios.get(`${apiBaseUrl}/free-resources/view-categories`)
            // console.log(response)
            if (response.data.status == 1) return setFreeResCategories(response.data.result)
        }
        catch (error) {
            console.log(error)
        }
    }

    // console.log(freeResCategoryData)

    const getFreeRes = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(
                `${apiBaseUrl}/free-resources/view-res`
            );
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

    // console.log(freeResData)


    useEffect(() => {
        getFreeRes()
        getFreeResCategories()
    }, [])


    const handleCategoryClick = (item) => {
        setActiveTab(item.resCategoryName.toLowerCase())
        axios.post(`${apiBaseUrl}/free-resources/category/${item._id}`)
            .then((res) => res.data)
            .then((finalRes) => {
                // console.log(finalRes.result)
                if (finalRes.status == 1) setSpecificCategoryData(finalRes.result)
            })
    }

    return (

        <div className="bg-white text-black">
            {enquiryModel && (
                <div className="w-[100%] h-[100vh] fixed top-0 left-0 bg-[rgba(0,0,0,0.8)] z-[100]"></div>
            )}
            <EnquiryForm enquiryModel={enquiryModel}
                setEnquiryModel={setEnquiryModel} />


            {/* 1. Hero Section */}
            <section
                className="w-full min-h-[50vh] flex lg:px-6 px-3 bg-cover bg-top relative"
                style={{
                    backgroundImage: "url('https://thumbs.dreamstime.com/b/focused-study-background-featuring-elements-like-books-pens-learning-materials-focused-study-background-featuring-elements-374106409.jpg')",
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


            <section>
                <div className="max-w-[1320] m-[60_auto]">
                    <h2 className="text-4xl mb-5 text-black font-bold capitalize border-l-6 pl-3">Freely Available for all students</h2>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setActiveTab('all')} className={`rounded-full capitalize border py-2 cursor-pointer bg-black hover:px-10 text-white font-semibold duration-300 px-5`}>all</button>
                        {freeResCategories.map((item, index) => {
                            return (
                                <button key={index} onClick={() => handleCategoryClick(item)} className={`${activeTab == item.resCategoryName ? 'bg-black text-white' : 'bg-white text-black'}  rounded-full capitalize border py-2 cursor-pointer hover:bg-black hover:px-7 hover:text-white font-semibold duration-300 px-5`}>{item.resCategoryName}</button>
                            )
                        })}
                    </div>

                    <div className="grid grid-cols-4 gap-7 my-[30px]">
                        {activeTab === 'all'
                            ?
                            freeResData.map((item, index) => {
                                return (
                                    <Card key={index} item={item} />
                                )
                            })
                            :
                            specificCategoryData.map((item, index) => {
                                return (
                                    <SpecificCategoryCard key={index} item={item} />
                                )
                            })
                        }
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
                    <button onClick={() => setEnquiryModel(true)} className="relative z-10 bg-white text-xl cursor-pointer text-black px-6 py-3 rounded-full font-medium hover:bg-black hover:text-white border-2 hover:border-white border-transparent duration-300 transition">
                        Enquiry Now
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
                                                    setCurrentFaqId(currentFaqId === index ? null : index);
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
                                                className={`transition-all overflow-hidden ${currentFaqId === index
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
    )
}


function Card({ item }) {
    // console.log(item)
    return (
        <div className="w-full max-w-md group cursor-pointer rounded-2xl border border-white/10 bg-black overflow-hidden shadow-lg">

            {/* Header / Banner */}
            <div className="bg-gradient-to-r from-gray-100 to-white h-[200px] flex flex-col justify-center px-6">
                <h2 className="text-3xl font-bold text-black mb-2">
                    {item.resTitle}
                </h2>
                <p className="text-gray-700 text-sm max-w-[90%]">
                    {item.resDescription}.
                </p>
            </div>

            {/* Footer / Actions */}
            <div className="flex bg-black group-hover:border-gray-300  group-hover:bg-gray-100 duration-300  items-center justify-between px-6 py-4">
                <div className="text-gray-300 group-hover:text-black capitalize text-sm">
                    get Summries <br />
                </div>

                <a download href={item.resFile}><button className="bg-white text-black px-4 flex items-center gap-1 py-1 rounded-full font-semibold 
                        duration-300 group-hover:bg-black group-hover:text-white hover:bg-white hover:text-black border hover:border-black  transition cursor-pointer">
                    Download <span> <IoIosCloudDownload /></span>
                </button></a>
            </div>

        </div>
    )
}

function SpecificCategoryCard({ item }) {
    return (
        <div className="w-full max-w-md group cursor-pointer rounded-2xl border border-white/10 bg-black overflow-hidden shadow-lg">

            {/* Header / Banner */}
            <div className="bg-gradient-to-r from-gray-100 to-white h-[200px] flex flex-col justify-center px-6">
                <h2 className="text-3xl font-bold text-black mb-2">
                    {item.resTitle}
                </h2>
                <p className="text-gray-700 text-sm max-w-[90%]">
                    {item.resDescription}.
                </p>
            </div>

            {/* Footer / Actions */}
            <div className="flex bg-black group-hover:border-gray-300  group-hover:bg-gray-100 duration-300  items-center justify-between px-6 py-4">
                <div className="text-gray-300 group-hover:text-black capitalize text-sm">
                    get Summries <br />
                </div>

                <a download href={item.resFile}><button className="bg-white text-black px-4 flex items-center gap-1 py-1 rounded-full font-semibold 
                        duration-300 group-hover:bg-black group-hover:text-white hover:bg-white hover:text-black border hover:border-black  transition cursor-pointer">
                    Download <span> <IoIosCloudDownload /></span>
                </button></a>
            </div>

        </div>
    )
}