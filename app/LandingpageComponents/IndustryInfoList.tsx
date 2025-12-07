'use client';

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Types
interface IndustrySection {
    type: "paragraph" | "image" | "video" | "pdf";
    content: string;
    caption?: string;
}

export interface IndustryInfo {
    _id: string;
    heading: string;
    sections: IndustrySection[];
    createdAt?: string;
    updatedAt?: string;
}

interface IndustryInfoProps {
    contents: IndustryInfo[] | null;
    nameA?: string;
    nameB?: string;
    nameC?: string;
    address: string;
}

const IndustryInfo: React.FC<IndustryInfoProps> = ({ contents, nameA, nameB, nameC, address }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    if (!contents || contents.length === 0) {
        return (
            <section className="min-h-[80vh] flex items-center justify-center bg-white pt-32">
                <p className="text-center text-gray-500 text-lg">
                    No {`${nameA || ""} ${nameB || ""} ${nameC || ""}`.trim()} available.
                </p>
            </section>
        );
    }

    const totalPages = Math.ceil(contents.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentcontents = contents.slice(startIndex, startIndex + itemsPerPage);

    return (
        <section className="pt-48 bg-white">
            <div className="flex justify-center bg-white items-center">
                <div className="w-full md:w-[70%] flex flex-col py-8">

                    {/* Heading */}
                    <div className="w-full flex items-center justify-center p-4 mb-10">
                        <div className="flex flex-col justify-evenly bg-primary items-center text-center py-8 px-5 rounded shadow-lg">
                            {nameA && <h2 className="text-5xl font-extrabold text-white tracking-wider">{nameA}</h2>}
                            {nameB && <h2 className="text-5xl font-extrabold text-white tracking-wider">{nameB}</h2>}
                            {nameC && <h2 className="text-5xl font-extrabold text-white tracking-wider">{nameC}</h2>}
                        </div>
                    </div>

                    {/* Vertical List */}
                    <div className="h-[70vh] flex flex-col gap-4 bg-accent/20 p-4">
                        {currentcontents.map((content) => (
                            <Link key={content._id} href={`/${address}/${content._id}`}>
                                <div className="p-4 bg-accent/80 hover:bg-accent/60 rounded-lg border border-accent/30 transition-all cursor-pointer shadow-md hover:shadow-lg group flex justify-between">
                                    <h3 className="text-xl font-semibold text-white group-hover:underline">
                                        {content.heading}
                                    </h3>
                                    <ArrowRight className="w-5 h-5" />
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-6 gap-4">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Previous
                        </button>

                        <span className="px-4 py-2">
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default IndustryInfo;
