'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";


export default function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAllBlogs = async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await fetch("http://localhost:9200/web/blogs"); // your backend API
            if (!res.ok) throw new Error("Failed to fetch blogs");

            const data = await res.json();
            if (data.success) {
                setBlogs(data.data);
            } else {
                throw new Error("No blogs found");
            }

        } catch (err) {
            console.error("Error fetching blogs:", err.message);
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Fetch blogs on component mount
    useEffect(() => {
        fetchAllBlogs()
    }, []);

    // 🔹 Render
    if (loading) return <div className="p-5 text-center">Loading blogs...</div>;
    if (error) return <div className="p-5 text-center text-red-500">{error}</div>;


    return (
        <div className="w-full bg-white text-gray-900">
            {/* Header */}
            <div className="max-w-[1320px] mx-auto py-10 px-4">
                <h1 className="text-[36px] lg:text-[48px] font-bold mb-2">Our Blogs</h1>
                <p className="text-[18px] lg:text-[20px] text-gray-700">
                    Discover insights, stories, and the latest updates from Inframe School
                </p>
            </div>

            {/* Blog Cards */}
            <div className="max-w-[1320px] mx-auto px-4 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 mb-20">
                {blogs.map((blog) => (
                    <div
                        key={blog.id}
                        className="relative w-full h-[450px] rounded-lg overflow-hidden shadow-lg group cursor-pointer bg-black border border-gray-200"
                    >
                        {/* Hero Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                            style={{ backgroundImage: `url('https://res.cloudinary.com/denc4i3lt/image/upload/v1767426949/blogging-fun-content-creation-online-streaming-video-blog-young-girl-making-selfie-social-network-sharing-feedback-self-promotion-strategy-vector-isolated-concept-metaphor-illustration_335657-855_ywqa2r.avif')` }}
                        ></div>

                        {/* Overlay */}

                        <p className="text-sm uppercase absolute top-3 right-3 bg-green-500 text-white z-40 px-4 py-1 rounded-full mb-1">{blog.category}</p>

                        {/* Text Content */}
                        <div className="absolute bg-white text-black bottom-0 p-5">

                            <h2 className="text-xl lg:text-2xl font-bold mb-2 line-clamp-2">
                                {blog.title}
                            </h2>
                            <p className="text-sm mb-3 line-clamp-3">{blog.excerpt}</p>

                            {/* <div className="flex items-center mb-3">
                                {blog.author_image && (
                                    <img
                                        src={blog.author_image}
                                        alt={blog.author_name}
                                        className="w-8 h-8 rounded-full mr-2 object-cover"
                                    />
                                )}
                                <span className="text-sm">{blog.author_name}</span>
                            </div> */}

                            <div className="flex justify-between text-xs mb-3">
                                <span>{new Date(blog.date).toLocaleDateString()}</span>
                                <span>{blog.read_time} read</span>
                            </div>

                            {/* Read More Button */}
                            <Link href={`/our-blogs/${blog.slug}`}>
                                <button className="w-full py-1 cursor-pointer px-4 text-white hover:bg-transparent border-2 border-transparent hover:border-black rounded bg-black hover:text-black transition duration-300 font-semibold">
                                    Read More
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}