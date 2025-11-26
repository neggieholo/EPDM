'use client';
import React, { useState, useEffect } from "react";
import { DisplayProject } from "@/app/utils/Interfaces";
import PaymentDiv from "./PaymentDiv";
import { useRouter } from "next/navigation";
import { useProfile } from "../utils/ProfileContext";

interface ProjectsPageProps {
    projects: Partial<DisplayProject>[];
    subscription: boolean;
    returnPage: string;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ projects, subscription, returnPage }) => {
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
        <div className="mx-auto h-[80vh] flex flex-col gap-4">
            {/* Fixed checkbox bar */}
            <div className="sticky top-0 bg-white z-10 p-3 shadow flex flex-wrap justify-evenly gap-4 items-center">
                <label className="inline-flex items-center gap-1">
                    <input type="checkbox" checked={allChecked} onChange={() => setAllChecked(!allChecked)} className="accent-primary" />
                    All
                </label>
                <label className="inline-flex items-center gap-1">
                    <input type="checkbox" checked={upstreamChecked} onChange={() => setUpstreamChecked(!upstreamChecked)} className="accent-primary" />
                    Upstream
                </label>
                <label className="inline-flex items-center gap-1">
                    <input type="checkbox" checked={midstreamChecked} onChange={() => setMidstreamChecked(!midstreamChecked)} className="accent-primary" />
                    Midstream
                </label>
                <label className="inline-flex items-center gap-1">
                    <input type="checkbox" checked={downstreamChecked} onChange={() => setDownstreamChecked(!downstreamChecked)} className="accent-primary" />
                    Downstream
                </label>
                <label className="inline-flex items-center gap-1">
                    <input type="checkbox" checked={serviceCompaniesChecked} onChange={() => setServiceCompaniesChecked(!serviceCompaniesChecked)} className="accent-primary" />
                    Service Companies
                </label>
                <label className="inline-flex items-center gap-1">
                    <input type="checkbox" checked={oemManufacturersChecked} onChange={() => setOemManufacturersChecked(!oemManufacturersChecked)} className="accent-primary" />
                    OEM / Manufacturers
                </label>
                
                <div className="flex items-center gap-2 ml-4">
                    <label className="font-semibold">Project Size:</label>
                    <select value={projectSize} onChange={e => setProjectSize(e.target.value)} className="border border-gray-300 rounded px-2 py-1 text-sm">
                        <option value="all">All</option>
                        <option value="whole project">Whole Project</option>
                        <option value="package">Package</option>
                    </select>
                </div>
                <input id="search_Input" className="form-control border border-gray-300 rounded px-2 py-1 text-sm" type="text" placeholder="Search..." onChange={(e) => { setSearchValue(e.target.value) }} />
            </div>

            {/* Scrollable projects list */}
            <div className="flex-1 overflow-y-auto flex flex-col gap-3 ">
                {filteredProjects.map(project => (
                    <button
                        key={project["Project ID"]}
                        onClick={() => openProject(project)}
                        className="p-3 rounded shadow text-left bg-accent/50 text-primary hover:bg-primary/10 transition"
                    >
                        {project["Project Name"] || "Unnamed Project"}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProjectsPage;
