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

  const itemsPerPage = 6;

  const isLocalPage =
    nameA === "Local" ||
    nameA === "Decarbonization" ||
    nameA === "CSR" ||
    nameA === "Tender";

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
    <section className="bg-white w-full px-5 py-10">
      <div className="w-full flex flex-col gap-6">
        {/* TOP: PAGE HEADING */}
        <div className="w-full bg-primary shadow-strong rounded-lg px-6 py-8 flex items-center justify-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight text-center uppercase">
            {[nameA, nameB, nameC].filter(Boolean).join(" ")}
          </h2>
        </div>

        {/* CATEGORY TABS */}
        {isLocalPage && (
          <div className="flex w-full border-b border-gray-200 overflow-x-auto">
            {(["Operators", "Service Companies"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1);
                }}
                className={`flex-1 py-3 px-2 sm:px-4 text-sm font-bold whitespace-nowrap transition-all ${
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

        {/* SEARCH BAR */}
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />

          <input
            type="text"
            placeholder={
              isLocalPage ? "Search title or company..." : "Search by title..."
            }
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm text-black"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* CONTENT LIST */}
        <div className="w-full flex flex-col gap-3 bg-accent/5 p-3 rounded-xl">
          {currentcontents.length > 0 ? (
            currentcontents.map((content) => (
              <Link key={content._id} href={`/${address}/${content._id}`}>
                <div className="p-4 bg-accent/90 hover:bg-primary rounded-xl border border-accent/20 flex justify-between items-center gap-3 active:scale-[0.98] transition-all group shadow-sm">
                  <div className="flex flex-col min-w-0 pr-2">
                    <h3 className="text-base sm:text-lg font-bold text-white line-clamp-2 group-hover:text-yellow-400">
                      {content.heading}
                    </h3>

                    {isLocalPage && content.companyName && (
                      <span className="text-[10px] text-gray-200 uppercase tracking-widest mt-1 font-bold">
                        {content.companyName}
                      </span>
                    )}
                  </div>

                  <ArrowRight className="w-5 h-5 text-white shrink-0 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-400 text-center py-8">
              No matching information available.
            </p>
          )}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-2 px-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-3 bg-gray-100 rounded-xl disabled:opacity-30 text-primary font-bold text-sm"
            >
              Previous
            </button>

            <span className="text-sm font-medium text-gray-500">
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-3 bg-gray-100 rounded-xl disabled:opacity-30 text-primary font-bold text-sm"
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
