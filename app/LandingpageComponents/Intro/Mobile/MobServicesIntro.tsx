import React from "react";

export default function MobServicesIntro() {
    return (
        <section className="w-full shadow-md rounded-lg items-center"
            style={{ backgroundImage: "url('/oilrig_3.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="w-full flex h-full justify-center items-center bg-primary/40">
                <div className="w-full flex h-full border border-accent p-6 border-double justify-center items-center shadow-3d">
                    <div className="flex flex-col justify-center items-center gap-6 w-full">
                        <h1 className="text-3xl text-start font-extrabold text-white whitespace-pre-line">
                            Project Data
                        </h1>
                        <h3 className="text-2xl text-start font-extrabold text-white">
                            (project profile)
                        </h3>

                        <hr />
                        <div className="md:w-2/3">
                            <p className="text-xl text-white text-center leading-relaxed whitespace-pre-line">
                                {"We provide basic information about a project/snapshot of a project, from conception, planning, execution, and completion, right through to the archiving stage."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
