"use client";
import { useState, useEffect, useRef } from "react";
import { Star, Award, Trophy, TrendingUp, GraduationCap } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "RUDRA PRATAP SINGH",
    exam: "NIFT 2024",
    rank: "",
    college: "NIFT Delhi",
    course: "B.Des Fashion Design",
    image: "/successStorys/success1.jpg",
    rating: 5,
    quote:
      "InFrame's study material was a game-changer! The NIFT-specific mock tests and creative exercises were exactly what I needed. The faculty's guidance on portfolio building helped me stand out in the interview round.",
    achievements: ["AIR 15 NIFT", "98% in CAT", "Best Portfolio Award"],
    enrolledIn: "Combo NIFT NID UCEED UG",
    result: "Selected in 3 Top Colleges",
    duration: "6 months",
    improvement: "From 70% to 98%",
  },
  {
    id: 2,
    name: "NURUDDIN MBM JODHPUR",
    exam: "NATA 2024",
    rank: "99.8 Percentile",
    college: "CEPT University",
    course: "B.Arch",
    image: "/successStorys/success4.jpg",
    rating: 5,
    quote:
      "I am Nuruddin. I am extremely thankful to Inframe Design Institute for teaching me in easy way as I am Hindi Medium school student. The classes was really helped me a lot in learning study material and its really helped in sketching practice. I was encouraged to develop my time management skills. Besides the classroom session, the aptitude analysis of test papers is also very detailed and easy for understanding. I am thankful to Inframe Design ..",
    achievements: ["99.8% NATA", "CEPT University", "Drawing Scholarship"],
    enrolledIn: "Combo NATA JEE UG",
    result: "Top 0.2% Nationally",
    duration: "6 months",
    improvement: "Drawing score 40 to 95",
  },
  {
    id: 3,
    name: "RAJIV TEKWANI",
    exam: "UCEED 2024",
    rank: "AIR 22",
    college: "IIT Bombay",
    course: "B.Des Industrial Design",
    image: "/successStorys/success3.jpg",
    rating: 4.5,
    quote:
      "I am student of the inframe design institute  I am very great full to IDI the motivation & competition it is so great here I really our my success  to my teachers they always kept me motivated & made me do my best it was very great experience for me  I will always be thankful  to inframe design institute.",
    achievements: ["AIR 22 UCEED", "99 percentile", "IIT Bombay Selection"],
    enrolledIn: "Combo NIFT NID UCEED UG",
    result: "Direct Admission IIT",
    duration: "7 months",
    improvement: "Score improved by 45%",
  },
  {
    id: 6,
    name: "AROSHI SONI",
    exam: "Multiple Exams 2024",
    rank: "AIR Top 50 All",
    college: "Multiple Offers",
    course: "B.Des Multiple Specializations",
    image: "/successStorys/success6.jpg",
    rating: 5,
    quote:
      "I'm Rachita Kushwaha And I've recently completed my 12th My interest in architecture developed 3 to 4 years back and since then I decided to appear for NATA exam for Indian Colleges  I searched online for NATA institutes and came across INFRAME Design Institute and guess what the teachers here guided and supported me so well that I cleared my NATA exam in the first attempt itself with a score of 131. The bond with the teachers and other students here was so good and comfortable and the teachers cleared my vision on how to approach the solutions of all questions which over all boosted my confidence.",
    achievements: ["NIFT: AIR 32", "NID: AIR 45", "UCEED: AIR 67"],
    enrolledIn: "Combo All Exams",
    result: "8 College Selections",
    duration: "9 months",
    improvement: "Cleared all 5 exams",
  },
  {
    id: 4,
    name: "KANIKA",
    exam: "NID 2024",
    rank: "AIR 8",
    college: "NID Ahmedabad",
    course: "B.Des Graphic Design",
    image: "/successStorys/success2.jpg",
    rating: 5,
    quote:
      "Inframe Design Institute offers excellent education and a creative environment, preparing students for the competitive design industry. With workshops, supportive faculty, and courses in interior design, graphic design, NIFT, NATA, NID, and Fine Arts, it's a highly recommended institute. Study materials are also provided..",
    achievements: ["AIR 8 NID", "100/100 in DAT", "Design Competition Winner"],
    enrolledIn: "Combo NIFT NID UCEED PG",
    result: "100% Scholarship",
    duration: "8 months",
    improvement: "From beginner to AIR 8",
  },
  {
    id: 5,
    name: "SAKSHI GADKARI",
    exam: "NIFT PG 2024",
    rank: "AIR 5",
    college: "NIFT Mumbai",
    course: "M.Des Interaction Design",
    image: "/successStorys/success5.jpg",
    rating: 5,
    quote:
      "I am thankful inframe design institute for my success  in NID the teachers are very helpful  supportive  the test conduced  by inframe design institute helped me in identifying my mistakes and rectifying  them  the study material given by IDI some of my week topics IDI also helped me in staying focused ..esting  and beneficiary  . All the subjects material  was fair enough  but would  especially  like appreciate drawing part  it made the subject  easy..",
    achievements: ["AIR 5 NIFT PG", "Work Ex: 3 years", "Corporate Sponsor"],
    enrolledIn: "Combo NIFT NID UCEED PG",
    result: "Got Campus Placement",
    duration: "10 months",
    improvement: "3rd attempt success",
  },
];

const statistics = [
  {
    number: "10,000+",
    label: "Success Stories",
    icon: <GraduationCap className="w-5 h-5 sm:w-6" />,
    target: 10000,
  },
  {
    number: "95%",
    label: "Selection Rate",
    icon: <TrendingUp className="w-5 h-5 sm:w-6" />,
    target: 95,
  },
  {
    number: "50+",
    label: "AIR Top 10",
    icon: <Trophy className="w-5 h-5 sm:w-6" />,
    target: 50,
  },
  {
    number: "6000+",
    label: "NID/NIFT Selections",
    icon: <Award className="w-5 h-5 sm:w-6" />,
    target: 6000,
  },
];

export const SuccessStories = () => {
  const [counterValues, setCounterValues] = useState([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3 sm:w-4 h-4 ${
              i < Math.floor(rating)
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-300 text-gray-300"
            }`}
          />
        ))}
        <span className="ml-1 text-xs sm:text-sm font-medium text-gray-700">
          {rating}/5
        </span>
      </div>
    );
  };

  const animateCounter = (start, end, duration, index) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentValue = Math.floor(progress * (end - start) + start);

      setCounterValues((prev) => {
        const newValues = [...prev];
        newValues[index] = currentValue;
        return newValues;
      });

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCounterValues((prev) => {
          const newValues = [...prev];
          newValues[index] = end;
          return newValues;
        });
      }
    };
    window.requestAnimationFrame(step);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            statistics.forEach((stat, index) => {
              if (stat.number.includes("+")) {
                const cleanNumber = stat.number
                  .replace(",", "")
                  .replace("+", "");
                const targetNum = parseInt(cleanNumber);
                animateCounter(0, targetNum, 2000, index);
              } else if (stat.number.includes("%")) {
                const targetNum = parseInt(stat.number.replace("%", ""));
                animateCounter(0, targetNum, 1500, index);
              }
            });
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className="py-8 sm:py-10 md:py-12 bg-linear-to-b from-white to-gray-50"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8">
          {/* Success Stories Badge - aligned above "Transforming" */}
          <div className="flex justify-center mb-2 sm:mb-3">
            <div className="w-fit">
              <span className="text-xs sm:text-sm md:text-base font-semibold text-blue-600 bg-blue-50 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 rounded-full whitespace-nowrap border border-blue-100 shadow-sm">
                REAL SUCCESS STORIES
              </span>
            </div>
          </div>

          {/* Main Heading with Trophy Image before "Transforming" */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            {/* Trophy Icon */}
            <div className="relative shrink-0 order-1 sm:order-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-linear-to-br from-black to-gray-800 rounded-lg sm:rounded-xl shadow-lg flex items-center justify-center p-1.5 sm:p-2 md:p-2.5">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 bg-linear-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-sm">
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Heading Text */}
            <div className="order-2 sm:order-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-black text-gray-900 tracking-tight">
                <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                  <span className="bg-linear-to-r from-gray-900 via-black to-gray-900 bg-clip-text text-transparent whitespace-nowrap">
                    Transforming
                  </span>
                  <span className="bg-linear-to-r from-blue-700 via-blue-800 to-blue-900 bg-clip-text text-transparent whitespace-nowrap">
                    Dreams Into Reality
                  </span>
                </div>
              </h2>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="text-center mb-5 sm:mb-6 md:mb-8">
          <p className="text-gray-700 text-sm sm:text-base md:text-lg max-w-2xl sm:max-w-3xl mx-auto leading-relaxed font-medium">
            Real students, real results. Discover inspiring journeys of students
            who transformed their dreams into top design college admissions.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-10">
          {statistics.map((stat, index) => (
            <div
              key={index}
              className="relative bg-white rounded-lg p-3 sm:p-4 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              <div className="absolute -top-2 -right-2 w-8 h-8 sm:w-9 sm:h-9 bg-linear-to-br from-black to-gray-800 rounded-full flex items-center justify-center shadow-md">
                <div className="text-white">{stat.icon}</div>
              </div>

              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {hasAnimated ? (
                  <>
                    {stat.number.includes("+") ? (
                      <>
                        {counterValues[index].toLocaleString("en-IN")}
                        <span className="text-gray-900">+</span>
                      </>
                    ) : stat.number.includes("%") ? (
                      <>
                        {counterValues[index]}
                        <span className="text-gray-900">%</span>
                      </>
                    ) : (
                      counterValues[index].toLocaleString("en-IN")
                    )}
                  </>
                ) : (
                  "0"
                )}
              </div>

              <div className="text-xs sm:text-sm text-gray-600 font-medium">
                {stat.label}
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-gray-800 to-gray-600 rounded-full transition-all duration-2000 ease-out"
                  style={{
                    width: hasAnimated ? "100%" : "0%",
                    transitionDelay: `${index * 100}ms`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* All Stories Grid */}
        <div>
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
              Success Stories
            </h3>
            <div className="text-xs sm:text-sm text-gray-600">
              {testimonials.length} stories
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {testimonials.map((story) => (
              <div
                key={story.id}
                className="group bg-white rounded-lg p-4 sm:p-5 shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer flex flex-col h-full"
              >
                {/* Student Info Section - Fixed height */}
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="relative shrink-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white shadow-md">
                      <img
                        src={story.image}
                        alt={story.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "/default-avatar.jpg";
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-base sm:text-lg text-gray-900 truncate">
                      {story.name}
                    </h4>
                    <div className="text-sm sm:text-base text-gray-600 font-medium mb-1">
                      {story.exam}
                    </div>
                  </div>
                </div>

                {/* Quote Section - Flexible height */}
                <div className="flex-1 mb-3 sm:mb-4">
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed line-clamp-4">
                    "{story.quote}"
                  </p>
                </div>

                {/* Bottom Section - Fixed height */}
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex-1">{renderStars(story.rating)}</div>
                    <span className="text-xs sm:text-sm text-gray-500 font-medium truncate">
                      {story.enrolledIn}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
