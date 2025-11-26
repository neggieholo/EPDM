'use client'

import React, { useState } from 'react'
import { industrySections } from '@/app/utils/LandingPageSections';

const IndustryIntro = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <section className="w-full bg-white shadow-md rounded-lg flex flex-col overflow-y-hidden border border-accent/20">
                <div className="w-full h-full mx-auto bg-white flex flex-col justify-center p-5">
                    <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2 border-b border-accent pb-2">
                        Connect with Industry Resources
                    </h2>
                    <p className="text-md md:text-xl text-gray-700 mb-6">
                        Stay informed with the latest news, insights, and trends shaping the global energy industry.
                    </p>
                    <div className="flex h-full">
                        {/* LEFT SIDE - Titles */}
                        <div className="w-2/5 bg-primary/20 flex flex-col justify-center items-stretch shrink-0">
                            {industrySections.map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveIndex(i)}
                                    className={`relative px-4 py-4 m-1 font-semibold text-white text-sm text-start transition-all duration-300
                                    ${activeIndex === i ? "bg-primary" : "bg-primary/70 hover:bg-primary"}
                                    [clip-path:polygon(10%_0%,100%_0%,90%_100%,0%_100%)]`}
                                >
                                    {s.title}
                                </button>
                            ))}
                        </div>

                        {/* RIGHT SIDE - Content */}
                        <div className="w-3/5 flex flex-col justify-center p-8 bg-white">
                            <h2 className="text-xl font-bold text-primary mb-3 border-b border-accent pb-2">
                                {industrySections[activeIndex].title}
                            </h2>
                            <p className="text-gray-700 whitespace-pre-line leading-relaxed text-sm">
                                {industrySections[activeIndex].content}
                            </p>
                        </div>
                    </div>
                </div>
        </section>
    )
}

export default IndustryIntro