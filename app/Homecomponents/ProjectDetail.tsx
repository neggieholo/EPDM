"use client";

import React, { useState, useEffect } from "react";
import { DisplayProject } from "@/app/utils/Interfaces";
import {
  handleFavouriteToggle,
  handleSubscribeToggle,
  updateProjectViewCount,
  fetchFavProjects,
  fetchSubscribedProjects,
} from "@/app/utils/ProjectFetchers";

interface ProjectDetailProps {
  project: Partial<DisplayProject>;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project }) => {
  const projectId = project["Project ID"];

  const [viewCount, setViewCount] = useState(project?.viewCount || 0);
  const [favourited, setFavourited] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch latest view count
  useEffect(() => {
    async function fetchViews() {
      if (!projectId) return;

      const count = await updateProjectViewCount(projectId);

      if (count !== undefined) {
        setViewCount(count);
      }
    }

    fetchViews();
  }, [projectId]);

  // Fetch favourite and subscription status
  useEffect(() => {
    async function initStatus() {
      if (!projectId) return;

      try {
        const favResponse = await fetchFavProjects();
        const subResponse = await fetchSubscribedProjects();

        const favs = favResponse.favProjects || [];
        const subs = subResponse.subscribedProjects || [];

        setFavourited(favs.includes(projectId.toString()));
        setSubscribed(subs.includes(projectId.toString()));
      } catch (err) {
        console.error("Failed to fetch user preferences:", err);
      }
    }

    initStatus();
  }, [projectId]);

  // Toggle favourite
  const toggleFavourite = async (checked: boolean) => {
    if (!projectId) return;

    setLoading(true);

    try {
      const newFavs = await handleFavouriteToggle(projectId, checked);
      setFavourited(newFavs.includes(projectId));
    } finally {
      setLoading(false);
    }
  };

  // Toggle subscription
  const toggleSubscribe = async (checked: boolean) => {
    if (!projectId) return;

    setLoading(true);

    try {
      const newSubs = await handleSubscribeToggle(projectId, checked);
      setSubscribed(newSubs.includes(projectId));
    } finally {
      setLoading(false);
    }
  };

  // Section badge styling
  const getSectionStyle = (section?: string) => {
    switch (section) {
      case "Upstream":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "Midstream":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";

      case "Downstream":
        return "bg-cyan-50 text-cyan-700 border-cyan-200";

      case "Service Companies":
        return "bg-violet-50 text-violet-700 border-violet-200";

      case "OEM/Manufacturers":
        return "bg-sky-50 text-sky-700 border-sky-200";

      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  // Format project information values
  const formatValue = (value: unknown): string => {
    if (value === null || value === undefined || value === "") {
      return "-";
    }

    if (Array.isArray(value)) {
      return value.join(", ");
    }

    if (typeof value === "object") {
      return JSON.stringify(value);
    }

    return String(value);
  };

  if (!projectId) {
    return (
      <div className="p-6 bg-white border border-rose-200 rounded-lg text-rose-600">
        Project not found
      </div>
    );
  }

  const projectDetails = Object.entries(project).filter(
    ([key]) => key !== "Project Name" && key !== "viewCount",
  );

  return (
    <div className="w-full flex flex-col gap-5 py-4">
      {/* Project Header */}
      <div className="bg-white border border-blue-100 rounded-lg shadow-sm overflow-hidden">
        <div className="h-2 bg-primary" />

        <div className="p-2 sm:p-6">
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Project Profile
                </span>

                {project.Section && (
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded border ${getSectionStyle(project.Section)}`}
                  >
                    {project.Section}
                  </span>
                )}

                {project["Project Size"] && (
                  <span className="text-xs font-medium px-2.5 py-1 rounded bg-slate-100 text-slate-600 border border-slate-200">
                    {project["Project Size"]}
                  </span>
                )}
              </div>

              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary leading-snug">
                {project["Project Name"] || "Unnamed Project"}
              </h1>

              <p className="text-sm text-slate-500 mt-2">
                Detailed information and project data.
              </p>
            </div>

            {/* Project Views */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span className="text-primary text-lg">◉</span>
                Project Views
              </div>

              <span className="font-bold text-primary text-lg">
                {viewCount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
        {/* Project Information */}
        <div className="lg:col-span-2 bg-white border border-blue-100 rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 md:p-5 border-b border-slate-100">
            <h2 className="text-lg font-bold text-primary">
              Project Information
            </h2>

            <p className="text-xs md:text-sm text-slate-500 mt-1">
              Overview and available project specifications.
            </p>
          </div>

          <div className="p-3 md:p-5 bg-accent/10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {projectDetails.map(([key, value]) => (
                <div
                  key={key}
                  className="bg-white border border-slate-200 rounded-md p-3 md:p-4 min-w-0 hover:border-blue-200 transition-colors"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2 break-words">
                    {key}
                  </p>

                  <p className="text-sm font-medium text-slate-800 leading-relaxed break-words whitespace-pre-wrap">
                    {formatValue(value)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Engagement Panel */}
        <div className="bg-white border border-blue-100 rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-primary">My Project</h2>

            <p className="text-xs text-slate-500 mt-1">
              Manage your project preferences.
            </p>
          </div>

          <div className="p-4 flex flex-col gap-4">
            {/* Favourite */}
            <div className="border border-slate-200 rounded-md p-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={favourited}
                  disabled={loading}
                  onChange={(e) => toggleFavourite(e.target.checked)}
                  className="checkbox checkbox-primary checkbox-sm mt-0.5"
                />

                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-slate-800">
                    Add to Favourites
                  </span>

                  <span className="text-xs text-slate-500 leading-relaxed">
                    Save this project for quick access later.
                  </span>
                </div>
              </label>
            </div>

            {/* Subscription */}
            {/* <div className="border border-slate-200 rounded-md p-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={subscribed}
                  disabled={loading}
                  onChange={(e) => toggleSubscribe(e.target.checked)}
                  className="checkbox checkbox-primary checkbox-sm mt-0.5"
                />

                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-slate-800">
                    Subscribe to Newsletter
                  </span>

                  <span className="text-xs text-slate-500 leading-relaxed">
                    Receive updates and notifications about this project.
                  </span>
                </div>
              </label>
            </div> */}

            {/* Loading State */}
            {loading && (
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="loading loading-spinner loading-xs text-primary" />
                Updating preferences...
              </div>
            )}

            {/* <div className="bg-blue-50 border border-blue-100 rounded-md p-3">
              <p className="text-xs text-blue-800 leading-relaxed">
                Your favourite projects and subscriptions can be accessed from
                your dashboard.
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
