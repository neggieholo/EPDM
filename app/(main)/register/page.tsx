import React from 'react'
import { headers } from "next/headers";
import { isMobile } from "@/app/utils/IsMobile";
import RegisterCard from '@/app/LandingpageComponents/RegisterCard'
import MobRegisterCard from '@/app/LandingpageComponents/mobile/MobRegister';

const page = async () => {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "";
    const mobileCheck = isMobile(userAgent);
    
  return (
         mobileCheck ? <MobRegisterCard /> : <RegisterCard />
  )
}

export default page