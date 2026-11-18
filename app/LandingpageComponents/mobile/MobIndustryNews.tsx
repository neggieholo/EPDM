"use client";

import React, { useState } from "react";

interface NewsLink {
  _id: string;
  title: string;
  link: string;
}

interface NewsLinksProps {
  links: NewsLink[];
}

const MobNewsLinks: React.FC<NewsLinksProps> = ({ links }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  if (!links || links.length === 0) {
    return (
      <section className="bg-white w-full px-5 py-10">
        {/* Header */}
        <div className="bg-primary shadow-strong rounded-lg px-6 py-8 flex items-center justify-center">
          <h2 className="text-4xl font-extrabold text-white text-center leading-tight">
            INDUSTRY
            <br />
            NEWS
          </h2>
        </div>

        <div className="min-h-[40vh] flex items-center justify-center">
          <p className="text-center text-gray-500 py-10">
            No news links available.
          </p>
        </div>
      </section>
    );
  }

  const totalPages = Math.ceil(links.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentLinks = links.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="bg-white w-full px-5 py-10">
      {/* Header */}
      <div className="bg-primary shadow-strong rounded-lg px-6 py-8 flex items-center justify-center">
        <h2 className="text-4xl font-extrabold text-white text-center leading-tight">
          INDUSTRY
          <br />
          NEWS
        </h2>
      </div>

      {/* News Links */}
      <div className="w-full bg-accent/50 border border-accent/20 rounded-xl p-3 mt-8">
        <div className="space-y-4 py-2">
          {currentLinks.map((link) => (
            <div
              key={link._id}
              className="flex justify-between items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-accent/10"
            >
              <span className="font-semibold text-gray-800 text-sm">
                {link.title}
              </span>

              <a
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:scale-110 transition-transform text-md shrink-0"
                title="Open link"
                aria-label={`Open ${link.title}`}
              >
                🔗
              </a>
            </div>
          ))}
        </div>
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

export default MobNewsLinks;
