import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

declare global {
    interface Window {
        Razorpay: any;
    }
}

interface QuickPaymentProps {
    price: string;
    courseName: string;
    className?: string;
}

function QuickPayment({ className, price, courseName }: QuickPaymentProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
    // console.log(BASE_URL);

    // Load Razorpay script
    useEffect(() => {
        if (typeof window !== "undefined" && window.Razorpay) {
            setRazorpayLoaded(true);
            return;
        }

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => setRazorpayLoaded(true);
        script.onerror = () => {
            console.error("Failed to load Razorpay script");
            alert("Payment gateway failed to load. Please refresh.");
        };
        document.body.appendChild(script);
    }, []);

    const handleBuyNow = () => {
        if (!razorpayLoaded) {
            toast.error("Payment gateway loading...");
            return;
        }

        setLoading(true);

        const amountInPaisa = Math.round(Number(price) * 100);

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // TEST key works
            amount: amountInPaisa,
            currency: "INR",
            name: "Inframe College",
            description: `Course Payment: ${courseName}`,
            image: "/pixelcut-export4.png",

            handler: function (response: any) {
                console.log("Payment Success:", response);

                toast.success("Payment successful 🎉");

                // response.razorpay_payment_id ONLY
                router.push("/order-confirmation");
            },

            modal: {
                ondismiss: () => {
                    setLoading(false);
                    toast.info("Payment cancelled");
                },
            },

            theme: { color: "#FACC15" },
        };

        const rzp = new window.Razorpay(options);

        rzp.on("payment.failed", (response: any) => {
            console.error(response.error);
            toast.error("Payment failed");
            setLoading(false);
        });

        rzp.open();
        setLoading(false);
    };


    // const handleBuyNow = async () => {
    //     if (!razorpayLoaded) {
    //         toast.error("Payment gateway loading... Please try again.");
    //         return;
    //     }

    //     setLoading(true);

    //     try {
    //         // /payment/enrollment-create-order
    //         // Step 1: Create enrollment and get enrollmentId
    //         const enrollmentRes = await fetch(BASE_URL + "/payment/enrollment-create-order", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({
    //                 courseName,
    //                 price
    //             }),
    //         });

    //         const enrollmentData = await enrollmentRes.json();

    //         if (!enrollmentData.success || !enrollmentData.enrollmentId) {
    //             toast.error("Failed to initiate payment. Please try again.");
    //             setLoading(false);
    //             return;
    //         }

    //         const enrollmentId = enrollmentData.enrollmentId;

    //         // Step 2: Create Razorpay order
    //         const amountInPaisa = Math.round(Number(price) * 100);

    //         // const orderRes = await fetch(
    //         //     BASE_URL + "/payment/enrollment-create-order",
    //         //     {
    //         //         method: "POST",
    //         //         headers: { "Content-Type": "application/json" },
    //         //         body: JSON.stringify({ enrollmentId }),
    //         //     },
    //         // );

    //         // const orderData = await orderRes.json();

    //         // if (!orderData.orderId) {
    //         //     throw new Error("Order creation failed");
    //         // }

    //         // Step 3: Initialize Razorpay
    //         const options = {
    //             key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    //             order_id: 1,
    //             // order_id: orderData.orderId,
    //             amount: amountInPaisa,
    //             currency: "INR",
    //             name: "Inframe College",
    //             description: `Course Payment: ${courseName}`,
    //             image: "/pixelcut-export4.png",

    //             handler: async function (response: any) {
    //                 // Verify payment
    //                 const verifyRes = await fetch(
    //                     BASE_URL + "/payment/enrollment-verify",
    //                     {
    //                         method: "POST",
    //                         headers: { "Content-Type": "application/json" },
    //                         body: JSON.stringify({
    //                             enrollmentId,
    //                             razorpay_order_id: response.razorpay_order_id,
    //                             razorpay_payment_id: response.razorpay_payment_id,
    //                             razorpay_signature: response.razorpay_signature,
    //                         }),
    //                     },
    //                 );

    //                 const verifyData = await verifyRes.json();

    //                 if (verifyData.success) {
    //                     toast.success("Payment successful! 🎉");
    //                     // Redirect to success page
    //                     router.push("/order-confirmation");
    //                 } else {
    //                     toast.error("Payment verification failed");
    //                 }
    //             },

    //             // Razorpay will collect user details
    //             theme: { color: "#FACC15" },

    //             modal: {
    //                 ondismiss: () => {
    //                     setLoading(false);
    //                     toast.info("Payment cancelled", {
    //                         position: "top-center",
    //                     });
    //                 },
    //             },
    //         };

    //         const rzp = new window.Razorpay(options);

    //         rzp.on("payment.failed", (response: any) => {
    //             toast.error("Payment failed: " + (response.error?.description || "Unknown error"));
    //             setLoading(false);
    //         });

    //         // Open Razorpay checkout immediately
    //         rzp.open();
    //         setLoading(false);

    //     } catch (err) {
    //         console.error("Payment error:", err);
    //         toast.error("Something went wrong. Please try again.");
    //         setLoading(false);
    //     }
    // };

    return (
        <div className="text-center">
            <button
                onClick={handleBuyNow}
                disabled={loading}
                className="relative overflow-hidden bg-gradient-to-r 
                        from-black via-gray-900 to-black text-white
                        px-6 py-3 sm:px-8 sm:py-4 
                        text-xl sm:text-3xl font-semibold border border-yellow-400 shadow-xl mb-0
                        hover:scale-[1.03] active:scale-95 transition-all duration-300
                        shine-btn disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                    </span>
                ) : (
                    `Enroll Now - ₹${price}`
                )}
            </button>
        </div>
    );
}

export default QuickPayment;