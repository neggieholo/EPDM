"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Home,
  Archive,
  Calendar,
  FileText,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

const MobBottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Automatically open Projects menu on project routes
  const isProjectRoute = pathname.startsWith("/home/projects");

  const [projectsOpen, setProjectsOpen] = useState(isProjectRoute);

  useEffect(() => {
    const handleProjectRoute = () => {
      if (isProjectRoute) {
        setProjectsOpen(true);
      }
    };

    handleProjectRoute();
  }, [isProjectRoute]);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-blue-100 shadow-lg">
      {/* Projects Drop-up Menu */}
      {projectsOpen && (
        <div className="absolute bottom-full left-0 right-0 px-4 pb-3">
          <div className="bg-white border border-blue-100 rounded-xl shadow-xl overflow-hidden">
            <div className="px-4 py-3 bg-primary text-white">
              <p className="text-sm font-bold">Projects</p>

              <p className="text-[11px] text-white/70">
                Browse and manage your projects
              </p>
            </div>

            <div className="p-2 flex flex-col gap-1">
              {/* All Projects */}
              <button
                onClick={() => {
                  router.push("/home/projects");
                  setProjectsOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition
                                    ${
                                      isActive("/home/projects")
                                        ? "bg-blue-100 text-primary"
                                        : "text-slate-700 hover:bg-blue-50"
                                    }`}
              >
                <Archive className="w-5 h-5" />
                All Projects
              </button>

              {/* Favourites */}
              <button
                onClick={() => {
                  router.push("/home/projects/favorites");
                  setProjectsOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition
                                    ${
                                      isActive("/home/projects/favorites")
                                        ? "bg-blue-100 text-primary"
                                        : "text-slate-700 hover:bg-blue-50"
                                    }`}
              >
                <FileText className="w-5 h-5" />
                Favourites
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation Items */}
      <div className="flex justify-around items-center py-2 px-2">
        {/* Home */}
        <button
          onClick={() => {
            setProjectsOpen(false);
            router.push("/home");
          }}
          className={`flex flex-col items-center justify-center gap-1 px-4 py-1.5 rounded-lg transition-all
                        ${
                          isActive("/home")
                            ? "bg-blue-50 text-primary font-semibold"
                            : "text-slate-500"
                        }`}
        >
          <Home className="w-5 h-5" />

          <span className="text-[10px]">Home</span>
        </button>

        {/* Projects */}
        <button
          onClick={() => setProjectsOpen((prev) => !prev)}
          className={`flex flex-col items-center justify-center gap-1 px-4 py-1.5 rounded-lg transition-all
                        ${
                          isProjectRoute || projectsOpen
                            ? "bg-blue-50 text-primary font-semibold"
                            : "text-slate-500"
                        }`}
        >
          <div className="flex items-center gap-1">
            <Archive className="w-5 h-5" />

            {projectsOpen ? (
              <ChevronDown className="w-3 h-3" />
            ) : (
              <ChevronUp className="w-3 h-3" />
            )}
          </div>

          <span className="text-[10px]">Projects</span>
        </button>

        {/* Energy Data */}
        <button
          onClick={() => {
            setProjectsOpen(false);
            router.push("/home/energydata");
          }}
          className={`flex flex-col items-center justify-center gap-1 px-4 py-1.5 rounded-lg transition-all
                        ${
                          isActive("/home/energydata")
                            ? "bg-blue-50 text-primary font-semibold"
                            : "text-slate-500"
                        }`}
        >
          <Calendar className="w-5 h-5" />

          <span className="text-[10px]">Energy Data</span>
        </button>
      </div>
    </nav>
  );
};

export default MobBottomNav;
