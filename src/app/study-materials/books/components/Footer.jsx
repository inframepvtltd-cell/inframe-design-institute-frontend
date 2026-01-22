"use client";

export const Footer = () => {
  return (
    <footer className="bg-linear-to-b from-black via-[#050505] to-black text-white relative">
      {/* Top Yellow Line */}
      <div className="h-0.75 bg-[#f8d374] w-full"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 text-center mb-20 sm:mb-0">
        {/* Main Text */}
        <h2 className="text-lg md:text-xl font-semibold">
          © 2025 Inframe Design Institute
        </h2>

        <p className="text-gray-400 text-sm mt-3 px-2 sm:px-0">
          A unit of Inframe Educational Society, registered under the Rajasthan Society Act.
        </p>

        <p className="text-gray-400 text-sm mt-3 px-2 sm:px-0">
          We are a registered society and do not charge GST on our courses. Therefore, GST is not applicable.
        </p>

        {/* Highlight Line */}
        <p className="text-[#f8d374] font-medium mt-6 text-sm md:text-base px-2 sm:px-0">
          🎨 Transform your career with expert-led design education
        </p>

        {/* Divider */}
        <div className="w-full h-px bg-gray-800 mt-6 sm:mt-8 mb-6 sm:mb-8"></div>

        {/* Contact Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
          {/* Phone Button */}
          <a
            href="tel:+919649964937"
            className="flex items-center gap-2 border border-[#f8d374] px-4 sm:px-5 py-2 rounded-full text-sm hover:bg-[#f8d374] hover:text-black transition w-full sm:w-auto justify-center"
          >
            <span>📞</span>
            <span className="whitespace-nowrap">+91 9649 9649 37</span>
          </a>

          {/* Email Button - Text wrap for mobile */}
          <a
            href="mailto:info@inframedesigninstitute.com"
            className="flex items-center gap-2 border border-[#f8d374] px-4 sm:px-5 py-2 rounded-full text-sm hover:bg-[#f8d374] hover:text-black transition w-full sm:w-auto justify-center text-center"
          >
            <span className="hidden sm:inline">✉️</span>
            <span className="sm:hidden">📧</span>
            <span className="break-all sm:break-normal text-xs sm:text-sm">
              info@inframedesigninstitute.com
            </span>
          </a>
        </div>
      </div>
      
      {/* Fixed footer se bachane ke liye padding */}
      <div className="h-24 sm:h-10"></div>
    </footer>
  );
};