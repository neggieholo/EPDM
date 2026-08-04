import React from "react";
import { headers } from "next/headers";
import { isMobile } from "@/app/utils/IsMobile";
import LoginCard from "@/app/LandingpageComponents/LoginCard";
import MobLoginCard from "@/app/LandingpageComponents/mobile/MobLogin";


export default async function Page() {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "";
    const mobileCheck = isMobile(userAgent);
    

    return mobileCheck ? <MobLoginCard /> : <LoginCard />;
}
