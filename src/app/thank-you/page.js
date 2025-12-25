'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaAngleDoubleDown, FaAngleDoubleRight } from 'react-icons/fa';

export default function ThankYou() {
    const scrollToFooter = () => {
        window.scrollBy({
            top: 850,
            behavior: 'smooth',
        });
    };
    const router = useRouter();

    return (
        <div className="w-full h-[90vh] relative shadow-2xl bg-black text-white py-16 px-8">
            <h1 className="text-5xl font-extrabold text-center flex items-center justify-center gap-3">
                🎉 Thank You for Registering!
            </h1>
            <p className="text-center mt-6 text-[22px] leading-relaxed max-w-5xl mx-auto">
                Welcome to our community! We&#39;re excited to have you onboard. Start your journey today and unlock amazing opportunities.
            </p>

            <div className="flex justify-center mt-10">
                <Link href={'/'}><button
                    onClick={() => router.push('/')}
                    aria-label="Go to homepage"
                    className="bg-[#19ad5c] px-8 py-3 rounded-md text-[20px] font-semibold hover:text-gray-950 hover:bg-white transition cursor-pointer  duration-300 ease-in-out"
                >
                    Go to Homepage
                </button></Link>
            </div>

            {/* Social Share Section */}
            <div className="mt-12 text-center">
                <p className="mb-4 text-gray-300">Share your excitement and See our features click to visit the platform !</p>
                <div className="flex justify-center gap-6">
                    <a
                        href="https://twitter.com/intent/tweet?text=I%20just%20joined%20this%20amazing%20community!%20Join%20us%20now%20at%20https://yourwebsite.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Share on Twitter"
                        className="bg-blue-600 px-5 py-2 rounded-md text-white font-semibold hover:bg-blue-700 transition"
                    >
                        LinkedIn
                    </a>
                    <a
                        href="https://www.facebook.com/sharer/sharer.php?u=https://yourwebsite.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Share on Facebook"
                        className="bg-red-600 px-5 py-2 rounded-md text-white font-semibold hover:bg-red-700 transition"
                    >
                        Youtube
                    </a>
                    <a
                        href="https://www.linkedin.com/shareArticle?mini=true&url=https://yourwebsite.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Share on LinkedIn"
                        className="bg-blue-800 px-5 py-2 rounded-md text-white font-semibold hover:bg-blue-700 transition"
                    >
                        Facebook
                    </a>
                </div>
                <div className="mt-[80px] text-center max-w-md mx-auto px-4">
                    <p className="text-lg font-medium mb-3 text-gray-700">
                        Ready to take the next step?
                    </p>
                    <p className="mb-6 text-gray-600">
                        Click below to explore the wide range of courses we offer and start learning today!
                    </p>
                    <button
                        onClick={scrollToFooter}
                        className="bg-purple-600 px-6 py-3 rounded-md text-[20px] font-semibold hover:bg-purple-800 transition cursor-pointer duration-300 ease-in-out flex items-center gap-3 justify-center mx-auto text-white"
                        aria-label="Explore the courses below"
                    >
                        Explore the courses below <FaAngleDoubleDown />
                    </button>
                </div>

            </div>
            {/* Optional footer
            <footer className="mt-16 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} YourCompany. All rights reserved.
            </footer> */}
        </div>
    );
}
