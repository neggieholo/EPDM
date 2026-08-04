/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { headers, cookies } from "next/headers";
import { isMobile } from "@/app/utils/IsMobile";
import EnergyDataPage from "@/app/Homecomponents/EnergyDataPage";
import MobEnergyDataPage from "@/app/Homecomponents/mobile/MobEnergyPage";

interface EnergyDataResponse {
  subscription_energy: boolean;
  data?: Record<string, any>[];
}

export default async function Page() {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const mobileCheck = isMobile(userAgent);

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("express.sid")?.value;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // Default structural fallback matching your subscription flag constraints
  let energyPayload: { subscription: boolean; records: Record<string, any>[] } =
    {
      subscription: false,
      records: [],
    };

  try {
    const res = await fetch(`${baseUrl}/api/energyData/logger`, {
      headers: sessionCookie
        ? { cookie: `express.sid=${sessionCookie}` }
        : undefined,
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    const data: EnergyDataResponse = await res.json();
    console.log("Energy Data Response:", data);

    if (data.subscription_energy) {
      energyPayload = {
        subscription: true,
        records: data.data || [],
      };
    }
  } catch (err) {
    console.error("Failed to fetch energy metric datasets:", err);
  }

  // Direct layout assignment using consistent contextual parameters
  if (mobileCheck) {
    return (
      <MobEnergyDataPage
        energyData={energyPayload.records}
        subscription={energyPayload.subscription}
      />
    );
  }

  return (
    <EnergyDataPage
      energyData={energyPayload.records}
      subscription={energyPayload.subscription}
    />
  );
}
