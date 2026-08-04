"use client";

import React, { useState, useEffect, useRef } from "react";
import { useProfile } from "../utils/ProfileContext";
import Link from "next/link";

const TopBar: React.FC = () => {
  const { profile } = useProfile();
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Create a reference for the settings dropdown container
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogOut = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`, {
      method: "POST",
      credentials: "include",
    });
    localStorage.clear();
    window.location.href = "/login";
  };

  // Listen for global clicks on the screen
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setSettingsOpen(false);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="h-16 bg-accent/50 shadow flex items-center justify-between px-6 z-40">
      {/* Left: Greeting */}
      <div className="flex items-center flex-1">
        <h5 className="text-lg font-bold">Hi, {profile?.Username || "User"}</h5>
      </div>

      {/* Right: Menu items */}
      <div className="flex items-center space-x-4">
        {/* Help */}
        <Link
          onClick={() => setSettingsOpen(false)}
          href="/home/help"
          className="font-bold hover:text-primary hover:bg-white border border-primary p-2 rounded-md"
        >
          Help
        </Link>

        {/* Subscribe */}
        <Link
          onClick={() => setSettingsOpen(false)}
          href="/home/subscribe"
          className="font-bold hover:text-primary hover:bg-white border border-primary p-2 rounded-md"
        >
          Subscribe
        </Link>

        {/* Settings Dropdown Container */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className="flex items-center font-bold hover:text-primary hover:bg-white border border-primary p-2 rounded-md focus:outline-none"
          >
            Settings
          </button>

          {settingsOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-white text-primary shadow-lg rounded-lg py-2 font-bold text-md z-50">
              <li>
                <Link
                  href="/home/profile"
                  className="block px-4 py-2 hover:bg-primary hover:text-white"
                  onClick={() => setSettingsOpen(false)}
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogOut}
                  className="w-full text-left px-4 py-2 hover:bg-primary hover:text-white"
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
