// app/industrynews/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industry Decarbonization Achievements & Clean Energy Projects | EPDM",
  description:
    "Explore industry decarbonization projects, emission-reduction initiatives, and carbon management best practices across the energy sector. EPDM tracks clean energy progress by operators and service companies.",
};

export default function DecarbonizationLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
