/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";

export interface AdItem {
  _id: string;
  title: string;
  advertiserName: string;
  slot:
    | "top_banner"
    | "mid_banner"
    | "side_ad"
    | "industry_side"
    | "inline_card"
    | "bottom_banner";
  imageUrl: string;
  targetUrl: string;
  isActive: boolean;
  priority?: number;
}

interface AdSlotProps {
  ads: AdItem[]; 
  slot: AdItem["slot"];
  intervalMs?: number;
  className?: string;
  imgClassName?: string;
}

const SLOT_IMAGE_STYLES: Record<AdItem["slot"], string> = {
  top_banner: "w-full h-32 sm:h-40 md:h-48 object-cover",
  mid_banner: "w-full h-32 sm:h-40 md:h-48 object-cover",
  side_ad: "w-full h-48 sm:h-56 lg:h-[520px] object-cover",
  industry_side: "w-full h-48 sm:h-56 lg:h-[520px] object-cover",
  inline_card: "w-full h-48 sm:h-60 object-cover",
  bottom_banner: "w-full h-32 sm:h-40 md:h-48 object-cover",
};

export const AdSlot: React.FC<AdSlotProps> = ({
  ads,
  slot,
  intervalMs = 7000,
  className = "",
  imgClassName = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset index safely if the ads list changes
  useEffect(() => {
    const resetIndex = () => {
      setCurrentIndex(0);
    };
    resetIndex();
  }, [ads.length, slot]);

  // Only cycle when there are 2 or more ads
  useEffect(() => {
    if (ads.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ads.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [ads.length, intervalMs]);

  if (!ads || ads.length === 0) return null;

  const activeAd = ads[currentIndex] ?? ads[0];

  return (
    <div className={`w-full ${className}`}>
      <a
        href={activeAd.targetUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={activeAd.title}
        aria-label={activeAd.title}
        className="block w-full overflow-hidden bg-white transition-shadow"
      >
        <img
          src={activeAd.imageUrl}
          alt={activeAd.title}
          className={imgClassName || SLOT_IMAGE_STYLES[slot]}
        />
      </a>
    </div>
  );
};
