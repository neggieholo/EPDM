"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Home,
  Archive,
  Calendar,
  FileText,
  Settings,
  ChevronDown,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";

const SideBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Check if any sub-route under projects is active to keep the dropdown open automatically on load
  const isProjectSubRouteActive = pathname.startsWith("/home/projects");
  const [projectsOpen, setProjectsOpen] = useState(isProjectSubRouteActive);

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="w-64 bg-primary p-4 flex flex-col justify-between h-screen select-none">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 mb-6 text-center">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
            <Image
              src="/epdm_logo.png"
              alt="EPDM Logo"
              fill
              className="object-contain rounded-xl"
              priority
            />
          </div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight">
            Energy Projects <br className="hidden sm:block" /> Data Media
          </h1>
        </div>

        <div className="flex flex-col space-y-4 mt-6">
          {/* Home Button */}
          <button
            onClick={() => router.push("/home")}
            className={`btn w-full justify-start gap-3 normal-case rounded-lg font-bold text-lg shadow-md
                        ${
                          isActive("/home")
                            ? "bg-accent text-accent-content"
                            : "bg-white text-gray-800 hover:bg-primary/20 hover:text-white"
                        }`}
          >
            <Home className="w-5 h-5" /> Home
          </button>

          {/* Collapsible Projects Trigger */}
          <div className="flex flex-col">
            <button
              onClick={() => setProjectsOpen(!projectsOpen)}
              className={`btn w-full justify-between normal-case rounded-lg font-bold text-lg shadow-md
                            ${isProjectSubRouteActive ? "bg-accent text-accent-content" : "bg-white text-gray-800 hover:bg-primary/20 hover:text-white"}`}
            >
              <div className="flex items-center gap-3">
                <Archive className="w-5 h-5" /> Projects
              </div>
              {projectsOpen ? (
                <ChevronDown className="w-5 h-5" />
              ) : (
                <ChevronUp className="w-5 h-5" />
              )}
            </button>

            {/* Projects Dropdown Menu Items */}
            {projectsOpen && (
              <div className="flex flex-col pl-4 mt-2 space-y-2 border-l-2 border-accent/40 gap-1">
                <button
                  onClick={() => router.push("/home/projects")}
                  className={`btn btn-sm justify-start gap-3 normal-case rounded-md font-semibold text-base w-full
                                    ${isActive("/home/projects") ? "bg-accent text-accent-content" : "bg-transparent text-white hover:bg-white/10"}`}
                >
                  All Projects
                </button>

                <button
                  onClick={() => router.push("/home/projects/favorites")}
                  className={`btn btn-sm justify-start gap-3 normal-case rounded-md font-semibold text-base w-full
                                    ${isActive("/home/projects/favorites") ? "bg-accent text-accent-content" : "bg-transparent text-white hover:bg-white/10"}`}
                >
                  <FileText className="w-4 h-4" /> Favourites
                </button>

                {/* <button
                  onClick={() => router.push("/home/projects/subscribed")}
                  className={`btn btn-sm justify-start gap-3 normal-case rounded-md font-semibold text-base w-full
                                    ${isActive("/home/projects/subscribed") ? "bg-accent text-accent-content" : "bg-transparent text-white hover:bg-white/10"}`}
                >
                  <Settings className="w-4 h-4" /> Subscribed
                </button> */}
              </div>
            )}
          </div>

          {/* Energy Data Button */}
          <button
            onClick={() => router.push("/home/energy-data")}
            className={`btn w-full justify-start gap-3 normal-case rounded-lg font-bold text-lg shadow-md
                        ${
                          isActive("/home/energy-data")
                            ? "bg-accent text-accent-content"
                            : "bg-white text-gray-800 hover:bg-primary/20 hover:text-white"
                        }`}
          >
            <Calendar className="w-5 h-5" /> Energy Data
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
