import React from "react";
import { headers } from "next/headers";
import { isMobile } from "@/app/utils/IsMobile";
import TenderOpportunities from "@/app/LandingpageComponents/TenderOpportunities";

export default async function Page() {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const mobileCheck = isMobile(userAgent);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${baseUrl}/api/tender-opportunity`, {
    cache: "no-store",
  });

  console.log("Tender Opportunity page hit!");
  let opportunities = null;
  if (res.ok) {
    const data = await res.json();
    opportunities = data.opportunities;
  }

  return mobileCheck ? (
    <TenderOpportunities opportunities={opportunities} />
  ) : (
    <TenderOpportunities opportunities={opportunities} />
  );
}
