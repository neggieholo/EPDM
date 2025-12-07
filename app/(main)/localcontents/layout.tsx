// app/industrynews/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Energy Industry News & Local Content Achievements | EPDM",
    description:
        "Discover the latest energy industry news, local content achievements, project updates, and success stories across Nigeria and Africa. EPDM provides reliable insights for operators, service companies, and industry professionals.",
};

export default function IndustryLocalContentLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
