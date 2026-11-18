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

const NewsLinks: React.FC<NewsLinksProps> = ({ links }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  if (!links || links.length === 0) {
    return (
      <section className="w-full bg-white py-12 md:py-16 px-5 items-center justify-center min-h-[70vh] flex">
        <p className="text-center text-gray-400">No news links available.</p>
      </section>
    );
  }

  const totalPages = Math.ceil(links.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentLinks = links.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="w-full bg-white py-12 md:py-16 px-5 items-start justify-center min-h-[70vh] flex">
      <div className="max-w-5xl mx-auto w-full flex flex-col gap-6">
        {/* TOP: Heading Section */}
        <div className="bg-primary shadow-strong rounded-lg px-6 py-8 md:px-8 flex items-center justify-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight text-center">
            INDUSTRY
            <br />
            NEWS
          </h2>
        </div>

        {/* NEWS LINKS CONTAINER */}
        <div className="w-full bg-accent/5 border border-accent/20 p-4 sm:p-6 md:p-8 rounded-xl">
          <div className="min-h-[40vh] flex flex-col gap-4">
            {currentLinks.map((link) => (
              <div
                key={link._id}
                className="flex justify-between items-center gap-4 p-4 sm:p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-accent/10 group"
              >
                <span className="font-semibold text-primary text-sm sm:text-base min-w-0">
                  {link.title}
                </span>

                <a
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-accent hover:text-primary hover:scale-110 transition-transform text-xl"
                  title="Open link"
                  aria-label={`Open ${link.title}`}
                >
                  🔗
                </a>
              </div>
            ))}
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

export default NewsLinks;
