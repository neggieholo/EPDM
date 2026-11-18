/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";

interface TenderSection {
  type: "image" | "pdf";
  content: string;
}

export interface TenderOpportunity {
  _id: string;
  heading: string;
  type: "Operators" | "Service Companies";
  companyName?: string;
  deadlineDate: string;
  sections: TenderSection[];
  createdAt?: string;
  updatedAt?: string;
}

interface TenderOpportunitiesProps {
  opportunities: TenderOpportunity[] | null;
}

const TenderOpportunities: React.FC<TenderOpportunitiesProps> = ({
  opportunities,
}) => {
  const [activeTab, setActiveTab] = useState<"Operators" | "Service Companies">(
    "Operators",
  );

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

  const filteredOpportunities = (opportunities || []).filter(
    (opportunity) => opportunity.type === activeTab,
  );

  const totalPages = Math.ceil(filteredOpportunities.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentOpportunities = filteredOpportunities.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const formatDate = (date: string) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="w-full bg-white py-12 md:py-16 px-5 items-start justify-center min-h-[70vh] flex">
      <div className="max-w-5xl mx-auto w-full flex flex-col gap-6">
        {/* PAGE HEADING */}
        <div className="bg-primary shadow-strong rounded-lg px-6 py-8 md:px-8 flex items-center justify-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight text-center">
            TENDER
            <br />
            OPPORTUNITIES
          </h2>
        </div>

        {/* CATEGORY TABS */}
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

        {/* OPPORTUNITIES GRID */}
        <div className="w-full bg-accent/5 p-4 sm:p-6 md:p-8 rounded-xl border border-accent/20">
          {currentOpportunities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {currentOpportunities.map((opportunity) => {
                const imageSection = opportunity.sections?.find(
                  (section) => section.type === "image",
                );

                const pdfSection = opportunity.sections?.find(
                  (section) => section.type === "pdf",
                );

                return (
                  <div
                    key={opportunity._id}
                    className="h-full bg-white rounded-xl border border-gray-100 shadow-[0_8px_20px_rgba(0,0,0,0.10)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.18)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  >
                    {/* COMPANY IMAGE */}
                    <div className="w-full h-36 sm:h-40 bg-white flex items-center justify-start px-5 pt-4">
                      {imageSection ? (
                        <img
                          src={imageSection.content}
                          alt={`${opportunity.companyName || "Company"} logo`}
                          className="w-full h-full object-contain object-left"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No Company Image
                        </div>
                      )}
                    </div>

                    {/* OPPORTUNITY DETAILS */}
                    <div className="px-5 pb-6 pt-2">
                      {/* TENDER HEADING */}
                      <h3 className="text-lg md:text-xl font-bold text-primary leading-snug mb-2">
                        {opportunity.heading}
                      </h3>

                      {/* COMPANY NAME */}
                      {opportunity.companyName?.trim() && (
                        <p className="text-sm text-gray-500 uppercase font-medium mb-3">
                          {opportunity.companyName}
                        </p>
                      )}

                      {/* DEADLINE DATE */}
                      <p className="text-sm font-medium text-primary">
                        Deadline Date:{" "}
                        <span className="text-red-600">
                          {formatDate(opportunity.deadlineDate)}
                        </span>
                      </p>

                      {/* PDF LINK */}
                      {pdfSection && (
                        <a
                          href={pdfSection.content}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-primary hover:text-secondary hover:underline"
                        >
                          View Tender Document
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M14 3h7v7" />
                            <path d="M10 14 21 3" />
                            <path d="M21 14v7H3V3h7" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-gray-400 text-base">
                No tender opportunities available for {activeTab}.
              </p>
            </div>
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center items-center mt-8 gap-3">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
              >
                Previous
              </button>

              <span className="px-4 py-2 text-sm text-primary">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TenderOpportunities;
