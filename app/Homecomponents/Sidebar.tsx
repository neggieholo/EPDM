"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Home, Archive, Calendar, FileText, Settings } from "lucide-react";
import Image from "next/image";

const SideBar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <aside className="w-64 bg-primary p-4 flex flex-col justify-between h-screen">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-2 mb-6 text-center">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
                        <Image
                            src="/epdm_logo.png"
                            alt="EPDM Logo"
                            fill
                            className="object-contain rounded-xl"
                            priority
                        />
                    </div>
                    <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight">
                        Energy Projects <br className="hidden sm:block" /> Data Media
                    </h1>
                </div>
                <div className="flex flex-col space-y-6 mt-6">
                    <button
                        onClick={() => router.push("/home")}
                        className={`btn w-full justify-start gap-3 normal-case rounded-lg font-bold text-lg shadow-md
                        ${isActive("/home") ? "bg-accent text-accent-content" :
                        "bg-white text-gray-800 hover:bg-primary/20 hover:text-white"}`}
                    >
                        <Home className="w-5 h-5" /> Home
                    </button>

                    <button
                        onClick={() => router.push("/home/projects")}
                        className={`btn w-full justify-start gap-3 normal-case rounded-lg font-bold text-lg shadow-md
                        ${isActive("/home/projects") ? "bg-accent text-accent-content" :
                                "bg-white text-gray-800 hover:bg-primary/20 hover:text-white"}`}>
                        <Archive className="w-5 h-5" /> Projects
                    </button>

                    <button
                        onClick={() => router.push("/home/news")}
                        className={`btn w-full justify-start gap-3 normal-case rounded-lg font-bold text-lg shadow-md
                        ${isActive("/home/news") ? "bg-accent text-accent-content" :
                                "bg-white text-gray-800 hover:bg-primary/20 hover:text-white"}`}
                    >
                        <Calendar className="w-5 h-5" /> Energy Data
                    </button>

                    <button
                        onClick={() => router.push("/home/projects/favorites")}
                        className={`btn w-full justify-start gap-3 normal-case rounded-lg font-bold text-lg shadow-md
                        ${isActive("/home/projects/favorites") ? "bg-accent text-accent-content" :
                                "bg-white text-gray-800 hover:bg-primary/20 hover:text-white"}`}
                    >
                        <FileText className="w-5 h-5" /> Favourites
                    </button>

                    <button
                        onClick={() => router.push("/home/projects/subscribed")}
                        className={`btn w-full justify-start gap-3 normal-case rounded-lg font-bold text-lg shadow-md
                        ${isActive("/home/projects/subscribed") ? "bg-accent text-accent-content" :
                                "bg-white text-gray-800 hover:bg-primary/20 hover:text-white"}`}
                    >
                        <Settings className="w-5 h-5" /> Newsletter
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default SideBar;
