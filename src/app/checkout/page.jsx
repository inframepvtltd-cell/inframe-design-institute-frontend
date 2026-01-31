"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { cartDataFunc } from "../redux/slices/cartSlice";

export default function CartPage() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = useSelector((store) => store.loginStore.token);
  const dispatch = useDispatch();

  const [staticPath, setStaticPath] = useState("");
  const cartData = useSelector((store) => store.cartStore.cartAllData);

  // Total amount
  const totalAmountInCart = cartData.reduce(
    (prev, curr) =>
      prev + Number(curr.courseDetails?.coursePrice) * curr.quantity,
    0,
  );
  const totalQty = cartData.reduce((sum, item) => sum + item.quantity, 0);

  // Fetch static path for course images
  const fetchAllOnlineCourses = async () => {
    try {
      const res = await axios.get(`${apiBaseUrl}/course/view-online`);
      setStaticPath(res.data.staticPath);
    } catch (err) {
      console.error("Failed to fetch courses", err);
    }
  };

  const removeFromCart = async (courseId) => {
    const result = await Swal.fire({
      title: "Are You Sure?",
      text: "Do you really want to remove this from cart?",
      icon: "warning",
      iconColor: "black",
      background: "white",
      color: "black",
      showCancelButton: true,
      confirmButtonColor: "black",
      cancelButtonColor: "gray",
      confirmButtonText: "Yes",
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.post(
          `${apiBaseUrl}/cart/remove-from-cart`,
          { courseId },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (res.data.status === 1) {
          Swal.fire({
            title: "Item Removed Successfully!",
            icon: "success",
            iconColor: "black",
            color: "black",
            confirmButtonColor: "black",
          });
          window.location.reload();
          // dispatch(cartDataFunc([])); // Update Redux cart
        } else {
          Swal.fire({
            title: "Something went wrong",
            text: "Try again later",
            icon: "error",
            iconColor: "black",
            color: "black",
            confirmButtonColor: "black",
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchAllOnlineCourses();
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Razorpay payment
  const razorPayInt = async () => {
    if (!cartData.length) return Swal.fire("Your cart is empty!");

    try {
      const res = await fetch(`${apiBaseUrl}/razorpay/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: totalAmountInCart, // amount in rupees
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        return Swal.fire("Failed to create order. Try again!");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: data.amount, // in paise from backend
        currency: "INR",
        order_id: data.orderId,
        name: "Course Platform",
        description: "Course Purchase",
        handler: async function (response) {
          try {
            const paymentRes = await fetch(
              `${apiBaseUrl}/razorpay/verify-payment`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                  id: token.userId || token.id, // pass user id for cart clear
                }),
              },
            );

            const paymentData = await paymentRes.json();

            if (paymentData.success) {
              Swal.fire("Payment Successful 🎉");
              dispatch(cartDataFunc([])); // clear Redux cart
              window.location.href = "/order-success";
            } else {
              Swal.fire("Payment verification failed. Contact support.");
            }
          } catch (err) {
            console.error("Payment Handler Error:", err);
            Swal.fire("Something went wrong during payment verification");
          }
        },
        modal: {
          ondismiss: function () {
            Swal.fire("Payment Cancelled");
          },
        },
        theme: { color: "#000000" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Razorpay Error:", error);
      Swal.fire("Something went wrong, try again!");
    }
  };

  return (
    <div className="w-full  bg-gradient-to-b from-gray-50 to-white py-14">
      <div className="max-w-[1320px] shadow-2xl mx-auto bg-white/90 backdrop-blur rounded-2xl p-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-black mb-8">
          Your Cart
        </h1>

        <div className="overflow-x-auto">
          {cartData.length > 0 ? (
            <table className="w-full border-separate border-spacing-y-3">
              <thead>
                <tr className="text-sm text-gray-500 uppercase tracking-wide">
                  <th className="p-3 text-center">#</th>
                  <th className="p-3 text-center">Course</th>
                  <th className="p-3 text-left">Details</th>
                  <th className="p-3 text-center">Price</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-center">Total</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {cartData.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white text-lg shadow-sm rounded-xl transition hover:shadow-md"
                  >
                    <td className="p-4 text-center font-medium text-gray-600">
                      {index + 1}
                    </td>

                    <td className="p-4 text-center">
                      <img
                        src={
                          item.courseDetails?.courseImage ||
                          `${staticPath}/${item.courseDetails?.courseImage}`
                        }
                        alt={item.courseDetails?.courseName}
                        className="w-16 h-16 rounded-lg object-cover mx-auto"
                      />
                    </td>

                    <td className="p-4">
                      <p className="font-semibold text-gray-900">
                        {item.courseDetails?.courseName}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.courseDetails?.courseHeadline}
                      </p>
                    </td>

                    <td className="p-4 text-center text-gray-700">
                      ₹{item.courseDetails?.coursePrice}
                    </td>

                    <td className="p-4 text-center font-medium">
                      {item.quantity}
                    </td>

                    <td className="p-4 text-center font-semibold text-gray-900">
                      ₹{item.courseDetails?.coursePrice * item.quantity}
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="rounded-full border border-black px-4 py-1.5 text-sm text-black transition hover:bg-gradient-to-b from-[#1f1f1f] to-black cursor-pointer duration-200 hover:text-white"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr className="bg-gray-50 rounded-xl">
                  <td colSpan={4} className="p-4 text-right font-semibold">
                    Total
                  </td>
                  <td className="p-4 text-center font-semibold">{totalQty}</td>
                  <td className="p-4 text-center font-extrabold text-2xl text-black">
                    ₹{totalAmountInCart}
                  </td>
                  <td />
                </tr>
              </tfoot>
            </table>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-3xl font-semibold text-gray-400 mb-4">
                Your cart is empty
              </h3>
              <Link href="/">
                <span className="inline-block rounded-full bg-black px-8 py-3 text-white font-medium transition hover:bg-white hover:text-black border border-black">
                  Explore Courses
                </span>
              </Link>
            </div>
          )}

          {cartData.length > 0 && (
            <div className="flex justify-end mt-10">
              <button
                onClick={razorPayInt}
                className="rounded-full bg-gradient-to-b from-[#1f1f1f] to-black px-10 py-3 text-white font-semibold shadow-lg transition hover:bg-white hover:text-black border border-black hover:shadow-xl"
              >
                Confirm Payment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
