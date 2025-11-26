'use client';
import React, { useState, useEffect, useRef } from "react";
import { updateProjectViewCount, handleFavouriteToggle, handleSubscribeToggle } from "@/app/utils/ProjectFetchers";

interface ProjectAccordionProps {
    projects: Record<string, any>[];
    favProjects?: string[];
    subscribedProjects?: string[];
    autoExpandProjectId?: string;
    onAutoExpandHandled?: () => void;
}

const ProjectAccordion: React.FC<ProjectAccordionProps> = ({
    projects,
    favProjects = [],
    subscribedProjects = [],
    autoExpandProjectId,
    onAutoExpandHandled,
}) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [favs, setFavs] = useState<string[]>(favProjects);
    const [subs, setSubs] = useState<string[]>(subscribedProjects);
    const [loadingById, setLoadingById] = useState<Record<string, boolean>>({});
    const [viewCountById, setViewCountById] = useState<Record<string, number>>({});
    const accordionRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        // Initialize view counts
        const counts: Record<string, number> = {};
        projects.forEach(project => {
            counts[project["Project ID"]] = project.viewCount || 0;
        });
        setViewCountById(counts);
    }, [projects]);

    useEffect(() => {
        if (!autoExpandProjectId) return;
        const indexToOpen = projects.findIndex(p => p["Project ID"] === autoExpandProjectId);
        if (indexToOpen !== -1) {
            accordionRefs.current[indexToOpen]?.scrollIntoView({ behavior: "smooth", block: "start" });
            handleAccordionToggle(indexToOpen, Number(autoExpandProjectId));
        }
        onAutoExpandHandled?.();
    }, [autoExpandProjectId, projects, onAutoExpandHandled]);

    const handleAccordionToggle = async (index: number, projectId: number) => {
        if (openIndex !== index) {
            setOpenIndex(index);
            const viewsCount = await updateProjectViewCount(projectId.toString());
            if (viewsCount !== undefined) {
                setViewCountById(prev => ({ ...prev, [projectId]: viewsCount }));
            }
        } else {
            setOpenIndex(null);
        }
    };

    const handleFavToggle = async (projectId: number, checked: boolean) => {
        setLoadingById(prev => ({ ...prev, [projectId]: true }));
        const newFavs = await handleFavouriteToggle(projectId.toString(), checked);
        setFavs(newFavs);
        setLoadingById(prev => ({ ...prev, [projectId]: false }));
    };

    const handleSubsToggle = async (projectId: number, checked: boolean) => {
        setLoadingById(prev => ({ ...prev, [projectId]: true }));
        const newSubs = await handleSubscribeToggle(projectId.toString(), checked);
        setSubs(newSubs);
        setLoadingById(prev => ({ ...prev, [projectId]: false }));
    };

    const isFavourited = (projectId: string) => favs.includes(projectId);
    const isSubscribed = (projectId: string) => subs.includes(projectId);

    return (
        <div className="flex flex-col gap-4">
            {projects.map((project, index) => {
                const projectId = project["Project ID"];
                const projectName = project["Project Name"] || `Project ${index + 1}`;
                const isOpen = openIndex === index;

                return (
                    <div
                        key={projectId}
                        // ref={el => (accordionRefs.current[index] = el)}
                        className="border rounded shadow-sm bg-white overflow-hidden"
                    >
                        <button
                            className={`w-full text-left px-4 py-3 font-semibold text-lg text-white bg-primary hover:bg-primary/90 transition flex justify-between items-center`}
                            onClick={() => handleAccordionToggle(index, projectId)}
                        >
                            {projectName}
                            <span className="ml-2">{isOpen ? "▲" : "▼"}</span>
                        </button>

                        <div className={`transition-max-height duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-screen" : "max-h-0"}`}>
                            <div className="p-4 bg-gray-50">
                                <ul className="space-y-1">
                                    {Object.entries(project).map(([key, value]) => {
                                        if (key === "Project Name" || key === "viewCount") return null;
                                        return (
                                            <li key={key} className="p-2 bg-white rounded shadow text-gray-800 text-sm">
                                                <strong>{key}:</strong> {value?.toString() || "-"}
                                            </li>
                                        );
                                    })}
                                </ul>

                                <p className="mt-2 text-gray-600 font-medium">Views: {viewCountById[projectId] || 0}</p>

                                <div className="flex flex-col sm:flex-row sm:gap-4 mt-3">
                                    {loadingById[projectId] ? (
                                        <div className="flex items-center justify-center py-2">
                                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary"></div>
                                        </div>
                                    ) : (
                                        <>
                                            <label className="flex items-center gap-2 text-gray-700 text-sm">
                                                <input
                                                    type="checkbox"
                                                    checked={isFavourited(projectId)}
                                                    onChange={e => handleFavToggle(projectId, e.target.checked)}
                                                    className="accent-primary"
                                                />
                                                Add to Favourites
                                            </label>

                                            <label className="flex items-center gap-2 text-gray-700 text-sm mt-2 sm:mt-0">
                                                <input
                                                    type="checkbox"
                                                    checked={isSubscribed(projectId)}
                                                    onChange={e => handleSubsToggle(projectId, e.target.checked)}
                                                    className="accent-primary"
                                                />
                                                Subscribe to Newsletter
                                            </label>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ProjectAccordion;
