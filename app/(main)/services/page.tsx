import React from "react";
import { headers } from "next/headers";
import { isMobile } from "@/app/utils/IsMobile";
import Services from "@/app/LandingpageComponents/Services";
import MobServices from "@/app/LandingpageComponents/mobile/MobServices";

export default async function Page() {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "";
    const mobileCheck = isMobile(userAgent);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const res = await fetch(`${baseUrl}/api/aboutUS_services/services`, {
        method: "GET",
        cache: "no-store",
    });

    let serviceData = null;
    if (res.ok) {
        serviceData = await res.json();
    }

    return mobileCheck ? <MobServices serviceData={serviceData} /> : <Services serviceData={serviceData} />;
}
