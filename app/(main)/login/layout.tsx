// app/login/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login | Energy Projects Data Media (EPDM)",
    description:
        "Login to your Energy Projects Data Media (EPDM) account to access real-time energy project data, analytics, and insights.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
