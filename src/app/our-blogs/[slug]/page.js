'use client'
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import FullScreenLoader from "@/app/components/Loading"; // spinner component
import axios from "axios";

export default function BlogPage() {
    const apibaseurl = process.env.NEXT_PUBLIC_API_URL;
    const { slug } = useParams(); // get slug from URL
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        const fetchBlog = async () => {
            try {
                const res = await axios.get(`${apibaseurl}/blogs/${slug}`); // GET blog + sections
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

    if (loading) return <FullScreenLoader />;
    if (!blog) return <div className="text-center p-10 text-3xl font-bold">Blog not found</div>;

    return (
        <div className="w-full text-gray-900">
            {/* Hero Section */}
            <div className="relative w-full h-[60vh] bg-black text-white flex flex-col justify-center items-start px-8 lg:px-20">
                <img
                    loading="lazy"
                    src={blog.hero_image}
                    alt={blog.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <div className="relative z-10 max-w-3xl">
                    <h1 className="text-5xl lg:text-7xl font-extrabold mb-4">{blog.title}</h1>
                    <p className="text-lg lg:text-2xl mb-6">{blog.excerpt}</p>
                    <div className="flex gap-6 text-sm lg:text-base font-semibold">
                        <span>Category: {blog.category}</span>
                        <span>Author: {blog.author_name}</span>
                        <span>Date: {blog.date ? new Date(blog.date).toLocaleDateString() : "N/A"}</span>
                        <span>{blog.read_time} read</span>
                    </div>
                </div>
            </div>

            {/* Blog Sections */}
            <div className="max-w-5xl mx-auto px-6 lg:px-20 py-16">
                {blog.sections && blog.sections.length > 0 && blog.sections.map((section, idx) => (
                    <div key={section.id} className="mb-20">
                        {/* Section Title */}
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">{section.title}</h2>

                        {/* Section Image */}
                        {section.image && (
                            <img
                                src={section.image}
                                alt={section.title}
                                className="w-full h-[400px] lg:h-[500px] object-contain mb-6 rounded-lg shadow-lg"
                            />
                        )}

                        {/* Section Content */}
                        <p className="text-lg text-gray-800 mb-4">{section.content}</p>

                        {/* Section Quote */}
                        {section.quote && (
                            <blockquote className="border-l-4 border-black pl-6 italic text-gray-900 mb-4">
                                {section.quote} - {section.quote_author || "Unknown"}
                            </blockquote>
                        )}

                        {/* Section Highlights */}
                        {section.highlights && section.highlights.length > 0 && (
                            <ul className="list-disc pl-8 space-y-2 text-gray-800">
                                {section.highlights.map((h, i) => (
                                    <li key={i}>{h}</li>
                                ))}
                            </ul>
                        )}

                        {/* Divider */}
                        {idx < blog.sections.length - 1 && (
                            <hr className="my-10 border-gray-300" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
