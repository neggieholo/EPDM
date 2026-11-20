import React from "react";
import { headers } from "next/headers";
import { isMobile } from "../utils/IsMobile";
import MobLandingPage from "../LandingpageComponents/mobile/MobLandingPage";
import LandingPage from "../LandingpageComponents/LandingPage";

export default async function Page() {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const mobileCheck = isMobile(userAgent);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  let ads = [];

  try {
    const res = await fetch(`${baseUrl}/api/ads`, {
      method: "GET",
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        ads = data.ads || null;
      }
    }
  } catch (err) {
    console.error("Failed to fetch About Us:", err);
  }

  return mobileCheck ? <MobLandingPage ads={ads} /> : <LandingPage ads={ads} />;
}
