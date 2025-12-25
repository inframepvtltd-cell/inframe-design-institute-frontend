"use client";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function Checkout() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL

  const token = useSelector((store) => store.loginStore.token)
  const userData = useSelector((store) => store.loginStore.user)

  const cartData = useSelector((store) => store.cartStore.cartAllData)

  const totalAmountInCart = cartData.reduce((prev, curr) => {
    return prev + Number(curr.courseDetails?.coursePrice);
  }, 0);

  const [staticPath, setStaticPath] = useState('')
  const [onlineCourseData, setOnlineCourseData] = useState([])

  const [offlineCourseData, setofflineCourseData] = useState([])




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


  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 1500,
    slidesToShow: 3,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1200, // Large screens (e.g., 1024–1200px)
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992, // Medium screens (tablets/landscape)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Small tablets and mobile landscape
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Mobile portrait
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const RemoveFromCart = (courseId) => {

    Swal.fire({
      title: 'Are You Sure',
      text: 'are you really want to remove this from cart',
      icon: 'warning',
      iconColor: 'black',
      background: 'white',
      color: 'black',
      showConfirmButton: true,
      confirmButtonColor: 'black',
      showCancelButton: true,
      cancelButtonColor: 'gray',
      confirmButtonText: 'Yes'
    }).then((res) => {
      if (res.isConfirmed) {
        axios.post(`${apiBaseUrl}/cart/remove-from-cart`, { courseId }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then((res) => res.data)
          .then((finalRes) => {
            if (finalRes.status == 1) {
              Swal.fire({
                title: 'Item Removed Successfully !',
                icon: 'success',
                iconColor: 'black',
                color: 'black',
                confirmButtonColor: 'black'
              }).then((res) => {
                window.location.reload();
              })
            }
            else {
              Swal.fire({
                title: 'Something went wrong',
                text: 'Try again later',
                icon: 'error',
                iconColor: 'black',
                color: 'black',
                confirmButtonColor: 'black'

              })
            }
          })
      }
    })


  }


  return (
    <>
      {/* cart section for pc */}
      <section className="lg:block hidden w-full h-[85vh] overflow-hidden lg:p-0 p-3">
        <div className="max-w-[1320px] lg:mb-[40px] mx-auto text-black">
          <div className="grid lg:grid-cols-[70%_auto] grid-cols-1 gap-3">


            <div className="py-6 h-[85vh] scrollbar overflow-y-scroll">
              <h2 className="lg:text-[40px] px-3 text-[30px] capitalize border-b border-gray-200 pb-1 font-bold mb-5">
                More Related Courses & materials
              </h2>

              <div className="bg-white mb-5">
                <h2 className="p-3 text-[25px] font-semibold capitalize">related Online courses</h2>
                {onlineCourseData.length >= 1

                  ?
                  <Slider {...settings}>
                    {

                      onlineCourseData?.map((item, index) => {

                        return (
                          <div key={index} className="px-3 h-auto">

                            <div className="bg-white h-[600px] border shadow-md border-gray-200 rounded-[10px] overflow-hidden">
                              {/* Image */}
                              <img
                                className="object-cover object-top w-full h-[350px]"
                                src={item?.courseImage}
                                alt={item?.courseName}
                              />


                              {/* Content */}
                              <div className="p-5 flex flex-col justify-between">
                                <div>
                                  <Link
                                    href={`/online-courses/${item?.courseName
                                      .toLowerCase()
                                      .replace(/[^a-zA-Z0-9]/g, "-")}`}
                                  ><h3 className="text-[18px] cursor-pointer hover:underline capitalize font-semibold mb-2">
                                      {item?.courseName.replace(/[^a-zA-Z0-9]/g, " ")}
                                    </h3></Link>
                                  <p className="text-gray-600 mb-4">
                                    {item?.cousreHeadline}
                                  </p>
                                  <p className="font-bold text-xl"> ₹{item.coursePrice}/-</p>
                                </div>

                                {/* Add to Cart Button */}

                                <div className="grid grid-cols-2 gap-3 mt-3">
                                  <button
                                    onClick={() => addToCart({ itemId: item._id, main: 'online course' })}
                                    className="border border-gray-900 text-gray-900 hover:bg-gray-950 hover:text-white  py-2 cursor-pointer  rounded-md font-semibold transition"
                                  >
                                    Add to Cart
                                  </button>
                                  <button

                                    className="bg-gray-950 hover:bg-gray-950 text-white  py-2 cursor-pointer  rounded-md font-semibold transition"
                                  >
                                    Buy Now
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })



                    }
                  </Slider>
                  :
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                    {[...Array(3)].map((_, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 shadow-md rounded-[10px] p-4 animate-pulse bg-white"
                      >
                        {/* Image Skeleton */}
                        <div className="w-full h-[200px] bg-gray-200 rounded mb-4"></div>

                        {/* Title */}
                        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>

                        {/* Subtitle */}
                        <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-5/6 mb-4"></div>

                        {/* Price */}
                        <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>

                        {/* Buttons */}
                        <div className="grid grid-cols-2 gap-3 mt-auto">
                          <div className="h-10 bg-gray-300 rounded"></div>
                          <div className="h-10 bg-gray-300 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                }

              </div>
              <div className="bg-white mb-5">
                <h2 className="p-3 text-[25px] font-semibold capitalize">related offline courses</h2>
                {offlineCourseData.length >= 1

                  ?
                  <Slider {...settings}>
                    {offlineCourseData?.map((item, index) => {
                      return (
                        <div key={index} className="px-3 h-auto">

                          <div className="bg-white h-[600px] border shadow-md border-gray-200 rounded-[10px] overflow-hidden">
                            {/* Image */}
                            <img
                              className="object-cover object-top w-full h-[350px]"
                              src={item?.courseImage}
                              alt={item?.courseName}
                            />

                            {/* Content */}
                            <div className="p-5 flex flex-col justify-between">
                              <div>
                                <Link
                                  href={`/online-courses/${item?.courseName
                                    .toLowerCase()
                                    .replace(/[^a-zA-Z0-9]/g, "-")}`}
                                ><h3 className="text-[18px] cursor-pointer hover:underline capitalize font-semibold mb-2">
                                    {item?.courseName.replace(/[^a-zA-Z0-9]/g, " ")}
                                  </h3></Link>
                                <p className="text-gray-600 mb-4">
                                  {item?.cousreHeadline}
                                </p>
                                <p className="font-bold text-xl"> ₹{item.coursePrice}/-</p>
                              </div>

                              {/* Add to Cart Button */}

                              <div className="grid grid-cols-2 gap-3 mt-3">
                                <button
                                  onClick={() => addToCart({ itemId: item._id, main: 'offline course' })}
                                  className="border border-gray-900 text-gray-900 hover:bg-gray-950 hover:text-white  py-2 cursor-pointer  rounded-md font-semibold transition"
                                >
                                  Add to Cart
                                </button>
                                <button
                                  onClick={() =>
                                    alert("Thank you for purchasing the course!")
                                  }
                                  className="bg-gray-950 hover:bg-gray-950 text-white  py-2 cursor-pointer  rounded-md font-semibold transition"
                                >
                                  Buy Now
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </Slider>

                  :
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                    {[...Array(3)].map((_, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 shadow-md rounded-[10px] p-4 animate-pulse bg-white"
                      >
                        {/* Image Skeleton */}
                        <div className="w-full h-[200px] bg-gray-200 rounded mb-4"></div>

                        {/* Title */}
                        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>

                        {/* Subtitle */}
                        <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-5/6 mb-4"></div>

                        {/* Price */}
                        <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>

                        {/* Buttons */}
                        <div className="grid grid-cols-2 gap-3 mt-auto">
                          <div className="h-10 bg-gray-300 rounded"></div>
                          <div className="h-10 bg-gray-300 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                }

              </div>

              {/* <div className="bg-white mb-5">
                <Slider {...settings}>
                  {StudyMaterialData.map((item, index) => {
                    return (
                      <div key={index} className="px-3">
                        <div className="bg-white h-[650px] border shadow-md border-gray-200 rounded-[10px] overflow-hidden">
                          <img
                            className="object-cover object-top w-full "
                            src={item.materialImages[0]}
                            alt="Uceed Course"
                          />

                          <div className="p-5 flex flex-col justify-between">
                            <div>
                              <h3 className="text-[18px] capitalize font-semibold mb-2">
                                {item.materialName.replace(
                                  /[^a-zA-Z0-9]/g,
                                  " "
                                )}
                              </h3>
                              <p className="text-gray-600 mb-4">
                                Absolutely. We provide focused content for
                                General Aptitude
                              </p>
                              <p className="font-bold text-xl"> ₹1399/-</p>
                            </div>


                            <div className="grid grid-cols-2 gap-3 mt-3">
                              <button
                                onClick={() => useAddToCart('hello')}
                                className="border border-gray-900 text-gray-900 hover:bg-gray-950 hover:text-white  py-2 cursor-pointer  rounded-md font-semibold transition"
                              >
                                Add to Cart
                              </button>
                              <button
                                onClick={() =>
                                  alert("Thank you for purchasing the course!")
                                }
                                className="bg-gray-950 hover:bg-gray-950 text-white  py-2 cursor-pointer  rounded-md font-semibold transition"
                              >
                                Buy Now
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </div> */}
            </div>

            <div className={`lg:block hidden scrollbar  w-full h-[85vh] overflow-y-scroll pb-14 py-6 px-6 bg-white shadow-2xl`}
            >
              <h2 className="text-[35px] border-b border-gray-200 pb-3 font-bold text-center mb-8 capitalize">
                Your Cart
              </h2>

              {/* Cart Items */}


              {cartData.length >= 1

                ?
                cartData.map((item, index) => {
                  const { courseDetails } = item
                  return (
                    <div
                      key={index}
                      className="bg-white  mb-6 shadow-lg  border border-gray-200 rounded-lg gap-6 items-center"
                    >
                      {/* Product Image */}
                      <img
                        className="w-full h-[160px] object-cover object-top rounded-t"
                        src={courseDetails?.courseImage}
                      />



                      {/* Product Content */}
                      <div className="flex flex-col p-4 justify-between h-full">
                        <div>
                          <h2 className="text-md  w-fit px-3 py-[1px] rounded-full border-[1.8px] text-black  capitalize  mb-2"> {item.main}</h2>
                          <h3 className="text-2xl capitalize font-semibold mb-1">
                            {courseDetails?.courseName}
                          </h3>
                          <p className="text-gray-600 text-sm mb-1">
                            {courseDetails?.cousreHeadline}
                          </p>
                        </div>  <p className="text-lg font-bold text-gray-800 mb-1">
                          Quantity: {item.quantity}
                        </p>

                        <p className="text-lg font-bold text-gray-800 mb-1">
                          Price: ₹{courseDetails?.coursePrice}
                        </p>
                        <button onClick={() => RemoveFromCart(item._id)} className=" cursor-pointer py-1.5 text-sm bg-gray-950 text-white rounded hover:bg-transparent hover:text-gray-950 mt-2 border border-transparent hover:border-gray-950 transition duration-300">
                          Remove From Cart
                        </button>
                      </div>
                    </div>
                  )
                })
                :
                <div>
                  <h3 className="text-center font-semibold text-3xl text-gray-400">No Courses Added In Your Cart Yet</h3>
                  <Link href={"/"} ><p className="w-full bg-black text-white text-center py-2 my-5 rounded border-2 cursor-pointer border-transparent hover:border-black hover:bg-white duration-300 hover:text-black ">Explore Courses To Add</p></Link>
                </div>

              }


              {/* total price section */}
              {cartData.length >= 1 &&

                < div className="mt-8 border-t border-gray-200 pt-6 text-center  md:flex-row items-center justify-between">
                  <p className="text-3xl text-black mb-5">
                    Total Price:{" "}
                    <span className="font-bold text-gray-950">₹{totalAmountInCart}</span>
                  </p>
                  <Link href={'/order'}><button className="hover:bg-white w-full hover:text-gray-900 font-bold px-10 py-3 bg-gray-900 text-white border-transparent shadow-lg border-2 hover:border-gray-950 uppercase cursor-pointer transition duration-200 text-base rounded-lg ">
                    Confirm Order
                  </button></Link>
                </div>
              }
            </div>


          </div>
        </div >


        {/* 10. Final CTA */}
        {/* <section className="bg-gray-950 text-white text-center py-12 px-4">
          <h2 className="lg:text-[40px] text-[30px] font-bold mb-5 capitalize">
            Are you ready Start your journey ?{" "}
          </h2>
          <p className="text-gray-300 text-2xl mb-6">
            Learn from the Best, at the Best Price. Start Your Journey Today!.
          </p>
          <div className="relative inline-block">
            <div className="absolute inset-0 z-0 rounded-full bg-white blur-md opacity-50 animate-glow"></div>

            <button className="relative z-10 bg-white text-xl cursor-pointer text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-gray-950 hover:text-white border-2 hover:border-white border-transparent duration-300 transition">
              start at just ₹1299
            </button>
          </div>
        </section>

        <div className="w-full lg:p-3 lg:my-[40px] my-[20px] bg-[#f8f8f8]  text-white rounded-[10px]">
          <div className="max-w-7xl mx-auto py-[30px] rounded-[10px]  text-white">
            <div className="bg-gray-950 p-6 rounded-[10px]">
              <h4 className="font-bold mb-5 text-[40px] text-white">
                Frequently Asked Questions
              </h4>

              {checkoutFAQs.map((item, index) => {
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
                        } w-[100%] lg:text-[20px] text-[16px] hover:text-white text-gray-100 py-[18px]  duration-200 cursor-pointer border-b-[1px] border-gray-800 mt-[0px] grid gap-1 grid-cols-[95%_auto] items-center `}
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
                        } text-white rounded-b-lg my-[10px]  text-[18px] left-0  w-[100%]  `}
                    >
                      {item.answer}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div> */}
      </section >

      {/* cart section for small devices */}

    </>
  );
}
