import React from "react";
import { headers } from "next/headers";
import { isMobile } from "@/app/utils/IsMobile";
import IndustryInfo from "@/app/LandingpageComponents/IndustryInfoList";
import MobIndustryInfo from "@/app/LandingpageComponents/mobile/MobIndustryInfoList";

export default async function Page() {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const mobileCheck = isMobile(userAgent);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${baseUrl}/api/csr_community_impact`, {
    cache: "no-store",
  });

  console.log("CSR page hit!");
  let csrs = null;
  if (res.ok) {
    const data = await res.json();
    csrs = data.csrs;
  }

  return mobileCheck ? (
    <MobIndustryInfo
      contents={csrs}
      nameA="CSR"
      nameB="&"
      nameC="Community Impact"
      address="csr_impact"
    />
  ) : (
    <IndustryInfo
      contents={csrs}
      nameA="CSR"
      nameB="&"
      nameC="Community Impact"
      address="csr_impact"
    />
  );
}
