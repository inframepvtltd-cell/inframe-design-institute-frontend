"use client";
import { useEffect, useRef, useState } from "react";
import { BottomEnrollFooter } from "./BottomEnrollNow";

export const HeaderOffer = () => {
  const durationRef = useRef(2 * 60 * 60);
  const [timeLeft, setTimeLeft] = useState(durationRef.current);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? durationRef.current : prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const h = String(Math.floor(timeLeft / 3600)).padStart(2, "0");
  const m = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0");
  const s = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="  z-50 w-full bg-black">
      <div className="mx-auto flex items-center w-[92%] max-w-6xl h-14 shadow-[0_0_20px_rgba(255,215,0,0.35)] overflow-hidden">
        <div className="flex gap-10 animate-marquee py-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center gap-6 whitespace-nowrap text-xl text-white font-medium"
            >
              <span className="text-white font-bold animate-pulse">
                🎉 26 JAN 75% OFF 🎉
              </span>

              <span className="font-semibold">
                Ends in:
                <span className="text-white ml-2">
                  {h} : {m} : {s}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-marquee {
          display: inline-flex;
          animation: marquee 20s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
      <BottomEnrollFooter />
    </div>
  );
};
