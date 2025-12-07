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

    const res = await fetch(`${baseUrl}/api/localcontent`, { cache: "no-store" });
    
    console.log("localcontents page hit!")
    let localcontents = null;
    if (res.ok) {
        const data = await res.json();
        console.log('localcontents:', data)
        localcontents = data.localcontents;
    }

    return mobileCheck ? <MobIndustryInfo contents={localcontents} nameA="Local" nameB=" Content" nameC="Achievements" address="localcontents"/> : <IndustryInfo contents={localcontents} nameA="Local" nameB=" Content" nameC="Achievements" address="localcontents"/>;
}
