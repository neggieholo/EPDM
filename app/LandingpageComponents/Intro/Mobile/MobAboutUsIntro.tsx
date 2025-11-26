'use client'

import React from "react";
import MobInfoSection from "./MobInfoSection";
import Link from "next/link";

const MobAboutUsIntro: React.FC = () => {

    return (
        <MobInfoSection title="Who we are">
            <div className="w-full flex flex-col gap-8 p-2">
                <div className="w-full h-full text-start relative flex items-center bg-primary
                shadow-strong text-white justify-center gap-4 p-4">
                        <h2 className="text-2xl font-extrabold mb-2 text-white leading-tight">
                            ABOUT
                        </h2>
                        <h2 className="text-2xl font-extrabold mb-2 text-white leading-tight">
                            US
                        </h2>
                </div>

                {/* 🩶 RIGHT: Placeholder for image or animation */}
                <div className="flex-1 w-full h-full flex flex-col items-center justify-center text-primary">
                    <p className="text-lg">
                        Energy Projects Data Media Limited (EPDM) is a Lagos -based digital energy company,
                        a data management company and an energy consulting firm highly committed to supporting the global energy
                        community through provision of reliable and quality services.
                    </p>
                </div>
            </div>
            <div className="w-full flex p-2 justify-end">
                <Link href="/aboutus" className="btn btn-primary text-md">
                    Learn More
                </Link>
            </div>
        </MobInfoSection>
    );
};

export default MobAboutUsIntro;
