// app/energydata/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Nigeria Energy Data & Industry Statistics | EPDM",
    description:
        "Access reliable statistical data and factual insights about Nigeria's energy industry. EPDM provides actionable information to support businesses, researchers, and policymakers in making informed, data-driven decisions.",
};

export default function EnergyDataLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
