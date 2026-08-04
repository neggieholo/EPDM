// app/industryawards/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Data-Driven Energy Excellence Awards | EPDM",
    description:
        "Celebrate organizations driving innovation, sustainability, and measurable impact in the energy sector. The EPDM Data-Driven Energy Excellence Awards recognize outstanding achievements backed by robust data, metrics, and contributions toward national energy development targets.",
};

export default function IndustryAwardsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
