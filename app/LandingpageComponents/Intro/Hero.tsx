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
            className="relative min-h-[85vh] flex items-center justify-center text-center text-white overflow-hidden"
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
            <div className="z-10 px-6 md:px-12 flex justify-center flex-col items-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Empower Your Business with Real-Time Energy Projects Data
                </h1>
                <p className="text-[1em] md:text-[1.25em] mb-6 w-[70%] text-center leading-relaxed whitespace-pre-line">
                    {"Energy Projects Data Media (EPDM) gives you instant access to verified data on thousands of\nenergy projects worldwide — from planning to completion — helping you discover new opportunities\nand make informed decisions."}
                </p>
                <Link href="/register" className="bg-primary text-white font-semibold px-6 py-3 rounded hover:bg-yellow-600 transition">
                    Explore Projects
                </Link>
            </div>
        </section>
    );
}