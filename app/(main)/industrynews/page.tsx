import React from "react";
import { headers } from "next/headers";
import { isMobile } from "@/app/utils/IsMobile";
import NewsLinks from "@/app/LandingpageComponents/IndustryNews";
import MobNewsLinks from "@/app/LandingpageComponents/mobile/MobIndustryNews";

export default async function Page() {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "";
    const mobileCheck = isMobile(userAgent);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const res = await fetch(`${baseUrl}/api/newsLinks`, { cache: "no-store" });
    

    let links = null;
    if (res.ok) {
        const data = await res.json();
        links = data.links;
    }

    return mobileCheck ? <MobNewsLinks links={links} /> : <NewsLinks links={links} />;
}
