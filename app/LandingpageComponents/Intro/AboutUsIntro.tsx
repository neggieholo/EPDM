'use client'

import React from "react";
import InfoSection from "./InfoSection";
import Link from "next/link";

const AboutUsIntro: React.FC = () => {

    return (
        <InfoSection title="Who we are">
            <div className="w-full flex h-[50vh] p-2">
                {/* 🩵 LEFT: About Us Text */}
                <div className="w-[40%] h-full text-start relative flex items-center justify-center gap-4 p-4 rounded-l-xl">
                    <div className="flex flex-col justify-center shadow-strong bg-primary items-center h-[80%] w-[80%] p-5">
                        <h2 className="text-4xl font-extrabold mb-2 text-white leading-tight">
                            ABOUT
                        </h2>
                        <h2 className="text-4xl font-extrabold mb-2 text-white leading-tight">
                            US
                        </h2>
                    </div>
                </div>

                {/* 🩶 RIGHT: Placeholder for image or animation */}
                <div className="flex-1 w-[60%] h-full flex flex-col items-center justify-center text-primary">
                    <p className="text-3xl">
                        Energy Projects Data Media Limited (EPDM) is a Lagos -based digital energy company,
                        a data management company and an energy consulting firm highly committed to supporting the global energy
                        community through provision of reliable and quality services.
                    </p>
                </div>
            </div>
            <div className="w-full flex p-2 justify-end">
                <Link href="/aboutus" className="btn btn-primary text-xl">
                    Learn More
                </Link>
            </div>
        </InfoSection>
    );
};

export default AboutUsIntro;
