
const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || "";


interface SocialLink {
    platform: string;
    url: string;
}

export async function getSocialLinks() {
    try {
        const res = await fetch(`${baseUrl}/api/terms_socials/social_links`, {
            credentials: "include",
        });
        
        if (!res.ok) throw new Error("Failed to fetch social links");
        
        const data = await res.json();
        console.log("Fetched social links:", data);

        if (data.success && Array.isArray(data.links)) {
            const mapped: Record<string, string> = {};
            data.links.forEach((link: SocialLink) => {
                mapped[link.platform] = link.url;
            });
            return { socialLinks: mapped, phones: data.phones ?? [] };
        }
    } catch (err) {
        console.error("Error fetching social links:", err);
    }
    return { socialLinks: {}, phones: [] }; // 🛡 Safe fallback
}

