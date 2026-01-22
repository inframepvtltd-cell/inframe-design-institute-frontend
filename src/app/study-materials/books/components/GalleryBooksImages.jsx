"use client";

import { useState, useEffect } from "react";

const bookImages = [
  {
    id: 1,
    src: "/Gallery-books/book cover-01.jpg",
    alt: "NIFT Study Material - Creative Ability Test",
    title: "NIFT CAT - Creative Ability Test",
    exam: "NIFT",
    description:
      "Complete guide for NIFT Creative Ability Test with drawing, design thinking exercises.",
  },
  {
    id: 2,
    src: "/Gallery-books/book cover-02.jpg",
    alt: "NID Study Material - Studio Test",
    title: "NID Studio Test",
    exam: "NID",
    description:
      "Complete preparation for NID Studio Test with material handling and model making.",
  },
  {
    id: 3,
    src: "/Gallery-books/book cover-03.jpg",
    alt: "UCEED Study Material - Visualization",
    title: "UCEED Visualization",
    exam: "UCEED",
    description: "Master visualization and spatial reasoning for UCEED exam.",
  },
  {
    id: 4,
    src: "/Gallery-books/book cover-04.jpg",
    alt: "NATA Study Material - Drawing",
    title: "NATA Drawing",
    exam: "NATA",
    description: "Professional architectural drawing techniques for NATA exam.",
  },
  {
    id: 5,
    src: "/Gallery-books/book cover-05.jpg",
    alt: "JEE Study Material - Aptitude",
    title: "JEE Aptitude",
    exam: "JEE",
    description: "Practice sets for JEE Paper 2 aptitude test.",
  },
  {
    id: 6,
    src: "/Gallery-books/book cover-06.jpg",
    alt: "GATE Study Material - Design",
    title: "GATE Design",
    exam: "GATE",
    description: "Advanced design theory for GATE Design exam.",
  },
  {
    id: 7,
    src: "/Gallery-books/book cover-07.jpg",
    alt: "NIFT Study Material - GAT",
    title: "NIFT GAT",
    exam: "NIFT",
    description: "Complete guide for NIFT General Ability Test.",
  },
  {
    id: 8,
    src: "/Gallery-books/book cover-08.jpg",
    alt: "NID Study Material - Design",
    title: "NID DAT",
    exam: "NID",
    description: "Preparation for NID Design Aptitude Test.",
  },
  {
    id: 9,
    src: "/Gallery-books/book cover-09.jpg",
    alt: "UCEED Study Material - Drawing",
    title: "UCEED Sketching",
    exam: "UCEED",
    description: "Advanced sketching techniques for UCEED exam.",
  },
  {
    id: 10,
    src: "/Gallery-books/book cover-10.jpg",
    alt: "NATA Study Material - Maths",
    title: "NATA Mathematics",
    exam: "NATA",
    description: "Mathematics curriculum for architecture exams.",
  },
  {
    id: 11,
    src: "/Gallery-books/book cover-11.jpg",
    alt: "JEE Study Material - Drawing",
    title: "JEE Engineering Drawing",
    exam: "JEE",
    description: "Technical drawing for JEE Paper 2.",
  },
  {
    id: 12,
    src: "/Gallery-books/book cover-12.jpg",
    alt: "GATE Study Material - Theory",
    title: "GATE Design History",
    exam: "GATE",
    description: "Design history and theory for GATE exam.",
  },
  {
    id: 13,
    src: "/Gallery-books/book cover-13.jpg",
    alt: "NIFT Study Material - Portfolio",
    title: "NIFT Portfolio",
    exam: "NIFT",
    description: "Guide to create design portfolios for NIFT.",
  },
  {
    id: 14,
    src: "/Gallery-books/book cover-14.jpg",
    alt: "NID Study Material - Sketching",
    title: "NID Sketching",
    exam: "NID",
    description: "Professional sketching for NID exam.",
  },
  {
    id: 15,
    src: "/Gallery-books/book cover-15.jpg",
    alt: "UCEED Study Material - Observation",
    title: "UCEED Observation",
    exam: "UCEED",
    description: "Observation skills for UCEED exam.",
  },
  {
    id: 16,
    src: "/Gallery-books/book cover-16.jpg",
    alt: "NATA Study Material - Aesthetic",
    title: "NATA Aesthetic",
    exam: "NATA",
    description: "Aesthetic sensitivity for NATA exam.",
  },
  {
    id: 17,
    src: "/Gallery-books/book cover-17.jpg",
    alt: "JEE Study Material - Physics",
    title: "JEE Physics",
    exam: "JEE",
    description: "Physics concepts for JEE Paper 2.",
  },
  {
    id: 18,
    src: "/Gallery-books/book cover-18.jpg",
    alt: "GATE Study Material - Research",
    title: "GATE Research Methods",
    exam: "GATE",
    description: "Research methodologies for GATE Design.",
  },
  {
    id: 19,
    src: "/Gallery-books/book-17.jpg",
    alt: "Comprehensive Study Material",
    title: "Complete Study Package",
    exam: "ALL",
    description: "All-in-one package for all design exams.",
  },
  {
    id: 20,
    src: "/Gallery-books/book-18-1.jpg",
    alt: "Practice Workbook",
    title: "Practice Workbook",
    exam: "ALL",
    description: "Practice exercises for all exams.",
  },
  {
    id: 21,
    src: "/Gallery-books/book-18.jpg",
    alt: "Solved Papers",
    title: "Solved Papers",
    exam: "ALL",
    description: "Previous years' solved question papers.",
  },
  {
    id: 22,
    src: "/Gallery-books/book-19-1.jpg",
    alt: "Mock Test Series",
    title: "Mock Test Series",
    exam: "ALL",
    description: "Complete mock test series.",
  },
  {
    id: 23,
    src: "/Gallery-books/book-19.jpg",
    alt: "Revision Guide",
    title: "Revision Guide",
    exam: "ALL",
    description: "Last minute revision guide.",
  },
];

export const GalleryBooksImages = () => {
  const [filter, setFilter] = useState("ALL");
  const [filteredImages, setFilteredImages] = useState(bookImages);

  // Filter exams list
  const exams = ["ALL", "NIFT", "NID", "UCEED", "NATA", "JEE", "GATE"];

  useEffect(() => {
    if (filter === "ALL") {
      setFilteredImages(bookImages);
    } else {
      setFilteredImages(bookImages.filter((image) => image.exam === filter));
    }
  }, [filter]);

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-linear-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-5">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-black text-gray-900 mb-3 sm:mb-4 relative">
            <span className="relative z-10">
              <span className="bg-linear-to-r from-gray-900 via-black to-gray-900 bg-clip-text text-transparent">
                Gallery of Our
              </span>
              <span className="bg-linear-to-r from-blue-700 via-blue-800 to-blue-900 bg-clip-text text-transparent ml-3">
                Study Material
              </span>
            </span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-lg md:text-xl max-w-3xl mx-auto px-4">
            Take a look at the quality and depth of our comprehensive study
            materials
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 px-2">
          {exams.map((exam) => (
            <button
              key={exam}
              onClick={() => setFilter(exam)}
              className={`px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full font-medium text-xs sm:text-base transition-all duration-300 cursor-pointer ${
                filter === exam
                  ? "bg-black text-white shadow-md sm:shadow-lg"
                  : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              }`}
            >
              {exam === "ALL" ? "All Materials" : exam}
            </button>
          ))}
        </div>

        {/* Images Grid - No transitions, simple cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
          {filteredImages.map((image) => (
            <div key={image.id} className="cursor-pointer">
              {/* Simple Card without transitions */}
              <div className="relative overflow-hidden rounded-lg sm:rounded-xl shadow-md bg-white h-full">
                {/* Image Container */}
                <div className="aspect-3/4 relative overflow-hidden">
                  {/* Actual Image - No hover effects */}
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* Exam Badge */}
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                    <span className="px-2 sm:px-2.5 py-1 bg-black/80 text-white text-xs font-medium rounded-full">
                      {image.exam}
                    </span>
                  </div>
                </div>

                {/* Content - Book titles matching the actual books */}
                <div className="p-3 sm:p-4">
                  <h3 className="text-sm font-bold text-gray-900 mb-1">
                    {image.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2 mb-1">
                    {image.description}
                  </p>
                  <p className="text-xs text-gray-500">
                    For{" "}
                    {image.exam === "ALL"
                      ? "All Design Exams"
                      : `${image.exam} Exam`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <div className="text-gray-400 text-5xl sm:text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No materials found for {filter}
            </h3>
            <p className="text-gray-500 text-sm sm:text-base">
              Try selecting a different filter
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
