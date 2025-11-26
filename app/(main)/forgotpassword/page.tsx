import React from 'react'
import { headers } from "next/headers";
import { isMobile } from "@/app/utils/IsMobile";
import ForgotPasswordPage from '@/app/LandingpageComponents/ForgotPassword';

const page = async () => {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "";
    const mobileCheck = isMobile(userAgent);
    
  return (
         <ForgotPasswordPage />
  )
}

export default page