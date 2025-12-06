import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import ToastProvider from "./utils/ToastProvider";
import CookieConsentBanner from "./CookieConsentBanner";
import { isMobile } from "./utils/IsMobile";
import MobCookieConsentBanner from "./MobConsentBanner";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Energy Projects Data Media",
  description: `EPDM tracks thousands of energy projects and provides real-time, accurate,
  and reliable resources for companies seeking new business opportunities, analytics, and up-to-date industry insights.
  EPDM delivers the latest information on planned, ongoing, and future energy projects to empower your success.`,
};


export default async function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {

    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "";
    const mobileCheck = isMobile(userAgent);
    
    return (
      <html lang="en" data-theme='epdm' >
        <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-KWMBQGXNCZ"
        strategy="afterInteractive"
      />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KWMBQGXNCZ');
          `}
        </Script>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
        >
          {children}
        <ToastProvider />
        {mobileCheck ? <MobCookieConsentBanner /> : <CookieConsentBanner />}
        </body>
      </html>
    );
}
