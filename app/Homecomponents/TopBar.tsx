"use client";

import React, { useState } from "react";
import { useProfile } from "../utils/ProfileContext";
import Link from "next/link";

const TopBar: React.FC = () => {
    const { profile } = useProfile();
    const [settingsOpen, setSettingsOpen] = useState(false);

    const handleLogOut = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`, {
            method: "POST",
            credentials: "include",
        });
        localStorage.clear();
        window.location.href = "/login";
    };

    return (
        <nav className="h-16 bg-accent/50 shadow flex items-center justify-between px-6 z-40">
            {/* Left: Greeting */}
            <div className="flex items-center flex-1">
                <h5 className="text-lg font-bold">
                    Hi, {profile?.Username || "User"}
                </h5>
            </div>

            {/* Right: Menu items */}
            <div className="flex items-center space-x-4">
                {/* Help */}
                <Link href="#" className="font-bold hover:text-primary">
                    Help
                </Link>

                {/* Subscribe */}
                <Link href="/home/subscribe" className="font-bold hover:text-primary">
                    Subscribe
                </Link>

                {/* Settings Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setSettingsOpen(!settingsOpen)}
                        className="flex items-center font-bold hover:text-primary focus:outline-none"
                    >
                        Settings
                    </button>

                    {settingsOpen && (
                        <ul className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 text-sm z-50">
                            <li>
                                <Link
                                    href="/home/profile"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                    onClick={() => setSettingsOpen(false)}
                                >
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/home/account"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                    onClick={() => setSettingsOpen(false)}
                                >
                                    Manage Account
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogOut}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                >
                                    Log Out
                                </button>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default TopBar;
