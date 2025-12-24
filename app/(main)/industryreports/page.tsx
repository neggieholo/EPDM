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

    const res = await fetch(`${baseUrl}/api/industryreports`, { cache: "no-store" });
    
    let industryreports = null;
    if (res.ok) {
        const data = await res.json();
        industryreports = data.industryreports;
    }

    return mobileCheck ? <MobIndustryInfo contents={industryreports} nameA="Industry" nameB=" Reports" address="industryreports"/> : <IndustryInfo contents={industryreports} nameA="Industry" nameB=" Reports" address="industryreports"/>;
}
