import React from "react";
import { headers } from "next/headers";
import { isMobile } from "@/app/utils/IsMobile";
import ProjectInterviews from "@/app/LandingpageComponents/ProjectInterview";
import MobProjectInterviews from "@/app/LandingpageComponents/mobile/MobProjectInterviews";


export default async function Page() {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "";
    const mobileCheck = isMobile(userAgent);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    let interviews = null;

    try {
        const res = await fetch(`${baseUrl}/api/project_interview`, {
            method: "GET",
            cache: "no-store",
        });

        if (res.ok) {
            const data = await res.json();
            interviews = data.interviews || null;
        }
    } catch (err) {
        console.error("Failed to fetch About Us:", err);
    }

    return mobileCheck ? <MobProjectInterviews interviews={interviews} /> : <ProjectInterviews interviews={interviews} />;
}
