"use client";

// import { validateUtmFromUrl } from "@utils/validateUTMFromUrl";
import { usePathname } from "next/navigation";
import { memo, useEffect, useRef } from "react";

interface OrderDetails {
    subtotal: string;
    tax: string;
    total: string;
}

interface UserDetails {
    name: string;
    email: string;
    contact: string;
}

interface OrderConfirmationModalProps {
    open: boolean;
    loading: boolean;
    courseName: string;
    price: string;
    orderDetails: OrderDetails;
    user: UserDetails;
    paymentSuccess: boolean;
    onConfirm: () => void;
    onClose: () => void;
}

const OrderConfirmationModal = memo(function OrderConfirmationModal({
    open,
    loading,
    courseName,
    price,
    orderDetails,
    paymentSuccess,
    user,
    onConfirm,
    onClose,
}: OrderConfirmationModalProps) {

    const hasTrackedPurchase = useRef(false);
    const pathname = usePathname();

    useEffect(() => {
        // if (
        //   !open ||
        //   !paymentSuccess ||
        //   Number(price) <= 0 ||
        //   hasTrackedPurchase.current ||
        //   typeof window === "undefined" ||
        //   !(window as any).fbq ||
        //   !validateUtmFromUrl(pathname)
        // ) {
        //   return;
        // }

        // (window as any).fbq("track", "Purchase", {
        //   value: Number(price),
        //   currency: "INR",
        //   content_name: courseName,
        // });

        console.log("Meta Purchase fired:", price);

        hasTrackedPurchase.current = true;
    }, [open, paymentSuccess, price, courseName, pathname]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => !loading && onClose()}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl animate-[fadeIn_0.25s_ease-out]">
                {/* Header */}
                <div className="rounded-t-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 px-6 py-4 text-center">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-black">
                        Order Summary
                    </h2>
                    {/* GST FREE BADGE */}
                    <span className="inline-block mt-2 text-xs font-semibold bg-black text-yellow-400 px-3 py-1 rounded-full">
                        GST FREE
                    </span>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    {/* Product */}
                    <div className="flex justify-between items-start border-b pb-4">
                        <div>
                            <p className="font-semibold text-gray-900">{courseName}</p>
                            <p className="text-xs text-gray-500 mt-1">Qty: 1</p>
                        </div>
                        <p className="font-bold text-gray-900">₹
                            {price}</p>
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-medium">₹{price}</span>
                        </div>

                        {/* GST FREE LINE */}
                        <div className="flex justify-between text-green-600">
                            <span>GST</span>
                            <span className="font-medium">₹0 (Included)</span>
                        </div>

                        <div className="flex justify-between border-t pt-3 text-base font-bold">
                            <span>Total Payable</span>
                            <span className="text-green-600">
                                ₹{price}
                            </span>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="rounded-lg bg-gray-50 p-4 flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">
                            Payment Method
                        </span>
                        <span className="text-xs font-semibold bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                            Razorpay
                        </span>
                    </div>

                    {/* Buttons */}
                    <div className="space-y-3">
                        <button
                            onClick={onConfirm}
                            disabled={loading}
                            className="w-full rounded-lg bg-gradient-to-r from-green-500 to-green-600 py-3 font-semibold text-white shadow-lg hover:from-green-600 hover:to-green-700 transition disabled:opacity-60"
                        >
                            {loading ? "Processing..." : "Place Order & Pay"}
                        </button>

                        <button
                            onClick={onClose}
                            disabled={loading}
                            className="w-full rounded-lg bg-gray-200 py-3 font-medium text-gray-700 hover:bg-gray-300 transition"
                        >
                            Cancel Order
                        </button>
                    </div>

                    {/* User Info */}
                    <div className="border-t pt-4 text-xs sm:text-sm text-gray-600">
                        <p className="font-medium text-gray-800">{user.name}</p>
                        <p>{user.email}</p>
                        <p>{user.contact}</p>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default OrderConfirmationModal;
