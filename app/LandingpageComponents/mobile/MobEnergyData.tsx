"use client";

import { useState } from "react";
import type { EnergySubsection } from "@/app/utils/Interfaces";

export default function EnergyDataMobile({ data }: { data: EnergySubsection[] }) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="w-full min-h-screen bg-accent/20 flex flex-col items-center py-10 relative pt-20">
        <div className="w-full flex flex-col gap-2 p-3">
        {data.map((item) => (
            <div
            key={item.id}
            className="border rounded-md overflow-hidden shadow-sm"
            >
            {/* Heading */}
            <button
                onClick={() => toggle(item.id)}
                className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 flex justify-between items-center"
            >
                <span className="font-semibold">{item.title}</span>
                <span className="text-gray-500">{expandedId === item.id ? "−" : "+"}</span>
            </button>

            {/* Content */}
            {expandedId === item.id && (
                <div className="px-4 py-3 bg-white">
                <h3 className="text-md font-semibold mb-2">Details:</h3>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    {item.id === 19 && item.url ? (
                    <li>
                        <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                        >
                        {item.details}
                        </a>
                    </li>
                    ) : (
                    item.details.map((d, idx) => <li key={idx}>{d}</li>)
                    )}
                </ul>

                <h3 className="text-md font-semibold mb-2">Benefits:</h3>
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
