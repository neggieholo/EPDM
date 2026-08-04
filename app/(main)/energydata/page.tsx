import React from "react";
import { headers } from "next/headers";
import { isMobile } from "@/app/utils/IsMobile";
import EnergyDataDisplay from "@/app/LandingpageComponents/EnegyData";
import EnergyDataMobile from "@/app/LandingpageComponents/mobile/MobEnergyData";
import { energyDataSubSections } from "@/app/utils/MiscFectchers";

export default async function Page() {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "";
    const mobileCheck = isMobile(userAgent);
  

    return mobileCheck ? <EnergyDataMobile  data={energyDataSubSections}/> : <EnergyDataDisplay data={energyDataSubSections}/>;
}
