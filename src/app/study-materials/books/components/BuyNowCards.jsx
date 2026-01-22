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
    originalPrice: "₹16,999",
    features: [
      "Made by NIFT/IIT/NID Faculty",
      "Complete UG syllabus Coverage",
      "each chapter has Mock test paper",
      "10+ year question paper",
      "Online doubt support",
      "Live classes on sunday",
    ],
    image: "/Books/nid-nift-uceed-2026.jpg",
  },
  {
    id: 2,
    title: "Study Material Combo NATA JEE UG Bundle 2027",
    originalPrice: "₹14,999",
    features: [
      "Made by Architecture Faculty",
      "Complete UG syllabus Coverage",
      "each chapter has Mock test paper",
      "10+ year question paper",
      "Online doubt support",
      "Live classes on sunday",
    ],
    image: "/Books/Book1.png",
  },
  {
    id: 3,
    title: "Study Material Combo NIFT NID UCEED PG Bundle 2027",
    originalPrice: "₹18,999",
    features: [
      "Made by NIFT/IIT/NID Faculty",
      "Complete UG syllabus Coverage",
      "each chapter has Mock test paper",
      "10+ year question paper",
      "Online doubt support",
      "Live classes on sunday",
    ],
    image: "/Books/nid-nift-uceed-pg.jpg",
  },
  {
    id: 4,
    title: "Study Material GATE PG Bundle 2027",
    originalPrice: "₹12,999",
    features: [
      "Made by Gate topper Faculty",
      "Complete UG syllabus Coverage",
      "each chapter has Mock test paper",
      "10+ year question paper",
      "Online doubt support",
      "Live classes on sunday",
    ],
    image: "/Books/book2-front.png",
  },
];

export const BuyNowCards = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openBook, setOpenBook] = useState(null);

  const handleBuyNow = () => {
    setOpenModal(true);
  };

  return (
    <>
      <section className="py-8 sm:py-12 md:py-16 bg-linear-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          {/* Enhanced Heading */}
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-black text-gray-900 mb-4 tracking-tight">
              <span className="bg-linear-to-r from-blue-700 via-blue-600 to-blue-800 bg-clip-text text-transparent">
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
            {cards.map((card, index) => (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden h-full"
              >
                {/* Image Section - Reduced height */}
                <div className="h-48 sm:h-56 md:h-64 w-full bg-gray-50 flex items-center justify-center p-2 sm:p-4">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-auto max-w-full object-contain"
                  />
                </div>

                {/* Content Section - Reduced padding */}
                <div className="p-4 sm:p-6 flex flex-col flex-1">
                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-3">
                    {card.title}
                  </h3>

                  {/* Price */}
                  <p className="text-sm text-gray-400 line-through mb-3">
                    {card.originalPrice}
                  </p>

                  {/* Features - Reduced spacing */}
                  <ul className="space-y-1.5 sm:space-y-2.5 text-xs sm:text-sm text-gray-700 mb-4 flex-1">
                    {card.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-600 font-bold mt-0.5 shrink-0">
                          ✔
                        </span>
                        <span className="flex-1">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Read More Button */}
                  <button
                    onClick={() => setOpenBook(card.id)}
                    className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium mb-3 text-left cursor-pointer inline-flex items-center gap-1"
                  >
                    Read Full Details →
                  </button>

                  {/* Enroll Button */}
                  <button
                    onClick={handleBuyNow}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 hover:shadow-lg cursor-pointer text-sm sm:text-base mt-auto"
                  >
                    Enroll Now
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
