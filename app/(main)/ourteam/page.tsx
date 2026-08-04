import React from "react";
import { headers } from "next/headers";
import { isMobile } from "@/app/utils/IsMobile";
import Team from "@/app/LandingpageComponents/OurTeam";
import MobTeam from "@/app/LandingpageComponents/mobile/MobOurTeam";

export default async function Page() {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "";
    const mobileCheck = isMobile(userAgent);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const res = await fetch(`${baseUrl}/api/team/members`, {
        method: "GET",
        cache: "no-store",
    });

    let members = null;
    if (res.ok) {
        const data = await res.json();
        members = data.members;
    }

    return mobileCheck ? <MobTeam members={members} /> : <Team members={members} />;
}
