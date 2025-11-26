import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Press Releases | Energy Projects Data Media (EPDM)",
    description: "Stay updated with the latest press releases from Energy Projects Data Media (EPDM), featuring company announcements, industry news, and key insights on global energy projects.",
};

export default function PressReleasesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
