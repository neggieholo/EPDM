import React from "react";

interface AboutUsSection {
    heading?: string;
    message: string;
}

interface AboutUsProps {
    sections: AboutUsSection[] | null;
}

const MobAboutUs: React.FC<AboutUsProps> = ({ sections }) => {
  
    return (
        <section className="bg-white w-full px-5 py-10">
            <div className="flex flex-col md:flex-row h-auto md:h-screen pt-10 md:pt-25">
                {/* 🩵 LEFT: About Us Text */}
                <div className="w-full md:w-[30%] flex items-center justify-center p-4">
                    <div className="flex flex-col justify-evenly bg-primary items-center text-center md:text-left shadow-strong h-auto md:h-[80%] py-8 px-5">
                        <h2 className="text-4xl font-extrabold text-white leading-tight">
                            ABOUT
                        </h2>
                        <h2 className="text-4xl font-extrabold text-white leading-tight">
                            US
                        </h2>
                    </div>
                </div>

                {/* 🩶 RIGHT: Content */}
                <div className="w-full md:w-[70%] flex flex-col items-center justify-center text-primary p-5 mt-6 md:mt-0">
                    {sections && sections.length > 0 ? (
                        <div className="flex flex-col gap-3 text-center md:text-left">
                            {sections.map((sec, idx) => (
                                <div key={idx}>
                                    {sec.heading && (
                                        <h4 className="text-lg font-semibold mb-1">
                                            {sec.heading}
                                        </h4>
                                    )}
                                    <p className="text-sm leading-relaxed">{sec.message}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400">No About Us information available.</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default MobAboutUs;
