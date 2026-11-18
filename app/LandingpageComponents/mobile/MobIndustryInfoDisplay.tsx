"use client";

/* eslint-disable @next/next/no-img-element */
import React from "react";
import { IndustryInfoProps } from "../IndustryInfoDisplay";
import { ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export interface IndustrySection {
  _id: string;
  type: "paragraph" | "image" | "video" | "pdf";
  content: string;
  caption?: string;
}

export interface IndustryInfo {
  _id: string;
  heading: string;
  sections: IndustrySection[];
  createdAt?: string;
  updatedAt?: string;
}

const MobIndustryInfoDisplay: React.FC<IndustryInfoProps> = ({
  content,
  address,
}) => {
  const router = useRouter();

  if (!content) {
    return (
      <section className="bg-white w-full px-5 py-10 min-h-screen">
        {/* Header */}
        <div className="bg-primary shadow-strong rounded-lg px-6 py-8 flex items-center justify-center">
          <h2 className="text-4xl font-extrabold text-white text-center leading-tight">
            INDUSTRY
            <br />
            INFORMATION
          </h2>
        </div>

        <div className="min-h-[40vh] flex items-center justify-center">
          <p className="text-center text-gray-500 text-base">
            No industry information available.
          </p>
        </div>
      </section>
    );
  }

  const pdfSection = content.sections.find((s) => s.type === "pdf");
  const otherSections = content.sections.filter((s) => s.type !== "pdf");

  return (
    <section className="bg-white w-full px-5 py-10 min-h-screen">
      {/* Page Header */}
      <div className="bg-primary shadow-strong rounded-lg px-6 py-8 flex items-center justify-center">
        <h2 className="text-4xl font-extrabold text-white text-center leading-tight">
          INDUSTRY
          <br />
          INFORMATION
        </h2>
      </div>

      {/* Content */}
      <div className="w-full flex flex-col gap-6 mt-8">
        {/* Back Navigation */}
        <button
          type="button"
          onClick={() => router.push(`/${address}`)}
          className="flex items-center gap-2 text-primary hover:opacity-75 transition w-fit"
        >
          <ArrowBigLeft size={22} />
          <span className="font-medium">Back to List</span>
        </button>

        {/* Industry Information Heading */}
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          {content.heading}
        </h2>

        {/* Industry Sections */}
        <div className="flex flex-col gap-5">
          {otherSections.map((section) => {
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
                      className="w-full max-h-75 h-auto rounded-md shadow-md object-cover"
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
                      className="w-full max-h-[300px] rounded-md shadow-md"
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
                    className="text-gray-700 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                );

              default:
                return null;
            }
          })}

          {/* PDF Download */}
          {pdfSection && (
            <div className="mt-2 p-4 bg-accent/50 border border-accent/20 rounded-lg">
              <a
                href={pdfSection.content}
                className="btn btn-primary w-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get PDF
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MobIndustryInfoDisplay;
