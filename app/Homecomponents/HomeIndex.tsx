"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useProfile } from "../utils/ProfileContext";

interface Project {
  _id: string;
  projectId: string;
  projectName: string;
  date?: string; // Optional meta fields for visual richness
  status?: string; // e.g., "Active", "Updated"
}

interface HomeIndexProps {
  recentlyCreated: Project[];
}

const HomeIndex: React.FC<HomeIndexProps> = ({ recentlyCreated }) => {
  const router = useRouter();
  const { setReturnPage, profile } = useProfile();

  function openProject(project: Partial<Project>) {
    if (!project.projectId) return;
    router.push(`/home/projects/${project.projectId}`);
    setReturnPage("All Projects");
  }

  return (
    <div className="w-full mx-auto px-4 py-6 md:py-8 flex flex-col gap-6">
      {/* 1. Welcome Hero Section */}
      <div className="bg-linear-to-r from-primary to-primary-dark text-white p-6 rounded-2xl shadow-sm flex flex-col gap-1">
        <h2 className="text-xl md:text-2xl font-bold tracking-wide">
          Welcome back, {profile?.Username || "User"}!
        </h2>
        <p className="text-xs md:text-sm text-white/80 max-w-xl">
          Access Reliable Project and Energy Data
        </p>
      </div>

      {/* 2. Visual Metric Analytics Highlight Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-accent/20 border border-accent/10 p-4 rounded-xl flex flex-col justify-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Energy Sectors
          </span>
          <span className="text-xl md:text-2xl font-black text-primary-dark mt-1">
            20+
          </span>
        </div>
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex flex-col justify-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">
            Recent Stream
          </span>
          <span className="text-xl md:text-2xl font-black text-blue-900 mt-1">
            {recentlyCreated.length} Active
          </span>
        </div>
        <div className="col-span-2 md:col-span-1 bg-gray-50 border border-gray-100 p-4 rounded-xl flex flex-col justify-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Security Gate
          </span>
          <span className="text-xs md:text-sm font-bold text-emerald-600 mt-1 flex items-center gap-1">
            ● Live Encryption Verified
          </span>
        </div>
      </div>

      {/* 3. Main Operational Board Core */}
      <div className="flex flex-col bg-white border border-gray-100 rounded-2xl p-4 md:p-6 shadow-sm gap-4">
        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
          <h3 className="text-base md:text-lg font-bold text-primary-dark">
            Recently Added Projects
          </h3>
          <span className="text-[11px] font-mono bg-accent/30 text-primary font-bold px-2 py-0.5 rounded-full">
            New Entries
          </span>
        </div>

        {recentlyCreated.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-sm border border-dashed border-gray-200 rounded-xl bg-gray-50/50">
            📁 No recently modified projects found on your instance profile.
          </div>
        ) : (
          // Grid Layout replacing the bulleted <ul> list element
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-2">
            {recentlyCreated.map((project) => (
              <div
                key={project._id}
                onClick={() => openProject(project)}
                className="group p-4 bg-gray-50/50 hover:bg-accent/10 border border-gray-200/60 hover:border-accent/40 rounded-xl flex items-center justify-between cursor-pointer transition-all active:scale-[0.99]"
              >
                <div className="flex flex-col gap-1 pr-4 min-w-0">
                  <h4 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-primary transition-colors truncate">
                    {project.projectName || "Untitled Project"}
                  </h4>
                  <span className="text-[11px] text-gray-400 font-mono">
                    ID: {project.projectId?.slice(0, 8) || "N/A"}...
                  </span>
                </div>

                {/* Interactive indicator chevron icon */}
                <span className="text-gray-400 group-hover:text-primary transition-transform group-hover:translate-x-0.5 text-sm shrink-0">
                  ➔
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Info Footer Callout Block */}
        <div
          onClick={() => router.push("/home/projects")}
          className="flex items-center justify-center gap-2 text-md font-semibold text-gray-500 hover:text-primary bg-gray-50 hover:bg-accent/20 p-2.5 border border-gray-200/40 rounded-xl cursor-pointer transition-colors text-center"
        >
          <span>ℹ️</span>
          <span>
            Click here or use the primary sidebar menu layout to view full
            system projects
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomeIndex;
