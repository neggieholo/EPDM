"use client";

import { useState } from "react";
import type { EnergySubsection } from "@/app/utils/Interfaces";
import { ExternalLink } from "lucide-react";

export default function EnergyDataMobile({
  data,
}: {
  data: EnergySubsection[];
}) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="bg-white w-full px-5 py-10">
      {/* Header */}
      <div className="bg-primary shadow-strong rounded-lg px-6 py-8 flex items-center justify-center">
        <h2 className="text-4xl font-extrabold text-white text-center leading-tight">
          ENERGY
          <br />
          DATA
        </h2>
      </div>

      {/* Energy Data Accordion */}
      <div className="w-full flex flex-col gap-3 mt-8">
        {data.map((item) => (
          <div
            key={item.id}
            className="border border-accent/30 rounded-lg overflow-hidden shadow-sm"
          >
            {/* Heading */}
            <button
              onClick={() => toggle(item.id)}
              aria-expanded={expandedId === item.id}
              className="w-full text-left px-4 py-4 bg-accent/20 hover:bg-accent/30 transition flex justify-between items-center gap-4"
            >
              <span className="font-semibold text-gray-800">{item.title}</span>

              <span className="text-primary text-xl font-semibold shrink-0">
                {expandedId === item.id ? "−" : "+"}
              </span>
            </button>

            {/* Content */}
            {expandedId === item.id && (
              <div className="px-4 py-5 bg-white">
                {item.id === 19 && item.url && (
                  <>
                    <h3 className="text-md font-semibold mb-2 text-gray-800">
                      Details:
                    </h3>

                    <ul className="list-disc pl-5 space-y-1 mb-4">
                      <li>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline inline-flex items-center gap-2"
                        >
                          {item.details}
                          <ExternalLink size={16} />
                        </a>
                      </li>
                    </ul>
                  </>
                )}

                {/* <h3 className="text-md font-semibold mb-2 text-gray-800">
                  Benefits:
                </h3> */}

                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {item.benefits}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
