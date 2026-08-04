"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

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

const MobIndustryInfo: React.FC<IndustryInfoProps> = ({
  contents,
  nameA,
  nameB,
  nameC,
  address,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"Operators" | "Service Companies">(
    "Operators",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 6; // slightly more for mobile scrolling
  const isLocalPage = nameA === "Local";

  const filteredContents = useMemo(() => {
    if (!contents) return [];
    return contents.filter((item) => {
      const matchesTab = isLocalPage ? item.type === activeTab : true;
      const searchLower = searchQuery.toLowerCase();
      const headingMatch = item.heading.toLowerCase().includes(searchLower);
      const companyMatch =
        isLocalPage && item.companyName
          ? item.companyName.toLowerCase().includes(searchLower)
          : false;

      return matchesTab && (headingMatch || companyMatch);
    });
  }, [contents, activeTab, searchQuery, isLocalPage]);

  if (!contents || contents.length === 0) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center bg-white px-6">
        <p className="text-center text-gray-400 text-base">
          No {`${nameA || ""} ${nameB || ""} ${nameC || ""}`.trim()} found.
        </p>
      </section>
    );
  }

  const totalPages = Math.ceil(filteredContents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentcontents = filteredContents.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <section className="pt-24 bg-white pb-10">
      {" "}
      {/* Reduced top padding for mobile */}
      <div className="px-4 w-full">
        {/* Header - Scaled down for Mobile */}
        <div className="w-full flex flex-col bg-primary items-center text-center py-6 px-4 rounded-xl shadow-md mb-6">
          <h2 className="text-3xl font-black text-white leading-tight uppercase">
            {nameA} {nameB}
          </h2>
          <h2 className="text-3xl font-black text-white leading-tight uppercase">
            {nameC}
          </h2>
        </div>

        {/* Conditional Tabs - Full width on Mobile */}
        {isLocalPage && (
          <div className="flex w-full border-b border-gray-100 mb-4 overflow-x-auto no-scrollbar">
            {(["Operators", "Service Companies"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1);
                }}
                className={`flex-1 py-3 px-2 text-sm font-bold whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? "border-b-4 border-primary text-primary"
                    : "text-gray-400"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        {/* Search Bar - Compact */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 text-sm text-black"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* List - Full Width */}
        <div className="flex flex-col gap-3">
          {currentcontents.map((content) => (
            <Link key={content._id} href={`/${address}/${content._id}`}>
              <div className="p-4 bg-accent/90 rounded-2xl border border-accent/20 flex justify-between items-center active:scale-[0.98] transition-transform">
                <div className="flex flex-col pr-4">
                  <h3 className="text-lg font-bold text-white line-clamp-2">
                    {content.heading}
                  </h3>
                  {isLocalPage && content.companyName && (
                    <span className="text-[10px] text-gray-300 uppercase tracking-widest mt-1 font-bold">
                      {content.companyName}
                    </span>
                  )}
                </div>
                <ArrowRight className="w-5 h-5 text-white shrink-0" />
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination - Mobile Style */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-8 px-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-3 bg-gray-100 rounded-xl disabled:opacity-30 text-primary font-bold text-sm"
            >
              Prev
            </button>

            <span className="text-sm font-medium text-gray-500">
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-3 bg-gray-100 rounded-xl disabled:opacity-30 text-primary font-bold text-sm"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MobIndustryInfo;
