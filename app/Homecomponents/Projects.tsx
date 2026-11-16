"use client";

import React, { useState, useMemo } from "react";
import { DisplayProject } from "@/app/utils/Interfaces";
import PaymentDiv from "./PaymentDiv";
import { useRouter } from "next/navigation";
import { useProfile } from "../utils/ProfileContext";

interface ProjectsPageProps {
  projects: Partial<DisplayProject>[];
  subscription: boolean;
  returnPage: string;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({
  projects,
  subscription,
  returnPage,
}) => {
  const router = useRouter();
  const { setReturnPage } = useProfile();

  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [projectSize, setProjectSize] = useState("all");

  const sections = [
    "Upstream",
    "Midstream",
    "Downstream",
    "Service Companies",
    "OEM/Manufacturers",
  ];

  // Dynamically calculate project statistics
  const projectStats = useMemo(
    () => ({
      total: projects.length,
      upstream: projects.filter((p) => p.Section === "Upstream").length,
      midstream: projects.filter((p) => p.Section === "Midstream").length,
      downstream: projects.filter((p) => p.Section === "Downstream").length,
      service_companies: projects.filter((p) => p.Section === "Service Companies").length,
      oem_manufacturers: projects.filter((p) => p.Section === "OEM/Manufacturers").length,
      // others: projects.filter((p) =>
      //   ["Service Companies", "OEM/Manufacturers"].includes(p.Section || ""),
      // ).length,
    }),
    [projects],
  );

  // Toggle individual section filters
  const toggleSection = (section: string) => {
    setSelectedSections((prev) =>
      prev.includes(section)
        ? prev.filter((item) => item !== section)
        : [...prev, section],
    );
  };

  // Filter projects
  const filteredProjects = useMemo(() => {
    const filtered = projects.filter((project) => {
      if (
        selectedSections.length > 0 &&
        !selectedSections.includes(project.Section || "")
      ) {
        return false;
      }

      if (
        projectSize !== "all" &&
        project["Project Size"]?.toLowerCase() !== projectSize.toLowerCase()
      ) {
        return false;
      }

      if (searchValue.trim()) {
        const searchStr = searchValue.toLowerCase();

        return Object.values(project).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchStr),
        );
      }

      return true;
    });

    return filtered;
  }, [projects, selectedSections, projectSize, searchValue]);

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

  function openProject(project: Partial<DisplayProject>) {
    if (!project["Project ID"]) return;

    setReturnPage(returnPage);
    router.push(`/home/projects/${project["Project ID"]}`);

    // console.log("Return Page:", returnPage);
  }

  if (!subscription) return <PaymentDiv target="projects" />;

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Page Heading */}
      <div className="flex flex-col gap-1">
        <p className="text-sm text-slate-500">
          Explore and access energy projects across Nigeria.
        </p>
      </div>

      {/* Project Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        <div className="bg-white border border-blue-100 rounded-lg p-4 shadow-sm">
          <p className="text-sm text-slate-500 font-medium">Total Projects</p>
          <h2 className="text-2xl font-bold text-primary mt-1">
            {projectStats.total.toLocaleString()}
          </h2>
        </div>

        <div className="bg-white border border-blue-100 rounded-lg p-4 shadow-sm">
          <p className="text-sm text-slate-500 font-medium">Upstream</p>
          <h2 className="text-2xl font-bold text-primary mt-1">
            {projectStats.upstream.toLocaleString()}
          </h2>
        </div>

        <div className="bg-white border border-blue-100 rounded-lg p-4 shadow-sm">
          <p className="text-sm text-slate-500 font-medium">Midstream</p>
          <h2 className="text-2xl font-bold text-primary mt-1">
            {projectStats.midstream.toLocaleString()}
          </h2>
        </div>

        <div className="bg-white border border-blue-100 rounded-lg p-4 shadow-sm">
          <p className="text-sm text-slate-500 font-medium">
            Downstream & Others
          </p>
          <h2 className="text-2xl font-bold text-primary mt-1">
            {projectStats.downstream.toLocaleString()}
          </h2>
        </div>
        <div className="bg-white border border-blue-100 rounded-lg p-4 shadow-sm">
          <p className="text-sm text-slate-500 font-medium">
            Service Companies
          </p>
          <h2 className="text-2xl font-bold text-primary mt-1">
            {projectStats.service_companies.toLocaleString()}
          </h2>
        </div>
        <div className="bg-white border border-blue-100 rounded-lg p-4 shadow-sm">
          <p className="text-sm text-slate-500 font-medium">
            OEM/Manufacturers
          </p>
          <h2 className="text-2xl font-bold text-primary mt-1">
            {projectStats.oem_manufacturers.toLocaleString()}
          </h2>
        </div>
      </div>

      {/* Project Directory */}
      <div className="bg-white border border-blue-100 rounded-lg shadow-sm overflow-hidden">
        {/* Directory Header */}
        <div className="p-4 md:p-5 border-b border-slate-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-primary">
                Browse Projects
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Find projects by sector, size or keyword.
              </p>
            </div>

            <span className="text-sm font-medium text-slate-500">
              {filteredProjects.length.toLocaleString()} projects found
            </span>
          </div>

          {/* Search and Project Size */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="relative flex-1">
              <input
                type="text"
                id="search_Input"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search by project name or keyword..."
                className="w-full border border-slate-200 rounded-md px-4 py-3 text-sm text-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-600 whitespace-nowrap">
                Project Size:
              </label>

              <select
                value={projectSize}
                onChange={(e) => setProjectSize(e.target.value)}
                className="border border-slate-200 rounded-md px-3 py-3 text-sm text-slate-700 outline-none focus:border-primary bg-white"
              >
                <option value="all">All Sizes</option>
                <option value="whole project">Whole Project</option>
                <option value="package">Package</option>
              </select>
            </div>
          </div>

          {/* Section Filters */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Filter by sector
            </span>

            <div className="flex flex-wrap gap-x-5 gap-y-3">
              <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedSections.length === 0}
                  onChange={() => setSelectedSections([])}
                  className="checkbox checkbox-sm checkbox-primary"
                />
                All Projects
              </label>

              {sections.map((section) => (
                <label
                  key={section}
                  className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedSections.includes(section)}
                    onChange={() => toggleSection(section)}
                    className="checkbox checkbox-sm checkbox-primary"
                  />
                  {section}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Projects List */}
        <div className="p-3 md:p-4 bg-accent/10">
          {filteredProjects.length > 0 ? (
            <div className="flex flex-col gap-2">
              {filteredProjects.map((project, index) => (
                <button
                  key={project["Project ID"] || index}
                  type="button"
                  onClick={() => openProject(project)}
                  className="w-full text-left bg-white border border-slate-200 rounded-md px-4 py-4 hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-sm transition-all duration-200 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    {/* Project Information */}
                    <div className="flex flex-col gap-2 min-w-0">
                      <h3 className="text-sm md:text-base font-semibold text-slate-800 group-hover:text-primary transition-colors">
                        {project["Project Name"] || "Unnamed Project"}
                      </h3>

                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded border ${getSectionStyle(project.Section)}`}
                        >
                          {project.Section || "Uncategorized"}
                        </span>

                        {project["Project Size"] && (
                          <span className="text-xs font-medium px-2.5 py-1 rounded bg-slate-100 text-slate-600 border border-slate-200">
                            {project["Project Size"]}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* View Project */}
                    <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
                      <span className="text-xs font-semibold text-primary group-hover:underline">
                        View Details
                      </span>

                      <span className="text-primary text-lg group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                <span className="text-2xl text-primary">⌕</span>
              </div>

              <h3 className="font-semibold text-slate-700">
                No projects found
              </h3>

              <p className="text-sm text-slate-500 mt-2">
                Try adjusting your search or project filters.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchValue("");
                  setProjectSize("all");
                  setSelectedSections([]);
                }}
                className="mt-4 text-sm font-semibold text-primary hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Directory Footer */}
        {filteredProjects.length > 0 && (
          <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Showing {filteredProjects.length.toLocaleString()} of{" "}
              {projects.length.toLocaleString()} projects
            </span>

            <button
              type="button"
              onClick={() => {
                setSearchValue("");
                setProjectSize("all");
                setSelectedSections([]);
              }}
              className="text-xs font-semibold text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
