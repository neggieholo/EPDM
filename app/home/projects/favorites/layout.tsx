// app/layouts/HomeLayout.tsx
import { headers } from "next/headers";
import { isMobile } from "@/app/utils/IsMobile";
import Link from "next/link";

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
      <h1 className="text-xl p-1 flex items-center shadow z-10 text-primary/50">
        Favourites
      </h1>

      {/* SCROLLABLE AREA */}
      <div className="flex-1 w-full p-1 pt-4 pb-10">
        <div>{children}</div>
      </div>
    </div>
  ) : (
    <div className="h-screen w-full flex flex-col relative pb-6 text-primary">
      {/* FIXED HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold py-4 px-6 shadow z-10 text-primary/50">
          Favourites
        </h1>

        <div className="flex justify-end">
          <Link
            href="/home/projects"
            className="btn btn-md btn-ghost text-primary"
          >
            ← All Projects
          </Link>
        </div>
      </div>

      {/* SCROLLABLE AREA */}
      <div className="flex-1 p-2 pb-10">
        <div className="rounded-md p-5 text-primary">{children}</div>
      </div>
    </div>
  );
}
