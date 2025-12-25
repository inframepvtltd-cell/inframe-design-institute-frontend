'use client'
import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";


export default function Blogs() {

    const [activeTab, setActiveTab] = useState('All')
    const Categories = [
        "All",
        "Education",
        "Career",
        "Facilities",
        "Alumni",
        "Curriculum",
        "Placements",
        "Faculty",
        "Student Life",
        "Video Editing",
        "BBA Course in Advertising and Marketing",
        "ws2"
    ];
    const categoryData = [
        { src: 'https://www.inframeschool.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdobngibkc%2Fimage%2Fupload%2Fv1753263888%2Fcarimagecover%2Fusjs5r4cwdtjmxkhbfui.jpg&w=1920&q=75', heading: 'Inspiring Education' },
        { src: 'https://www.inframeschool.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdobngibkc%2Fimage%2Fupload%2Fv1753444785%2Fcarimagecover%2Fhekf6lj5fjgnx2d4ffve.jpg&w=1920&q=75', heading: 'Inspiring Education' },
        { src: 'https://www.inframeschool.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdobngibkc%2Fimage%2Fupload%2Fv1753443614%2Fcarimagecover%2Fcvipey1iu9hs0kzyrxf4.jpg&w=1920&q=75', heading: 'Inspiring Education' },
        { src: 'https://www.inframeschool.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdobngibkc%2Fimage%2Fupload%2Fv1753263888%2Fcarimagecover%2Fusjs5r4cwdtjmxkhbfui.jpg&w=1920&q=75', heading: 'Inspiring Education' },
        { src: 'https://www.inframeschool.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdobngibkc%2Fimage%2Fupload%2Fv1753444785%2Fcarimagecover%2Fhekf6lj5fjgnx2d4ffve.jpg&w=1920&q=75', heading: 'Inspiring Education' },
        { src: 'https://www.inframeschool.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdobngibkc%2Fimage%2Fupload%2Fv1753443614%2Fcarimagecover%2Fcvipey1iu9hs0kzyrxf4.jpg&w=1920&q=75', heading: 'Inspiring Education' },
        { src: 'https://www.inframeschool.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdobngibkc%2Fimage%2Fupload%2Fv1753263888%2Fcarimagecover%2Fusjs5r4cwdtjmxkhbfui.jpg&w=1920&q=75', heading: 'Inspiring Education' },
        { src: 'https://www.inframeschool.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdobngibkc%2Fimage%2Fupload%2Fv1753444785%2Fcarimagecover%2Fhekf6lj5fjgnx2d4ffve.jpg&w=1920&q=75', heading: 'Inspiring Education' },
        { src: 'https://www.inframeschool.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdobngibkc%2Fimage%2Fupload%2Fv1753443614%2Fcarimagecover%2Fcvipey1iu9hs0kzyrxf4.jpg&w=1920&q=75', heading: 'Inspiring Education' },
        { src: 'https://www.inframeschool.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdobngibkc%2Fimage%2Fupload%2Fv1753263888%2Fcarimagecover%2Fusjs5r4cwdtjmxkhbfui.jpg&w=1920&q=75', heading: 'Inspiring Education' },
        { src: 'https://www.inframeschool.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdobngibkc%2Fimage%2Fupload%2Fv1753444785%2Fcarimagecover%2Fhekf6lj5fjgnx2d4ffve.jpg&w=1920&q=75', heading: 'Inspiring Education' },
        { src: 'https://www.inframeschool.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdobngibkc%2Fimage%2Fupload%2Fv1753443614%2Fcarimagecover%2Fcvipey1iu9hs0kzyrxf4.jpg&w=1920&q=75', heading: 'Inspiring Education' },
    ]

    return (
        <div className="w-full ">
            <h3 className="px-6 lg:text-[40px] text-center text-gray-900 text-[25px] font-semibold   pt-5  capitalize">Our Blogs</h3>
            <div className="flex flex-col p-3 bg-white  mb-5 items-center gap-5">
                <p className="text-center lg:text-[30px] text-[20px] mb-2 text-gray-900">Discover insights, stories, and the latest updates from Inframe School</p>
                <div className="relative bg-white w-full max-w-md rounded-md">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        {/* Search Icon (SVG) */}
                        <IoMdSearch
                            className="text-[25px] text-gray-900"
                        />
                    </span>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full border-[1] border-gray-900 pl-10 text-md pr-4 py-3 rounded-md focus:outline-none focus:ring-[2px] focus:border-transparent"
                    />
                </div>
            </div>

            <div className="max-w-[1320] mx-auto lg:px-6 px-3 " >
                <span className="text-[30px] border-b-[3] text-gray-900">Categories </span>
                <div className="w-full scrollbar overflow-x-auto my-5">
                    <div className="flex whitespace-nowrap">
                        {Categories.map((item, index) => {
                            return (
                                <button
                                    onClick={() => setActiveTab(item)}
                                    key={index}
                                    className={`${item == activeTab ? 'bg-gray-900 text-white border-gray-900' : 'bg-transparent text-gray-900 border-gray-900'} mb-4 mx-[3px]  border-[1]   px-4 py-2 rounded-[5px] cursor-pointer hover:bg-gray-900 hover:border-transparent hover:text-white duration-300 `}
                                >
                                    {item}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8 my-[40px]">
                    {categoryData.map((item, index) => {
                        return (
                            <div key={index} className="relative w-full max-w-sm h-[400px] rounded-lg overflow-hidden shadow-lg group cursor-pointer">
                                {/* Background Image */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                    style={{ backgroundImage: `url(${item.src})` }}
                                ></div>

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black to-transparent opacity-80"></div>

                                {/* Text Content */}
                                <div className="absolute bottom-0 p-4 text-white">
                                    <h3 className="text-2xl font-bold mb-1">Inspiring Education</h3>
                                    <p className="text-md mb-3 line-clamp-2">
                                        Discover how our modern curriculum is reshaping the way students learn in the digital age.
                                    </p>
                                    <button className="bg-transparent border-2 border-white hover:border-transparent text-white text-[16px] font-semibold px-6 w-full my-[10px] py-2 rounded hover:bg-white hover:text-gray-900 transition duration-300 cursor-pointer">
                                        Read More
                                    </button>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}