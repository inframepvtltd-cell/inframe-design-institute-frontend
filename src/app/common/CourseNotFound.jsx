import Link from "next/link";

export default function CourseNotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">

            {/* Big Icon / Emoji */}
            <div className="text-[120px] mb-4">📚</div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4">
                Course Not Found
            </h1>

            {/* Description */}
            <p className="text-gray-500 max-w-xl text-lg md:text-xl mb-8">
                The course you're looking for doesn't exist or the URL may be incorrect.
                Please check the link or explore our available courses.
            </p>

            {/* Buttons */}
            <div className="flex gap-4 flex-wrap justify-center">
                <Link
                    href="/"
                    className="px-8 py-3 bg-black text-white rounded-lg text-lg hover:bg-gray-800 transition"
                >
                    Go to Home
                </Link>

                {/* <Link
                    href="/courses"
                    className="px-8 py-3 border border-gray-300 rounded-lg text-lg hover:bg-gray-100 transition"
                >
                    View Courses
                </Link> */}
            </div>
        </div>
    );
}
