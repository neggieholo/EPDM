// app/layouts/HomeLayout.tsx
import { headers } from "next/headers";
import { isMobile } from "@/app/utils/IsMobile";
import BackButton from "@/app/Homecomponents/BackButton";
import Link from "next/link";

interface ProjectLayoutProps {
    children: React.ReactNode;
}

export default async function ProjectLayout({ children }: ProjectLayoutProps) {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "";
    const mobileCheck = isMobile(userAgent);

    return (
        <div className="h-screen w-full flex flex-col relative pb-6 text-primary">

            {/* FIXED HEADER */}
            <h1 className="text-2xl font-bold py-4 px-6 shadow z-10 text-primary">
                Project Detail
            </h1>

            <nav className="navbar flex justify-end bg-none px-6">
                <div className="flex justify-end w-full">
                    <BackButton />
                </div>
            </nav>

            {/* SCROLLABLE AREA */}
            <div className="flex-1 overflow-y-auto p-2 pb-10">
                <div className="rounded-md p-5 text-primary">
                    {children}
                </div>
            </div>
        </div>
    );
}
