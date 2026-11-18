import React from "react";
import Careers from "@/app/LandingpageComponents/Careers";

export default async function Page() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  let careers = null;

  try {
    const res = await fetch(`${baseUrl}/api/careers`, {
      method: "GET",
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      careers = data.careers || null;
    }
  } catch (err) {
    console.error("Failed to fetch Careers:", err);
  }

  return <Careers careerList={careers || []} />;
}
