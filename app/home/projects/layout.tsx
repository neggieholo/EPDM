// app/layouts/HomeLayout.tsx
import { headers } from "next/headers";
import { isMobile } from "@/app/utils/IsMobile";

interface ProjectLayoutProps {
    children: React.ReactNode;
}

export default async function ProjectLayout({ children }: ProjectLayoutProps) {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "";
    const mobileCheck = isMobile(userAgent);

    return mobileCheck ? (
        <div className="h-screen w-full flex flex-col relative pb-12">

            {/* FIXED HEADER */}
            <h1 className="text-3xl font-bold pt-20 px-3 shadow z-10 text-primary">
                Projects
            </h1>

            {/* SCROLLABLE AREA */}
            <div className="flex-1 w-full pt-4 pb-10">
                <div className="pb-10">
                    {children}
                </div>
            </div>

        </div>
    ) : (
        <div className="h-screen w-full flex flex-col relative pb-6">

            {/* FIXED HEADER */}
            <h1 className="text-3xl font-bold py-4 px-6 shadow z-10 text-primary">
                Projects
            </h1>

            {/* SCROLLABLE AREA */}
            <div className="flex-1 overflow-y-auto p-6 pt-4 pb-10">
                <div className="border border-accent rounded-md p-5">
                    {children}
                </div>
            </div>
        </div>
    );
}
