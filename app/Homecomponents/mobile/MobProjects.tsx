'use client';
import React, { useState, useEffect } from "react";
import { DisplayProject } from "@/app/utils/Interfaces";
import PaymentDiv from "../PaymentDiv";
import { useRouter } from "next/navigation";
import { useProfile } from "@/app/utils/ProfileContext";

interface ProjectsPageProps {
    projects: Partial<DisplayProject>[];
    subscription: boolean;
    returnPage: string;
}

const MobProjectsPage: React.FC<ProjectsPageProps> = ({ projects, subscription, returnPage }) => {
    const router = useRouter();
    const { setReturnPage } = useProfile();

    // Section filters
    const [allChecked, setAllChecked] = useState(true);
    const [upstreamChecked, setUpstreamChecked] = useState(false);
    const [midstreamChecked, setMidstreamChecked] = useState(false);
    const [downstreamChecked, setDownstreamChecked] = useState(false);
    const [serviceCompaniesChecked, setServiceCompaniesChecked] = useState(false);
    const [oemManufacturersChecked, setOemManufacturersChecked] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    // Project size filter
    const [projectSize, setProjectSize] = useState("all");

    const [filteredProjects, setFilteredProjects] = useState<Partial<DisplayProject>[]>(projects);

    // Update filtered projects
    useEffect(() => {
        let filtered = projects.filter(project => {
            if (allChecked) return true;
            if (upstreamChecked && project.Section === "Upstream") return true;
            if (midstreamChecked && project.Section === "Midstream") return true;
            if (downstreamChecked && project.Section === "Downstream") return true;
            if (serviceCompaniesChecked && project.Section === "Service Companies") return true;
            if (oemManufacturersChecked && project.Section === "OEM/Manufacturers") return true;
            return false;
        });

        if (projectSize.toLowerCase() !== "all") {
            filtered = filtered.filter(project =>
                project["Project Size"]?.toLowerCase() === projectSize.toLowerCase()
            );
        }

        const searchStr = String(searchValue || "").toLowerCase();

        if (searchValue && searchStr !== "") {
            filtered = filtered.filter(project =>
                Object.values(project).some(value =>
                    typeof value === "string" &&
                    value.toLowerCase().includes(searchStr)
                )
            );
        }

        setFilteredProjects(filtered);
    }, [
        projects,
        allChecked,
        upstreamChecked,
        midstreamChecked,
        downstreamChecked,
        serviceCompaniesChecked,
        oemManufacturersChecked,
        projectSize,
        searchValue
    ]);

    // Checkbox logic: if allChecked is true, uncheck others
    useEffect(() => {
        if (allChecked) {
            setUpstreamChecked(false);
            setMidstreamChecked(false);
            setDownstreamChecked(false);
            setServiceCompaniesChecked(false);
            setOemManufacturersChecked(false);
        }
    }, [allChecked]);

    // If any individual checkbox is checked, uncheck "All"
    useEffect(() => {
        if (upstreamChecked || midstreamChecked || downstreamChecked || serviceCompaniesChecked || oemManufacturersChecked) {
            if (allChecked) setAllChecked(false);
        }
    }, [upstreamChecked, midstreamChecked, downstreamChecked, serviceCompaniesChecked, oemManufacturersChecked]);

    if (!subscription) return <PaymentDiv />;

    function openProject(project: Partial<DisplayProject>) {
        if (!project["Project ID"]) return;
        router.push(`/home/projects/${project["Project ID"]}`);
        console.log("Return Page:", returnPage)
        setReturnPage(returnPage)
    }

    return (
        <div className="flex flex-col h-screen pt-4 w-full bg-white text-primary px-1">
            {/* Filters */}
            <div className="grid grid-cols-2 gap-2 overflow-x-auto pb-4">
                {/* Sections */}
                {[
                    { label: "All", checked: allChecked, setter: setAllChecked },
                    { label: "Upstream", checked: upstreamChecked, setter: setUpstreamChecked },
                    { label: "Midstream", checked: midstreamChecked, setter: setMidstreamChecked },
                    { label: "Downstream", checked: downstreamChecked, setter: setDownstreamChecked },
                    { label: "Service Companies", checked: serviceCompaniesChecked, setter: setServiceCompaniesChecked },
                    { label: "OEM / Manufacturers", checked: oemManufacturersChecked, setter: setOemManufacturersChecked },
                ].map(({ label, checked, setter }) => (
                    <label key={label} className="flex items-center gap-2 text-base">
                        <input type="checkbox" checked={checked} onChange={() => setter(!checked)} className="accent-primary w-5 h-5" />
                        {label}
                    </label>
                ))}

                {/* Project size */}
                <div className="flex items-center gap-2">
                    <label className="font-semibold text-base">Project Size:</label>
                    <select value={projectSize} onChange={e => setProjectSize(e.target.value)} className="border border-gray-300 rounded px-3 py-2 w-full">
                        <option value="all">All</option>
                        <option value="whole project">Whole Project</option>
                        <option value="package">Package</option>
                    </select>
                </div>

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                />
            </div>

            {/* Project list */}
            <div className="flex-1 overflow-y-auto flex flex-col gap-3 pt-2">
                {filteredProjects.map(project => (
                    <button
                        key={project["Project ID"]}
                        onClick={() => openProject(project)}
                        className="p-4 rounded-lg shadow bg-accent/50 text-primary text-left hover:bg-primary/10 transition text-base"
                    >
                        {project["Project Name"] || "Unnamed Project"}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MobProjectsPage;
