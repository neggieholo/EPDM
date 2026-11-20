import React from "react";
import AdverTiseSectionMobile from "../Intro/Mobile/AdverTiseSectionMobile";
import MobHero from "../Intro/Mobile/MobHero";
import MobProjectIntro from "../Intro/Mobile/MobProjectIntro";
import MobServicesIntro from "../Intro/Mobile/MobServicesIntro";
import MobIndustryIntro from "../Intro/Mobile/MobIndustryIntro";
import MobAboutUsIntro from "../Intro/Mobile/MobAboutUsIntro";
import MobNewsIntro from "../Intro/Mobile/MobPressreleaseIntro";
import { AdItem } from "../AdItem";

interface LandingPageProps {
  ads: AdItem[] | [] | null;
}

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

const MobLandingPage = ({ ads }: LandingPageProps) => {
  const topBannerAd = getSlotAds(ads, "top_banner");
  const sideAd = getSlotAds(ads, "side_ad");
  const industrySideAd = getSlotAds(ads, "industry_side");
  const midBannerAd = getSlotAds(ads, "mid_banner");
  const inlineCardAd = getSlotAds(ads, "inline_card");
  return (
    <div>
      <MobHero ads={topBannerAd} />
      <MobProjectIntro ads={sideAd} />
      <MobServicesIntro />
      <MobNewsIntro ads={midBannerAd} />
      <MobIndustryIntro ads={industrySideAd} />
      <MobAboutUsIntro ads={inlineCardAd} />
      <AdverTiseSectionMobile />
    </div>
  );
};

export default MobLandingPage;
