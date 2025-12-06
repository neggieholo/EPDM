import React from "react";

export default function MobServicesIntro() {
    return (
        <section className="w-full shadow-md items-center"
            style={{ backgroundImage: "url('/oilrig_3.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="w-full flex flex-col gap-3 h-full justify-center items-center">
                <div className="w-full flex flex-col h-full justify-center items-center shadow-3d">
                    <div className="w-full bg-primary/40"
                        style={{clipPath: "polygon(0 0, 100% 0, 80% 100%, 0 100%)"}}>
                        <div className="flex flex-col justify-start items-start gap-6 w-[70%]">
                            <h1 className="text-2xl text-start font-extrabold text-white whitespace-pre-line p-3">
                                Project Data(project profile)
                            </h1>
                            <div className="md:w-2/3">
                                <p className="text-lg text-start text-white leading-relaxed whitespace-pre-line px-1">
                                    {"We provide basic information about a project/snapshot of a project, from conception, planning, execution, and completion, right through to the archiving stage."}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full bg-white/60 text-black flex justify-end items-center"
                        style={{clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)"}}>
                        <div className="flex flex-col justify-start items-end gap-6 w-[70%]">
                            <h1 className="text-2xl text-end font-extrabold text-black whitespace-pre-line p-3">
                                Energy Data
                            </h1>
                            <div className="md:w-2/3">
                                <p className="text-lg text-end text-black leading-relaxed whitespace-pre-line px-1">
                                    We provide an extensive database of Nigeria&apos;s energy
                                    industry, covering exploration, production, refining,
                                    power, and more. Our data-driven insights empower
                                    informed decisions, optimize operations, and drive
                                    growth in Nigeria&apos;s energy sector.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    );
}
