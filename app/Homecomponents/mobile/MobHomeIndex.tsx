'use client';

// import Link from 'next/link';
import React from 'react';
import { useProfile } from '@/app/utils/ProfileContext';
import { useRouter } from 'next/navigation';

interface Project {
    _id: string;
    projectId: string;
    projectName: string;
}

interface HomeIndexProps {
    recentlyCreated: Project[];
}

const MobHomeIndex: React.FC<HomeIndexProps> = ({ recentlyCreated }) => {
    const router = useRouter();
    const { setReturnPage } = useProfile();

    function openProject(project: Partial<Project>) {
        if (!project.projectId) return;
        router.push(`/home/projects/${project.projectId}`);
        setReturnPage("All Projects")
    }

    return (
        <div className="p-3 sm:p-4 w-full sm:w-[90%] mx-auto pt-20">
            <div className="flex flex-col m-2 bg-white text-black rounded-lg shadow-md">
                <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 px-2 py-1 bg-primary rounded-md text-white text-center sm:text-left">
                    Recently Added Projects
                </h2>

                <ul className="mb-5 sm:mb-6 list-disc pl-4 sm:pl-5">
                    {recentlyCreated.map((project) => (
                        <li
                            key={project._id}
                            className="my-3 sm:my-4 text-base sm:text-lg leading-snug wrap-break-word"
                        >
                            <button
                                onClick={() => openProject(project)}
                                className="text-primary hover:underline"
                            >
                                {project.projectName || 'Untitled Project'}
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="flex flex-col sm:flex-row justify-center sm:justify-end items-center text-xs sm:text-sm text-gray-500 text-center sm:text-left">
                    <span className="mr-1 sm:mr-2">ℹ️</span>
                    <span>Click on the projects menu button to view all projects</span>
                </div>
            </div>
        </div>
    );
};

export default MobHomeIndex;
