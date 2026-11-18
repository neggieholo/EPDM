"use client";

import React, { useState } from "react";

interface Career {
  _id: string;
  title: string;
  companyName: string;
  companyType: "EPDM" | "Operators" | "Service Companies";
  location: string;
  jobType: "Full-Time" | "Contract" | "Part-Time" | "Internship";
  deadline: string | Date;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  applicationUrlOrEmail: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface CareersProps {
  careerList: Career[];
}

const Careers: React.FC<CareersProps> = ({ careerList }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const itemsPerPage = 5;

  // Filter out vacancies whose deadline dates have passed
  const activeCareers = careerList.filter((career) => {
    const deadline = new Date(career.deadline);
    deadline.setHours(23, 59, 59, 999);

    return deadline >= new Date();
  });

  const totalPages = Math.ceil(activeCareers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCareers = activeCareers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleApplication = (application: string) => {
    if (application.includes("@")) {
      window.location.assign(`mailto:${application}`);
    } else {
      window.open(application, "_blank", "noopener,noreferrer");
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="w-full min-h-[70vh] bg-white flex items-start justify-center px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-5 sm:gap-6">
        {/* PAGE HEADING */}
        <div className="w-full bg-primary shadow-strong rounded-lg px-5 py-7 sm:px-8 sm:py-9 flex items-center justify-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight text-center">
            CAREERS
          </h1>
        </div>

        {/* CAREER LISTINGS CONTAINER */}
        <div className="w-full bg-accent/5 border border-accent/20 rounded-xl p-3 sm:p-5 md:p-7">
          {activeCareers.length > 0 ? (
            <>
              <div className="flex flex-col gap-4 sm:gap-6 min-h-[40vh]">
                {currentCareers.map((career) => {
                  const isExpanded = expandedId === career._id;

                  return (
                    <article
                      key={career._id}
                      className="w-full bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6 md:p-7 transition-all duration-200 hover:shadow-md"
                    >
                      {/* JOB HEADER */}
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
                        {/* COMPANY AND JOB INFORMATION */}
                        <div className="min-w-0 flex-1">
                          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                            {career.companyName}
                          </p>

                          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-black leading-snug mb-2">
                            {career.title}
                          </h2>

                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-gray-600">
                            <span>{career.location}</span>

                            <span className="hidden sm:inline">•</span>

                            <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-xs font-medium">
                              {career.companyType}
                            </span>
                          </div>
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-3 w-full md:w-auto shrink-0">
                          <button
                            type="button"
                            onClick={() => toggleExpand(career._id)}
                            className="w-full sm:w-auto border border-gray-300 bg-white text-gray-700 font-semibold text-xs sm:text-sm px-3 sm:px-4 py-2.5 rounded-md hover:bg-gray-50 transition-colors"
                          >
                            {isExpanded ? "Hide Details" : "View Details"}
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleApplication(career.applicationUrlOrEmail)
                            }
                            className="w-full sm:w-auto bg-accent text-white font-semibold text-xs sm:text-sm px-4 sm:px-6 py-2.5 rounded-md hover:opacity-90 transition-opacity"
                          >
                            Apply Here
                          </button>
                        </div>
                      </div>

                      {/* JOB TYPE */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-xs sm:text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-full px-3 py-1">
                          {career.jobType}
                        </span>
                      </div>

                      {/* JOB SUMMARY */}
                      <div>
                        <p className="text-sm sm:text-base text-gray-700 leading-6 sm:leading-7 whitespace-pre-line">
                          {career.summary}
                        </p>
                      </div>

                      {/* EXPANDED DETAILS */}
                      {isExpanded && (
                        <div className="mt-6 pt-5 sm:pt-6 border-t border-gray-100">
                          {/* APPLICATION DEADLINE */}
                          <div className="mb-6 bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
                            <p className="text-sm font-semibold text-gray-800">
                              Application Deadline:{" "}
                              <span className="font-normal text-gray-600">
                                {formatDate(career.deadline)}
                              </span>
                            </p>
                          </div>

                          {/* RESPONSIBILITIES */}
                          {career.responsibilities?.length > 0 && (
                            <div className="mb-6">
                              <h3 className="text-sm sm:text-base font-bold text-black mb-3">
                                Key Responsibilities
                              </h3>

                              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-700 leading-6 sm:leading-7">
                                {career.responsibilities.map(
                                  (responsibility, index) => (
                                    <li key={index}>{responsibility}</li>
                                  ),
                                )}
                              </ul>
                            </div>
                          )}

                          {/* REQUIREMENTS */}
                          {career.requirements?.length > 0 && (
                            <div className="mb-6">
                              <h3 className="text-sm sm:text-base font-bold text-black mb-3">
                                Requirements & Qualifications
                              </h3>

                              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-700 leading-6 sm:leading-7">
                                {career.requirements.map(
                                  (requirement, index) => (
                                    <li key={index}>{requirement}</li>
                                  ),
                                )}
                              </ul>
                            </div>
                          )}

                          {/* APPLICATION FOOTER */}
                          <div className="border-t border-gray-200 pt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <p className="text-xs sm:text-sm text-gray-600 break-all">
                              Apply via: {career.applicationUrlOrEmail}
                            </p>

                            <button
                              type="button"
                              onClick={() =>
                                handleApplication(career.applicationUrlOrEmail)
                              }
                              className="w-full sm:w-auto bg-accent text-white font-semibold text-sm px-6 py-2.5 rounded-md hover:opacity-90 transition-opacity"
                            >
                              Apply Here
                            </button>
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="flex flex-wrap justify-center items-center mt-7 sm:mt-9 gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage((p) => Math.max(p - 1, 1));
                      setExpandedId(null);
                    }}
                    disabled={currentPage === 1}
                    className="px-3 sm:px-4 py-2 bg-gray-100 border border-gray-200 text-gray-700 text-xs sm:text-sm font-medium rounded-md hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  <span className="px-2 sm:px-4 py-2 text-xs sm:text-sm text-primary font-semibold">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage((p) => Math.min(p + 1, totalPages));
                      setExpandedId(null);
                    }}
                    disabled={currentPage === totalPages}
                    className="px-3 sm:px-4 py-2 bg-gray-100 border border-gray-200 text-gray-700 text-xs sm:text-sm font-medium rounded-md hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            /* NO VACANCIES */
            <div className="w-full min-h-[40vh] flex flex-col items-center justify-center text-center px-4 py-10 sm:py-14">
              <h2 className="text-xl sm:text-2xl font-bold text-black mb-3">
                No Current Vacancies
              </h2>

              <p className="text-sm sm:text-base text-gray-600 max-w-lg leading-6">
                There are currently no available career opportunities. Please
                check back later for new openings.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Careers;
