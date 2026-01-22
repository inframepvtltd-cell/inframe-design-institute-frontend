"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function BookDetailsPopup4({ open, onClose }) {
  const popupRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (open) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [open, onClose]);

  const handleBackdropClick = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!open) return null;

  const bookDescription = `This Study Material consist of 11 Books which helps General Aptitude as well as core subjects of architecture are.:

Book 1: This book guide you about General aptitude syllabus like reasoning, mathematics etc

Book 2: This book guide you about Principles of Art and Architecture, Architectural Graphics, Planning and design considerations for different building types, Anthropometrics, Site planning, Barrier-free design, Circulation- horizontal and vertical, Space Standards, National Building Code and Building Codes. Elements, architectural styles, construction and examples of different periods of Indian & Western History of Architecture.

Book 3: This book guide you about Building systems and prefabrication of building elements, Building construction techniques, methods and details, Principles of Modular Coordination, Estimation, valuation, specification, professional practice, Project management techniques, Construction planning and equipment e.g.CPM, PERT etc. Behavioural applications and characteristics of various building materials.

Book 4: This book guide you about  Design of structural elements in steel, wood and RCC, Structural systems in RCC and Steel, Principles and design of disaster resistant structures, Form and Structure, Principles of Pre-stressing, gravity & lateral load resisting systems, High Rise & Long Span structures.

Book 5: This book guide you about Environmental considerations in planning and design, Principles of architectural acoustics; Green Building- Concepts & Rating, ECBC, Principles of lighting and illumination, Climate responsive design, Thermal comfort, ventilation & air movement Solar architecture, Environmental pollution- types, causes, controls and abatement strategies, Building Performance Simulation and Evaluation, Ecosystem- natural and man-made ecosystem.

Book 6: This book guide you about Concepts and theories of urban design, Townscape, Urban design interventions for sustainable development and transportation, Public Realm, Historical and modern examples of urban design, Elements of urban built environment - urban form, structure, spaces, pattern, texture, fabric, grain etc,  

Book 7: This book guide you about  Housing, principles, concepts and examples of the neighbourhood, Affordable Housing, Housing for special areas and needs, Housing typologies, Slums, Residential densities, National Housing Policies, Standards for housing and community facilities, Programs & Schemes. Types of plans ,Emerging concepts of cities.

Book 8: This book guide you about  Decision support system and Land Information System., Graphic presentation of spatial data, Tools and techniques of Surveys - Topographical, Physical, Land use and Socioeconomic Surveys, Methods of non-spatial & spatial data analysis, Application of G.I.S & Remote Sensing techniques in urban and regional planning.

Book 9: This book guide you about Urban Infrastructure – Water Supply, Transportation, Sewerage, Solid Waste Management, Drainage, Electricity & Communications. Building Services,Water treatment, Principles of water supply and sanitation systems, Water supply and distribution system, Sewage disposal methods, Water harvesting systems, Process and Principles of Transportation Planning and Traffic Engineering, Traffic survey methods, Traffic analyses and design considerations,

Book 10: This book Consist of Previous year original paper of GATE exam.

Book 11: How to manage all subject and attempt complete paper within time limit of exam.
Last and very important – guidelines for improving your speed. Most of the students face problem-completing all questions in 3 hours' time limit. This module will help you by giving tips on improving your speed and completing the paper with in time limit.
Note: Module 11 will be send through mail after receiving photocopy of your GATE Admit card at IDI Jodhpur.`;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6"
      onClick={handleBackdropClick}
    >
      <div
        ref={popupRef}
        className="bg-white rounded-lg xs:rounded-xl sm:rounded-xl md:rounded-xl lg:rounded-xl w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl xl:max-w-5xl max-h-[85vh] xs:max-h-[88vh] sm:max-h-[90vh] md:max-h-[92vh] lg:max-h-[94vh] overflow-hidden flex flex-col"
      >
        {/* Close Button - Responsive */}
        <button
          onClick={onClose}
          className="absolute top-2 xs:top-3 sm:top-4 md:top-5 lg:top-6 right-2 xs:right-3 sm:right-4 md:right-5 lg:right-6 w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-white rounded-full border border-gray-300 shadow-md sm:shadow-lg flex items-center justify-center text-xl xs:text-2xl font-bold text-gray-600 hover:text-black hover:bg-gray-50 z-20 transition-all duration-200 cursor-pointer"
          aria-label="Close popup"
        >
          ×
        </button>

        {/* Photos - Responsive */}
        <div className="flex flex-col md:flex-row gap-3 xs:gap-4 sm:gap-4 md:gap-5 lg:gap-6 p-3 xs:p-4 sm:p-5 md:p-6 lg:p-6 pb-2 xs:pb-3 sm:pb-4">
          {/* Front Cover */}
          <div className="relative w-full md:w-1/2 h-48 xs:h-56 sm:h-60 md:h-64 lg:h-72 xl:h-80">
            <Image
              src="/Popup-books/book2-front.png"
              alt="Front Cover - Study Material Books"
              fill
              style={{ objectFit: "contain" }}
              className="rounded-md xs:rounded-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Back Cover */}
          <div className="relative w-full md:w-1/2 h-48 xs:h-56 sm:h-60 md:h-64 lg:h-72 xl:h-80">
            <Image
              src="/Popup-books/book2-back.png"
              alt="Back Cover - Study Material Books"
              fill
              style={{ objectFit: "contain" }}
              className="rounded-md xs:rounded-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        {/* Content Section with Scroll - Responsive */}
        <div className="p-3 xs:p-4 sm:p-5 md:p-6 lg:p-6 pt-0 flex-1 overflow-hidden flex flex-col min-h-0">
          <h3 className="text-lg xs:text-xl sm:text-xl md:text-2xl lg:text-2xl font-bold text-gray-800 mb-3 xs:mb-4">
            📚 Detailed Book Contents
          </h3>

          <div 
            ref={contentRef}
            className="overflow-y-auto pr-1 xs:pr-2 flex-1 min-h-0"
            style={{ 
              maxHeight: "calc(85vh - 400px)",
              maxHeight: "calc(88vh - 420px)",
              maxHeight: "calc(90vh - 440px)",
              maxHeight: "calc(92vh - 460px)",
              maxHeight: "calc(94vh - 480px)",
            }}
          >
            <div className="space-y-4 xs:space-y-5 sm:space-y-5 md:space-y-6 pb-3 xs:pb-4">
              {bookDescription.split("\n\n").map((paragraph, index, array) => {
                if (!paragraph.trim()) return null;
                
                if (paragraph.startsWith("Book ")) {
                  const bookMatch = paragraph.match(/^(Book \d+:)/);
                  if (bookMatch) {
                    const title = bookMatch[1];
                    const content = paragraph.replace(title, "");
                    return (
                      <div
                        key={index}
                        className={`pb-3 xs:pb-4 ${index < array.length - 2 ? 'border-b border-gray-300' : ''}`}
                      >
                        <h4 className="font-bold text-base xs:text-lg sm:text-lg md:text-xl text-blue-700 mb-1 xs:mb-2">
                          {title}
                        </h4>
                        <p className="text-gray-700 text-sm xs:text-base sm:text-base md:text-lg leading-relaxed">
                          {content}
                        </p>
                      </div>
                    );
                  }
                }

                return (
                  <div
                    key={index}
                    className="bg-blue-50 p-3 xs:p-4 rounded-lg border border-blue-200"
                  >
                    <p className="text-gray-800 font-medium text-sm xs:text-base sm:text-base md:text-lg">
                      {paragraph}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}