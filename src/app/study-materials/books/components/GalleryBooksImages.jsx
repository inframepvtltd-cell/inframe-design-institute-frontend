"use client";

import { useState, useEffect } from "react";

const bookImages = [
  {
    id: 1,
    src: "/Gallery-books/book cover-01.jpg",
    alt: "NIFT Study Material - Creative Ability Test",
    title: "NIFT CAT - Creative Ability Test",
    exam: "NIFT",
    bundle: "NIFT NID UCEED UG Bundle",
    description:
      "Complete guide for NIFT Creative Ability Test with drawing, design thinking exercises.",
  },
  {
    id: 2,
    src: "/Gallery-books/book cover-02.jpg",
    alt: "NID Study Material - Studio Test",
    title: "NID Studio Test",
    exam: "NID",
    bundle: "NIFT NID UCEED UG Bundle",
    description:
      "Complete preparation for NID Studio Test with material handling and model making.",
  },
  {
    id: 3,
    src: "/Gallery-books/book cover-03.jpg",
    alt: "UCEED Study Material - Visualization",
    title: "UCEED Visualization",
    exam: "UCEED",
    bundle: "NIFT NID UCEED UG Bundle",
    description: "Master visualization and spatial reasoning for UCEED exam.",
  },
  {
    id: 4,
    src: "/Gallery-books/book cover-04.jpg",
    alt: "NATA Study Material - Drawing",
    title: "NATA Drawing",
    exam: "NATA",
    bundle: "NATA JEE UG Bundle",
    description: "Professional architectural drawing techniques for NATA exam.",
  },
  {
    id: 5,
    src: "/Gallery-books/book cover-05.jpg",
    alt: "JEE Study Material - Aptitude",
    title: "JEE Aptitude",
    exam: "JEE",
    bundle: "NATA JEE UG Bundle",
    description: "Practice sets for JEE Paper 2 aptitude test.",
  },
  {
    id: 6,
    src: "/Gallery-books/book cover-06.jpg",
    alt: "GATE Study Material - Design",
    title: "GATE Design",
    exam: "GATE",
    bundle: "GATE PG Bundle",
    description: "Advanced design theory for GATE Design exam.",
  },
  {
    id: 7,
    src: "/Gallery-books/book cover-07.jpg",
    alt: "NIFT Study Material - GAT",
    title: "NIFT GAT",
    exam: "NIFT",
    bundle: "NIFT NID UCEED UG Bundle",
    description: "Complete guide for NIFT General Ability Test.",
  },
  {
    id: 8,
    src: "/Gallery-books/book cover-08.jpg",
    alt: "NID Study Material - Design",
    title: "NID DAT",
    exam: "NID",
    bundle: "NIFT NID UCEED UG Bundle",
    description: "Preparation for NID Design Aptitude Test.",
  },
  {
    id: 9,
    src: "/Gallery-books/book cover-09.jpg",
    alt: "UCEED Study Material - Drawing",
    title: "UCEED Sketching",
    exam: "UCEED",
    bundle: "NIFT NID UCEED UG Bundle",
    description: "Advanced sketching techniques for UCEED exam.",
  },
  {
    id: 10,
    src: "/Gallery-books/book cover-10.jpg",
    alt: "NATA Study Material - Maths",
    title: "NATA Mathematics",
    exam: "NATA",
    bundle: "NATA JEE UG Bundle",
    description: "Mathematics curriculum for architecture exams.",
  },
  {
    id: 11,
    src: "/Gallery-books/book cover-11.jpg",
    alt: "JEE Study Material - Drawing",
    title: "JEE Engineering Drawing",
    exam: "JEE",
    bundle: "NATA JEE UG Bundle",
    description: "Technical drawing for JEE Paper 2.",
  },
  {
    id: 12,
    src: "/Gallery-books/book cover-12.jpg",
    alt: "GATE Study Material - Theory",
    title: "GATE Design History",
    exam: "GATE",
    bundle: "GATE PG Bundle",
    description: "Design history and theory for GATE exam.",
  },
  {
    id: 13,
    src: "/Gallery-books/book cover-13.jpg",
    alt: "NIFT Study Material - Portfolio",
    title: "NIFT Portfolio",
    exam: "NIFT",
    bundle: "NIFT NID UCEED PG Bundle",
    description: "Guide to create design portfolios for NIFT.",
  },
  {
    id: 14,
    src: "/Gallery-books/book cover-14.jpg",
    alt: "NID Study Material - Sketching",
    title: "NID Sketching",
    exam: "NID",
    bundle: "NIFT NID UCEED PG Bundle",
    description: "Professional sketching for NID exam.",
  },
  {
    id: 15,
    src: "/Gallery-books/book cover-15.jpg",
    alt: "UCEED Study Material - Observation",
    title: "UCEED Observation",
    exam: "UCEED",
    bundle: "NIFT NID UCEED PG Bundle",
    description: "Observation skills for UCEED exam.",
  },
  {
    id: 16,
    src: "/Gallery-books/book cover-16.jpg",
    alt: "NATA Study Material - Aesthetic",
    title: "NATA Aesthetic",
    exam: "NATA",
    bundle: "NATA JEE UG Bundle",
    description: "Aesthetic sensitivity for NATA exam.",
  },
  {
    id: 17,
    src: "/Gallery-books/book cover-17.jpg",
    alt: "JEE Study Material - Physics",
    title: "JEE Physics",
    exam: "JEE",
    bundle: "NATA JEE UG Bundle",
    description: "Physics concepts for JEE Paper 2.",
  },
  {
    id: 18,
    src: "/Gallery-books/book cover-18.jpg",
    alt: "GATE Study Material - Research",
    title: "GATE Research Methods",
    exam: "GATE",
    bundle: "GATE PG Bundle",
    description: "Research methodologies for GATE Design.",
  },
  {
    id: 19,
    src: "/Gallery-books/book-17.jpg",
    alt: "Comprehensive Study Material",
    title: "Complete Study Package",
    exam: "ALL",
    bundle: "ALL",
    description: "All-in-one package for all design exams.",
  },
  {
    id: 20,
    src: "/Gallery-books/book-18-1.jpg",
    alt: "Practice Workbook",
    title: "Practice Workbook",
    exam: "ALL",
    bundle: "ALL",
    description: "Practice exercises for all exams.",
  },
  {
    id: 21,
    src: "/Gallery-books/book-18.jpg",
    alt: "Solved Papers",
    title: "Solved Papers",
    exam: "ALL",
    bundle: "ALL",
    description: "Previous years' solved question papers.",
  },
  {
    id: 22,
    src: "/Gallery-books/book-19-1.jpg",
    alt: "Mock Test Series",
    title: "Mock Test Series",
    exam: "ALL",
    bundle: "ALL",
    description: "Complete mock test series.",
  },
  {
    id: 23,
    src: "/Gallery-books/book-19.jpg",
    alt: "Revision Guide",
    title: "Revision Guide",
    exam: "ALL",
    bundle: "ALL",
    description: "Last minute revision guide.",
  },
];

export const GalleryBooksImages = () => {
  const [filter, setFilter] = useState("ALL");
  const [filteredImages, setFilteredImages] = useState(bookImages);

  // Filter exams list - match these with bundle property
  const exams = [
    "ALL",
    "NIFT NID UCEED UG Bundle",
    "NATA JEE UG Bundle",
    "NIFT NID UCEED PG Bundle",
    "GATE PG Bundle",
  ];

  useEffect(() => {
    if (filter === "ALL") {
      setFilteredImages(bookImages);
    } else {
      setFilteredImages(bookImages.filter((image) => image.bundle === filter));
    }
  }, [filter]);

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Gallery of Our{" "}
            </span>
            <span className="bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
              Study Material
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
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300 ${filter === exam
                  ? "bg-black text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                }`}
            >
              {exam === "ALL" ? "All Materials" : exam}
            </button>
          ))}
        </div>

        {/* Images Grid - Clean Version */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group flex flex-col h-full cursor-pointer"
            >
              {/* Card */}
              <div className="relative flex flex-col h-full bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-gray-300 hover:shadow-lg transition-all duration-200">

                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = `https://placehold.co/300x400/e2e8f0/475569?text=${encodeURIComponent(
                        image.title
                      )}`;
                    }}
                  />

                  {/* Exam Tag */}
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2.5 py-1 bg-black/80 text-white text-[11px] font-semibold rounded">
                      {image.exam}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 flex flex-col flex-grow">
                  <h3 className="text-[13px] font-bold text-gray-900 mb-1.5 line-clamp-2 leading-snug">
                    {image.title}
                  </h3>

                  <p className="text-[11px] text-gray-600 mb-2 line-clamp-2 flex-grow">
                    {image.description}
                  </p>

                  {/* Bundle Info */}
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-[10px] text-gray-500 font-medium">
                      {image.bundle === "ALL" ? "All Design Exams" : image.bundle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Results Count */}
        <div className="text-center mt-8 text-gray-600">
          <p className="text-sm">
            Showing {filteredImages.length} of {bookImages.length} materials
            {filter !== "ALL" && ` in ${filter}`}
          </p>
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No materials found for "{filter}"
            </h3>
            <p className="text-gray-500">
              Try selecting a different filter or check back later for new
              materials
            </p>
          </div>
        )}
      </div>
    </section>
  );
};