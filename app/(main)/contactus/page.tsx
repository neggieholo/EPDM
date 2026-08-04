import React from "react";
import { headers } from "next/headers";
import { isMobile } from "@/app/utils/IsMobile";
import ContactUs from "@/app/LandingpageComponents/ContactUs";
import MobContactUs from "@/app/LandingpageComponents/mobile/MobContatcUs";

export default async function Page() {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "";
    const mobileCheck = isMobile(userAgent);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    let contact = null;

    try {
        const res = await fetch(`${baseUrl}/api/terms_socials/contact`, {
            method: "GET",
            cache: "no-store",
        });

        if (res.ok) {
            const data = await res.json();
            contact = data.contact || null;
        }
    } catch (err) {
        console.error("Failed to fetch About Us:", err);
    }

    return mobileCheck ? <MobContactUs contact={contact} /> : <ContactUs contact={contact} />;
}
