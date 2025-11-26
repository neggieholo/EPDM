import React from "react";
import { headers, cookies } from "next/headers";
import { isMobile } from "@/app/utils/IsMobile";
import ProfileEditor from "@/app/Homecomponents/ProfileEditor";
import MobProfileEditor from "@/app/Homecomponents/mobile/MobProfileEditor";


export default async function Page() {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "";
    const mobileCheck = isMobile(userAgent);

    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("express.sid")?.value;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    let profile = null;

    try {
        const res = await fetch(`${baseUrl}/api/profile`, {
            headers: {
                cookie: sessionCookie ? `express.sid=${sessionCookie}` : "",
            },
            cache: "no-store",
        });

        if (res.ok) {
            const data = await res.json();
            profile = data || null;
            console.log("Fetched profile:", profile);
        }
    } catch (err) {
        console.error("Failed to fetch Profile:", err);
    }

    return mobileCheck ? <MobProfileEditor profile={profile} /> : <ProfileEditor profile={profile} />;
}
