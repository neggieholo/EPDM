import React from "react";
import { headers } from "next/headers";
import { isMobile } from "@/app/utils/IsMobile";
import IndustryInfoDisplay from "@/app/LandingpageComponents/IndustryInfoDisplay";
import MobIndustryInfoDisplay from "@/app/LandingpageComponents/mobile/MobIndustryInfoDisplay";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = await params;
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "";
    const mobileCheck = isMobile(userAgent);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const res = await fetch(`${baseUrl}/api/industryreports/${id}`, { cache: "no-store" });
    
    console.log("industryReports page hit!")
    let industryReport = null;
    if (res.ok) {
        const data = await res.json();
        industryReport = data.industryReport;
    }

    return mobileCheck ? <MobIndustryInfoDisplay content={industryReport}/> : <IndustryInfoDisplay content={industryReport}/>;
}
