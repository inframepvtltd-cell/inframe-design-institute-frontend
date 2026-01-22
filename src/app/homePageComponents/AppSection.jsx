"use client";

export default function AppSection() {




  return (
    <div className="w-full lg:p-0 p-3 lg:mt-[60px] my-[20px] overflow-hidden">
      <div className="lg:mx-6 mx-3">
        <div className="max-w-[1320px] bg-[#f8f8f8] grid sm:grid-cols-[70%_auto] items-center mx-auto rounded-[10px] ">
          <div className="lg:p-10 p-5" >
            <h3 className="lg:text-[30px] text-[25px] font-bold">
              Download Our App For Better Experience
            </h3>
            <ul>
              <li className="my-[15px] text-[20px]">
                Live & recorded classes available at ease
              </li>
              <li className="my-[15px] text-[20px]">
                Dashboard for progress tracking
              </li>
              <li className="my-[15px] text-[20px]">
                Lakhs of practice questions
              </li>
            </ul>
            <div className="flex items-center gap-5 my-[25px]">
              <img
                className="lg:w-[140px] w-[120px] cursor-pointer object-contain"
                src="https://www.pw.live/_next/static/media/google-play-badge.171251c3.webp"
                alt=""
              />
              <img
                className="lg:w-[140px] w-[120px] cursor-pointer object-contain"
                src="https://www.pw.live/_next/static/media/apple-store-badge.acb101ce.webp"
                alt=""
              />
            </div>
          </div>
          {/* <div className="lg:w-[320px] h-[auto]">
            <img
              className="w-full h-full object-contain rounded-[10px]"
              src="https://www.pw.live/_next/static/media/download-app-right-image.aaca3c09.webp"
              alt=""
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}
