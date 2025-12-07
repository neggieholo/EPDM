'use client';

import React, { useState } from "react";
import Link from "next/link";

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

const MobIndustryInfo: React.FC<IndustryInfoProps> = ({ contents, nameA, nameB, nameC, address }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

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
    <section className="bg-white w-full px-5 py-10">
        <div className="flex flex-col md:flex-row h-auto md:h-auto pt-10 md:pt-25">
            <div className="w-full md:w-[70%] flex flex-col pt-10 px-4 md:px-5 pb-7">

                {/* Heading */}
                <div className="w-full flex items-center justify-center p-4 mb-6 md:mb-0">
                    <div className="flex flex-col justify-evenly bg-primary items-center text-center shadow-strong h-auto md:h-[80%] py-8 px-5">
                        <h2 className="text-4xl font-extrabold text-white leading-tight">
                            {nameA}
                        </h2>
                        <h2 className="text-4xl font-extrabold text-white leading-tight">
                            {nameB}
                        </h2>
                        {nameC && <h2 className="text-4xl font-extrabold text-white leading-tight">
                            {nameC}
                        </h2>}
                    </div>
                </div>

                {/* Vertical List */}
                <div className="flex flex-col gap-3 md:gap-4">

                    {currentcontents.map((content) => (
                        <Link key={content._id} href={`/${address}/${content._id}`}>
                            <div className="p-3 md:p-4 bg-accent/40 hover:bg-accent/60 rounded-lg 
                                border border-accent/30 transition-all cursor-pointer shadow-md 
                                hover:shadow-lg">

                                <h3 className="text-lg md:text-xl font-semibold text-white">
                                    {content.heading}
                                </h3>
                            </div>
                        </Link>
                    ))}

                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-6 gap-3 md:gap-4">
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-2 md:px-4 md:py-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>

                    <span className="px-3 py-2 text-sm md:text-base">
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 md:px-4 md:py-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    </section>
);
};

export default MobIndustryInfo;
