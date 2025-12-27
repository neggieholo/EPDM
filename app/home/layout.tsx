// app/layouts/HomeLayout.tsx
import { headers } from "next/headers";
import { isMobile } from "../utils/IsMobile";
import { Poppins } from "next/font/google";
import SideBar from "../Homecomponents/Sidebar";
import TopBar from "../Homecomponents/TopBar";
import MobTopBar from "../Homecomponents/mobile/MobTopBar";
import MobBottomNav from "../Homecomponents/mobile/MobBottomNav";
import { ProfileProvider } from "../utils/ProfileContext";
import SocketProvider from "../Homecomponents/SocketProvider";

interface HomeLayoutProps {
    children: React.ReactNode;
}

export default async function HomeLayout({ children }: HomeLayoutProps) {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "";
    const mobileCheck = isMobile(userAgent);

    return (
        <ProfileProvider>
            {!mobileCheck ? (
                // ✅ Desktop layout
                <div className="flex h-screen bg-base-200 overflow-hidden">
                    {/* Sidebar */}
                    <SideBar />

                    {/* Main content */}
                    <div className="flex flex-col flex-1">
                        <TopBar />

                        <main className="flex-1 p-6 space-y-6 bg-white relative overflow-y-auto">
                            {children}
                            <SocketProvider />
                        </main>
                    </div>
                </div>
            ) : (
                // ✅ Mobile layout
                <div className="min-h-screen flex flex-col relative bg-base-100">
                    <MobTopBar />

                    <main className="flex-1 overflow-y-auto p-4 space-y-5 pb-24 relative">
                        {children}
                        <SocketProvider />
                    </main>

                    <MobBottomNav />
                </div>
            )}
        </ProfileProvider>
    );
}
