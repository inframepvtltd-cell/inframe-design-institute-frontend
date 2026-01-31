"use client";
import { MdLocalPhone, MdOutlineImportContacts } from "react-icons/md";
import { FaGraduationCap, FaUser } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";

export default function BookaSession() {

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL
  const bookSession = (e) => {
    e.preventDefault()
    const userName = e.target.userName.value
    const userEmail = e.target.userEmail.value
    const userPhone = e.target.userPhone.value
    const examType = e.target.examType.value
    const obj = { userName, userEmail, userPhone, examType }

    axios.post(`${apiBaseUrl}/enquiry/book-session`, obj)
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes.status == 1) {
          Swal.fire({
            title: 'Session Booked Successfully',
            text: 'Wait for the Response',
            color: 'black',
            iconColor: 'black',
            icon: 'success',
            confirmButtonColor: 'black'
          })
        }
        else {
          Swal.fire({
            title: 'Failed to book a Session',
            text: 'Try again later',
            icon: 'warning',
            iconColor: 'black',
            color: 'black',
            confirmButtonColor: 'black'
          })
        }
      })
  }

  return (
    <div className="w-full lg:my-[60px] my-[40px]">


      <div className="lg:mx-6 mx-3">
        <div style={{ backgroundImage: 'url("/bookasession.jpg")' }} className="max-w-[1320px] bg-fixed bg-black  items-center overflow-hidden bg-cover rounded-[10px] relative bg-center grid lg:grid-cols-[60%_auto] grid-cols-1 mx-auto">
          <div className="absolute w-[100%] h-[100%] bg-gradient-to-r from-black/70 via-black/40 to-black/80"></div>
          {/* Left Section */}
          <div className="p-8 lg:p-12 bg-no-repeat bg-cover flex flex-col  space-y-6  relative z-40">
            <div className="flex items-center gap-3 text-white">
              <MdOutlineImportContacts className="text-[40px] " />
              <h3 className="text-[26px] lg:text-[35px] font-bold leading-tight text-white">
                Book Your Free Counseling Session
              </h3>
            </div>

            <p className="text-[16px] text-white leading-[35px]">
              Not sure which creative career to pursue? Let's talk it out. Our expert
              mentors will help you understand the best path forward based on your
              passion and goals.
            </p>

            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white text-[16px]">
                <FaUser className="text-white mt-1" />
                Fill out a short form with your details.
              </li>
              <li className="flex items-start gap-3 text-white text-[16px]">
                <MdLocalPhone className="text-white mt-1" />
                Get a call from our academic counselor within 24 hours.
              </li>
              <li className="flex items-start gap-3 text-white text-[16px]">
                <FaGraduationCap className="text-white mt-1" />
                Receive personalized guidance on exams, programs, and colleges.
              </li>
            </ul>

            {/* Callout or Highlight
          <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-lg shadow-sm mt-4">
            <p className="text-sm text-white font-medium">
              🎯 9 out of 10 students say this session clarified their career direction.
            </p>
          </div> */}

            {/* Assurance */}
            <div className="text-[14px] text-white italic mt-2">
              “I was confused between NID and UCEED — this call helped me decide clearly.” — Rhea, Design Aspirant
            </div>
          </div>

          {/* Right Section - Form */}
          <form onSubmit={bookSession} className="p-5 lg:p-7 shadow-2xl z-40 border-2 text-gray-900 border-white lg:rounded-[15px] bg-white space-y-6 flex flex-col justify-center lg:mx-10 lg:my-15 m-0">
            <h2 className="text-[27px] font-bold  text-gray-900">
              Fill in Your Details
            </h2>

            <div>
              <label htmlFor="name" className="block text-gray-900 font-medium mb-2">
                Full Name*
              </label>
              <input
                name="userName"
                id="name"
                type="text"
                placeholder="John Doe"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-[1px] focus:ring-gray-500 text-gray-900"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-900 font-medium mb-2">
                Email Address*
              </label>
              <input
                name="userEmail"
                id="email"
                type="email"
                placeholder="john@example.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-[1px] focus:ring-gray-500 text-gray-900"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-900 font-medium mb-2">
                Phone Number*
              </label>
              <input
                name="userPhone"
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-[1px] focus:ring-gray-500 text-gray-900"
                required
              />
            </div>

            <div>
              <label htmlFor="exam" className="block text-gray-900 font-medium mb-2">
                Exam Type*
              </label>
              <select
                name="examType"
                id="exam"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white text-black  focus:outline-none focus:ring-[1px] focus:ring-gray-500"
                required
              >
                <option  >-- Select Exam Type --</option>
                <option  value="nift">NIFT</option>
                <option  value="nid">NID</option>
                <option  value="uceed">UCEED</option>
                <option  value="nata">NATA</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full hover:bg-white hover:text-black border-[2px] border-transparent hover:border-gray-900 bg-gray-900 text-white font-semibold py-3 px-6 cursor-pointer rounded-lg transition duration-300 capitalize"
            >
              Book My Session
            </button>
          </form>
        </div>
      </div>
    </div>

  );
}
