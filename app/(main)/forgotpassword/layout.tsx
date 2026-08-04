// app/forgotpassword/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Forgot Password | Energy Projects Data Media (EPDM)",
    description:
        "Reset your Energy Projects Data Media (EPDM) account password easily and securely using our password recovery process.",
};

export default function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
