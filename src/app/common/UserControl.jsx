"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { HiMiniArrowRightStartOnRectangle } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { loginUserData } from "../redux/slices/userSlice";

export default function UserControl({ activePage, setActivePage }) {

  // useSelector work
  const userData = useSelector((store) => store.loginStore.user)


  const router = useRouter()
  const dispatch = useDispatch();
  const [isRegister, setIsRegister] = useState(false);
  const [otpStatus, setOtpStatus] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;


  return (
    <>
      {activePage == "login" && (
        <LoginForm
          dispatch={dispatch}
          userName={userName}
          setUserEmail={setUserEmail}
          setUserPassword={setUserPassword}
          userPhone={userPhone}
          userPassword={userPassword}
          userEmail={userEmail}
          apiBaseUrl={apiBaseUrl}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      )}
      {activePage == "register" && (
        <Register
          userData={userData}
          dispatch={dispatch}
          router={router}
          otpValue={otpValue}
          isRegister={isRegister}
          setIsRegister={setIsRegister}
          setOtpValue={setOtpValue}
          otpStatus={otpStatus}
          setOtpStatus={setOtpStatus}
          userName={userName}
          userEmail={userEmail}
          userPhone={userPhone}
          userPassword={userPassword}
          setUserName={setUserName}
          setUserEmail={setUserEmail}
          setUserPhone={setUserPhone}
          setUserPassword={setUserPassword}
          apiBaseUrl={apiBaseUrl}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      )}
    </>
  );
}

export function LoginForm({ activePage, userData, dispatch, userEmail, setUserEmail, setUserPassword, userPassword, setActivePage, apiBaseUrl }) {

  const userLogin = async (e) => {
    e.preventDefault()
    const obj = {
      userEmail,
      userPassword,
    }
    axios.post(`${apiBaseUrl}/user/login`, obj)
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes.status == 1) {
          setActivePage("")
          const finalObj = {
            user: finalRes.userData,
            token: finalRes.token
          }
          dispatch(loginUserData(finalObj))
          Swal.fire({
            title: 'Login Successful',
            text: 'You are now login!',
            icon: 'success',
            background: 'white',
            iconColor: 'black',
            confirmButtonColor: 'black'
          }).then((res) => {
            window.location.reload()
          })
        }
        else if (finalRes.status == 2) {
          Swal.fire({
            title: 'Invalid Password',
            text: 'Please Enter a Valid Password to login.',
            icon: 'error',
            background: 'white',
            iconColor: 'black',
            timer: 3000,
            confirmButtonColor: 'black'

          })
        }
        else if (finalRes.status == 3) {
          Swal.fire({
            title: 'User Not Found',
            text: 'This Email Id is not registered. Please register first !',
            icon: 'error',
            background: 'white',
            iconColor: 'black',
            confirmButtonColor: 'black'

          })
        }
        else {
          Swal.fire({
            title: 'Something Went Wrong ',
            text: 'Try Again After Some Time !',
            icon: 'error',
            background: 'white',
            iconColor: 'black',
            confirmButtonColor: 'black'
          })
        }
      });
  }

  return (
    <div className={`fixed ${activePage == 'login' ? 'opacity-100' : 'opacity-0'} lg:w-[400px] w-[320px] h-[auto] z-[1000] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-300 transition-all bg-white p-6 rounded-[5px] shadow-md shadow-black`}>
      <div className="flex justify-between items-center">
        <h3 className="text-[30px] font-semibold text-black my-4 capitalize">
          Sign in
        </h3>
        <span
          onClick={() => setActivePage("")}
          className="text-[25px] text-black hover:text-black duration-300 cursor-pointer"
        >
          <HiMiniArrowRightStartOnRectangle />
        </span>
      </div>
      <form onSubmit={userLogin} className="my-[15px] space-y-5">
        <input
          onChange={(e) => setUserEmail(e.target.value)}
          required
          className="border border-gray-300 w-full rounded-[15px] px-[8px] py-[12px] focus:outline-none focus:ring-2 focus:ring-black transition"
          placeholder="Enter Your Email"
          type="text"
        />
        <input
          onChange={(e) => setUserPassword(e.target.value)}
          required
          className="border border-gray-300 w-full rounded-[15px] px-[8px] py-[12px] focus:outline-none focus:ring-2 focus:ring-black transition"
          placeholder="Enter Your Password"
          type="password"
        />
        <button className="w-full hover:bg-white hover:text-black hover:border-black border-[2px] border-transparent bg-black duration-300 cursor-pointer text-white rounded-[15px] capitalize font-semibold py-[10px] ">
          Sign in
        </button>
        <p className="text-center">
          Not a member yet ?{" "}
          <span
            onClick={() => setActivePage("register")}
            className="text-black
                 hover:underline cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}

export function Register({
  router,
  isRegister,
  setIsRegister,
  activePage,
  setOtpValue,
  otpValue,
  setOtpStatus,
  otpStatus,
  setActivePage,
  apiBaseUrl,
  userName,
  userEmail,
  userPhone,
  userPassword,
  setUserName,
  setUserEmail,
  setUserPhone,
  setUserPassword,
}) {
  const userRegister = async (e) => {
    e.preventDefault();
    const obj = {
      userName,
      userEmail,
      userPhone,
      userPassword,
      otpValue,
    };

    if (otpStatus) {
      // Verify OTP API Call
      axios
        .post(`${apiBaseUrl}/user/otp-verify`, obj)
        .then((res) => res.data)
        .then((finalRes) => {
          if (finalRes.status == 1) {
            Swal.fire({
              title: "Registration Successful",
              text: "You can now log in to your account.",
              icon: "success",
              background: "white",
              iconColor: "black",
              confirmButtonColor: "black",
              timer: 3000,
            })
            setIsRegister(true);

          }
          else if (finalRes.status == 2) {
            Swal.fire({
              title: "OTP Is Invalid",
              text: 'Check the OTP and try again !',
              icon: "error",
              iconColor: "black",
              background: "white",
              confirmButtonColor: "black",
              timer: 3000,
            });
          }
          else {
            Swal.fire({
              title: "Something Went Wrong try Again later",
              icon: "error",
              iconColor: "black",
              background: "white",
              confirmButtonColor: "black",
              timer: 3000,
            });
          }
        });
    } else {
      axios
        .post(`${apiBaseUrl}/user/register`, obj)
        .then((res) => res.data)
        .then((finalRes) => {
          if (finalRes.status == 1) {
            Swal.fire({
              title: "OTP Sent",
              text: "Check your email Id to Verify",
              icon: "success",
              background: "white",
              iconColor: "black",
              confirmButtonColor: "black",
              timer: 3000,
            });
            setOtpStatus(true);
          } else if (finalRes.status == 0) {
            Swal.fire({
              title: "OTP Sent",
              text: "Check your email Id to Verify",
              icon: "success",
              background: "white",
              iconColor: "black",
              confirmButtonColor: "black",
              timer: 3000,
            });
          } else if (finalRes.status == 2) {
            Swal.fire({
              title: "User Already Exists",
              text: 'This Email Id is already registered. Please log in or try another one !',
              icon: "error",
              iconColor: "black",
              background: "white",
              confirmButtonColor: "black",
              timer: 3000,
            });
          } else {
            Swal.fire({
              title: "Something Went Wrong try Again later",
              icon: "error",
              iconColor: "black",
              background: "white",
              confirmButtonColor: "black",
              timer: 3000,
            });
          }
        });
    }
  };

  useEffect(() => {
    if (isRegister) {
      setActivePage("")
      router.push('/thank-you')
    }
  }, [isRegister])

  return (
    <>
      <div className="fixed lg:w-[400px] w-[320px] h-[auto] z-[1000] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-[10px] shadow-md shadow-black">
        <div className="flex justify-between items-center">
          <h3 className="text-[30px] text-black my-4 capitalize  font-semibold">
            Sign up
          </h3>
          <span
            onClick={() => setActivePage("")}
            className="text-[25px] hover:text-black duration-300 cursor-pointer"
          >
            <HiMiniArrowRightStartOnRectangle />
          </span>
        </div>
        <form onSubmit={userRegister} className="my-[15px] space-y-5">
          <input
            onChange={(e) => setUserName(e.target.value)}
            required
            className="border border-gray-300 w-full rounded-[15px] px-[8px] py-[12px] focus:outline-none focus:ring-2 focus:ring-black transition"
            placeholder="Enter Your Name"
            type="text"
          />
          <input
            onChange={(e) => setUserPhone(e.target.value)}
            required
            className="border border-gray-300 w-full rounded-[15px] px-[8px] py-[12px] focus:outline-none focus:ring-2 focus:ring-black transition"
            placeholder="Enter Your Phone Number"
            type="tel"
            autoComplete="tel"
            pattern="^\+?\d{10,15}$"
          />
          <input
            onChange={(e) => setUserEmail(e.target.value)}
            required
            className="border border-gray-300 w-full rounded-[15px] px-[8px] py-[12px] focus:outline-none focus:ring-2 focus:ring-black transition"
            placeholder="Enter Your Email"
            type="email"
          />
          <input
            onChange={(e) => setUserPassword(e.target.value)}
            required
            className="border border-gray-300 w-full rounded-[15px] px-[8px] py-[12px] focus:outline-none focus:ring-2 focus:ring-black transition"
            placeholder="Create a Password"
            type="password"
          />
          {otpStatus && (
            <input
              onChange={(e) => setOtpValue(e.target.value)}
              required
              placeholder="Enter OTP"
              className="border border-gray-300 w-full rounded-[15px] px-[8px] py-[12px] focus:outline-none focus:ring-2 focus:ring-black transition"
            />
          )}
          <button className="w-full bg-black hover:bg-transparent hover:text-black border-2 border-transparent hover:border-black duration-300 cursor-pointer text-white font-semibold rounded-[15px] capitalize py-[10px] focus:outline-none focus:ring-2 focus:ring-black transition">
            {otpStatus ? "Verify OTP & Register" : "Request OTP"}
          </button>
          <p className="text-center">
            Already a member ?{" "}
            <span
              onClick={() => setActivePage("login")}
              className="text-black
                 hover:underline cursor-pointer"
            >
              Sign In
            </span>
          </p>
        </form>
      </div>
    </>
  );
}
