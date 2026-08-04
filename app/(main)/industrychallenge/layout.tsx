// app/industrychallenge/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Nigeria Energy Challenge Competition | EPDM",
    description:
        "EPDM organizes the Nigeria Energy Challenge Competition to develop the next generation of energy leaders. The program promotes industry-based learning, innovation, and interest in oil and gas exploration and production, bridging academic knowledge with real industry requirements across the full E&P lifecycle.",
};

export default function IndustryChallengeLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
