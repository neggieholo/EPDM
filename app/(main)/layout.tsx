import "../globals.css";
import Navbar from "../LandingpageComponents/Navbar";
import MobileNavbar from "../LandingpageComponents/mobile/MobileNavbar";
import { headers } from "next/headers";
import { isMobile } from "../utils/IsMobile";
import { Poppins } from "next/font/google";
import Footer from "../LandingpageComponents/Intro/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const mobileCheck = isMobile(userAgent);

  return (
    <div
      className={`${poppins.className} flex flex-col bg-base-200 min-h-screen`}
    >
      {/* Sticky navbar remains at the top without breaking layout flow */}
      <header className="sticky top-0 z-50 w-full">
        {mobileCheck ? <MobileNavbar /> : <Navbar />}
      </header>

      {/* Main content automatically starts below the Navbar */}
      <main className="flex-1 w-full">{children}</main>

      <Footer />
    </div>
  );
}
