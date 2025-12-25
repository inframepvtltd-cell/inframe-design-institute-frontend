'use client';
import { FaStar } from "react-icons/fa";
import Slider from "react-slick";
import { FaPlay } from "react-icons/fa";


export default function Testimonials() {

    // State to track whether video is playing or not for each testimonial
    const [activeVideoIndex, setActiveVideoIndex] = useState(null);


    const settings = {
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 3,
        centerMode: true,
        centerPadding: '10%',
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 300,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    };

    let data = [
        {
            name: 'Arpit Choudhary',
            description: "I've completed my NATA course from Inframe. It really helped me understand architectural design better.",
            src: '/testimonial0.mp4',
            thumbnail: '/testimonial0tb.png',
        },
        {
            name: 'Mahi Khatri',
            description: "I did my NIFT foundation course at Inframe. Their guidance gave me confidence to crack the entrance.",
            src: '/testimonial1.mp4',
            thumbnail: '/testimonial1tb.png',
        },
        {
            name: 'Diwanakr',
            description: "I've prepared for NATA with Inframe. The mentors' support made all the difference in my success.",
            src: '/testimonial2.mp4',
            thumbnail: '/testimonial2tb.png',
        },
        {
            name: 'Arpit Choudhary',
            description: "I've completed my NATA course from Inframe. It really helped me understand architectural design better.",
            src: '/testimonial0.mp4',
            thumbnail: '/testimonial0tb.png',
        },
        {
            name: 'Mahi Khatri',
            description: "I took NATA coaching at Inframe. Their techniques boosted my drawing skills significantly.",
            src: '/testimonial1.mp4',
            thumbnail: '/testimonial1tb.png',
        },
        {
            name: 'Diwanakr',
            description: "I've done my NIFT course from Inframe. The expert feedback pushed me to improve every day.",
            src: '/testimonial2.mp4',
            thumbnail: '/testimonial2tb.png',
        },
    ];



    // Toggle play/pause on video
    const toggleVideo = (index) => {
        if (activeVideoIndex === index) {
            // If the video is already playing, toggle it back to thumbnail
            setActiveVideoIndex(null);
        } else {
            // Play the clicked video and set it as active
            setActiveVideoIndex(index);
        }
    };

    return (
        <div className="w-full bg-[#f8f8f8] py-10">


            <div className="max-w-[1320px] mx-auto lg:px-6 px-3">
                <h3 className="lg:text-[40px] text-[25px] capitalize text-start font-bold text-black  ">
                    Happy student&#39;s Testimonials
                </h3>
                <div className="mb-[55px]">
                    <p className="text-start mt-[10px] text-[20px] text-gray-800 font-normal">
                        Explore how our platform has revolutionized the way our students learn and grow.
                    </p>
                </div>
                <Slider
                    {...settings}>
                    {data.map((item, index) => (
                        <div key={index} className="px-4 ">
                            <div key={index} className="px-0">
                                <div className="bg-white relative p-0 rounded-[20px] cursor-pointer min-h-[500px] h-full overflow-hidden">

                                    {/* Video or Thumbnail */}
                                    {activeVideoIndex === index ? (

                                        <div className="relative">

                                            <video
                                                className="w-full h-[500px] object-cover"
                                                src={item.src}
                                                muted
                                                playsInline
                                                preload="metadata"
                                                autoPlay
                                                onClick={() => toggleVideo(index)}
                                            />
                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-30"></div>
                                        </div>

                                    ) : (
                                        <div
                                            className="relative w-full h-[500px] bg-cover bg-center"
                                            style={{
                                                backgroundImage: `url(${item.thumbnail})`,
                                            }}
                                            onClick={() => toggleVideo(index)}
                                        >
                                            {/* Play Button */}
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white z-40 text-[50px]">
                                                <FaPlay />
                                            </div>

                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-30"></div>
                                        </div>
                                    )}


                                    {/* Content over image at bottom */}
                                    <div className="absolute bottom-0 left-0 w-full z-40 px-4 py-5 text-white  min-h-[210px] bg-gradient-to-t from-black/70 via-black/10 to-transparent">
                                        <p className="flex items-center gap-2 text-[20px] text-amber-300 mb-2">
                                            <FaStar />
                                            <FaStar />
                                            <FaStar />
                                            <FaStar />
                                            <FaStar />
                                        </p>
                                        <h4 className="text-[25px] font-semibold my-2">{item.name}</h4>
                                        <p className="text-md text-gray-200">{item.description}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}
