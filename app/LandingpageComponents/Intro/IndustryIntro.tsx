"use client";

import React, { useState } from "react";
import { industrySections } from "../../utils/LandingPageSections";
import { AdItem, AdSlot } from "../AdItem";

interface IndustryIntroProps {
  ads?: AdItem[];
}

const IndustryIntro = ({ ads = [] }: IndustryIntroProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasSideAd = Array.isArray(ads) && ads.length > 0;

  return (
    <section className="w-full h-fit bg-white shadow-md rounded-lg flex flex-col border border-accent/20">
      <div className="w-full bg-accent/20 h-full">
        <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_60%_1fr] items-start gap-6 px-4 lg:px-0">
          {/* Left Gutter (empty) */}
          <div className="hidden lg:block" />

          {/* Middle Column: Permanently 60% width, always centered */}
          <div className="w-full h-full bg-white flex flex-col justify-center p-5">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2 border-b border-accent pb-2">
              Connect with Industry Resources & Showcase
            </h2>
            <p className="text-lg md:text-xl text-gray-700 mb-6">
              Stay informed with the latest news, insights, and trends shaping
              the global energy industry.
            </p>
            <div className="flex h-full">
              {/* LEFT SIDE - Titles */}
              <div className="w-1/3 bg-primary/20 flex flex-col items-stretch overflow-y-auto">
                {industrySections.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`relative px-6 py-4 m-1 font-semibold text-white transition-all duration-300
                      ${activeIndex === i ? "bg-primary" : "bg-primary/70 hover:bg-primary"}
                      [clip-path:polygon(10%_0%,100%_0%,90%_100%,0%_100%)]`}
                  >
                    {s.title.split(" (")[0]}
                  </button>
                ))}
              </div>

              {/* RIGHT SIDE - Content */}
              <div className="w-2/3 flex flex-col justify-center p-8 bg-white">
                <h2 className="text-2xl font-bold text-primary mb-3 border-b border-accent pb-2">
                  {industrySections[activeIndex].title}
                </h2>
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {industrySections[activeIndex].content}
                </p>
              </div>
            </div>
          </div>

          {/* Right Gutter: Sticky Ad Rail (only renders if ads exist) */}
          <div className="w-full lg:px-4 lg:sticky lg:top-24">
            {hasSideAd && (
              <aside className="w-full py-4 lg:py-0">
                <AdSlot
                  ads={ads}
                  slot="industry_side"
                  imgClassName="w-full h-56 sm:h-64 lg:h-[480px] object-contain"
                />
              </aside>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryIntro;
