"use client";

export const WhyInFrame = () => {
  const points = [
    {
      icon: "🎯",
      title: "100% Exam Focused",
      description:
        "Specially designed material for NIFT, NID, UCEED, NATA, JEE & GATE exams, covering full syllabus, latest patterns, key concepts, and practice for top results.",
    },
    {
      icon: "📈",
      title: "Proven Results",
      description:
        "1000+ successful admissions with AIR 1, 2, and 3 ranks across multiple national-level entrance exams with consistently proven results.",
    },
    {
      icon: "👨‍🏫",
      title: "Expert Created",
      description:
        "Created by IIT, NID, and NIFT alumni with 10+ years of teaching experience, delivering expert guidance and proven preparation strategies.",
    },
    {
      icon: "🔄",
      title: "Always Updated",
      description:
        "Regularly updated content based on latest syllabus, exam patterns, and evolving question trends to keep students always exam-ready.",
    },
    {
      icon: "📚",
      title: "Combo Mastery",
      description:
        "Integrated books covering NIFT, JEE & GATE combo subjects - bridging design creativity with engineering precision for comprehensive preparation.",
    },
    {
      icon: "🤝",
      title: "Complete Support",
      description:
        "Complete support with doubt solving sessions, personal mentorship, and career guidance to help students stay confident and focused.",
    },
  ];

  return (
    <section className="py-6 sm:py-8 md:py-12 lg:py-16 bg-linear-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section - Center aligned and improved */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-extrabold mb-4 leading-tight tracking-tight relative">
            <span className="relative z-10">
              <span className="bg-linear-to-r from-gray-900 via-black to-gray-900 bg-clip-text text-transparent">
                Why Choose
              </span>
              <span className="bg-linear-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent ml-3">
                InFrame?
              </span>
            </span>
          </h2>
          <p className="text-gray-700 text-base sm:text-lg max-w-2xl sm:max-w-3xl mx-auto leading-relaxed font-medium px-2">
            6 compelling reasons why thousands of students trust InFrame for
            their design entrance preparation
          </p>
        </div>

        {/* Rest of your existing code remains exactly the same */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {points.map((point, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 transition-all duration-300 hover:scale-[1.02] border border-gray-200 hover:border-black shadow-sm hover:shadow-lg cursor-pointer flex flex-col h-full"
            >
              {/* Number Badge - Smaller */}
              <div className="absolute -top-1.5 -left-1.5 w-6 h-6 sm:w-7 sm:h-7 bg-linear-to-br from-black to-gray-800 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm">
                {index + 1}
              </div>

              {/* Icon + Title - Minimal spacing */}
              <div className="flex items-center gap-2 mb-3">
                {/* Icon - Smaller */}
                <div className="text-xl sm:text-2xl lg:text-3xl">
                  {point.icon}
                </div>

                {/* Title - Adjusted size */}
                <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 leading-tight">
                  {point.title}
                </h3>
              </div>

              {/* Description - Adjusted size */}
              <p className="text-gray-700 text-xs sm:text-sm lg:text-base leading-relaxed">
                {point.description}
              </p>

              {/* Bottom Gradient Border */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-gray-800 to-transparent opacity-0 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
