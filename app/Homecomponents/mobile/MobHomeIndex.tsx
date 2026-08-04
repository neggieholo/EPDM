"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useProfile } from "@/app/utils/ProfileContext";

interface Project {
  _id: string;
  projectId: string;
  projectName: string;
  date?: string;
  status?: string;
}

interface HomeIndexProps {
  recentlyCreated: Project[];
}

const MobHomeIndex: React.FC<HomeIndexProps> = ({ recentlyCreated }) => {
  const router = useRouter();
  const { setReturnPage, profile } = useProfile();

  function openProject(project: Partial<Project>) {
    if (!project.projectId) return;
    router.push(`/home/projects/${project.projectId}`);
    setReturnPage("All Projects");
  }

  return (
    <div className="p-3 sm:p-4 w-full sm:w-[90%] mx-auto pt-20 flex flex-col gap-4">
      {/* 1. Welcome Hero Section */}
      <div className="bg-linear-to-r from-primary to-primary-dark text-white p-4 rounded-xl shadow-sm flex flex-col gap-0.5">
        <h2 className="text-lg font-bold tracking-wide">
          Welcome back, {profile?.Username || "User"}!
        </h2>
        <p className="text-[11px] text-white/80">
          Access Reliable Project and Energy Data
        </p>
      </div>

      {/* 2. Visual Metric Analytics Highlight Row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-accent/20 border border-accent/10 p-3 rounded-xl flex flex-col justify-center">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
            Energy Sectors
          </span>
          <span className="text-lg font-black text-primary-dark mt-0.5">
            20+
          </span>
        </div>
        <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl flex flex-col justify-center">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-700">
            Recent Stream
          </span>
          <span className="text-lg font-black text-blue-900 mt-0.5">
            {recentlyCreated.length} Active
          </span>
        </div>
        <div className="col-span-2 bg-gray-50 border border-gray-100 p-2.5 rounded-xl flex flex-col justify-center">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
            Security Gate
          </span>
          <span className="text-[11px] font-bold text-emerald-600 mt-0.5 flex items-center gap-1">
            ● Live Encryption Verified
          </span>
        </div>
      </div>

      {/* 3. Main Operational Board Core */}
      <div className="flex flex-col bg-white border border-gray-100 rounded-xl p-4 shadow-sm gap-3">
        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
          <h3 className="text-sm sm:text-base font-bold text-primary-dark">
            Recently Added Projects
          </h3>
          <span className="text-[10px] font-mono bg-accent/30 text-primary font-bold px-2 py-0.5 rounded-full">
            New Entries
          </span>
        </div>

        {recentlyCreated.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-xs border border-dashed border-gray-200 rounded-xl bg-gray-50/50 px-2">
            📁 No recently modified projects found on your instance profile.
          </div>
        ) : (
          <div className="flex flex-col gap-2.5 my-1">
            {recentlyCreated.map((project) => (
              <div
                key={project._id}
                onClick={() => openProject(project)}
                className="group p-3.5 bg-gray-50/50 active:bg-accent/10 border border-gray-200/60 active:border-accent/40 rounded-xl flex items-center justify-between cursor-pointer transition-all active:scale-[0.98]"
              >
                <div className="flex flex-col gap-0.5 pr-3 min-w-0">
                  <h4 className="text-sm font-bold text-gray-900 active:text-primary transition-colors truncate">
                    {project.projectName || "Untitled Project"}
                  </h4>
                  <span className="text-[10px] text-gray-400 font-mono">
                    ID: {project.projectId?.slice(0, 8) || "N/A"}...
                  </span>
                </div>

                <span className="text-gray-400 text-xs shrink-0 pl-1">➔</span>
              </div>
            ))}
          </div>
        )}

        {/* Info Footer Callout Block */}
        <div
          onClick={() => router.push("/home/projects")}
          className="flex items-start justify-center gap-2 text-xs font-medium text-gray-500 active:text-primary bg-gray-50 active:bg-accent/20 p-3 border border-gray-200/40 rounded-xl cursor-pointer text-left"
        >
          <span className="shrink-0 mt-0.5">ℹ️</span>
          <span className="leading-snug">
            Click here or use the primary sidebar menu layout to view full
            system projects
          </span>
        </div>
      </div>
    </div>
  );
};

export default MobHomeIndex;
