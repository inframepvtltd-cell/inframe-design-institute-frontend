'use client'

import axios from "axios";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { cartDataFunc } from "../redux/slices/cartSlice";

export default function CartPage() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL
    const token = useSelector((store) => store.loginStore.token)
    const dispatch = useDispatch()

    const [staticpath, setstaticpath] = useState('')
    const cartData = useSelector((store) => store.cartStore.cartAllData)
    console.log(cartData)
    // Example cart data (replace with real cart state or API)
    const totalAmountInCart = cartData.reduce((prev, curr) => {
        return prev + Number(curr.courseDetails?.coursePrice);
    }, 0);

    // Total values
    const totalQty = cartData.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartData.reduce((sum, item) => sum + item.price * item.qty, 0);


    const fetchAllOnlineCourses = () => {
        axios.get(`${apiBaseUrl}/course/view-online`)
            .then((res) => res.data)
            .then((finalRes) => {
                setstaticpath(finalRes.staticPath)
            })
    }

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

    useEffect(() => {
        fetchAllOnlineCourses()
    }, [])

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);



    const razorPayInt = async () => {
        try {
            const res = await fetch(`${apiBaseUrl}/razorpay/create-order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    amount: totalAmountInCart,
                }),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                alert("Failed to create order");
                return;
            }

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
                amount: data.amount,
                currency: "INR",
                order_id: data.orderId, // ✅ FIXED
                name: "Course Platform",
                description: "Course Purchase",
                handler: function (response) {
                    console.log("Payment Success:", response);
                    alert("Payment Successful 🎉");
                    dispatch(cartDataFunc([]))

                    //cart delete from database work 

                    /*
                      response = {
                        razorpay_payment_id,
                        razorpay_order_id,
                        razorpay_signature
                      }
                    */
                },
                modal: {
                    ondismiss: function () {
                        alert("Payment Cancelled");
                    },
                },
                theme: {
                    color: "#000000",
                },
            };

            const razor = new window.Razorpay(options);
            razor.open();
        } catch (error) {
            console.error("Razorpay Error:", error);
            alert("Something went wrong");
        }
    };


    return (
        <div className="w-full bg-gray-50 pt-10">
            <div className="max-w-[1320px] mx-auto bg-white shadow-md rounded-lg p-6">

                <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                    Your Cart
                </h1>

                {/* Cart Table */}
                <div className="overflow-x-auto">

                    {cartData.length >= 1 ? (
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100 text-gray-700">
                                    <th className="p-3 border text-center">Sr No.</th>
                                    <th className="p-3 border text-center">Course Image</th>
                                    <th className="p-3 border text-left">Course Name</th>
                                    <th className="p-3 border text-center">Price</th>
                                    <th className="p-3 border text-center">Quantity</th>
                                    <th className="p-3 border text-center">Total</th>
                                    <th className="p-3 border text-center">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {cartData.map((item, index) => {
                                    const { courseDetails } = item

                                    return (
                                        <tr key={item._id} className="text-center">
                                            {/* Sr No */}
                                            <td className="p-3 border">{index + 1}</td>

                                            {/* Course Image */}
                                            <td className="p-3 border">
                                                <img
                                                    src={courseDetails?.courseImage}
                                                    alt={courseDetails?.courseName}
                                                    className="w-16 h-16 object-cover mx-auto rounded"
                                                />
                                            </td>

                                            {/* Course Name */}
                                            <td className="p-3 border text-left">
                                                <p className="font-semibold">{courseDetails?.courseName}</p>
                                                <p className="text-xs text-gray-500">
                                                    {courseDetails?.cousreHeadline}
                                                </p>
                                            </td>

                                            {/* Price */}
                                            <td className="p-3 border">
                                                ₹{courseDetails?.coursePrice}
                                            </td>

                                            {/* Quantity */}
                                            <td className="p-3 border">
                                                {item.quantity}
                                            </td>

                                            {/* Total */}
                                            <td className="p-3 border font-semibold">
                                                ₹{courseDetails?.coursePrice * item.quantity}
                                            </td>

                                            {/* Action */}
                                            <td className="p-3 border">
                                                <button
                                                    onClick={() => RemoveFromCart(item._id)}
                                                    className="px-3 py-1 text-sm bg-black text-white rounded hover:bg-white hover:text-black border border-black transition"
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>

                            {/* Grand Total */}
                            <tfoot>
                                <tr className="bg-blue-50 font-semibold text-gray-800">
                                    <td className="p-3 border text-center" colSpan={4}>
                                        Total
                                    </td>
                                    <td className="p-3 border text-center">{totalQty}</td>
                                    <td className="p-3 border text-center">
                                        ₹{totalAmountInCart}
                                    </td>
                                    <td className="p-3 border"></td>
                                </tr>
                            </tfoot>
                        </table>
                    ) : (
                        <div>
                            <h3 className="text-center font-semibold text-3xl text-gray-400">
                                No Courses Added In Your Cart Yet
                            </h3>
                            <Link href="/">
                                <p className="w-full bg-black text-white text-center py-2 my-5 rounded border-2 cursor-pointer border-transparent hover:border-black hover:bg-white duration-300 hover:text-black">
                                    Explore Courses To Add
                                </p>
                            </Link>
                        </div>
                    )}
                    <div className="flex justify-end">
                        <button onClick={razorPayInt} className="py-2 px-7 hover:bg-white border border-transparent hover:border-black duration-300 hover:text-black rounded bg-black text-white cursor-pointer mt-5">Confirm Payment</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
