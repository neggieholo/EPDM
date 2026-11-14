import React from "react";
import { headers } from "next/headers";
import { isMobile } from "@/app/utils/IsMobile";
import MobPartners from "@/app/LandingpageComponents/mobile/MobilePartners";
import Partners from "@/app/LandingpageComponents/Partners";


export default async function Page() {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "";
    const mobileCheck = isMobile(userAgent);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    let partners = null;

    try {
        const res = await fetch(`${baseUrl}/api/partners`, {
          method: "GET",
          cache: "no-store",
        });

        if (res.ok) {
            const data = await res.json();
            partners = data.partners || null;
        }
        console.log("Fetched Partners:", partners);
    } catch (err) {
        console.error("Failed to fetch Partners:", err);
    }

    return mobileCheck ? (
      <MobPartners />
    ) : (
      <Partners />
    );
}
