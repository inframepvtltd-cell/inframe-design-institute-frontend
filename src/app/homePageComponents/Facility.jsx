'use client';
import { FaChalkboardTeacher, FaBookOpen, FaTrophy } from 'react-icons/fa';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dynamic from 'next/dynamic';
const Slider = dynamic(() => import("react-slick"), {
    ssr: false,
});


export default function Facility() {
    const highlights = [
        {
            id: '1',
            heading: 'Best Faculty',
            description:
                "Learn from seasoned professionals from top design institutes. Our passionate instructors ensure you're ready for every challenge.",
            icon: <FaChalkboardTeacher />,
            src: '/bestFaculty.jpg'
        },
        {
            id: '2',
            heading: 'Best Guidance',
            description:
                'Access exclusive study resources curated by experts. Stay ahead with content tailored for NIFT, NID, NATA, and UCEED.',
            icon: <FaBookOpen />,
            src: '/bestGuidence-min.jpg'
        },
        {
            id: '3',
            heading: 'Best Results',
            description:
                'Join a legacy of 100% success stories. Our students make it to the top design schools — and so can you.',
            icon: <FaTrophy />,
            src: '/bestResult-min.JPG'
        },
    ];




    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        pauseOnHover: false,
        autoplaySpeed: 2000,
    };




    return (
        <div className="w-full lg:my-[60px] my-[30px] bg-[#f8f8f8] ">

            <div className="max-w-[1320px] lg:px-6 px-3 lg:pb-[60px] pb-[30px] mx-auto text-start">
                <h3 className="lg:text-[40px] text-[25px] text-start font-bold  text-black py-5 ">Why Student Choose Us</h3>
                <p className="text-gray-800 mb-10 max-w-[1320px] mx-auto text-lg">
                    We're not just another coaching institute — we're your launchpad to success.
                </p>

                {/* Grid for large screens */}
                <div className="hidden lg:grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1  w-full  mx-auto gap-12 ">
                    {highlights.map((item, index) => (
                        <div
                            style={{ backgroundImage: `url(${item.src})` }}
                            key={index}

                            className={`w-[100%] h-[500px] bg-white relative bg-no-repeat  bg-cover bg-center bg-opacity-90 rounded-3xl shadow-lg border border-red-100 p-8 text-center transition-all flex items-end`}
                        >
                            <div className='absolute w-[100%] h-[100%] top-0 left-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent rounded-3xl' ></div>
                            <div className='z-40 text-start max-w-lg'>

                                {/* Title */}
                                <h3 className="text-[30px] font-bold text-white capitalize tracking-wide mb-3">
                                    {item.heading}
                                </h3>

                                {/* Description */}
                                <p className="text-white text-[15px] leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>


                <div className='lg:hidden block '>
                    <Slider {...sliderSettings}>
                        {highlights.map((item, index) => (
                            <div>

                                <div
                                    style={{ backgroundImage: `url(${item.src})` }}
                                    key={index}
                                    className={`w-[100%] h-[500px] relative z-0 bg-no-repeat bg-cover bg-center bg-opacity-90 rounded-3xl shadow-lg border border-red-100 p-8 text-center flex items-end`}
                                >
                                    {/* Gradient Overlay */}
                                    <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-3xl z-10'></div>

                                    {/* Text Content */}
                                    <div className='relative z-20 text-start max-w-lg'>
                                        <h3 className="text-[30px] font-bold text-white capitalize tracking-wide mb-3">
                                            {item.heading}
                                        </h3>
                                        <p className="text-white text-[15px] leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>


        </div>
    );
}
