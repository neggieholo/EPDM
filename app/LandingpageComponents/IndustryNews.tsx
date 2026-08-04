'use client'


import React, { useState } from "react";

interface NewsLink {
    _id: string;
    title: string;
    link: string;
}

interface NewsLinksProps {
    links: NewsLink[];
}

const NewsLinks: React.FC<NewsLinksProps> = ({ links }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    if (!links || links.length === 0) {
        return (
            <section className="w-full min-h-screen bg-white flex flex-col items-center py-10 relative pt-50">
                <p className="text-center text-gray-500 py-10">No news links available</p>
            </section>
        );
    }

    const totalPages = Math.ceil(links.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentLinks = links.slice(startIndex, startIndex + itemsPerPage);

    return (
        <section className="w-full min-h-screen bg-white flex flex-col items-center py-10 relative pt-50">
            {/* Header */}
            <div className="w-full flex items-center justify-center p-4 mb-8">
                <div className="flex flex-col justify-evenly shadow-strong bg-primary items-center text-center h-auto py-8 px-5">
                    <h2 className="text-7xl font-extrabold mb-2 text-white leading-tight">
                        INDUSTRY
                    </h2>
                    <h2 className="text-7xl font-extrabold mb-2 text-white leading-tight">
                        NEWS
                    </h2>
                </div>
            </div>

            {/* News links container */}
            <div className="w-[85%] md:w-[70%] bg-accent/50 border border-accent/20 p-8">
                <div className="h-[70vh] pr-3 p-2 space-y-4">
                    {currentLinks.map((link) => (
                        <div
                            key={link._id}
                            className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-accent/10"
                        >
                            <span className="font-semibold text-gray-800">{link.title}</span>
                            <a
                                href={link.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent hover:scale-110 transition-transform text-xl"
                                title="Open link"
                            >
                                🔗
                            </a>
                        </div>
                    ))}
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
        </section>
    );
};

export default NewsLinks;
