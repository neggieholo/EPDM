import React  from "react";
import ViewAllButton from "../../ViewAllNewsButton";
// import { TestNews } from "@/app/utils/TestData";

// 🧩 Define types that match your Mongoose schema
interface Section {
    type: "paragraph" | "image" | "video";
    content: string;
    caption?: string;
}

interface NewsItem {
    _id: string;
    heading: string;
    sections: Section[];
    createdAt?: string;
    updatedAt?: string;
}
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default async function MobNewsIntro() {
    let news: NewsItem[] = [];
    let error: string | null = null;

    try {
        const res = await fetch(`${baseUrl}/api/news`, {
            cache: "no-store", // ensure fresh data for SSR
        });

        if (!res.ok) throw new Error("Failed to fetch news");

        const data = await res.json();
        news = Array.isArray(data.news) ? data.news.slice(0, 3) : [];
    } catch (err) {
        console.error("Error fetching news:", err);
        error = "Failed to load news";
    }

    return (
        <section className="w-full bg-white py-16 flex flex-col items-center text-white">
            {/* Intro Text */}
            <div className="w-[70%] text-center mb-10 text-primary ">
                <h2 className="text-3xl font-extrabold mb-3">
                    Discover Our Latest Press Releases
                </h2>
                <p className="text-md text-accent">
                    Get a quick look at our most recent announcements, company updates, and industry highlights.
                </p>
            </div>

            {/* News Grid */}
            <div className="w-[70%] grid grid-cols-1 sm:grid-cols-2 gap-6 bg-accent/20">
                {error ? (
                    <p className="text-center text-red-400 col-span-full">{error}</p>
                ) : news.length > 0 ? (
                    news.map((n) => {
                        const imageSection = n.sections.find((s) => s.type === "image");
                        const textSection = n.sections.find((s) => s.type === "paragraph");

                        return (
                            <div
                                key={n._id}
                                className="bg-accent/50 rounded-xl p-5 border border-accent/40 shadow-[0_8px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.35)] hover:translate-y-[-3px] transition-all duration-300"
                            >
                                {imageSection ? (
                                    <img
                                        src={imageSection.content}
                                        alt={imageSection.caption || "Press release image"}
                                        className="w-full h-40 object-cover rounded-md mb-4"
                                    />
                                ) : (
                                    <div className="w-full h-40 bg-base-300 flex items-center justify-center text-gray-500 rounded-md mb-4">
                                        No Image
                                    </div>
                                )}

                                <h3 className="text-xl font-semibold mb-2 line-clamp-2">{n.heading}</h3>
                                <p className="text-sm text-gray-300 line-clamp-3">
                                    {textSection?.content || "Click below to learn more about our recent updates."}
                                </p>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-center text-gray-300 col-span-full">No press releases available yet.</p>
                )}
            </div>

            {/* CTA Button */}
            <div className="mt-10">
                <ViewAllButton />
            </div>
        </section>
    );
};

