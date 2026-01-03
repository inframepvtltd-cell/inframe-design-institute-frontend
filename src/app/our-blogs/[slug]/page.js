'use client'
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import FullScreenLoader from "@/app/components/Loading"; // spinner component
import axios from "axios";

export default function BlogPage() {
    const apibaseurl = process.env.NEXT_PUBLIC_API_URL;
    const { slug } = useParams(); // ✅ get slug from URL
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        const fetchBlog = async () => {
            try {
                const res = await axios.get(`${apibaseurl}/blogs/${slug}`); // ✅ GET method
                setBlog(res.data.data);
            } catch (err) {
                console.error(err);
                setBlog(null);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [slug, apibaseurl]);

    if (loading) return <FullScreenLoader />; // full screen loader
    if (!blog) return <div className="text-center p-10 text-3xl font-bold  ">Blog not found</div>;

    return (
        <div className="max-w-[800px] mx-auto p-5">
            <h1 className="text-4xl font-bold mb-3">{blog.title}</h1>
            <p className="text-gray-600 mb-5">{blog.excerpt}</p>
            <img
                src={blog.hero_image}
                alt={blog.title}
                className="w-full h-[400px] object-cover mb-5 rounded"
            />
            <p className="text-gray-800 font-semibold">Category: {blog.category}</p>
            <p className="text-gray-800 font-semibold">Read Time: {blog.read_time}</p>
            <p className="text-gray-800 font-semibold">Author: {blog.author_name}</p>
            <p className="text-gray-800 font-semibold">
                Date: {blog.date ? new Date(blog.date).toLocaleDateString() : "N/A"}
            </p>

            {blog.sections && blog.sections.length > 0 && (
                <div className="mt-10">
                    {blog.sections.map((section) => (
                        <div key={section.id} className="mb-10">
                            <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
                            {section.image && (
                                <img
                                    src={section.image}
                                    alt={section.title}
                                    className="w-full h-[300px] object-cover mb-3 rounded"
                                />
                            )}
                            <p className="text-gray-700 mb-2">{section.content}</p>
                            {section.quote && (
                                <blockquote className="border-l-4 border-black pl-4 italic text-gray-800">
                                    "{section.quote}" - {section.quote_author || "Unknown"}
                                </blockquote>
                            )}
                            {section.highlights && section.highlights.length > 0 && (
                                <ul className="list-disc pl-5 mt-2 text-gray-700">
                                    {section.highlights.map((h, idx) => (
                                        <li key={idx}>{h}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
