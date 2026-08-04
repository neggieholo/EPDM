// app/industryreports/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Energy Industry Reports, Data & In-Depth Analysis | EPDM",
    description:
        "Access comprehensive energy industry reports featuring data-driven insights, market trends, performance analysis, and local content benchmarks across Nigeria and Africa. EPDM delivers expert research for operators, service companies, and industry stakeholders.",
};

export default function IndustryReportsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
