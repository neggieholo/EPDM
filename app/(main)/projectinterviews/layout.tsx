import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Project Interviews | Energy Projects Data Media (EPDM)",
    description: "Stay updated with the latest project interviews and insights from project managers gotten at the end of each major project from Energy Projects Data Media (EPDM), featuring company announcements, industry news, and key insights on global energy projects.",
};

export default function ProjectInterviewsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
