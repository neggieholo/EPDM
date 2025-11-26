import React from "react";
import { headers, cookies } from "next/headers";
import { isMobile } from "@/app/utils/IsMobile";
import ProjectDetail from "@/app/Homecomponents/ProjectDetail";
import { DisplayProject } from "@/app/utils/Interfaces";
import { filterEmptyValues } from "@/app/utils/ProjectFetchers";
import { fieldMappings } from "@/app/utils/ProjectFetchers";
import { Project } from "@/app/utils/Interfaces";


export default async function Page({ params }: { params: { id: string } }) {
    const { id } = await params; // no need to await params
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "";
    const mobileCheck = isMobile(userAgent);
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("express.sid")?.value;


    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    let project: Partial<DisplayProject> | null = null;

    try {
        const res = await fetch(`${baseUrl}/api/projects/project/${id}`, {
                    headers: sessionCookie ? { cookie: `express.sid=${sessionCookie}` } : undefined,
                    cache: "no-store",
                });

        if (res.ok) {
            const data = await res.json();
            const filtered = filterEmptyValues(data.project);
            const renamed: Record<string, any> = {};
            
            for (const [key, displayKey] of Object.entries(fieldMappings)) {
                const projectKey = key as keyof Project;
                if (filtered.hasOwnProperty(projectKey)) {
                    renamed[displayKey] = filtered[projectKey];
                }
            }
            project = renamed || null;
        }
    } catch (err) {
        console.error("Failed to fetch project:", err);
    }

    if (!project) return <p className="p-4">Project not found.</p>;

    return <ProjectDetail project={project} />;
}
