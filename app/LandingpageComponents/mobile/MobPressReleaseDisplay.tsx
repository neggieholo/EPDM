"use client";

/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useRouter } from "next/navigation";
import { ArrowBigLeft } from "lucide-react";

export interface Section {
  _id: string;
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

interface NewsDisplayProps {
  newsItem: PressRelease | null;
}

const formatDate = (timestamp?: string) => {
  if (!timestamp) return "";

  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const MobNewsDisplay: React.FC<NewsDisplayProps> = ({ newsItem }) => {
  const router = useRouter();

  if (!newsItem) {
    return (
      <section className="bg-white w-full px-5 py-10 min-h-screen">
        {/* Header */}
        <div className="bg-primary shadow-strong rounded-lg px-6 py-8 flex items-center justify-center">
          <h2 className="text-4xl font-extrabold text-white text-center leading-tight">
            INDUSTRY
            <br />
            NEWS
          </h2>
        </div>

        <div className="min-h-[40vh] flex items-center justify-center">
          <p className="text-center text-gray-500 text-lg">
            No press release available.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white w-full px-5 py-10 min-h-screen">
      {/* Header */}
      <div className="bg-primary shadow-strong rounded-lg px-6 py-8 flex items-center justify-center">
        <h2 className="text-4xl font-extrabold text-white text-center leading-tight">
          INDUSTRY
          <br />
          NEWS
        </h2>
      </div>

      {/* News Content */}
      <div className="w-full flex flex-col gap-5 mt-8">
        <h2 className="text-2xl font-bold text-gray-900">{newsItem.heading}</h2>
        <button
          type="button"
          onClick={() => router.push("/pressreleases")}
          className="flex items-center gap-2 text-primary hover:opacity-75 transition w-fit"
        >
          <ArrowBigLeft size={22} />
          <span className="font-medium">Back to Press Releases</span>
        </button>

        {/* Publication Date */}
        {newsItem.createdAt && (
          <p className="text-sm text-gray-500">
            {formatDate(newsItem.createdAt)}
          </p>
        )}

        {/* Sections */}
        <div className="flex flex-col gap-5">
          {newsItem.sections.map((section) => {
            switch (section.type) {
              case "image":
                return (
                  <div
                    key={section._id}
                    className="flex flex-col items-center w-full"
                  >
                    <img
                      src={section.content}
                      alt={section.caption || ""}
                      className="w-full h-auto rounded-md shadow-md object-cover"
                    />

                    {section.caption && (
                      <p className="mt-2 text-sm text-gray-500 italic text-center">
                        {section.caption}
                      </p>
                    )}
                  </div>
                );

              case "video":
                return (
                  <div
                    key={section._id}
                    className="flex flex-col items-center w-full"
                  >
                    <video
                      src={section.content}
                      controls
                      className="w-full rounded-md shadow-md"
                    />

                    {section.caption && (
                      <p className="mt-2 text-sm text-gray-500 italic text-center">
                        {section.caption}
                      </p>
                    )}
                  </div>
                );

              case "paragraph":
                return (
                  <div
                    key={section._id}
                    className="text-gray-700 leading-relaxed text-justify"
                    dangerouslySetInnerHTML={{
                      __html: section.content,
                    }}
                  />
                );

              default:
                return null;
            }
          })}
        </div>
      </div>
    </section>
  );
};

export default MobNewsDisplay;
