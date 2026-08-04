import React from "react";

export default function Services() {
    return (
        <section
            className="w-full h-[50vh] shadow-md rounded-lg items-center"
            style={{
                backgroundImage: "url('/oilrig_3.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="w-full flex h-full justify-center items-center bg-primary/40 relative overflow-hidden shadow-3d">
                    {/* LEFT HALF (Dark overlay) */}
                    <div
                        className="absolute inset-0 flex items-center justify-start p-10"
                        style={{
                            clipPath: "polygon(0 0, 60% 0, 40% 100%, 0 100%)",
                            background: "rgba(0,0,0,0.4)",
                        }}
                    >
                        <div className="w-[35%] text-white">
                            <h1 className="text-3xl font-extrabold">
                                Project Data (project profile)
                            </h1>
                            <p className="text-xl mt-4 leading-relaxed">
                                We provide basic information about a project/snapshot
                                of a project, from conception, planning, execution,
                                and completion, right through to the archiving stage.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT HALF (white transparent) */}
                    <div
                        className="absolute inset-0 flex items-center justify-end p-10 bg-white/60"
                        style={{
                            clipPath: "polygon(60% 0, 100% 0, 100% 100%, 40% 100%)"
                        }}
                    >
                        <div className="w-[35%]">
                            <h1 className="text-3xl font-extrabold text-black text-end">
                                Energy Data
                            </h1>
                            <p className="text-xl mt-4 leading-relaxed text-black">
                                We provide an extensive database of Nigeria&apos;s energy
                                industry, covering exploration, production, refining,
                                power, and more. Our data-driven insights empower
                                informed decisions, optimize operations, and drive
                                growth in Nigeria&apos;s energy sector.
                            </p>
                        </div>
                    </div>

                </div>
        </section>
    );
}
