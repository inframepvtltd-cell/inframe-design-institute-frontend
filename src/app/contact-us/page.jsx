'use client'
import Link from "next/link";
import Image from 'next/image'
import { FaLocationDot } from "react-icons/fa6";

export default function Contact() {
    const socialApps = [
        {
            link: "https://www.youtube.com/@inframedesigninstitute",
            name: "Youtube",
            src: "/youtube.webp",
        },
        {
            link: "https://www.instagram.com/inframedesigninstitute/?hl=en",
            name: "Instagram",
            src: "/instagram.png",
        },
        {
            link: "https://in.linkedin.com/in/inframedesigninstitute",
            name: "LinkedIn",
            src: "/linkedIn.png",
        },
        {
            link: "https://www.facebook.com/inframedesigninstitute/",
            name: "Facebook",
            src: "/facebook.png",
        },
    ];

    return (
        <>
            <div className="w-full bg-[#f8f8f8] ">
                <div className="max-w-[1320px]  lg:py-[60px] py-[30px] mx-auto lg:px-6 px-3 ">
                    <div className="grid lg:grid-cols-[67%_auto] gap-7">
                        <div className="bg-white p-6 sm:p-8 md:p-7 rounded-xl shadow-xl border border-gray-100">
                            <h3 className="text-[30px] font-semibold text-gray-900 mb-4">
                                Our Campus Location
                            </h3>
                            <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-lg border border-gray-200">
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3577.737609116669!2d72.98366907635425!3d26.27017807703602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x67b93f41c21a1b33%3A0x75c39459005a6414!2sInframe%20School%20of%20Art%2C%20Design%20%26%20Business!5e0!3m2!1sen!2sin!4v1756102660087!5m2!1sen!2sin"
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>

                        <div className="w-[100%] bg-white text-gray-900  shadow-lg rounded-[10px] p-6">
                            <div className="text-center mx-auto">
                                <h3 className="text-[30px] font-bold">
                                    Scan To Access Location
                                </h3>
                                <p className=" text-center mt-1 leading-[30px] text-[18px]">
                                    Scan the QR code below to get directions or click on the button to get live location on Google Maps:
                                </p>
                            </div>
                            <Image
                                width={220}
                                height={200}
                                className="mt-6 h-[220px] object-contain mx-auto"
                                src="/QrCode.avif"
                                alt="QR Code"
                            />
                            <Link target="_blank" href={'https://www.google.com/maps/place/Inframe+School+of+Art,+Design+%26+Business/@26.270178,72.986244,16z/data=!4m14!1m7!3m6!1s0x67b93f41c21a1b33:0x75c39459005a6414!2sInframe+School+of+Art,+Design+%26+Business!8m2!3d26.2701781!4d72.986244!16s%2Fg%2F11y3lw9g7c!3m5!1s0x67b93f41c21a1b33:0x75c39459005a6414!8m2!3d26.2701781!4d72.986244!16s%2Fg%2F11y3lw9g7c?hl=en&entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D'}><button className="w-full bg-gray-900 text-white font-semibold text-[18px] py-[10px] rounded-[7px] border-2 hover:border-gray-900 border-transparent hover:bg-white flex items-center justify-center gap-2 hover:text-gray-900 duration-300 mt-7 cursor-pointer"> <FaLocationDot /> Live</button></Link>
                        </div>
                    </div>
                </div>

            </div>
            <div className="w-full bg-[#f8f8f8] bg-gradient-to-b from-black/5 via-white to-white">
                <div className="max-w-[1320px] mx-auto lg:px-6 px-3 py-[30px]">
                    <h3 className="text-[40px] text-center font-bold capitalize mb-10 text-gray-900">Get in touch</h3>

                    <div className="lg:grid grid-cols-3 gap-10 ">
                        <div
                            className="w-full rounded-[8] text-gray-900 shadow-2xl lg:p-7 p-3 mb-[30px] bg-white"
                        >
                            <h3 className="text-[30px] mb-2  font-semibold">Visit Us</h3>
                            <p className="mb-0 text-[22px]">We are located at :</p>
                            <p className="bg-white  duration-500 text-[18px]  text-gray-900 p-3 leading-[35px] rounded">
                                Address: 09, Pal Link Rd, Marudhar Nagar, Kamla Nehru Nagar, Shyam
                                Nagar, Jodhpur, Rajasthan 342008
                            </p>
                            <ul className="mt-2">
                                <li className="text-[18px] flex items-center gap-2 mb-2 tracking-wide font-normal">
                                    Admissions : <span>+91 9649 9649 37</span>
                                </li>
                                <li className="text-[18px] flex items-center gap-2 mb-2 tracking-wide font-normal">
                                    Admin : <span>+91 9649 9649 70</span>
                                </li>
                                <li className="text-[18px] flex items-center gap-2 mb-2 tracking-wide font-normal">
                                    Email : <span>info@inframeschool.com</span>
                                </li>
                                <li className="text-[18px] flex items-center gap-2 mb-2 tracking-wide font-normal">
                                    Careers : <span>hr@inframeschool.com</span>
                                </li>
                            </ul>
                        </div>

                        <div
                            className="w-full rounded-lg bg-white text-gray-900 p-7 mb-[30px] shadow-2xl "
                        >
                            <h3 className="text-[30px] md:text-[30px] font-semibold leading-[45px] ">
                                Social Media
                            </h3>
                            {/* //Stay updated with the latest news, product updates, and community stories. Follow us across platforms and become part of our growing digital family. We share valuable tips, live sessions, behind-the-scenes, and much more! */}
                            <ul className="">
                                {socialApps.map((item, index) => {
                                    return (
                                        <Link key={index} target="_" href={item.link}><li className="flex items-center gap-3 text-lg md:text-xl font-medium capitalize my-4 cursor-pointer hover:underline transition duration-200">
                                            <Image
                                                width={28}
                                                height={28}
                                                src={item.src}
                                                alt="YouTube logo"
                                                className="object-contain"
                                            />
                                            {item.name}
                                        </li></Link>
                                    )
                                })}
                            </ul>
                            <p className="mt-6 leading-[30px]">
                                Stay updated with the latest news, product updates, and community
                                stories. Follow us across platforms and become part of our growing
                                digital family.
                            </p>
                        </div>

                        <form

                            className="w-[100%] bg-white text-gray-900 shadow-2xl mb-[30px] p-7 rounded-[10px]"
                        >
                            <h3 className="text-[30px] mb-2  font-semibold">Contact Us</h3>
                            <div className="mb-[10px]">
                                <p>Name*</p>
                                <input
                                    placeholder="@John Doe"
                                    className="w-full py-[10px] ps-2 border-gray-300  focus:outline-none focus:ring-1 focus:ring-white border-[1px] rounded-[5]"
                                />
                            </div>
                            <div className="mb-[10px]">
                                <p>Email*</p>
                                <input
                                    placeholder="you@example.com"
                                    className="w-full py-[10px] ps-2 border-gray-300  focus:outline-none focus:ring-1 focus:ring-white border-[1px] rounded-[5]"
                                />
                            </div>
                            <div className="mb-[10px]">
                                <p>Message*</p>
                                <textarea
                                    placeholder="Write your message here..."
                                    className="w-full ps-2 focus:outline-none border-gray-300 focus:ring-1 focus:ring-white min-h-[100] py-[10px] border-[1px] rounded-[5]"
                                />
                            </div>
                            <button className="w-full py-[10px] font-semibold focus:outline-none focus:ring-1 focus:ring-white bg-gray-900 border-2 border-transparent hover:border-gray-900 hover:bg-white mt-2 rounded-[5px] text-white  capitalize cursor-pointer text-[17px]  hover:text-black duration-300 ">
                                Send Message
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </>

    );
}
