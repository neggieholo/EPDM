import React from "react";
import { headers } from "next/headers";
import { isMobile } from "../utils/IsMobile";
import MobLandingPage from "../LandingpageComponents/mobile/MobLandingPage";
import LandingPage from "../LandingpageComponents/LandingPage";

export default async function Page() {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "";
    const mobileCheck = isMobile(userAgent);

    return mobileCheck ? <MobLandingPage /> : <LandingPage />;
}
