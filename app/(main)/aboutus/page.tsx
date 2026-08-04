import React from "react";
import { headers } from "next/headers";
import { isMobile } from "@/app/utils/IsMobile";
import AboutUs from "@/app/LandingpageComponents/AboutUs";
import MobAboutUs from "@/app/LandingpageComponents/mobile/MobAboutUs";

export default async function Page() {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "";
    const mobileCheck = isMobile(userAgent);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    let sections = null;

    try {
        const res = await fetch(`${baseUrl}/api/aboutUS_services/about`, {
            method: "GET",
            cache: "no-store",
        });

        if (res.ok) {
            const data = await res.json();
            sections = data.sections || null;
        }
    } catch (err) {
        console.error("Failed to fetch About Us:", err);
    }

    return mobileCheck ? <MobAboutUs sections={sections} /> : <AboutUs sections={sections} />;
}
