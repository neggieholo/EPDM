import React from "react";
import { headers } from "next/headers";
import { isMobile } from "@/app/utils/IsMobile";
import CorporateGovernance from "@/app/LandingpageComponents/CorporateGovernance";
import MobCorporateGovernance from "@/app/LandingpageComponents/mobile/MobCorporateGovernance";

export default async function Page() {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "";
    const mobileCheck = isMobile(userAgent);

    return mobileCheck ? (
      <MobCorporateGovernance />
    ) : (
      <CorporateGovernance />
    );
}
