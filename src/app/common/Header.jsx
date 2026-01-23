"use client";
import React, { use, useEffect, useState } from "react";
import {
  CiCircleChevDown,
  CiLogout,
  CiShoppingCart,
  CiUser,
} from "react-icons/ci";
import { LuShoppingCart } from "react-icons/lu";

import {
  FaAngleDown,
  FaClosedCaptioning,
  FaPhoneAlt,
  FaUserAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";
import { MdClose } from "react-icons/md";
import UserControl from "./UserControl";
import MegaMenu from "../homePageComponents/MegaMenu";
import Link from "next/link";
import { IoMdArrowForward, IoMdClose } from "react-icons/io";
import EnquiryForm from "./EnquiryNow";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { logoutUser } from "../redux/slices/userSlice";
import axios from "axios";
import { cartDataFunc } from "../redux/slices/cartSlice";
import { redirect, useParams, usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { freeResApi, studeyMaterials } from "../demoapis/api";


export default function Header() {



  const dispatch = useDispatch();

  const path = usePathname().split("/")[1]


  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL
  const [cartOpen, setCartOpen] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [enquiryModel, setEnquiryModel] = useState(false);
  const [subCategoryMenu, setSubCategoryMenu] = useState("");
  const [contactModel, setcontactModel] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activePage, setActivePage] = useState("");
  const [MegaMenuOpen, setMegaMenuOpen] = useState(false);
  const [onlineCourseCategories, setOnlineCourseCategories] = useState([])
  const [offlineCourseCategories, setOfflineCourseCategories] = useState([])
  const [onlineCourseData, setOnlineCourseData] = useState()
  const [offlineCourseData, setOfflineCourseData] = useState([])
  const router = useRouter()

  const token = useSelector((store) => store.loginStore.token)
  const LoginUsername = useSelector((store) => store.loginStore.user ? store.loginStore.user.userName : 'Loading...')

  const cartData = useSelector((store) => store.cartStore.cartAllData)

  const totalAmountInCart = cartData.reduce((prev, curr) => {
    return prev + Number(curr.courseDetails.coursePrice);
  }, 0);



  const cartDataFetch = () => {
    if (token) {
      axios.post(`${apiBaseUrl}/cart/view-cart`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => res.data)
        .then((finalRes) => {
          if (finalRes.status == 1) {
            dispatch(cartDataFunc(finalRes.cartData))
          }
        })
    }
  }

  useEffect(() => {
    cartDataFetch()
  }, [])

  useEffect(() => {
    if (path === 'checkout' && !token) {
      router.push("/")
    }
  }, [path, token, router])




  // useEffect(() => {
  //   setTimeout(() => {
  //     setEnquiryModel(true);
  //   }, 10000);
  // }, []);

  const [staticPath, setStaticPath] = useState('')

  const onlineCourseDataFetch = () => {
    axios.get(`${apiBaseUrl}/course/view-online`)
      .then((res) => res.data)
      .then((finalRes) => {
        setOnlineCourseData(finalRes.onlineCourseData)
        setStaticPath(finalRes.staticPath)
      })
  }

  useEffect(() => {
    onlineCourseDataFetch()
  }, [])


  const fetchOnlineCategory = () => {
    axios.get(`${apiBaseUrl}/category/fetch-online-category`)
      .then((res) => res.data)
      .then((finalRes) => {
        setOnlineCourseCategories(finalRes.categoryData)
      })
  }

  useEffect(() => {
    fetchOnlineCategory()
  }, [])


  const fetchOfflineCategory = () => {
    axios.get(`${apiBaseUrl}/category/fetch-offline-category`)
      .then((res) => res.data)
      .then((finalRes) => {
        setOfflineCourseCategories(finalRes.categoryData)
      })
  }

  useEffect(() => {
    fetchOfflineCategory()
  }, [])

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




  const offlineCourseDataFetch = () => {
    axios.get(`${apiBaseUrl}/course/view-offline`)
      .then((res) => res.data)
      .then((finalRes) => {
        setOfflineCourseData(finalRes.offlineCourseData)
      })
  }

  useEffect(() => {
    offlineCourseDataFetch()
  }, [])



  const [allContentLoaded, setAllContentLoaded] = useState(false);

  useEffect(() => {
    setAllContentLoaded(true);
  }, []);



  const logoutAccount = () => {

    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout!",
      icon: "warning",
      iconColor: 'black',
      showCancelButton: true,
      background: 'white',
      confirmButtonColor: "black",
      cancelButtonColor: "gray",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        setProfileMenu(false)
        setMobileMenu(false)
        setActivePage("")
        Swal.fire({
          title: "Logout Successful",
          text: "You have been logged out.",
          icon: "success",
          iconColor: 'black',
          confirmButtonColor: "black",
          background: 'white',
          confirmButtonText: "Back To HomePage",
        })
          .then((res) => {
            if (res.isConfirmed) {
              dispatch(logoutUser())
              window.location.reload()
              redirect('/')
            }
          })
      }
    });
  }




  return (
    <header className="sticky top-0 z-[100] bg-white">
      {(activePage || enquiryModel) && (
        <div className="w-[100%] h-[100vh] fixed top-0 left-0 bg-[rgba(0,0,0,0.8)] z-[40]"></div>
      )}

      {activePage && (
        <UserControl activePage={activePage} setActivePage={setActivePage} />
      )}
      {/* header for pc */}
      <div className="w-full shadow-lg z-[100] lg:block hidden px-6">
        <div className="max-w-[1320px] mx-auto flex items-center justify-between py-[0px]">
          <div className="flex items-center gap-5">
            <Link href={"/"}>
              <img
                className="w-[160px] h-[70] object-cover"
                src="/logo.jpg"
                alt=""
              />
            </Link>
            <div
              onClick={() => setMegaMenuOpen(!MegaMenuOpen)}
              className={`${MegaMenuOpen
                ? "bg-black text-white"
                : "bg-white text-black"
                } flex items-center  gap-2 border-[2px] border-black rounded-full px-[15px] py-[8px] text-black    cursor-pointer  font-semibold duration-300 hover:bg-black hover:text-white hover:border-transparent`}
            >
              All Courses{" "}
              <FaAngleDown
                className={`${MegaMenuOpen ? "rotate-180" : "rotate-0"
                  } duration-200`}
              />

              {allContentLoaded && (
                <MegaMenu
                  MegaMenuOpen={MegaMenuOpen}
                  setMegaMenuOpen={setMegaMenuOpen}
                />
              )}

              {MegaMenuOpen && (
                <div className="absolute top-[100%] z-50 left-0 w-full h-screen bg-[rgba(0,0,0,0.6)] "></div>
              )}
            </div>
          </div>

          <button
            onClick={() => setEnquiryModel(true)}
            className="fixed bottom-[200px] right-[40px]  translate-x-[50%] -rotate-90 bg-black text-white  border-2 border-black px-7 py-[12px] font-semibold cursor-pointer text-[18px] rounded-full shadow-lg  hover:bg-white hover:text-black  duration-500 "
          >
            Enquiry Now
          </button>

          {/* Mega menu open and close functionality */}
          <div className="flex items-center gap-5">
            <ul className="flex items-center">

              <li

                className="text-[16px] font-semibold hover:bg-gray-100 px-[10px] py-[35px] duration-300 cursor-pointer capitalize text-gray-500 group "
              >
                online Course
                <div
                  className={`invisible opacity-0 group-hover:opacity-100 origin-top transition-all brightness-110 duration-300 ease-in-out group-hover:visible absolute top-[100%] left-1/2 -translate-x-1/2 w-[1020px] h-auto bg-white shadow-2xl border-[1px] border-gray-300 grid grid-cols-4 gap-4 p-7 rounded-b-[35px] z-50`}
                >

                  {Array.isArray(onlineCourseCategories) && onlineCourseCategories.map((subCat) => {
                    const filteredCourses = Array.isArray(onlineCourseData)
                      ? onlineCourseData.filter(
                        (course) => course.courseCategory?._id === subCat._id
                      )
                      : [];
                    return (
                      <ul key={subCat._id} className="border-r-[1px] border-[#e1e1e1]">
                        <li className="text-[20px] capitalize text-black mb-2">
                          {subCat.categoryName}
                        </li>
                        <ul>
                          {filteredCourses.length > 0 ? (
                            filteredCourses.map((course) => (
                              <Link
                                key={course._id}
                                href={`/online-courses/${course.courseName.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-")}`}
                              >
                                <li className="ml-2 my-[10px] text-gray-600 hover:text-black duration-300">
                                  {course.courseName}
                                </li>
                              </Link>
                            ))
                          ) : (
                            <li className="ml-2 my-[10px] text-gray-400 italic">No courses found</li>
                          )}
                        </ul>
                      </ul>
                    );
                  })}


                </div>
              </li>



              <li
                className="text-[16px] font-semibold hover:bg-gray-100 px-[10px] py-[35px] duration-300 cursor-pointer capitalize text-gray-500 group "
              >
                offline Course
                <div
                  className={`invisible opacity-0 group-hover:opacity-100 origin-top transition-all brightness-110 duration-300 ease-in-out group-hover:visible absolute top-[100%] left-1/2 -translate-x-1/2 w-[1020px] h-auto bg-white shadow-2xl border-[1px] border-gray-300 grid grid-cols-4 gap-4 p-7 rounded-b-[35px] z-50`}
                >


                  {Array.isArray(offlineCourseCategories) && offlineCourseCategories.map((subCat) => {
                    const filteredCourses = Array.isArray(offlineCourseData)
                      ? offlineCourseData.filter(
                        (course) => course.courseCategory?._id === subCat._id
                      )
                      : [];

                    return (
                      <ul key={subCat._id} className="border-r-[1px] border-[#e1e1e1]">
                        <li className="text-[20px] capitalize text-black mb-2">
                          {subCat.categoryName}
                        </li>
                        <ul>
                          {filteredCourses.length > 0 ? (
                            filteredCourses.map((course) => (
                              <Link
                                key={course._id}
                                href={`/offline-courses/${course.courseName.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-")}`}
                              >
                                <li className="ml-2 my-[10px] text-gray-600 hover:text-black duration-300">
                                  {course.courseName}
                                </li>
                              </Link>
                            ))
                          ) : (
                            <li className="ml-2 my-[10px] text-gray-400 italic">No courses found</li>
                          )}
                        </ul>
                      </ul>
                    );
                  })}

                </div>
              </li>

              <li

                className="text-[16px] font-semibold hover:bg-gray-100 px-[10px] py-[35px] duration-300 cursor-pointer capitalize text-gray-500 group "
              >
                Study Materials
                <div
                  className={`invisible opacity-0 group-hover:opacity-100 origin-top transition-all brightness-110 duration-300 ease-in-out group-hover:visible absolute top-[100%] left-1/2 -translate-x-1/2 w-[1020px] h-auto bg-white shadow-2xl border-[1px] border-gray-300 grid grid-cols-4 gap-4 p-7 rounded-b-[35px] z-50`}
                >


                  {studeyMaterials.map((item, ind) => {
                    const { courses } = item
                    return (
                      <ul
                        key={ind}

                        className="border-r-[1px] border-[#e1e1e1]"
                      >
                        <li className="text-[20px] capitalize text-black mb-2">
                          {item?.subCat}
                        </li>
                        <ul>
                          {courses?.map((course, courseIdx) => {
                            return (
                              <Link key={courseIdx} href={`/study-materials/notes/${course.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-")}`}><li className="ml-2 my-[10px] text-gray-600 hover:text-black duration-300">
                                {course}
                              </li></Link>
                            )
                          })}
                        </ul>
                      </ul>
                    )
                  })}
                </div>
              </li>
              <li

                className="text-[16px] font-semibold hover:bg-gray-100 px-[10px] py-[35px] duration-300 cursor-pointer capitalize text-gray-500 group "
              >
                Test series
                {/* <div
                  className={`invisible opacity-0 group-hover:opacity-100 origin-top transition-all brightness-110 duration-300 ease-in-out group-hover:visible absolute top-[100%] left-1/2 -translate-x-1/2 w-[1020px] h-auto bg-white shadow-2xl border-[1px] border-gray-300 grid grid-cols-4 gap-4 p-7 rounded-b-[35px] z-50`}
                >

                  <ul

                    className="border-r-[1px] border-[#e1e1e1]"
                  >
                    <li className="text-[20px] capitalize text-black mb-2">
                      Design Reasoning
                    </li>
                    <ul>

                      <li className="ml-2 my-[10px] text-gray-600 hover:text-black duration-300">
                        nift
                      </li>

                      <li className="ml-2 my-[10px] text-gray-600 hover:text-black duration-300">
                        nid
                      </li>
                      <li className="ml-2 my-[10px] text-gray-600 hover:text-black duration-300">
                        u-ceed
                      </li>
                      <li className="ml-2 my-[10px] text-gray-600 hover:text-black duration-300">
                        fddi
                      </li>


                    </ul>
                  </ul>

                  <ul

                    className="border-r-[1px] border-[#e1e1e1]"
                  >
                    <li className="text-[20px] capitalize text-black mb-2">
                      architecture aptitude

                    </li>
                    <ul>

                      <li className="ml-2 my-[10px] text-gray-600 hover:text-black duration-300">
                        nata
                      </li>

                      <li className="ml-2 my-[10px] text-gray-600 hover:text-black duration-300">
                        jee mains ug
                      </li>
                      <li className="ml-2 my-[10px] text-gray-600 hover:text-black duration-300">
                        gate pg
                      </li>


                    </ul>
                  </ul>


                  <ul

                    className="border-r-[1px] border-[#e1e1e1]"
                  >
                    <li className="text-[20px] capitalize text-black mb-2">
                      Drawing
                    </li>
                    <ul>

                      <li className="ml-2 my-[10px] text-gray-600 hover:text-black duration-300">
                        nift sketching
                      </li>

                      <li className="ml-2 my-[10px] text-gray-600 hover:text-black duration-300">
                        nata sketching
                      </li>
                      <li className="ml-2 my-[10px] text-gray-600 hover:text-black duration-300">
                        nid sketching
                      </li>
                      <li className="ml-2 my-[10px] text-gray-600 hover:text-black duration-300">
                        u-ceed sketching
                      </li>

                    </ul>
                  </ul>

                </div> */}
              </li>


              <Link href={'/free-resources'}><li

                className="text-[16px] font-semibold hover:bg-gray-100 px-[10px] py-[35px] duration-300 cursor-pointer capitalize text-gray-500 group "
              >
                Free resources
                {/* <div
                  className={`invisible opacity-0 group-hover:opacity-100 origin-top transition-all brightness-110 duration-300 ease-in-out group-hover:visible absolute top-[100%] left-1/2 -translate-x-1/2 w-[1020px] h-auto bg-white shadow-2xl border-[1px] border-gray-300 grid grid-cols-4 gap-4 p-7 rounded-b-[35px] z-50`}
                >


                  {freeResApi.map((item, ind) => {
                    const { courses } = item
                    return (
                      <ul

                        className="border-r-[1px] border-[#e1e1e1]"
                      >
                        <li className="text-[20px] capitalize text-black mb-2">
                          {item?.subCat}
                        </li>
                        <ul>
                          {courses?.map((course, courseIdx) => {
                            return (
                              <Link href={`/free-resources/${course.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-")}`}><li className="ml-2 my-[10px] text-gray-600 hover:text-black duration-300">
                                {course}
                              </li></Link>
                            )
                          })}

                        </ul>
                      </ul>
                    )
                  })}




                </div> */}
              </li></Link>

            </ul>


            {token ?
              <button
                onClick={() => setProfileMenu(!profileMenu)}
                className="border-2 rounded-[5px] cursor-pointer border-gray-300 text-gray-950  flex gap-[4px] items-center capitalize duration-200 px-4 py-2 relative bg-white shadow-2xl "
              >
                {LoginUsername}  <FaAngleDown className="" />

                {cartData?.length >= 1 &&
                  <span className="bg-gray-950 text-white w-6 rounded-full text-center absolute -top-2 -right-2">{cartData?.length}</span>
                }


                <div
                  onClick={(e) => e.stopPropagation()}
                  className={`${profileMenu
                    ? "opacity-100 -translate-y-0"
                    : "opacity-0 -translate-y-3"
                    } w-[220px] h-auto absolute top-[168%] -left-10 bg-white shadow-2xl shadow-black origin-top  duration-300 transition-all ease-in-out z-30`}
                >
                  <ul className="text-start p-5">
                    <li
                      onClick={(e) => e.stopPropagation()}
                      className="text-gray-500 my-[10px] hover:text-gray-950 duration-300 border-b border-gray-100 pb-2 flex items-center gap-1"
                    >
                      <CiUser /> {LoginUsername}
                    </li>
                    <Link href={'/checkout'}><li
                      onClick={(e) => {
                        e.stopPropagation()
                        setCartOpen(false)
                      }}
                      className="text-gray-500 my-[10px] hover:text-green-500 duration-300 border-b border-gray-100 pb-2 flex items-center gap-2"
                    >
                      <span onClick={(e) => e.stopPropagation()} className="flex items-center gap-1">
                        <CiShoppingCart /> cart
                      </span>
                      {cartData?.length >= 1 &&
                        <span className="bg-gray-100 animate-pulse text-black w-6 rounded-full text-center">{cartData?.length}</span>
                      }


                    </li></Link>
                    <li
                      onClick={(e) => {
                        e.stopPropagation()
                        logoutAccount()
                      }}
                      className="text-gray-500 my-[10px] hover:text-red-600 duration-300 border-b border-gray-100 pb-2 flex items-center gap-1"
                    >
                      <CiLogout /> Logout
                    </li>
                  </ul>
                </div>
              </button>
              :
              <button
                onClick={() => {
                  setActivePage("login");
                  setMegaMenuOpen(false);
                }}
                className="bg-gray-950 text-white duration-300 cursor-pointer px-[25px] rounded-full hover:bg-white border-[2] border-black hover:text-black font-semibold py-[8px] text-[16px]"
              >
                Sign in
              </button>
            }
          </div>
        </div>
      </div>

      {/* header for mobile */}
      <div className="lg:hidden block">
        <div className="flex items-center justify-between gap-0 py-[00px] px-2 shadow-xl">
          <div className="flex items-center gap-0">
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="text-[30px]"
            >
              <HiOutlineBars3CenterLeft />
            </button>
            <Link href={"/"}>
              <img
                className="w-[90px] h-[90px] object-cover"
                src="/responsiveLogo.jpg"
                alt=""
              />
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCartOpen(true)}
              className="text-[24px] border relative bg-gray-950 text-white rounded-[10px] px-[10px] py-[10px]"
            >
              <LuShoppingCart />

              {cartData.length >= 1 &&
                <span className="text-gray-950 bg-white shadow-2xl border border-gray-300 text-[15px] w-6 rounded-full text-center absolute -top-3 -right-1">{cartData?.length}</span>
              }

            </button>

            {token ?
              <button onClick={logoutAccount} className="border-2 rounded-[10px] cursor-pointer border-gray-950 text-gray-950   capitalize duration-200 px-4 py-2 relative">
                Logout
              </button>

              :
              <button
                onClick={() => {
                  setActivePage("login");
                  setMegaMenuOpen(false);
                }}
                className="bg-black hover:bg-gray-800 duration-300 cursor-pointer px-[25px] rounded-[10px] py-[10px] text-white text-[16px]"
              >
                Login
              </button>
            }

          </div>
        </div>
        <div
          className={`${mobileMenu ? "left-0" : "-left-[100%]"
            } duration-300 fixed top-0 w-[100%] h-[150vh] bg-white px-3 py-8`}
        >
          <div className="flex justify-between pr-[6px]">
            <Link href={"/"}>
              <img
                className="w-[200px] h-[100px] object-cover"
                src="/logo.jpg"
                alt=""
              />
            </Link>
            <button
              onClick={() => setMobileMenu(false)}
              className="text-[30px] "
            >
              <MdClose />
            </button>
          </div>
          <ul className="px-3">
            <Link href={"/"}>
              <li
                onClick={() => setMobileMenu(false)}
                className="my-[25px] capitalize text-[22px] border-b-[1px] border-gray-100 pb-2"
              >
                home
              </li>
            </Link>

            <li
              onClick={() => setSubCategoryMenu('Online Course')}

              className="my-[25px] text-[22px] border-b-[1px] border-gray-100 pb-2 capitalize"
            >
              online Course
            </li>
            <li onClick={() => setSubCategoryMenu('Offline Course')} className="my-[25px] text-[22px] border-b-[1px] border-gray-100 pb-2 capitalize">offline course</li>
            <li onClick={() => setSubCategoryMenu('Study Materials')} className="my-[25px] text-[22px] border-b-[1px] border-gray-100 pb-2 capitalize">study materials</li>
            <li onClick={() => setSubCategoryMenu('Test Series')} className="my-[25px] text-[22px] border-b-[1px] border-gray-100 pb-2 capitalize">test series</li>
            <li onClick={() => setSubCategoryMenu('Free Resources')} className="my-[25px] text-[22px] border-b-[1px] border-gray-100 pb-2 capitalize">free resources</li>
            <li
              onClick={() => {
                setEnquiryModel(true);
                setMobileMenu(false);
              }}
              className="my-[25px] text-[22px] border-b-[1px] border-gray-100 pb-2"
            >
              Enquiry Now
            </li>





            {token ?
              <button className="w-full bg-black hover:bg-black duration-300 text-white rounded-[10px] py-[10px] text-[20px]">
                {LoginUsername}
              </button>

              :
              <button
                onClick={() => {
                  setActivePage("login");
                  setMobileMenu(false);
                  setMegaMenuOpen(false);
                }}
                className="w-full bg-black hover:bg-black duration-300 text-white rounded-[10px] py-[10px] text-[20px]"
              >
                Sign in
              </button>

            }

          </ul>
        </div>

        {/* hover mega menu functionality */}
        <div
          className={`${subCategoryMenu ? "left-0" : "left-[-100%]"
            } fixed top-0 left-0 w-full h-screen bg-white py-2 px-3 overflow-y-scroll duration-300 scrollbar`}
        >
          {/* Header */}
          <div className="mb-6">
            <div className="flex mb-3 justify-between pr-[6px]">
              <Link href={"/"}>
                <img
                  className="w-[200px] h-[100px] object-cover"
                  src="/logo.jpg"
                  alt=""
                />
              </Link>
              <button
                onClick={() => setSubCategoryMenu("")}
                className="text-3xl text-black"
                aria-label="Close Menu"
              >
                <IoMdArrowForward />
              </button>
            </div>
            <h3 className="text-xl mb-5 bg-black text-white px-3 rounded py-[12px]  ">
              {subCategoryMenu}
            </h3>

            {/* mega menu  */}

            {subCategoryMenu == 'Online Course' &&
              <ul className="">
                {onlineCourseData?.map((item, index) => {
                  return (
                    <Link href={`/online-courses/${item?.courseName?.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-')}`}><li onClick={() => {
                      setSubCategoryMenu(false)
                      setMobileMenu(false)
                    }} key={index} className="shadow-xs border-[1px] border-gray-200 py-3 px-4 rounded-md bg-white capitalize text-gray-800 hover:bg-gray-100 mb-3 transition duration-200"
                    >{item?.courseName} </li></Link>
                  )
                })}

              </ul>
            }

            {subCategoryMenu == 'Offline Course' &&
              <ul className="">
                {offlineCourseData?.map((item, index) => {
                  return (
                    <Link href={`/offline-courses/${item?.courseName?.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-')}`}><li onClick={() => {
                      setSubCategoryMenu(false)
                      setMobileMenu(false)
                    }} key={index} className="shadow-xs border-[1px] border-gray-200 py-3 px-4 rounded-md bg-white capitalize text-gray-800 hover:bg-gray-100 mb-3 transition duration-200"
                    >{item?.courseName} </li></Link>
                  )
                })}

              </ul>
            }

          </div>
        </div>
      </div>

      {/* contact model work */}
      <div
        onClick={() => setcontactModel(!contactModel)}
        className="fixed  top-[88%] right-[10px] z-[110] text-[28px] hover:bg-white bg-black text-white hover:text-black rounded-full lg:p-4 p-3 transition-all ease-in-out duration-300 shadow-2xl"
      >
        {contactModel ? <IoMdClose /> : <FaPhoneAlt />}

        {/* WhatsApp Popup */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`${contactModel
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-0 pointer-events-none"
            } transition-all duration-300 ease-in-out w-[300px] h-auto rounded-[10px] origin-bottom-right shadow-lg shadow-gray-500 bg-white z-[110] absolute -top-[300%] right-[60px]`}
        >
          {/* Header */}
          <div className="w-full bg-[#08993e] text-white flex items-center gap-2 px-4 py-3 rounded-t-[10px] text-[22px] font-semibold">
            <FaWhatsapp className="text-[27px]" />
            WhatsApp
          </div>

          {/* Body */}
          <div className="p-3">
            <h3 className="text-[18px] text-gray-800 flex items-center gap-2">
              <FaUserAlt className="text-[16px]" /> Communicate with us
            </h3>
            <p className="my-2 text-[14px] text-gray-700 text-start">
              Have doubts? Our support team will be happy to assist you!
            </p>

            {/* Only this part is clickable */}
            <a
              href="https://wa.me/919649964937"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-[10px] border-2  text-[16px] border-gray-200 font-semibold mt-3 duration-300 text-black rounded-[10px] text-center bg-white cursor-pointer hover:border-[#08993e] hover:text-white hover:bg-[#08993e] transition"
            >
              Send Message
            </a>
          </div>
        </div>
      </div>

      {/* enquiry now model open and close functionality */}

      {/* Form */}
      <EnquiryForm
        enquiryModel={enquiryModel}
        setEnquiryModel={setEnquiryModel}
      />

      {/* {cart work} */}
      <div
        className={`${cartOpen ? "translate-x-0" : "translate-x-full"
          } w-full h-[100vh] z-[100] fixed overflow-scroll top-0 bg-white p-7  duration-300 transition-all ease-in-out`}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[35px] border-b border-gray-200 font-bold text-start capitalize">
            Your Cart
          </h2>
          <span
            onClick={() => setCartOpen(false)}
            className="text-[30px] cursor-pointer"
          >
            <IoClose />
          </span>
        </div>

        <div className="grid grid-cols-1  lg:gap-10 gap-1 md:grid-cols-3 sm:grid-cols-2">
          {/* Cart Items */}
          {cartData.length >= 1

            ?
            cartData?.map((item, index) => {
              const { courseDetails } = item


              return (
                <div
                  key={index}
                  className="bg-white  mb-6 shadow-lg  border border-gray-200 rounded-lg"
                >
                  {/* Product Image */}
                  <img
                    className="w-full h-[130px] object-cover object-top rounded"
                    src={staticPath + courseDetails?.courseImage}
                    alt="u-ceed Course"
                  />

                  {/* Product Content */}
                  <div className="flex flex-col h-auto p-4 justify-between">
                    <div>
                      <h3 className="text-2xl font-semibold mb-1 capitalize">{courseDetails.courseName}</h3>
                      <p className="text-gray-600 mb-1">
                        {courseDetails.courseHeadline}
                      </p>
                    </div>
                    <p className="text-lg font-semibold text-gray-800 mb-1">
                      Qty : {item.quantity}
                    </p>
                    <p className="text-lg font-semibold text-gray-800 mb-1">
                      Price: ₹{courseDetails.coursePrice}
                    </p>
                    <button
                      onClick={() => RemoveFromCart(item._id)}
                      className=" cursor-pointer py-3 text-sm bg-gray-950 text-white rounded hover:bg-transparent hover:text-gray-950 mt-2 border border-transparent hover:border-gray-950 transition duration-300">
                      Remove From Cart
                    </button>
                  </div>
                </div>
              )
            })

            :
            <div>
              <h3>No Courses Added In Cart Yet</h3>
            </div>

          }
        </div>



        {/* Total Price + Order Now */}
        <div className="mt-8 border-t  border-gray-200 pt-6 text-center  md:flex-row items-center justify-between">
          <p className="text-3xl text-black mb-5">
            Total Price: <span className="font-bold text-gray-950">₹{totalAmountInCart}</span>
          </p>
          <Link href={""}>
            <button className="hover:bg-white w-full hover:text-black font-bold px-10 py-3 bg-black text-white border-transparent shadow-lg border-2 hover:border-gray-950 uppercase cursor-pointer transition duration-200 text-base rounded-lg ">
              Order Now
            </button>
          </Link>
        </div>
      </div>
    </header >
  );
}
