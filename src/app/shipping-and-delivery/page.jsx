import Link from "next/link";

export default function Shipping() {
    return (
        <section className="w-full text-gray-900 text-[18px] lg:py-[40px] py-[30px] lg:px-6 px-3 bg-[#f8f8f8]">
            <div className="max-w-[1320px] rounded-[15px] mx-auto  bg-white p-10">
                <h2 className="text-[40px] font-bold mb-5">Delivery & Shipping Policy</h2>

                <div className="my-[40px]">
                    <h3 className="text-[30px] font-semibold ">Shipping Policy</h3>
                    <p className="text-[18px] my-[10px]">
                        We provide shipping services to across and outside India and we ship for 5 days a week.
                    </p>
                </div>

                <div className="my-[40px]">
                    <h3 className="text-[30px] font-semibold ">Processing</h3>
                    <p className="text-[18px] my-[10px]">
                        Orders placed after 10 AM IST on any day will be processed next working day. We do not process orders on Saturday, Sundays and on National Holidays.
                    </p>
                </div>


                <div className="my-[40px]">
                    <h3 className="text-[30px] font-semibold ">Delivery or Shipping Charges</h3>
                    <p className="text-[18px] my-[10px]">
                        We charge for package Courier Charges applicable all over India.
                    </p>

                    <p className="text-[18px] my-[10px]">We also provide free shipping on some products.</p>
                    <p className="text-[18px] my-[10px]">
                        <span className="font-semibold">Across India : </span> Rs.50-90 for individual books/subjects
                    </p>
                    <p className="text-[18px] my-[10px]">
                        <span className="font-semibold">Outside India : </span> Depends upon the Country and their rules. For more details contact us at
                        <p className="cursor-pointer text-blue-600 hover:underline">hr@inframecollege.org</p>
                    </p>
                </div>

                <div className="my-[40px]">
                    <h3 className="text-[30px] font-semibold ">Estimated Delivery Time</h3>
                    <p className="text-[18px] my-[10px]">
                        Our standard shipping time is about 5-7 days. For shipping to a remote location, the possibility of delivery may depend on the area or the location where the order is to be delivered. In case none of our shipping partner delivers to your area, then we can send your order through Speed Post/Registered Post/Parcel by India Post. The orders sent through India Post can be tracked and it may take up to 5-10 days for the order to reach you, in extreme cases.
                    </p>
                </div>
                <div className="my-[40px]">
                    <h3 className="text-[30px] font-semibold ">Tracking Your Order</h3>
                    <p className="text-[18px] my-[10px]">
                        You can track your order using the tracking number provided in your order confirmation email by visiting our delivery partner&#39;s website. It may take upto 12-24 hours to update your tracking number on our website.
                    </p>
                </div>
                <div className="my-[40px]">
                    <h3 className="text-[30px] font-semibold ">Our Shipping Partners</h3>
                    <p className="text-[18px] my-[10px]">
                        We use the best shipping partners in India. They provide Fast, Secure and Reliable delivery service. To track your orders you can visit the site of the relevant shipper.
                    </p>
                    <p className="text-[18px] my-[10px]">We use the services of India Post Speed Post, FEDEX, Blue dart, DHL Etc</p>
                </div>
            </div>
        </section>
    )
}