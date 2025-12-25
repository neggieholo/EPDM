"use client";

import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Link from "next/link";

const heroImages = [
    "/Offshore_platform.jpg",
    "/powerline.jpg",
    "/energy_workers_2.jpg",
];

export default function HeroSection() {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % heroImages.length);
        }, 7000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            className="relative h-[85vh] flex items-center justify-center text-center text-white overflow-hidden"
            style={{
                backgroundImage: `url(${heroImages[currentImage]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                transition: "background-image 1s ease-in-out",
            }}>
            <Navbar disabled={true} zIndex={0}/>
            {/* Optional: overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40 z-0"></div>

            {/* Centered content */}
            <div className="z-10 p-4 justify-center flex-col items-center w-[80%] grid grid-cols-2 grid-rows-2 h-[70%] m-6 mt-7">
                <div className="bg-white/50 flex flex-col items-center justify-center px-1 py-4 mt-8">
                    <h1 className="text-[2.5em] font-bold text-white bg-black/60 w-full">
                    Next-Generation Intelligence
                    </h1>
                    <p className="text-lg m-6 w-[70%] text-center leading-relaxed whitespace-pre-line text-black">
                        {"Energy Projects Data Media (EPDM) gives you instant access to reliable energy data, helping you make informed decisions"}
                    </p>
                </div>

                {/* Top-right cell transparent */}
                <div className="flex items-center justify-center p-4">
                    {/* empty or decorative */}
                </div>

                {/* Bottom-left cell transparent */}
                <div className="flex items-center justify-center p-4">
                    {/* empty or decorative */}
                </div>
                <div className="bg-black/60 flex flex-col items-center justify-center py-4 px-1">
                    <h1 className="text-[2.5em] font-bold text-black bg-white/50 w-full">
                    Empower Your Business with Real-Time Energy Projects Data
                    </h1>
                    <p className="text-lg m-6 w-[70%] text-center leading-relaxed whitespace-pre-line text-white">
                        {"EPDM gives you instant access to verified data on thousands of\nenergy projects worldwide — from planning to completion — helping you discover new opportunities\nand make informed decisions."}
                    </p>
                    <Link href="/register" className="bg-primary text-white font-semibold px-6 py-3 rounded hover:bg-yellow-600 transition">
                        Explore Projects
                    </Link>
                </div>
                
            </div>
        </section>
    );
}
