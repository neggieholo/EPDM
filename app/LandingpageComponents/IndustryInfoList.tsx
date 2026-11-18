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
    const isLocal = nameA === "Local" || nameA === "Decarbonization" || nameA === "CSR" || nameA === "Tender";

    const filteredContents = useMemo(() => {
      if (!contents) return [];;

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
  <section className="w-full bg-white py-12 md:py-16 px-5 items-start justify-center min-h-[70vh] flex">
    <div className="max-w-5xl mx-auto w-full">
      {isLocal ? (
        /* LOCAL CONTENT: FULL-WIDTH LAYOUT */
        <div className="flex flex-col gap-6">
          {/* TOP: Heading */}
          <div className="bg-primary shadow-strong rounded-lg px-6 py-8 md:px-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight text-center">
              {[nameA, nameB, nameC].filter(Boolean).join(" ")}
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {(["Operators", "Service Companies"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1);
                }}
                className={`py-3 px-4 sm:px-6 font-bold transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? "border-b-4 border-primary text-primary"
                    : "text-gray-400 hover:text-primary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

            <input
              type="text"
              placeholder="Search title or company..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Full-width Content List */}
          <div className="min-h-[40vh] flex flex-col gap-4 bg-accent/5 p-4 rounded-xl">
            {currentcontents.length > 0 ? (
              currentcontents.map((content) => (
                <Link key={content._id} href={`/${address}/${content._id}`}>
                  <div className="p-5 bg-accent/90 hover:bg-primary rounded-lg border border-accent/30 transition-all cursor-pointer shadow-md group flex justify-between items-center gap-3">
                    <div className="flex flex-col min-w-0">
                      <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-yellow-400">
                        {content.heading}
                      </h3>

                      {content.companyName && (
                        <span className="text-sm text-gray-200 uppercase font-medium mt-1">
                          {content.companyName}
                        </span>
                      )}
                    </div>

                    <ArrowRight className="w-6 h-6 shrink-0 text-white group-hover:translate-x-2 transition-transform" />
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-400 text-center py-8">
                No matching information available.
              </p>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center items-center mt-2 gap-3">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
              >
                Previous
              </button>

              <span className="px-4 py-2 text-sm">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      ) : (
        /* OTHER CONTENT: TWO-COLUMN LAYOUT */
        <div className="flex flex-col sm:flex-row items-stretch justify-center gap-6 md:gap-10">
          {/* LEFT: Heading */}
          <div className="flex items-center justify-center bg-primary shadow-strong rounded-lg px-6 py-8 md:px-8 shrink-0">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight text-center sm:text-left">
              {[nameA, nameB, nameC].filter(Boolean).map((name, index) => (
                <React.Fragment key={name}>
                  {index > 0 && <br />}
                  {name}
                </React.Fragment>
              ))}
            </h2>
          </div>

          {/* RIGHT: Content */}
          <div className="flex-1 min-w-0 flex flex-col justify-center py-4 sm:py-6 text-primary">
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

              <input
                type="text"
                placeholder="Search by title..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            {/* List */}
            <div className="min-h-[40vh] flex flex-col gap-4 bg-accent/5 p-4 rounded-xl">
              {currentcontents.length > 0 ? (
                currentcontents.map((content) => (
                  <Link key={content._id} href={`/${address}/${content._id}`}>
                    <div className="p-5 bg-accent/90 hover:bg-primary rounded-lg border border-accent/30 transition-all cursor-pointer shadow-md group flex justify-between items-center gap-3">
                      <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-yellow-400">
                        {content.heading}
                      </h3>

                      <ArrowRight className="w-6 h-6 shrink-0 text-white group-hover:translate-x-2 transition-transform" />
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-gray-400 text-center py-8">
                  No matching information available.
                </p>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-wrap justify-center items-center mt-6 gap-3">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
                >
                  Previous
                </button>

                <span className="px-4 py-2 text-sm">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  </section>
);

};

export default IndustryInfo;
