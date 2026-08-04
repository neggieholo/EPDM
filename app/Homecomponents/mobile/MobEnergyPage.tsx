"use client";
import React, { useState, useMemo } from "react";
import PaymentDiv from "../PaymentDiv";

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

const MobEnergyDataPage: React.FC<EnergyDataPageProps> = ({
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

  if (!subscription) return <PaymentDiv target="energy data" />;

  return (
    <div className="mx-auto h-[85vh] md:h-[80vh] flex flex-col gap-4 w-full px-2 sm:px-4">
      {/* Responsive Top Control Filter Dashboard Bar */}
      <div className="sticky top-0 bg-white z-10 p-3.5 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between gap-3 items-stretch md:items-center rounded-lg">
        {/* Category Dropdown Wrapper */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-1">
          <label className="font-semibold text-xs uppercase tracking-wider text-primary whitespace-nowrap pt-1 sm:pt-0">
            Category Filter:
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50/50 w-full md:max-w-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer"
          >
            {energyDataSubSections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.title}
              </option>
            ))}
          </select>
        </div>

        {/* Universal Search Input */}
        <div className="w-full md:w-auto md:max-w-sm md:flex-1">
          <input
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            type="text"
            placeholder="Search records or summaries..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      {/* Scrollable Metric Records Layout List */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-1 pb-6">
        {filteredData.length === 0 ? (
          <div className="text-center my-8 p-6 text-gray-500 border border-dashed border-gray-200 rounded-xl bg-gray-50/50">
            No energy record data files found matching current selection.
          </div>
        ) : (
          filteredData.map((item) => (
            <div
              key={item._id}
              className="p-4 rounded-xl shadow-xs text-left bg-accent/30 text-primary border border-accent/20 flex flex-col gap-3"
            >
              {/* Responsive Document Header Context */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1.5">
                <h4 className="text-base font-bold tracking-wide text-primary-dark leading-tight flex-1">
                  {item.title || "Unnamed Metric Entry"}
                </h4>
                {item.date && (
                  <span className="text-[11px] bg-white/80 text-gray-500 font-mono px-2 py-0.5 rounded border border-gray-100 whitespace-nowrap self-start sm:self-auto">
                    📅 {item.date}
                  </span>
                )}
              </div>

              {/* Optional Summary Description block */}
              {item.paragraph && (
                <div
                  className="text-sm text-gray-700 bg-white/80 p-3 rounded-lg border border-gray-100/70 prose prose-sm max-w-none break-words"
                  dangerouslySetInnerHTML={{ __html: item.paragraph }}
                />
              )}

              {/* Responsive Document Download Action Footers */}
              <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-2 mt-1 pt-2 border-t border-gray-200/40">
                {item.pdf && (
                  <a
                    href={item.pdf.replace(
                      "/upload/",
                      "/upload/fl_attachment/",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 text-xs bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-2 rounded-lg transition-all text-decoration-none shadow-sm active:scale-[0.98]"
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
                    className="inline-flex items-center justify-center gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-3 py-2 rounded-lg transition-all text-decoration-none shadow-sm active:scale-[0.98]"
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
                    className="inline-flex items-center justify-center gap-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-2 rounded-lg transition-all text-decoration-none shadow-sm active:scale-[0.98]"
                  >
                    📥 Download Word
                  </a>
                )}
                {!item.pdf && !item.excel && !item.word && (
                  <span className="text-xs text-gray-400 italic py-1">
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

export default MobEnergyDataPage;
