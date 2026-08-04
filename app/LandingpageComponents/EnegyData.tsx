// components/EnergyDataDisplay.tsx
"use client";

import { useState } from "react";
import type { EnergySubsection } from "../utils/Interfaces";
import { ExternalLink } from "lucide-react";

export default function EnergyDataDisplay({
  data,
}: {
  data: EnergySubsection[];
}) {
  const [active, setActive] = useState<EnergySubsection>(data[0]);

  return (
        <section className="w-full min-h-screen bg-white flex flex-col items-center py-10 relative pt-50">
            <div className="w-[70%] flex rounded-lg overflow-hidden">
            {/* LEFT PANEL */}
            <div className="w-[30%] border-r bg-primary text-white">
                {data.map((item) => (
                <button
                    key={item.id}
                    onClick={() => setActive(item)}
                    className={`w-full text-left px-4 py-3 border-b hover:bg-white hover:text-primary ${
                    active.id === item.id ? "bg-secondary font-semibold" : ""
                    }`}
                >
                    {item.title}
                </button>
                ))}
            </div>

            {/* RIGHT PANEL */}
            <div className="w-[70%] p-6 bg-accent/20">
                <h2 className="text-2xl font-bold mb-4">{active.title}</h2>

                <h3 className="text-lg font-semibold mb-2">Details:</h3>
                <ul className="list-disc pl-6 space-y-1 mb-6">
                    {active.id === 19 ? (
                        <li className="flex">
                        <a
                            href={active.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                        >
                            {active.details}
                        </a>                                                    
                        <ExternalLink size={16} />
                        </li>
                    ) : (
                        active.details.map((d, index) => <li key={index}>{d}</li>)
                    )}
                </ul>
                <h3 className="text-lg font-semibold mb-2">Benefits:</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {active.benefits}
                </p>
            </div>
            </div>
        </section>
  );
}
