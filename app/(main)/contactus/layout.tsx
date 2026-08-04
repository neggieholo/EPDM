// app/contact/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | Energy Projects Data Media (EPDM)",
    description:
        "Get in touch with Energy Projects Data Media (EPDM) for inquiries, support, or feedback about our energy projects data platform.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
