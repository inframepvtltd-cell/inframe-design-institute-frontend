'use client'

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { cartDataFunc } from "../redux/slices/cartSlice";

export default function CartPage() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL
    const token = useSelector((store) => store.loginStore.token)
    const dispatch = useDispatch()

    const [staticPath, setStaticPath] = useState('')
    const cartData = useSelector((store) => store.cartStore.cartAllData)

    // Total amount
    const totalAmountInCart = cartData.reduce((prev, curr) => prev + Number(curr.courseDetails?.coursePrice) * curr.quantity, 0)
    const totalQty = cartData.reduce((sum, item) => sum + item.quantity, 0)

    // Fetch static path for course images
    const fetchAllOnlineCourses = async () => {
        try {
            const res = await axios.get(`${apiBaseUrl}/course/view-online`)
            setStaticPath(res.data.staticPath)
        } catch (err) {
            console.error("Failed to fetch courses", err)
        }
    }

    const removeFromCart = async (courseId) => {
        const result = await Swal.fire({
            title: 'Are You Sure?',
            text: 'Do you really want to remove this from cart?',
            icon: 'warning',
            iconColor: 'black',
            background: 'white',
            color: 'black',
            showCancelButton: true,
            confirmButtonColor: 'black',
            cancelButtonColor: 'gray',
            confirmButtonText: 'Yes'
        })

        if (result.isConfirmed) {
            try {
                const res = await axios.post(`${apiBaseUrl}/cart/remove-from-cart`, { courseId }, {
                    headers: { Authorization: `Bearer ${token}` }
                })

                if (res.data.status === 1) {
                    Swal.fire({
                        title: 'Item Removed Successfully!',
                        icon: 'success',
                        iconColor: 'black',
                        color: 'black',
                        confirmButtonColor: 'black'
                    })
                    dispatch(cartDataFunc([])) // Update Redux cart
                } else {
                    Swal.fire({
                        title: 'Something went wrong',
                        text: 'Try again later',
                        icon: 'error',
                        iconColor: 'black',
                        color: 'black',
                        confirmButtonColor: 'black'
                    })
                }
            } catch (err) {
                console.error(err)
            }
        }
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

    // Razorpay payment
    const razorPayInt = async () => {
        if (!cartData.length) return Swal.fire("Your cart is empty!")

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
                return Swal.fire("Failed to create order. Try again!")
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
                        const paymentRes = await fetch(`${apiBaseUrl}/razorpay/verify-payment`, {
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
                        });

                        const paymentData = await paymentRes.json();

                        if (paymentData.success) {
                            Swal.fire("Payment Successful 🎉")
                            dispatch(cartDataFunc([])) // clear Redux cart
                            window.location.href = "/order-success"
                        } else {
                            Swal.fire("Payment verification failed. Contact support.")
                        }
                    } catch (err) {
                        console.error("Payment Handler Error:", err)
                        Swal.fire("Something went wrong during payment verification")
                    }
                },
                modal: {
                    ondismiss: function () {
                        Swal.fire("Payment Cancelled")
                    },
                },
                theme: { color: "#000000" },
            };

            const razor = new window.Razorpay(options);
            razor.open();
        } catch (error) {
            console.error("Razorpay Error:", error);
            Swal.fire("Something went wrong, try again!")
        }
    }

    return (
        <div className="w-full bg-gray-50 pt-10">
            <div className="max-w-[1320px] mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">Your Cart</h1>

                <div className="overflow-x-auto">
                    {cartData.length > 0 ? (
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
                                {cartData.map((item, index) => (
                                    <tr key={item._id} className="text-center">
                                        <td className="p-3 border">{index + 1}</td>
                                        <td className="p-3 border">
                                            <img
                                                src={item.courseDetails?.courseImage || `${staticPath}/${item.courseDetails?.courseImage}`}
                                                alt={item.courseDetails?.courseName}
                                                className="w-16 h-16 object-cover mx-auto rounded"
                                            />
                                        </td>
                                        <td className="p-3 border text-left">
                                            <p className="font-semibold">{item.courseDetails?.courseName}</p>
                                            <p className="text-xs text-gray-500">{item.courseDetails?.courseHeadline}</p>
                                        </td>
                                        <td className="p-3 border">₹{item.courseDetails?.coursePrice}</td>
                                        <td className="p-3 border">{item.quantity}</td>
                                        <td className="p-3 border font-semibold">₹{item.courseDetails?.coursePrice * item.quantity}</td>
                                        <td className="p-3 border">
                                            <button
                                                onClick={() => removeFromCart(item._id)}
                                                className="px-3 py-1 text-sm bg-black text-white rounded hover:bg-white hover:text-black border border-black transition"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                            <tfoot>
                                <tr className="bg-blue-50 font-semibold text-gray-800">
                                    <td className="p-3 border text-center" colSpan={4}>Total</td>
                                    <td className="p-3 border text-center">{totalQty}</td>
                                    <td className="p-3 border text-center">₹{totalAmountInCart}</td>
                                    <td className="p-3 border"></td>
                                </tr>
                            </tfoot>
                        </table>
                    ) : (
                        <div className="text-center">
                            <h3 className="text-center font-semibold text-3xl text-gray-400">No Courses Added In Your Cart Yet</h3>
                            <Link href="/">
                                <p className="w-full bg-black text-white text-center py-2 my-5 rounded border-2 cursor-pointer border-transparent hover:border-black hover:bg-white duration-300 hover:text-black">Explore Courses To Add</p>
                            </Link>
                        </div>
                    )}

                    {cartData.length > 0 && (
                        <div className="flex justify-end">
                            <button onClick={razorPayInt} className="py-2 px-7 hover:bg-white border border-transparent hover:border-black duration-300 hover:text-black rounded bg-black text-white cursor-pointer mt-5">
                                Confirm Payment
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
