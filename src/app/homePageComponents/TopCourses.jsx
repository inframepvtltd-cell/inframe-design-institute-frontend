"use client";
import { FaIndianRupeeSign } from "react-icons/fa6";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import Image from "next/image";

export default function TopCourses() {


  let apiBaseUrl = process.env.NEXT_PUBLIC_API_URL

  const token = useSelector((store) => store.loginStore.token)
  const userData = useSelector((store) => store.loginStore.user)

  const addToCart = ({ itemId, main }) => {
    if (!token || token === ' ' || token == undefined) {
      Swal.fire({
        title: 'Please login to Add To Cart',
        text: 'You must be logged in to add to cart.',
        icon: 'warning',
        iconColor: 'black',
        background: 'white',
        color: 'black',
        confirmButtonText: 'OK'
      });
    }
    else {
      const obj = {
        itemId,
        userData,
        main
      }
      axios.post(`${apiBaseUrl}/cart/add-to-cart`, obj, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => res.data)
        .then((finalRes) => {
          if (finalRes.status == 1) {
            Swal.fire({
              title: 'Added In Cart Successfully',
              icon: 'success',
              iconColor: 'black',
              background: "white",
              color: 'black'
            }).then((res) => {
              window.location.reload()
            })
          }
          else {
            Swal.fire({
              title: 'Something went wrong',
              icon: 'warning',
              text: 'Try again later !',
              iconColor: 'black',
              background: "white",
              color: 'black'
            })
          }
        })
    }
  }
  return (
    <div className="w-full ">
      <div className="max-w-[1320px] lg:px-6 mx-auto px-3">
        <h3 className="lg:text-[40px] text-[30px] text-start font-bold  text-black lg:pt-6  bg-white">
          Top Selling Course
        </h3>
        <OnlineCourses addToCart={addToCart} apiBaseUrl={apiBaseUrl} />
        <OfflineCourses addToCart={addToCart} apiBaseUrl={apiBaseUrl} />
        {/* <StudyMaterial /> */}
      </div>
    </div>
  );
}

export function OnlineCourses({ apiBaseUrl, addToCart }) {


  const [staticPath, setStaticPath] = useState('')
  const [onlineCourseData, setOnlineCourseData] = useState([])


  const fetchAllOnlineCourses = () => {
    axios.get(`${apiBaseUrl}/course/view-online`)
      .then((res) => res.data)
      .then((finalRes) => {
        setOnlineCourseData(finalRes.onlineCourseData)
        setStaticPath(finalRes.staticPath)
      })
  }

  useEffect(() => {
    fetchAllOnlineCourses()
  }, [])


  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 1500, // Slide change interval: 2 seconds
    pauseOnHover: true,
    slidesToShow: 4, // Show 4 items at a time
    slidesToScroll: 1, // Slide 1 item at a time
    arrows: true,
    responsive: [
      {
        breakpoint: 1024, // Tablets
        settings: {
          slidesToShow: 2, // Show 2 items at a time on tablets
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600, // Mobile
        settings: {
          slidesToShow: 1, // Show 1 item at a time on small screens
          slidesToScroll: 1,
        },
      },
    ],
  };


  return (
    <div className="my-[0px]">
      <h3 className="text-gray-900  font-normal text-[25px] pt-3 mb-0">
        Best Selling Online Courses
      </h3>

      <div className="my-4">
        <Slider {...sliderSettings}>
          {onlineCourseData?.map((item, index) => (
            <div key={index} className="sm:pr-4">
              <div className="rounded-[10px] h-[600px] shadow-sm group overflow-hidden hover:shadow-md transition duration-300">
                <Image
                  width={100}
                  height={100}
                  className="w-full h-[350px] object-cover object-top rounded-t-[10px] group-hover:scale-[1.01] transition duration-300"
                  src={item?.courseImage}
                  alt={item?.courseName}
                />
                <div className="p-5 h-[auto]">
                  <Link
                    href={`/online-courses/${item?.courseName
                      .toLowerCase()
                      .replace(/[^a-zA-Z0-9]/g, "-")}`}
                  >
                    <h2 className="text-[18px] capitalize duration-300 font-semibold mb-2 text-gray-950 hover:underline cursor-pointer">
                      {item?.courseName}
                    </h2>
                  </Link>

                  <p className="text-gray-600 font-normal">{item?.cousreHeadline}</p>

                  <p className="text-[28px] mt-2 font-semibold flex items-center gap-1 text-gray-950">
                    <FaIndianRupeeSign /> {item?.coursePrice}/-
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <button
                      onClick={() => addToCart({ itemId: item._id, main: 'online course' })}
                      className="bg-gray-200 hover:bg-gray-300 cursor-pointer transition duration-300 py-[7px] text-[14px] w-[100%] rounded-lg  font-medium">
                      Add to Cart
                    </button>
                    <button className="bg-gray-900 hover:bg-gray-800 transition duration-300 cursor-pointer py-[7px] text-[14px] rounded-lg text-white font-medium">
                      Buy Now
                    </button>
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

export function OfflineCourses({ apiBaseUrl, addToCart }) {



  const [staticPath, setStaticPath] = useState('')
  const [offlineCourseData, setofflineCourseData] = useState([])


  const fetchAllOfflineCourses = () => {
    axios.get(`${apiBaseUrl}/course/view-offline`)
      .then((res) => res.data)
      .then((finalRes) => {
        setofflineCourseData(finalRes.offlineCourseData)
        setStaticPath(finalRes.staticPath)
      })
  }

  useEffect(() => {
    fetchAllOfflineCourses()
  }, [])



  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000, // Slide change interval: 2 seconds
    pauseOnHover: true,
    slidesToShow: 4, // Show 4 items at a time
    slidesToScroll: 1, // Slide 1 item at a time
    arrows: true,
    responsive: [
      {
        breakpoint: 1024, // Tablets
        settings: {
          slidesToShow: 2, // Show 2 items at a time on tablets
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600, // Mobile
        settings: {
          slidesToShow: 1, // Show 1 item at a time on small screens
          slidesToScroll: 1,
        },
      },
    ],
  };


  return (
    <div className="my-[0px]">
      <h3 className="text-gray-900  font-normal text-[25px] pt-3 mb-0">
        Best Selling Offline Course
      </h3>

      <div className="my-4">
        <Slider {...sliderSettings}>
          {offlineCourseData?.map((item, index) => (
            <div key={index} className="sm:pr-4">
              <div className="rounded-[10px] h-[600px] shadow-sm group overflow-hidden hover:shadow-md transition duration-300">
                <Image
                width={100}
                height={100}
                  className="w-full h-[350px] object-cover object-top rounded-t-[10px] group-hover:scale-[1.01] transition duration-300"
                  src={item?.courseImage}
                  alt={item?.courseName}
                />
                <div className="p-5 h-[auto]">
                  <Link
                    href={`/offline-courses/${item?.courseName
                      .toLowerCase()
                      .replace(/[^a-zA-Z0-9]/g, "-")}`}
                  >
                    <h2 className="text-[18px] duration-300 font-semibold mb-2 text-gray-950  hover:underline cursor-pointer capitalize">
                      {item?.courseName}
                    </h2></Link>

                  <p className="text-gray-600">{item?.cousreHeadline}</p>
                  <p className="text-[28px] mt-2 font-semibold flex items-center gap-1 text-gray-950">
                    <FaIndianRupeeSign /> {item.coursePrice}/-
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-4">

                    <button
                      onClick={() => addToCart({ itemId: item._id, main: 'offline course' })}
                      className="bg-gray-200 hover:bg-gray-300 cursor-pointer transition duration-300 py-[7px] text-[14px] w-[100%] rounded-lg  font-medium">
                      Add to Cart
                    </button>
                    <button className="bg-gray-900 hover:bg-gray-800 transition duration-300 cursor-pointer py-[7px] text-[14px] rounded-lg text-white font-medium">
                      Buy Now
                    </button>
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

// export function StudyMaterial() {
//   const sliderSettings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     autoplay: true,
//     autoplaySpeed: 1500, // Slide change interval: 2 seconds
//     pauseOnHover: true,
//     slidesToShow: 4, // Show 4 items at a time
//     slidesToScroll: 1, // Slide 1 item at a time
//     arrows: true,
//     responsive: [
//       {
//         breakpoint: 1024, // Tablets
//         settings: {
//           slidesToShow: 2, // Show 2 items at a time on tablets
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 600, // Mobile
//         settings: {
//           slidesToShow: 1, // Show 1 item at a time on small screens
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   let CoursesData = [
//     {
//       title: "Fddi Course",
//       description:
//         "Master the art of interior design by learning how to create cohesive room themes, apply color theory, and develop skills to elevate your design perspective.",
//       image:
//         "https://www.inframedesigninstitute.com/assets/upload/images/fddi%20ug%202026(1).jpg",
//       price: "1399",
//     },
//     {
//       title: "Nid Course",
//       description:
//         "Learn the fundamentals of visual communication, typography, and branding using tools like Adobe Photoshop and Illustrator to create stunning digital designs.",
//       image:
//         "https://www.inframedesigninstitute.com/assets/upload/images/nid%20ug%202026.jpg",
//       price: "1599",
//     },
//     {
//       title: "Nid + Nift + Ceed ",
//       description:
//         "Gain expertise in SEO, social media strategy, content marketing, and analytics to effectively promote brands and drive online engagement more extra features .",
//       image:
//         "https://www.inframedesigninstitute.com/assets/upload/images/nid%20nift%20ceed%20pg%202026.jpg",
//       price: "1199",
//     },
//     {
//       title: "Combo nata + jee-mains",
//       description:
//         "Gain expertise in SEO, social media strategy, content marketing, and analytics to effectively promote brands and drive online engagement more extra features .",
//       image:
//         "https://www.inframedesigninstitute.com/assets/upload/images/NATA%20JEE%20B.ARCH-10.jpg",
//       price: "799",
//     },
//   ];
//   return (
//     <div className="my-[0px]">
//       <h3 className="text-gray-900  font-normal text-[25px] pt-3 mb-0">
//         Best Selling Study Material
//       </h3>

//       {/* Large screens: Grid */}
//       <div className="my-4">
//         <Slider {...sliderSettings}>
//           {CoursesData.map((item, index) => (
//             <div key={index} className="sm:pr-4">
//               <div className="rounded-[10px] shadow-sm group overflow-hidden hover:shadow-md transition duration-300">
//                 <img
//                   className="w-full h-[390px] object-cover object-top rounded-t-[10px] group-hover:scale-[1.01] transition duration-300"
//                   src={item.image}
//                   alt={item.title}
//                 />
//                 <div className="p-5 h-[auto]">
//                   <Link
//                     href={`/study-material/${item.title
//                       .toLowerCase()
//                       .replace(/[^a-zA-Z0-9]/g, "-")}`}
//                   >
//                     <h2 className="text-[18px] duration-300 font-semibold mb-2 hover:text-gray-950 text-gray-500 hover:underline cursor-pointer">
//                       {item.title}
//                     </h2>
//                   </Link>

//                   <p className="text-[28px] mt-2 font-semibold flex items-center gap-1 text-gray-950">
//                     <FaIndianRupeeSign /> {item.price}/-
//                   </p>
//                   <div className="mt-4 grid grid-cols-2 gap-4">
//                       <button className="bg-gray-200 hover:bg-gray-300 cursor-pointer transition duration-300 py-[7px] text-[14px] w-[100%] rounded-lg  font-medium">
//                         Add to Cart
//                       </button>
//                     <button className="bg-gray-900 hover:bg-gray-800 transition duration-300 cursor-pointer py-[7px] text-[14px] rounded-lg text-white font-medium">
//                       Buy Now
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </div>
//   );
// }
