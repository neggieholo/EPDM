// app/register/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Register | Energy Projects Data Media (EPDM)",
    description:
        "Sign up for Energy Projects Data Media (EPDM) to access the latest insights and analytics on energy projects worldwide.",
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
