import React from 'react';
import { headers } from 'next/headers';
import { isMobile } from '@/app/utils/IsMobile';
import ResetPassword from '@/app/LandingpageComponents/ResetPassword';

interface PageProps {
  params: { token: string };
}

const Page = async ({ params }: PageProps) => {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';
  const mobileCheck = isMobile(userAgent);

  const { token } = await params; // extract token from URL

  return <ResetPassword token={token} />;
};

export default Page;
