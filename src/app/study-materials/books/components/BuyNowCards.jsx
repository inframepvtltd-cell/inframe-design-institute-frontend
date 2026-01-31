"use client";
import { useState } from "react";
import PopupForm from "./PopupForm";
import BookDetailsPopup from "./Book1";
import BookDetailsPopup2 from "./Book2";
import BookDetailsPopup3 from "./Book3";
import BookDetailsPopup4 from "./Book4";

const cards = [
  {
    id: 1,
    title: "Study Material Combo NIFT NID UCEED UG Bundle 2027",
    originalPrice: 16999,
    offerPrice: 3500, features: [
      "Made by NIFT/IIT/NID Faculty",
      "Complete UG syllabus Coverage",
      "each chapter has Mock test paper",
      "10+ year question paper",
      "Online doubt support",
      "Live classes on sunday",
    ],
    image: "/book_cover/3.png",
  },
  {
    id: 2,
    title: "Study Material Combo NATA JEE UG Bundle 2027",
    originalPrice: 14999,
    offerPrice: 3500, features: [
      "Made by Architecture Faculty",
      "Complete UG syllabus Coverage",
      "each chapter has Mock test paper",
      "10+ year question paper",
      "Online doubt support",
      "Live classes on sunday",
    ],
    image: "/book_cover/1.png",
  },
  {
    id: 3,
    title: "Study Material Combo NIFT NID UCEED PG Bundle 2027",
    originalPrice: 18999,
    offerPrice: 3500, features: [
      "Made by NIFT/IIT/NID Faculty",
      "Complete UG syllabus Coverage",
      "each chapter has Mock test paper",
      "10+ year question paper",
      "Online doubt support",
      "Live classes on sunday",
    ],
    image: "/book_cover/2.png",
  },
  {
    id: 4,
    title: "Study Material GATE PG Bundle 2027",
    originalPrice: 12999,
    offerPrice: 3500, features: [
      "Made by Gate topper Faculty",
      "Complete UG syllabus Coverage",
      "each chapter has Mock test paper",
      "10+ year question paper",
      "Online doubt support",
      "Live classes on sunday",
    ],
    image: "/book_cover/4.png",
  },
];

export const BuyNowCards = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openBook, setOpenBook] = useState(null);

  const handleBuyNow = () => {
    setOpenModal(true);
  };

  // Function to format currency in Indian Rupees
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Function to calculate discount percentage
  const calculateDiscount = (original, offer) => {
    return Math.round(((original - offer) / original) * 100);
  };

  return (
    <>
      <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          {/* Enhanced Heading */}
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-black text-gray-900 mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 bg-clip-text text-transparent">
                Choose Your Study Package
              </span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              <span className="font-semibold text-gray-700">
                Designed by NIFT • NID • IIT Faculty
              </span>{" "}
              – Trusted by 10,000+ Students
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {cards.map((card) => (
              <div
                key={card.id}
                className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden h-full relative"
              >
                {/* Discount Badge */}
                {card.offerPrice && card.offerPrice < card.originalPrice && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                    {calculateDiscount(card.originalPrice, card.offerPrice)}% OFF
                  </div>
                )}

                {/* Image Section */}
                <div className="h-48 sm:h-56 md:h-64 w-full bg-gray-50 flex items-center justify-center p-2 sm:p-4">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-auto max-w-full object-contain"
                  />
                </div>

                {/* Content Section */}
                <div className="p-4 sm:p-6 flex flex-col flex-1">
                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-3">
                    {card.title}
                  </h3>

                  {/* Pricing Section */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      {/* Offer Price */}
                      <span className="text-xl sm:text-2xl font-bold text-gray-900">
                        {formatPrice(card.offerPrice || card.originalPrice)}
                      </span>

                      {/* Original Price with strikethrough - only if offer price exists */}
                      {card.offerPrice && card.offerPrice < card.originalPrice && (
                        <>
                          <span className="text-sm text-red-500 line-through">
                            {formatPrice(card.originalPrice)}
                          </span>
                          <span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-0.5 rounded">
                            Save {formatPrice(card.originalPrice - card.offerPrice)}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Per month/installment text if needed */}
                    {card.offerPrice && (
                      <p className="text-xs text-gray-500 mt-1">
                        One-time payment • Lifetime access
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-1.5 sm:space-y-2.5 text-xs sm:text-sm text-gray-700 mb-4 flex-1">
                    {card.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600 font-bold mt-0.5 shrink-0">
                          ✔
                        </span>
                        <span className="flex-1">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Read More Button */}
                  <button
                    onClick={() => setOpenBook(card.id)}
                    className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium mb-3 text-left cursor-pointer inline-flex items-center gap-1 hover:underline"
                  >
                    Read Full Details →
                  </button>

                  {/* Enroll Button */}
                  <button
                    onClick={handleBuyNow}
                    className="w-full bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white font-semibold py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 hover:shadow-lg cursor-pointer text-sm sm:text-base mt-auto"
                  >
                    Enroll Now at {formatPrice(card.offerPrice || card.originalPrice)}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popup Modal */}
      <PopupForm open={openModal} onClose={() => setOpenModal(false)} />
      {/* Popup Books */}
      <BookDetailsPopup
        open={openBook === 1}
        onClose={() => setOpenBook(null)}
      />
      <BookDetailsPopup2
        open={openBook === 2}
        onClose={() => setOpenBook(null)}
      />
      <BookDetailsPopup3
        open={openBook === 3}
        onClose={() => setOpenBook(null)}
      />
      <BookDetailsPopup4
        open={openBook === 4}
        onClose={() => setOpenBook(null)}
      />
    </>
  );
};