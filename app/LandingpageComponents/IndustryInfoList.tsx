'use client';

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

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
  companyName?: string;
  type?: "Operators" | "Service Companies";
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
    const [activeTab, setActiveTab] = useState<
      "Operators" | "Service Companies"
    >("Operators");
    const [searchQuery, setSearchQuery] = useState("");
    const itemsPerPage = 4;
    const isLocalPage = nameA === "Local";

    const filteredContents = useMemo(() => {
      if (!contents) return [];

      const isLocal = nameA === "Local";

      return contents.filter((item) => {
        // 1. Tab Filtering (Only apply if nameA is "Local")
        const matchesTab = isLocal ? item.type === activeTab : true;

        // 2. Search Filtering
        const searchLower = searchQuery.toLowerCase();
        const headingMatch = item.heading.toLowerCase().includes(searchLower);

        // Only check company name if it's Local content
        const companyMatch =
          isLocal && item.companyName
            ? item.companyName.toLowerCase().includes(searchLower)
            : false;

        return matchesTab && (headingMatch || companyMatch);
      });
    }, [contents, activeTab, searchQuery, nameA]);


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
    const currentcontents = filteredContents.slice(
      startIndex,
      startIndex + itemsPerPage,
    );

    return (
      <section className="pt-48 bg-white">
        <div className="flex justify-center bg-white items-center">
          <div className="w-full md:w-[70%] flex flex-col py-8">
            {/* Heading */}
            <div className="w-full flex items-center justify-center p-4 mb-10">
              <div className="flex flex-col justify-evenly bg-primary items-center text-center py-8 px-5 rounded shadow-lg">
                {nameA && (
                  <h2 className="text-5xl font-extrabold text-white tracking-wider">
                    {nameA}
                  </h2>
                )}
                {nameB && (
                  <h2 className="text-5xl font-extrabold text-white tracking-wider">
                    {nameB}
                  </h2>
                )}
                {nameC && (
                  <h2 className="text-5xl font-extrabold text-white tracking-wider">
                    {nameC}
                  </h2>
                )}
              </div>
            </div>

            {isLocalPage && (
              <div className="flex border-b border-gray-200 mb-6">
                {(["Operators", "Service Companies"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setCurrentPage(1);
                    }}
                    className={`py-3 px-6 font-bold transition-all ${
                      activeTab === tab
                        ? "border-b-4 border-primary text-primary"
                        : "text-gray-400 hover:text-primary"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            )}

            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={
                  isLocalPage
                    ? "Search title or company..."
                    : "Search by title..."
                }
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            {/* Vertical List */}
            <div className="min-h-[40vh] flex flex-col gap-4 bg-accent/5 p-4 rounded-xl">
              {currentcontents.map((content) => (
                <Link key={content._id} href={`/${address}/${content._id}`}>
                  <div className="p-5 bg-accent/90 hover:bg-primary rounded-lg border border-accent/30 transition-all cursor-pointer shadow-md group flex justify-between items-center">
                    <div className="flex flex-col">
                      <h3 className="text-xl font-bold text-white group-hover:text-yellow-400">
                        {content.heading}
                      </h3>
                      {/* Only show Company Name if it's Local Content */}
                      {isLocalPage && content.companyName && (
                        <span className="text-sm text-gray-200 uppercase font-medium mt-1">
                          {content.companyName}
                        </span>
                      )}
                    </div>
                    <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-2 transition-transform" />
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
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
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
