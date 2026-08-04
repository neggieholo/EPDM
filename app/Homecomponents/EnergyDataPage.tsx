"use client";
import React, { useState, useMemo } from "react";
import PaymentDiv from "./PaymentDiv";

interface EnergyDataRecord {
  _id: string;
  title: string;
  category: string;
  paragraph?: string;
  pdf?: string;
  excel?: string;
  word?: string;
  date?: string;
}

interface EnergyDataPageProps {
  energyData: Partial<EnergyDataRecord>[];
  subscription: boolean;
}

const energyDataSubSections = [
  { id: "all", title: "✨ All Categories" },
  { id: "explorationdata", title: "Exploration Data" },
  { id: "drillingdata", title: "Drilling Data" },
  { id: "rigcount", title: "Rig Count" },
  { id: "wellcount", title: "Well Count" },
  { id: "oilproductiondata", title: "Oil Production Data" },
  { id: "gasproductiondata", title: "Gas Production Data" },
  { id: "oilrefiningdata", title: "Oil Refining Data" },
  { id: "gasutilisationdata", title: "Gas Utilisation Data" },
  { id: "gasflaredata", title: "Gas Flare Data" },
  { id: "safetydata", title: "Safety Data" },
  { id: "localcontentdata", title: "Local Content Data" },
  { id: "energytransitiondata", title: "Energy Transition Data" },
  { id: "oilandgasblocks", title: "Oil and Gas Blocks" },
  { id: "oilandgasfields", title: "Oil and Gas Fields" },
  { id: "vesselsfpsocount", title: "Vessels/FPSO Count" },
  { id: "environmentaldata", title: "Environmental Data" },
  { id: "researchanddevelopmentdata", title: "Research and Development Data" },
  { id: "industrybudget", title: "Industry Budget" },
  { id: "crudeoilprice", title: "Crude Oil Price" },
];

const EnergyDataPage: React.FC<EnergyDataPageProps> = ({
  energyData,
  subscription,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchValue, setSearchValue] = useState("");

  const filteredData = useMemo(() => {
    let filtered = energyData;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    const searchStr = String(searchValue || "")
      .toLowerCase()
      .trim();
    if (searchStr !== "") {
      filtered = filtered.filter(
        (item) =>
          item.title?.toLowerCase().includes(searchStr) ||
          item.paragraph?.toLowerCase().includes(searchStr),
      );
    }

    return filtered;
  }, [energyData, selectedCategory, searchValue]);

  if (!subscription) return <PaymentDiv target="energy data"/>;

  return (
    <div className="mx-auto h-[80vh] flex flex-col gap-4 w-full">
      {/* Top Control Filter Dashboard Bar */}
      <div className="sticky top-0 bg-white z-10 p-3 shadow flex flex-wrap justify-between gap-4 items-center rounded">
        <div className="flex items-center gap-2 flex-1 min-w-70">
          <label className="font-semibold text-sm whitespace-nowrap text-primary">
            Category Filter:
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm flex-1 max-w-xs focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {energyDataSubSections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.title}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full sm:w-auto max-w-sm flex-1">
          <input
            className="form-control w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            type="text"
            placeholder="Search records or summaries..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      {/* Scrollable Metric Records Layout List */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-1">
        {filteredData.length === 0 ? (
          <div className="text-center my-8 p-4 text-gray-500 border border-dashed rounded">
            No energy record data files found matching current selection.
          </div>
        ) : (
          filteredData.map((item) => (
            <div
              key={item._id}
              className="p-4 rounded shadow text-left bg-accent/50 text-primary transition flex flex-col gap-2"
            >
              {/* Primary Document Header Context */}
              <div className="flex justify-between items-start gap-4">
                <h4 className="text-base font-bold tracking-wide text-primary-dark">
                  {item.title || "Unnamed Metric Entry"}
                </h4>
                {item.date && (
                  <span className="text-xs text-gray-500 font-mono whitespace-nowrap">
                    📅 {item.date}
                  </span>
                )}
              </div>

              {/* Optional Summary Description block */}
              {item.paragraph && (
                <div
                  className="text-sm text-gray-700 bg-white/60 p-2.5 rounded border border-gray-100 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: item.paragraph }}
                />
              )}

              {/* Secure, Clickable Document Download Footers */}
              {/* Secure, Clickable Document Download Footers */}
              <div className="flex flex-wrap gap-2 mt-1 pt-1 border-t border-gray-200/40">
                {item.pdf && (
                  <a
                    href={item.pdf.replace(
                      "/upload/",
                      "/upload/fl_attachment/",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs bg-red-600 hover:bg-red-700 text-white font-semibold px-2.5 py-1 rounded transition text-decoration-none"
                  >
                    📥 Download PDF
                  </a>
                )}
                {item.excel && (
                  <a
                    href={item.excel.replace(
                      "/upload/",
                      "/upload/fl_attachment/",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-2.5 py-1 rounded transition text-decoration-none"
                  >
                    📥 Download Excel
                  </a>
                )}
                {item.word && (
                  <a
                    href={item.word.replace(
                      "/upload/",
                      "/upload/fl_attachment/",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold px-2.5 py-1 rounded transition text-decoration-none"
                  >
                    📥 Download Word
                  </a>
                )}
                {!item.pdf && !item.excel && !item.word && (
                  <span className="text-xs text-gray-400 italic">
                    No downloadable assets attached
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EnergyDataPage;
