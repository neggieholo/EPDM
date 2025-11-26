import React from "react";
import { headers } from "next/headers";
import { isMobile } from "@/app/utils/IsMobile";
import NewsDisplay from "@/app/LandingpageComponents/PressReleaseDisplay";
import MobNewsDisplay from "@/app/LandingpageComponents/mobile/MobPressReleaseDisplay";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = await params;
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "";
    const mobileCheck = isMobile(userAgent);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    let news = null;

    try {
        const res = await fetch(`${baseUrl}/api/news/${id}`, {
            method: "GET",
            cache: "no-store",
        });

        if (res.ok) {
            const data = await res.json();
            news = data.news || null;
        }
    } catch (err) {
        console.error("Failed to fetch About Us:", err);
    }

    return mobileCheck ? <MobNewsDisplay newsItem={news} /> : <NewsDisplay newsItem={news} />;
}
