import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | Energy Projects Data Media (EPDM)",
    description:
        "Learn more about Energy Projects Data Media (EPDM), our mission, and how we deliver trusted insights on energy projects worldwide.",
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
