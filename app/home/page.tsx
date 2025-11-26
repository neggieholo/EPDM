import HomeIndex from '../Homecomponents/HomeIndex';
import { Metadata } from 'next';
import { headers } from "next/headers";
import { isMobile } from "@/app/utils/IsMobile";
import MobHomeIndex from '../Homecomponents/mobile/MobHomeIndex';

export const metadata: Metadata = {
    title: 'Home | Energy Projects Data Media (EPDM)',
    description: 'Your dashboard for recently added projects in the energy sector.',
};

// Example: fetch recent projects from your API
const fetchRecentProjects = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/recentProjects`, {
        cache: 'no-store', // ensures fresh data each request
        credentials: 'include', // if needed for session cookies
    });
    if (!res.ok) throw new Error('Failed to fetch recent projects');
    const data = await res.json();
    return data.recentCreated; // should match HomeIndex props
};

export default async function HomePage() {
    const headersList = await headers();
        const userAgent = headersList.get("user-agent") || "";
        const mobileCheck = isMobile(userAgent);
    let recentlyCreated = [];

    try {
        recentlyCreated = await fetchRecentProjects();
    } catch (err) {
        console.error(err);
    }

    return mobileCheck ? <MobHomeIndex recentlyCreated={recentlyCreated} /> : <HomeIndex recentlyCreated={recentlyCreated} />;
}
