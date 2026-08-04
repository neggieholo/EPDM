import HomeIndex from "../Homecomponents/HomeIndex";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Energy Projects Data Media (EPDM)",
  description:
    "Your dashboard for recently added projects in the energy sector.",
};

const fetchRecentProjects = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/recentProjects`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) throw new Error("Failed to fetch recent projects");
  const data = await res.json();
  return data.recentCreated || [];
};

export default async function HomePage() {
  let recentlyCreated = [];

  try {
    recentlyCreated = await fetchRecentProjects();
  } catch (err) {
    console.error("Dashboard engine fetch failure:", err);
  }

  return <HomeIndex recentlyCreated={recentlyCreated} />;
}
