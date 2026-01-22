"use client";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export const FAQs = () => {
  const faqs = [
    {
      q: "How do I access study materials?",
      a: "Once you enroll, study material is provided in two ways. You get digital access through the website or ERP, and physical study material is also sent to you by post. This ensures you can study both online and offline without dependency on a single mode.",
    },
    {
      q: "Do I need to pay any extra fee for study material?",
      a: "No. There are no additional or hidden charges. All online study material is included with your enrollment and can be accessed freely through the website or ERP.",
    },
    {
      q: "Who prepares the study material?",
      a: "The study material is designed and curated by alumni from IITs, NIFT, and NID. It is structured according to current exam patterns and focuses on what is actually tested, not unnecessary theory.",
    },
    {
      q: "Which entrance exams does the study material cover?",
      a: "• The material covers all major design and architecture entrance exams including NIFT, NID, UCEED, CEED, NATA, and JEE Main for Architecture.",
    },
    {
      q: "What is the syllabus for the NIFT entrance exam?",
      a: "• NIFT has two major components. The General Ability Test covers quantitative ability, communication skills, English comprehension, analytical ability, and general knowledge. The Creative Ability Test evaluates creativity, design thinking, visualization, and drawing skills.",
    },
    {
      q: "What does the NID entrance exam syllabus include?",
      a: "SThe NID exam focuses heavily on creative thinking and design aptitude. It tests drawing ability, observation skills, logical reasoning, analytical thinking, and general awareness related to design and culture.",
    },
    {
      q: "What is included in the UCEED syllabus?",
      a: "UCEED evaluates visualization and spatial ability, observation and design sensitivity, analytical and logical reasoning, environmental and social awareness, and drawing skills. It is more logic-driven compared to NIFT and NID.",
    },
    {
      q: "What is covered in the CEED syllabus?",
      a: "CEED is meant for postgraduate design aspirants and focuses on advanced visualization, design thinking, problem-solving ability, logical reasoning, creativity, and drawing.",
    },
    {
      q: "What is the syllabus for NATA?",
      a: "NATA mainly tests drawing skills, architectural awareness, visual reasoning, and basic mathematics relevant to architecture and design.",
    },
    {
      q: "What does JEE Main Architecture test?",
      a: "JEE Main for Architecture includes mathematics, aptitude testing for spatial and visual reasoning, and a drawing section that checks perspective, proportion, and scene drawing.",
    },
    {
      q: "Where can I find the study material?",
      a: "Study material is available in multiple formats. Books are provided in different sections, downloadable resources are available on the website and ERP, and additional guidance is shared through the Inframe Design Institute YouTube channel.",
    },
    {
      q: "Are previous years' question papers provided?",
      a: "Yes. Previous years' question papers and exam-oriented practice questions are included so students understand the actual exam pattern and difficulty level.",
    },
    {
      q: "How important is drawing for these entrance exams?",
      a: "Drawing is critical for all design and architecture entrance exams. Ignoring drawing practice drastically reduces your chances of clearing the exam, regardless of how strong your theory preparation is.",
    },
    {
      q: "How should I prepare for the drawing section?",
      a: "You should practice sketching daily and focus on observation rather than copying. Work on basic forms, perspective, human figures, and composition. Drawing from real-life objects and environments improves accuracy and confidence.",
    },
    {
      q: "Is natural talent required for drawing?",
      a: "No. Drawing is a learnable skill. Consistent practice and correct guidance matter far more than natural talent.",
    },
    {
      q: "How important is general knowledge for these exams?",
      a: "General knowledge plays a significant role, especially in objective tests and interview rounds. Awareness of current affairs, art, design, fashion, and architecture strengthens both written and personal evaluation stages.",
    },
    {
      q: "What kind of general knowledge should I focus on?",
      a: "You should focus on current events, design and fashion trends, important designers, cultural history, and major developments in architecture and design",
    },
    {
      q: "Are mock tests really necessary?",
      a: "Yes. Mock tests are essential. They help you understand the exam format, improve time management, identify weak areas, and reduce exam anxiety..",
    },
    {
      q: "How often should I take mock tests?",
      a: "Initially, one mock test every two to three weeks is sufficient. As the exam approaches, this should increase to at least one or two mock tests per week.",
    },
    {
      q: "Can I prepare for multiple exams at the same time?",
      a: "Yes. Most design entrance exams have significant syllabus overlap. With proper planning, you can prepare for multiple exams simultaneously without extra effort.",
    },
    {
      q: "How many hours should I study daily?",
      a: "You should study for four to six focused hours daily. Anything less will slow progress, and anything more without structure leads to burnout.",
    },
    {
      q: "Should theory and drawing be studied separately?",
      a: "No. Both should be studied together. Balancing theory subjects like general knowledge and reasoning with practical drawing practice gives better overall results.",
    },
    {
      q: "What should I focus on in the last month before the exam?",
      a: "The final month should be used only for revision, mock tests, and strengthening weak areas. Starting new topics at this stage is a common and costly mistake.",
    },
    {
      q: "Is coaching necessary to clear these exams?",
      a: "Coaching is not mandatory, but it provides structure, expert feedback, and clarity on exam strategy. Many students fail not due to lack of ability but due to lack of direction.",
    },
    {
      q: "How do I prepare for interviews and portfolio rounds?",
      a: "Interview and portfolio preparation requires professional feedback and structured guidance. These skills are difficult to develop alone and are best handled through dedicated classes.",
    },
    {
      q: "Can beginners with no background join?",
      a: "Yes. The course starts from basic fundamentals and gradually builds up to an exam-ready level. No prior design experience is required.",
    },
    {
      q: "Is online preparation sufficient?",
      a: "Online preparation works only if you are disciplined and consistent. Without self-discipline, results suffer. A guided or blended approach works better for most students",
    },
    {
      q: "What is the biggest mistake students make during preparation?",
      a: "The biggest mistakes are irregular practice, ignoring drawing, avoiding mock tests, and studying without a clear strategy.",
    },
    {
      q: "How is doubt support provided during preparation?",
      a: "Students get dedicated doubt-solving support through online sessions, chat groups, and mentor guidance. This ensures that no concept remains unclear and students stay on the right preparation track.",
    },
    {
      q: "Do students get guidance for time management during exams?",
      a: "Yes. Special strategy sessions and mock test analysis help students learn how to manage time effectively during the exam and attempt maximum questions accurately",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  // Split FAQs into two columns with balanced heights
  const leftColumnFaqs = [];
  const rightColumnFaqs = [];

  // Alternate FAQ distribution for better visual balance
  faqs.forEach((faq, index) => {
    if (index % 2 === 0) {
      leftColumnFaqs.push({ ...faq, originalIndex: index });
    } else {
      rightColumnFaqs.push({ ...faq, originalIndex: index });
    }
  });

  return (
    <section className="py-8 sm:py-10 md:py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-black text-gray-900 mb-3 sm:mb-4 relative">
            <span className="relative z-10">
              <span className="bg-linear-to-r from-gray-900 via-black to-gray-900 bg-clip-text text-transparent">
                Frequently Asked
              </span>
              <span className="block bg-linear-to-r from-blue-700 via-blue-800 to-blue-900 bg-clip-text text-transparent mt-2 sm:mt-3 md:mt-4">
                Questions
              </span>
            </span>
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg max-w-xs sm:max-w-md md:max-w-2xl mx-auto px-2 sm:px-0">
            Get answers to common questions about our courses, preparation
            strategies, and more
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 items-start">
          {/* Left Column */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            {leftColumnFaqs.map((faq) => (
              <FAQCard
                key={faq.originalIndex}
                faq={faq}
                index={faq.originalIndex}
                openIndex={openIndex}
                setOpenIndex={setOpenIndex}
              />
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            {rightColumnFaqs.map((faq) => (
              <FAQCard
                key={faq.originalIndex}
                faq={faq}
                index={faq.originalIndex}
                openIndex={openIndex}
                setOpenIndex={setOpenIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

function FAQCard({ faq, index, openIndex, setOpenIndex }) {
  const isOpen = openIndex === index;

  return (
    <div
      className={`
        group bg-white border border-gray-200 rounded-lg sm:rounded-xl
        transition-all duration-300 ease-out
        hover:border-gray-300 hover:shadow-lg
        ${isOpen ? "shadow-md border-gray-300" : "shadow-sm"}
        flex flex-col h-full
      `}
      onClick={() => setOpenIndex(isOpen ? null : index)}
    >
      {/* Question Row */}
      <div className="p-4 sm:p-5 md:p-6 cursor-pointer flex items-start gap-3 sm:gap-4">
        {/* Number Badge */}
        <div
          className={`
          shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full 
          flex items-center justify-center
          ${
            isOpen
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-800 group-hover:bg-gray-200"
          } 
          transition-colors duration-300
        `}
        >
          <span className="font-bold text-xs sm:text-sm">
            {(index + 1).toString().padStart(2, "0")}
          </span>
        </div>

        {/* Question Text */}
        <div className="flex-1 min-w-0">
          <h3
            className={`
            text-sm sm:text-base md:text-lg font-semibold pr-6 sm:pr-8
            ${isOpen ? "text-black" : "text-gray-800 group-hover:text-black"}
            transition-colors duration-300
          `}
          >
            {faq.q}
          </h3>
        </div>

        {/* Chevron Icon */}
        <div className="shrink-0">
          <ChevronDown
            className={`
              w-5 h-5 sm:w-5 sm:h-5 transition-all duration-300
              ${
                isOpen
                  ? "rotate-180 text-black"
                  : "text-gray-500 group-hover:text-black"
              }
            `}
          />
        </div>
      </div>

      {/* Answer Section */}
      <div
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${
            isOpen
              ? "max-h-screen opacity-100 border-t border-gray-200"
              : "max-h-0 opacity-0"
          }
        `}
      >
        <div className="p-4 sm:p-5 md:p-6 pt-3 sm:pt-4 md:pt-5">
          <div className="text-gray-700 text-sm sm:text-base leading-relaxed space-y-2 sm:space-y-3">
            {faq.a.split("\n").map((line, i) => (
              <div key={i}>
                {line.startsWith("•") ? (
                  <div className="flex items-start gap-2">
                    <span className="text-black mt-1">•</span>
                    <span>{line.substring(1)}</span>
                  </div>
                ) : (
                  <p>{line}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
