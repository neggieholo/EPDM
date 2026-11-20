import React from 'react'
import HeroSection from './Intro/Hero';
import ProjectIntro from './Intro/ProjectIntro';
import Services from './Intro/ServicesIntro';
import NewsIntro from './Intro/pressReleaseIntro';
import AboutUsIntro from './Intro/AboutUsIntro';
import AdvertiseSection from './Intro/AdvertiseSection';
import IndustryIntro from './Intro/IndustryIntro';
import { AdItem } from './AdItem';
// import CorporateGovernance from './CorporateGovernance';

interface LandingPageProps {
  ads: AdItem[] | [] | null;
}

const getSlotAds = (
  ads: AdItem[] | [] | null,
  slot: AdItem["slot"],
): AdItem[] => {
  if (!Array.isArray(ads) || ads.length === 0) return [];

  return ads
    .filter((ad) => ad && ad.isActive && ad.slot === slot)
    .sort((a, b) => (a.priority ?? 1) - (b.priority ?? 1));
};

const LandingPage = ({ ads }: LandingPageProps) => {
    const topBannerAd = getSlotAds(ads, "top_banner");
    const sideAd = getSlotAds(ads, "side_ad");
    const midBannerAd = getSlotAds(ads, "mid_banner");
    const industrySideAd = getSlotAds(ads, "industry_side");
    const inlineCardAd = getSlotAds(ads, "inline_card");
    return (
      <div>
        <HeroSection ads={topBannerAd} />
        <ProjectIntro ads={sideAd} />
        <Services />
        <NewsIntro ads={midBannerAd} />
        <IndustryIntro ads={industrySideAd} />
        <AboutUsIntro ads={inlineCardAd} />
        <AdvertiseSection />
      </div>
    );
}

export default LandingPage