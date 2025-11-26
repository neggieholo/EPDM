// app/industrynews/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Industry News | Energy Projects Data Media (EPDM)",
    description:
        "Stay updated with the latest news and developments in the energy and power industry. EPDM delivers real-time insights on projects, market trends, and innovations worldwide.",
};

export default function IndustryNewsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
