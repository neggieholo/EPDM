"use client";

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
      <section className="w-full bg-white py-12 md:py-16 px-5 items-center justify-center min-h-[70vh] flex">
        <p className="text-center text-gray-400">
          No press releases available.
        </p>
      </section>
    );
  }

  const totalPages = Math.ceil(releases.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentReleases = releases.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="w-full bg-white py-12 md:py-16 px-5 items-start justify-center min-h-[70vh] flex">
      <div className="max-w-5xl mx-auto w-full flex flex-col gap-6">
        {/* TOP: Heading Section */}
        <div className="bg-primary shadow-strong rounded-lg px-6 py-8 md:px-8 flex items-center justify-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight text-center">
            PRESS
            <br />
            RELEASES
          </h2>
        </div>

        {/* PRESS RELEASE PREVIEW GRID */}
        <div className="w-full bg-accent/5 p-4 sm:p-6 md:p-8 rounded-xl border border-accent/20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {currentReleases.map((release) => {
              const imageSection = release.sections.find(
                (s) => s.type === "image",
              );

              const textSection = release.sections.find(
                (s) => s.type === "paragraph",
              );

              return (
                <Link
                  key={release._id}
                  href={`/pressreleases/${release._id}`}
                  className="block"
                >
                  <div className="h-full bg-accent/50 rounded-xl p-5 border border-accent/40 shadow-[0_8px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.35)] hover:-translate-y-1 transition-all duration-300">
                    {/* Preview Image */}
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

                    {/* Preview Heading */}
                    <h3 className="text-xl font-semibold mb-2 text-primary line-clamp-2">
                      {release.heading}
                    </h3>

                    {/* Preview Description */}
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {textSection?.content ||
                        "Click to read more about our latest updates."}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center items-center mt-6 gap-3">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
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
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
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

export default PressReleases;
