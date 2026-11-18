/* eslint-disable @next/next/no-img-element */
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

interface MobPressReleasesProps {
  releases: PressRelease[] | null;
}

const MobPressReleases: React.FC<MobPressReleasesProps> = ({ releases }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  if (!releases || releases.length === 0) {
    return (
      <section className="bg-white w-full px-5 py-10">
        <div className="bg-primary shadow-strong rounded-lg px-6 py-8 flex items-center justify-center">
          <h2 className="text-4xl font-extrabold text-white text-center leading-tight">
            PRESS
            <br />
            RELEASES
          </h2>
        </div>

        <div className="min-h-[40vh] flex items-center justify-center">
          <p className="text-center text-gray-500 text-lg">
            No press releases available.
          </p>
        </div>
      </section>
    );
  }

  const totalPages = Math.ceil(releases.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentReleases = releases.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="bg-white w-full px-5 py-10">
      {/* Header */}
      <div className="bg-primary shadow-strong rounded-lg px-6 py-8 flex items-center justify-center">
        <h2 className="text-4xl font-extrabold text-white text-center leading-tight">
          PRESS
          <br />
          RELEASES
        </h2>
      </div>

      {/* Press Releases */}
      <div className="w-full flex flex-col gap-6 mt-8">
        {currentReleases.map((release) => {
          const imageSection = release.sections.find((s) => s.type === "image");

          const textSection = release.sections.find(
            (s) => s.type === "paragraph",
          );

          return (
            <Link
              key={release._id}
              href={`/pressreleases/${release._id}`}
              className="block"
            >
              <div className="bg-accent/50 rounded-xl p-4 border border-accent/40 shadow-md hover:shadow-lg transition">
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

                <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                  {release.heading}
                </h3>

                <p className="text-sm text-gray-700 line-clamp-3">
                  {textSection?.content ||
                    "Click to read more about our latest updates."}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center mt-8 gap-3">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="px-4 py-2 text-sm">
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
      )}
    </section>
  );
};

export default MobPressReleases;
