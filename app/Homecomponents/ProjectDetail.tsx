'use client';
import React, { useState, useEffect } from "react";
import { DisplayProject } from "@/app/utils/Interfaces";
import { handleFavouriteToggle, handleSubscribeToggle, updateProjectViewCount } from "@/app/utils/ProjectFetchers";
import { fetchFavProjects, fetchSubscribedProjects } from "@/app/utils/ProjectFetchers";



interface ProjectDetailProps {
    project: Partial<DisplayProject>;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project }) => {
    const projectId = project["Project ID"];
    const [viewCount, setViewCount] = useState(project?.viewCount || 0);
    const [favourited, setFavourited] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    const [loading, setLoading] = useState(false);

    // Fetch latest view count on mount
    useEffect(() => {
        async function fetchViews() {
            if (!projectId) return;
            const count = await updateProjectViewCount(projectId);
            if (count !== undefined) setViewCount(count);
        }
        fetchViews();
    }, [projectId]);

    const toggleFavourite = async (checked: boolean) => {
        if (!projectId) return;
        setLoading(true);
        const newFavs = await handleFavouriteToggle(projectId, checked);
        setFavourited(newFavs.includes(projectId));
        setLoading(false);
    };

    const toggleSubscribe = async (checked: boolean) => {
        if (!projectId) return;
        setLoading(true);
        const newSubs = await handleSubscribeToggle(projectId, checked);
        setSubscribed(newSubs.includes(projectId));
        setLoading(false);
    };

    useEffect(() => {
        async function initStatus() {
            if (!projectId) return;

            try {
                const favResponse = await fetchFavProjects(); // { favProjects: [...] }
                const subResponse = await fetchSubscribedProjects(); // { subscribedProjects: [...] }

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


    if (!projectId) return <div className="text-red-500">Project not found</div>;

    return (
        <div className="p-4 bg-accent/50 rounded shadow mt-4 relative">
            <h2 className="text-xl font-bold mb-4 text-primary">
                {project["Project Name"] || "Unnamed Project"}
            </h2>

            <ul className="space-y-2 mb-3">
                {Object.entries(project).map(([key, value]) => {
                    if (key === "Project Name" || key === "viewCount") return null;
                    return (
                        <li key={key} className="p-2 bg-white rounded shadow text-primary">
                            <strong>{key}:</strong> {value?.toString() || "-"}
                        </li>
                    );
                })}
            </ul>

            <p className="font-semibold mb-3">Views: {viewCount}</p>

            <div className="flex flex-col gap-2">
                {loading ? (
                    <span className="text-sm text-gray-500">Updating...</span>
                ) : (
                    <>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={favourited}
                                onChange={(e) => toggleFavourite(e.target.checked)}
                                className="accent-primary"
                            />
                            Add to Favourites
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={subscribed}
                                onChange={(e) => toggleSubscribe(e.target.checked)}
                                className="accent-primary"
                            />
                            Subscribe to Newsletter
                        </label>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProjectDetail;
