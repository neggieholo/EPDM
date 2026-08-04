import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Services | Energy Projects Data Media (EPDM)",
    description:
        "Explore the wide range of services provided by Energy Projects Data Media (EPDM), empowering energy companies with insights, analytics, and project intelligence.",
};

export default function ServicesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
