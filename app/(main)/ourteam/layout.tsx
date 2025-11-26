import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Team | Energy Projects Data Media (EPDM)",
    description: "Meet the dedicated team behind Energy Projects Data Media (EPDM) and learn how our experts deliver trusted insights on energy projects worldwide.",
};


export default function OurTeamLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
