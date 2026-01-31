'use client';

import { FaDownload } from "react-icons/fa";

export default function Download() {

    const allData = [
        {
            category: 'Admission',
            description: 'Enhance your skills with our curated resources designed for students in the fields of art, design, and business. These downloadable materials are free and updated regularly.',
            pdfs: [
                { pdfName: 'Brochue', pdfDes: 'Brochue Is a collection of student data' },
                { pdfName: 'Scholarship and discount', pdfDes: 'Scholarship and discount' },
                { pdfName: 'Admisson process', pdfDes: 'Admisson process' }
            ]
        },
        {
            category: 'syllabus',
            description: 'Enhance your skills with our curated resources designed for students in the fields of art, design, and business. These downloadable materials are free and updated regularly.',
            pdfs: [
                { pdfName: 'nift ug ', pdfDes: 'Brochue Is a collection of student data' },
                { pdfName: 'nid ug', pdfDes: 'Brochue Is a collection of student data' },
                { pdfName: 'uceed ug', pdfDes: 'Brochue Is a collection of student data' },
                { pdfName: 'nata ug', pdfDes: 'Brochue Is a collection of student data' },
                { pdfName: 'jee barch gate', pdfDes: 'Brochue Is a collection of student data' },
                { pdfName: 'nift pg', pdfDes: 'Brochue Is a collection of student data' },
                { pdfName: 'nid pg', pdfDes: 'Brochue Is a collection of student data' },
                { pdfName: 'ceed pg', pdfDes: 'Brochue Is a collection of student data' }
            ]
        },
        {
            category: 'time table',
            description: 'Enhance your skills with our curated resources designed for students in the fields of art, design, and business. These downloadable materials are free and updated regularly.',
            pdfs: [
                { pdfName: 'nift ug ', pdfDes: 'Brochue Is a collection of student data' },
                { pdfName: 'nid ug', pdfDes: 'Brochue Is a collection of student data' },
                { pdfName: 'uceed ug', pdfDes: 'Brochue Is a collection of student data' },
                { pdfName: 'nata ug', pdfDes: 'Brochue Is a collection of student data' },
                { pdfName: 'jee barch gate', pdfDes: 'Brochue Is a collection of student data' },
                { pdfName: 'nift pg', pdfDes: 'Brochue Is a collection of student data' },
                { pdfName: 'nid pg', pdfDes: 'Brochue Is a collection of student data' },
                { pdfName: 'ceed ', pdfDes: 'Brochue Is a collection of student data' },


            ]
        },
        {
            category: 'previous year question paper',
            description: 'Enhance your skills with our curated resources designed for students in the fields of art, design, and business. These downloadable materials are free and updated regularly.',
            pdfs: [
                { pdfName: 'nift ug ', pdfDes: 'Brochue Is a collection of student data' },
                { pdfName: 'nid ug', pdfDes: 'Brochue Is a collection of student data' },
                { pdfName: 'uceed ug', pdfDes: 'Brochue Is a collection of student data' },
                { pdfName: 'nata ug', pdfDes: 'Brochue Is a collection of student data' },
                { pdfName: 'jee barch gate', pdfDes: 'Brochue Is a collection of student data' },
                { pdfName: 'nift pg', pdfDes: 'Brochue Is a collection of student data' },
                { pdfName: 'nid pg', pdfDes: 'Brochue Is a collection of student data' },
                { pdfName: 'ceed ', pdfDes: 'Brochue Is a collection of student data' },
            ]
        },
        {
            category: 'sample paper',
            description: 'Enhance your skills with our curated resources designed for students in the fields of art, design, and business. These downloadable materials are free and updated regularly.',
            pdfs: [
                { pdfName: 'nift ug ', pdfDes: 'Brochue Is a collection of student data' },
                { pdfName: 'nid ug', pdfDes: 'Brochue Is a collection of student data' },
                { pdfName: 'uceed ug', pdfDes: 'Brochue Is a collection of student data' },
                { pdfName: 'nata ug', pdfDes: 'Brochue Is a collection of student data' },
                { pdfName: 'jee barch gate', pdfDes: 'Brochue Is a collection of student data' },
                { pdfName: 'nift pg', pdfDes: 'Brochue Is a collection of student data' },
                { pdfName: 'nid pg', pdfDes: 'Brochue Is a collection of student data' },
                { pdfName: 'ceed ', pdfDes: 'Brochue Is a collection of student data' },
            ]
        },
        {
            category: 'Tips',
            description: 'Enhance your skills with our curated resources designed for students in the fields of art, design, and business. These downloadable materials are free and updated regularly.',
            pdfs: [
                { pdfName: '10 Tips for how to crack IIT', pdfDes: 'Brochue Is a collection of student data' },
                { pdfName: '10 Tips for how to crack JEE', pdfDes: 'Brochue Is a collection of student data' },
                { pdfName: '10 Tips for how to crack NIFT', pdfDes: 'Brochue Is a collection of student data' },
                { pdfName: '10 Tips for how to crack NID', pdfDes: 'Brochue Is a collection of student data' },
                { pdfName: '10 Tips for how to crack UCEED', pdfDes: 'Brochue Is a collection of student data' },
                { pdfName: '10 Tips for how to crack NATA', pdfDes: 'Brochue Is a collection of student data' },
            ]
        },




    ]

    return (
        <div className="w-full bg-white min-h-screen">
            <div className="max-w-[1320px] mx-auto px-6">
                {allData.map((item, index) => {
                    return (
                        <div key={index} className="mb-[60px] h-auto bg-white pt-8">
                            <h2 className="text-3xl lg:text-4xl font-bold  mb-4 text-gray-900 capitalize">{item.category}</h2>
                            <p className=" text-gray-900 mb-10">
                                {item.description}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center justify-between">

                                {item.pdfs.map((pdfItem, pdfIndex) => {
                                    return (
                                        <div key={pdfIndex} className="bg-white shadow-lg rounded-xl p-6 flex items-start gap-4 hover:shadow-xl transition">
                                            <div className="text-gray-900 text-2xl mt-3">
                                                <FaDownload />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-lg font-semibold text-gray-800">{pdfItem.pdfName}</h4>
                                                <p className="text-sm text-gray-900 mb-2">{pdfItem.pdfDes}</p>
                                                <a

                                                    download
                                                    className="inline-block text-sm text-white bg-gray-900 hover:bg-gray-950 px-4 py-1.5 mt-2 rounded-md transition cursor-pointer"
                                                >
                                                    Download
                                                </a>
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>
                        </div>
                    )
                })}


            </div>
        </div>
    );
}
