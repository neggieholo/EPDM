"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import localforage from "localforage";
import { Profile } from "./Interfaces";
import { useRouter } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

interface ProfileContextType {
    profile: Profile | null;
    setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
    refreshProfile: () => Promise<void>;
    returnPage: string; // <-- add this
    setReturnPage: React.Dispatch<React.SetStateAction<string>>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [returnPage, setReturnPage] = useState("");
    const router = useRouter();

    useEffect(() => {
        const loadProfile = async () => {
            try {
                console.log("Getting profile")
                const stored = await localforage.getItem<Profile>("profile");
                if (stored) setProfile(stored);

                // Fetch latest profile from server
                const res = await fetch(`${baseUrl}/api/profile`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!res.ok) throw new Error("Not authenticated");

                const data: Profile = await res.json();
                setProfile(data);
                await localforage.setItem("profile", data);

            } catch (err) {
                console.error("Error loading profile:", err);
                setProfile(null);
                router.push("/login");
            }
        };

        loadProfile();
    }, [router]);

    const refreshProfile = async () => {
        try {
            const res = await fetch(`${baseUrl}/api/profile`, { credentials: "include" });
            if (!res.ok) throw new Error("Not authenticated");
            const data: Profile = await res.json();
            setProfile(data);
            await localforage.setItem("profile", data);
        } catch (err) {
            console.error("Error refreshing profile:", err);
            setProfile(null);
            router.push("/login");
        }
    };

    return (
        <ProfileContext.Provider value={{ profile, setProfile, refreshProfile, returnPage, setReturnPage }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    const ctx = useContext(ProfileContext);
    if (!ctx) throw new Error("useProfile must be used inside a ProfileProvider");
    return ctx;
};
