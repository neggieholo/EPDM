"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function OilGasProjectsScroller() {
    const sections = [
        { title: "UPSTREAM", items: ["Addax", "Agip", "Exxon", "......"] },
        { title: "MIDSTREAM", items: ["NLNG Ltd", "NNPC", "Shell", "......"] },
        { title: "DOWNSTREAM", items: ["......"] },
        { title: "SERVICE COMPANY", items: ["......"] },
        { title: "OEM / MANUFACTURERS", items: ["......"] },
    ];

    const [index, setIndex] = useState(0);

    const handleNext = () => setIndex((prev) => (prev + 1) % sections.length);
    const handlePrev = () => setIndex((prev) => (prev - 1 + sections.length) % sections.length);

    // 🔁 Auto-scroll every 4 seconds
    useEffect(() => {
        const timer = setInterval(handleNext, 4000);
        return () => clearInterval(timer);
    }, []);

    const current = sections[index];

    return (
        <div className="w-full max-w-2xl bg-white rounded-xl text-white relative overflow-hidden p-6">

            {/* Section content */}
            <div className="text-center transition-all duration-500">
                <h2 className="text-2xl text-primary font-extrabold mb-4">{current.title}</h2>
                <ul className="bg-base-100 rounded-lg text-primary shadow-inner">
                    {current.items.map((item, i) => (
                        <li
                            key={i}
                            className="py-2 border-b border-base-200 last:border-0 font-semibold hover:bg-base-200/50 transition-colors"
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Left arrow (fixed center vertically) */}
            <button
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-base-100 hover:bg-base-200 text-primary shadow-md transition"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right arrow (fixed center vertically) */}
            <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-base-100 hover:bg-base-200 text-primary shadow-md transition"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Page indicator dots */}
            <div className="flex justify-center gap-2 mt-4">
                {sections.map((_, i) => (
                    <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${i === index ? "bg-primary" : "bg-primary/40"} transition-all duration-300`}
                    />
                ))}
            </div>
        </div>
    );
}
