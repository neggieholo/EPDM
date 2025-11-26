import React from "react";
import { headers, cookies } from "next/headers";
import { isMobile } from "@/app/utils/IsMobile";
import { Project } from "@/app/utils/Interfaces";
import { fetchFavProjects, fetchSubscribedProjects, fieldMappings, filterEmptyValues } from "@/app/utils/ProjectFetchers";
import ProjectsPage from "@/app/Homecomponents/Projects";
import MobProjectsPage from "@/app/Homecomponents/mobile/MobProjects";



export default async function Page() {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "";
    const mobileCheck = isMobile(userAgent);

    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("express.sid")?.value;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    let projectData: { subscription: boolean; projects?: Record<string, any>[] } = { subscription: false, projects: [] };

    try {
        const res = await fetch(`${baseUrl}/api/projects`, {
            headers: sessionCookie ? { cookie: `express.sid=${sessionCookie}` } : undefined,
            cache: "no-store",
        });

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const data: { subscription: boolean; projects: Partial<Project>[] } = await res.json();

        if (data.subscription) {
            const cleanedProjects = data.projects.map((project) => {
                const filtered = filterEmptyValues(project);
                const renamed: Record<string, any> = {};

                for (const [key, displayKey] of Object.entries(fieldMappings)) {
                    const projectKey = key as keyof Project;
                    if (projectKey in filtered) renamed[displayKey] = filtered[projectKey];
                }

                return renamed;
            });

            projectData = {
                subscription: true,
                projects: cleanedProjects
            };
        }

        
                const SubRes:Record<string, any> = await fetch(`${baseUrl}/api/projects/getUserSubscribed`, {
                    headers: sessionCookie ? { cookie: `express.sid=${sessionCookie}` } : undefined,
                    cache: "no-store",
                });
                const subData: { subscribedProjects: string[] } = await SubRes.json();
                const subs = subData.subscribedProjects || [];

        // Filter only favourite projects
        const subscribedProjects = projectData.projects?.filter(project =>
            project["Project ID"] && subs.includes(project["Project ID"].toString())
        );

        // Optional: replace projects with only favourites
        projectData.projects = subscribedProjects;

    } catch (err) {
        console.error("Failed to fetch projects:", err);
    }

    return mobileCheck
        ? <MobProjectsPage projects={projectData.projects || []} subscription={projectData.subscription} returnPage="All Subscribed"/>
        : <ProjectsPage projects={projectData.projects || []} subscription={projectData.subscription} returnPage="All Subscribed"/>;
}

