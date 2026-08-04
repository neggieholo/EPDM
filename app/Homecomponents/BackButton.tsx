'use client';

import { useRouter } from "next/navigation";
import { useProfile } from "../utils/ProfileContext";

export default function BackButton() {
    const router = useRouter();
    const { returnPage } = useProfile();

    // Determine button text and href based on returnPage
    let buttonText = "All Projects";
    let href = "/home/projects";

    if (returnPage === "All Favorites") {
        buttonText = "All Favorites";
        href = "/home/projects/favorites";
    } else if (returnPage === "All Subscribed") {
        buttonText = "All Subscribed";
        href = "/home/projects/subscribed";
    }

    return (
        <button
            onClick={() => router.push(href)}
            className="btn btn-md btn-ghost text-primary py-3 text-base rounded-lg"
        >
            ← {buttonText}
        </button>
    );
}
