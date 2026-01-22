"use client";

import {
  BookOpen,
  Lightbulb,
  Clock,
  BarChart,
  Zap,
  Award,
  Star,
} from "lucide-react";

const features = [
  {
    icon: <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Comprehensive Coverage",
    description:
      "Complete syllabus coverage with detailed topic-wise breakdown and advanced concepts to ensure thorough and exam-focused preparation.",
    linear: "from-blue-500 to-cyan-400",
  },
  {
    icon: <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Creative Exercises",
    description:
      "500+ practical exercises designed to enhance creativity, visualization skills, and drawing performance for design entrance tests.",
    linear: "from-orange-500 to-yellow-400",
  },
  {
    icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Time Management",
    description:
      "Proven time-management strategies and practice techniques to help you attempt maximum questions accurately in competitive exams.",
    linear: "from-green-500 to-emerald-400",
  },
  {
    icon: <BarChart className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Progress Tracking",
    description:
      "Smart performance tracking with AI-powered analytics to monitor growth, identify weak areas, and improve consistently.",
    linear: "from-purple-500 to-pink-400",
  },
  {
    icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Concept Clarity",
    description:
      "Crystal-clear explanation of fundamental to advanced concepts, ensuring strong understanding and long-term retention.",
    linear: "from-red-500 to-orange-400",
  },
  {
    icon: <Award className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Topper's Strategy",
    description:
      "Learn battle-tested preparation strategies and exam approaches used successfully by previous year toppers.",
    linear: "from-indigo-500 to-blue-400",
  },
];

export const StudyMaterialFeatures = () => {
  return (
    <section className="pt-2 pb-6 sm:pt-3 sm:pb-8 md:pt-4 md:pb-12 bg-linear-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Header Section - Reduced spacing */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          {/* Premium Features Badge - Reduced spacing */}
          <div className="flex justify-center mb-1 sm:mb-2">
            <div className="text-left w-fit">
              <span className="text-xs sm:text-sm md:text-base font-semibold text-blue-600 bg-blue-50 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full whitespace-nowrap border border-blue-100 shadow-sm">
                PREMIUM FEATURES
              </span>
            </div>
          </div>

          {/* Main Heading with Star Icon - Reduced spacing */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            {/* Star Icon */}
            <div className="relative shrink-0 order-2 sm:order-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg sm:rounded-xl shadow-md flex items-center justify-center p-2 sm:p-2.5">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-4.5 sm:h-4.5 bg-yellow-400 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Main Heading */}
            <div className="order-1 sm:order-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
                <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                  <span className="whitespace-nowrap">
                    Why Our Study Material
                  </span>
                  <span className="relative inline-block mt-1 sm:mt-0">
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-blue-700 to-purple-600 whitespace-nowrap">
                      Stands Out
                    </span>
                    <span className="absolute -bottom-1 left-0 right-0 h-1 sm:h-1.5 bg-linear-to-r from-blue-500 to-purple-500 rounded-full"></span>
                  </span>
                </div>
              </h2>
            </div>
          </div>

          {/* Subtitle - Reduced spacing */}
          <div className="text-center">
            <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg max-w-xs sm:max-w-md md:max-w-2xl mx-auto leading-relaxed font-medium px-2 sm:px-0">
              Engineered for excellence with cutting-edge features that give you
              the competitive edge
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-5 transition-all duration-300 hover:scale-[1.02] border border-gray-200 hover:border-black shadow-sm hover:shadow-md cursor-pointer flex flex-col h-full"
            >
              <div className="absolute -top-1.5 -left-1.5 w-6 h-6 sm:w-7 sm:h-7 bg-linear-to-br from-black to-gray-800 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm">
                0{index + 1}
              </div>

              <div className="flex items-center gap-2.5 mb-2.5 sm:mb-3">
                <div
                  className={`shrink-0 p-2 sm:p-2.5 w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-linear-to-r ${feature.linear} shadow-sm flex items-center justify-center`}
                >
                  <div className="text-white">{feature.icon}</div>
                </div>

                <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 leading-tight">
                  {feature.title}
                </h3>
              </div>

              <p className="text-gray-700 text-xs sm:text-sm lg:text-base leading-relaxed flex-1">
                {feature.description}
              </p>

              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-gray-800 to-transparent opacity-0 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
  