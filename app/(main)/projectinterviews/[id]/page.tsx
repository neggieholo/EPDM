import React from "react";
import { headers } from "next/headers";
import { isMobile } from "@/app/utils/IsMobile";
import InterviewDisplay from "@/app/LandingpageComponents/ProjectInterviewDisplay";
import MobInterviewDisplay from "@/app/LandingpageComponents/mobile/MobProjectInterviewDisplay";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = await params;
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "";
    const mobileCheck = isMobile(userAgent);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    let interview = null;

    try {
        const res = await fetch(`${baseUrl}/api/project_interview/${id}`, {
            method: "GET",
            cache: "no-store",
        });

        if (res.ok) {
            const data = await res.json();
            interview = data.interview || null;
        }
    } catch (err) {
        console.error("Failed to fetch About Us:", err);
    }

    return mobileCheck ? <MobInterviewDisplay interviewItem={interview} /> : <InterviewDisplay interviewItem={interview} />;
}
