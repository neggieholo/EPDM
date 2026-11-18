"use client";

import { useState } from "react";
import type { EnergySubsection } from "../utils/Interfaces";
import { ExternalLink } from "lucide-react";

export default function EnergyDataDisplay({
  data,
}: {
  data: EnergySubsection[];
}) {
  const [active, setActive] = useState<EnergySubsection | undefined>(data[0]);

  if (!data || data.length === 0 || !active) {
    return (
      <section className="w-full bg-white py-12 md:py-16 px-5 min-h-[70vh] flex items-center justify-center">
        <p className="text-center text-gray-400">No energy data available.</p>
      </section>
    );
  }

  return (
    <section className="w-full bg-white py-12 md:py-16 px-5 items-start justify-center min-h-[70vh] flex">
      <div className="max-w-5xl mx-auto w-full flex flex-col gap-6">
        {/* TOP: Heading Section */}
        <div className="bg-primary shadow-strong rounded-lg px-6 py-8 md:px-8 flex items-center justify-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight text-center">
            ENERGY
            <br />
            DATA
          </h2>
        </div>

        {/* ENERGY DATA CONTENT */}
        <div className="w-full flex flex-col sm:flex-row rounded-xl overflow-hidden border border-accent/20 shadow-sm min-h-[40vh]">
          {/* LEFT PANEL: Navigation */}
          <div className="w-full sm:w-[30%] bg-primary text-white flex flex-col">
            {data.map((item) => (
              <button
                key={item.id}
                onClick={() => setActive(item)}
                className={`w-full text-left px-4 py-3 border-b border-white/10 transition-colors hover:bg-white hover:text-primary ${
                  active.id === item.id ? "bg-secondary font-semibold" : ""
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* RIGHT PANEL: Details */}
          <div className="flex-1 min-w-0 p-5 sm:p-6 md:p-8 bg-accent/10 text-gray-700">
            <h2 className="text-xl md:text-2xl font-bold mb-5 text-primary">
              {active.title}
            </h2>

            {/* Details / External Link */}
            {active.id === 19 && (
              <>
                <h3 className="text-lg font-semibold mb-2 text-primary">
                  Details:
                </h3>

                <ul className="list-disc pl-6 space-y-1 mb-6">
                  <li>
                    <a
                      href={active.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:underline break-all"
                    >
                      {active.details}
                      <ExternalLink size={16} className="shrink-0" />
                    </a>
                  </li>
                </ul>
              </>
            )}

            {/* Benefits */}
            {/* <h3 className="text-lg font-semibold mb-2 text-primary">
              Benefits:
            </h3> */}

            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {active.benefits}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
