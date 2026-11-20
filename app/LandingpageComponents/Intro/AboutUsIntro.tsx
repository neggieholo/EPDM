"use client";

import React from "react";
import Link from "next/link";
import { AdItem, AdSlot } from "../AdItem";

interface AboutUsIntroProps {
  ads?: AdItem[];
}

const AboutUsIntro: React.FC<AboutUsIntroProps> = ({ ads = [] }) => {
  const hasAd = Array.isArray(ads) && ads.length > 0;

  return (
    <section className="w-full h-[75vh] bg-white flex flex-col">
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-[1fr_60%_1fr] items-start gap-6 px-4 lg:px-0">
        {/* Left Gutter */}
        <div className="hidden lg:block" />

        {/* Middle 60% Column (InfoSection layout directly inlined) */}
        <div className="w-full h-full bg-accent/20 flex flex-col justify-center p-5">
          <h2 className="text-2xl font-bold text-primary mb-4 border-b border-accent pb-2">
            Who we are
          </h2>
          <div className="text-gray-700 flex-1 flex flex-col">
            <div className="w-full flex flex-col md:flex-row min-h-[45vh] p-2">
              {/* LEFT: About Us Text */}
              <div className="w-full md:w-[40%] text-start relative flex items-center justify-center gap-4 p-4 rounded-l-xl">
                <div className="flex flex-col justify-center shadow-strong bg-primary items-center h-[80%] w-[80%] min-h-45 p-5">
                  <h2 className="text-4xl font-extrabold mb-2 text-white leading-tight">
                    ABOUT
                  </h2>
                  <h2 className="text-4xl font-extrabold mb-2 text-white leading-tight">
                    US
                  </h2>
                </div>
              </div>

              {/* RIGHT: Description */}
              <div className="flex-1 w-full md:w-[60%] flex flex-col items-center justify-center text-primary p-4">
                <p className="text-xl lg:text-2xl xl:text-3xl leading-relaxed">
                  Energy Projects Data Media Limited (EPDM) is a Lagos -based
                  digital energy company, a data management company and an
                  energy consulting firm highly committed to supporting the
                  global energy community through provision of reliable and
                  quality services.
                </p>
              </div>
            </div>

            <div className="w-full flex p-2 justify-end">
              <Link href="/aboutus" className="btn btn-primary text-xl">
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Right Gutter: Sticky Inline Card Ad */}
        <div className="w-full lg:px-4 lg:sticky lg:top-24">
          {hasAd && (
            <aside className="w-full">
              <AdSlot
                ads={ads}
                slot="inline_card"
                imgClassName="w-full h-56 sm:h-64 lg:h-[420px] object-contain"
              />
            </aside>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutUsIntro;
