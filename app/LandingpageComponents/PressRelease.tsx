'use client';

import React, { useState } from "react";
import Link from "next/link";

// Types
interface Section {
    type: "paragraph" | "image" | "video";
    content: string;
    caption?: string;
}

export interface PressRelease {
    _id: string;
    heading: string;
    sections: Section[];
    createdAt?: string;
    updatedAt?: string;
}

interface PressReleasesProps {
    releases: PressRelease[] | null;
}

const PressReleases: React.FC<PressReleasesProps> = ({ releases }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    if (!releases || releases.length === 0) {
        return (
            <section className="min-h-[80vh] flex items-center justify-center bg-white pt-32">
                <p className="text-center text-gray-500 text-lg">
                    No press releases available.
                </p>
            </section>
        );
    }

    const totalPages = Math.ceil(releases.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentReleases = releases.slice(startIndex, startIndex + itemsPerPage);

    return (
        <section className="pt-25">
            <div className="flex justify-center bg-white items-center">
                <div className="w-[70%] flex flex-col h-auto pt-25 px-5 bg-white pb-7">
                    {/* Heading */}
                    <div className="w-full flex items-center justify-center p-4 mb-8">
                        <div className="flex flex-col justify-evenly shadow-strong bg-primary items-center text-center h-auto py-8 px-5">
                            <h2 className="text-7xl font-extrabold mb-2 text-white leading-tight">
                                PRESS
                            </h2>
                            <h2 className="text-7xl font-extrabold mb-2 text-white leading-tight">
                                RELEASES
                            </h2>
                        </div>
                    </div>

                    {/* Press Release Cards */}
                    <div className="grid grid-cols-3 sm:grid-cols-2 gap-6 h-[70vh] overflow-y-auto">
                        {currentReleases.map((release) => {
                            const imageSection = release.sections.find((s) => s.type === "image");
                            const textSection = release.sections.find((s) => s.type === "paragraph");

                            return (
                                <Link key={release._id} href={`/pressreleases/${release._id}`}>
                                    <div className="bg-accent/50 rounded-xl p-5 border border-accent/40 shadow-[0_8px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.35)] hover:translate-y-[-3px] transition-all duration-300">
                                        {imageSection ? (
                                            <img
                                                src={imageSection.content}
                                                alt={imageSection.caption || "Press release image"}
                                                className="w-full h-40 object-cover rounded-md mb-4"
                                            />
                                        ) : (
                                            <div className="w-full h-40 bg-base-300 flex items-center justify-center text-gray-500 rounded-md mb-4">
                                                No Image
                                            </div>
                                        )}

                                        <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                                            {release.heading}
                                        </h3>
                                        <p className="text-sm text-gray-300 line-clamp-3">
                                            {textSection?.content ||
                                                "Click to read more about our latest updates."}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Pagination Controls */}
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

export default PressReleases;
