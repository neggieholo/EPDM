'use client';

import Link from 'next/link';
import React from 'react';
import { useRouter } from "next/navigation";
import { useProfile } from '../utils/ProfileContext';

interface Project {
    _id: string;
    projectId: string;
    projectName: string;
}

interface HomeIndexProps {
    recentlyCreated: Project[];
}

const HomeIndex: React.FC<HomeIndexProps> = ({ recentlyCreated }) => {    
    const router = useRouter();
    const { setReturnPage } = useProfile();

    function openProject(project: Partial<Project>) {
        if (!project.projectId) return;
        router.push(`/home/projects/${project.projectId}`);
        setReturnPage("All Projects")
    }

    return (
        <div className="p-4 w-[90%] mx-auto">
            <div className="flex flex-col m-3 p-3 bg-white text-black rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2 px-2 bg-primary rounded-md text-white">
                    Recently Added Projects
                </h2>

                <ul className="mb-6 list-disc pl-5">
                    {recentlyCreated.map((project) => (
                        <li key={project._id} className="my-6 mx-2 text-lg">
                            <button
                                onClick={() => openProject(project)}
                                className="text-primary hover:underline"
                            >
                                {project.projectName || 'Untitled Project'}
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="flex justify-end items-center text-sm text-gray-500">
                    <span className="mr-2">ℹ️</span>
                    Click on the projects menu button to view all projects
                </div>
            </div>
        </div>
    );
};

export default HomeIndex;
