import "../globals.css"
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


export default async function MainLayout({ children }: { children: React.ReactNode }) {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "";
    const mobileCheck = isMobile(userAgent);

    return (
        <div className={`${poppins.className} flex flex-col bg-base-200 min-h-screen`}>
            {mobileCheck ? <MobileNavbar /> : <Navbar />}
            <main className="min-h-[70vh]">{children}</main>
            <Footer />
        </div>
    );
}
