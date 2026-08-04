import React from "react";

// 🔹 Define type based on your Mongoose schema
interface AboutUsSection {
    heading?: string;
    message: string;
}

interface AboutUsProps {
    sections: AboutUsSection[] | null;
}

const AboutUs: React.FC<AboutUsProps> = ({ sections }) => {
  
    return (
        <section>  
            <div className="flex justify-center bg-white items-center">
                <div className="w-[70%] flex justify-center h-screen px-5 bg-white">
                    {/* 🩵 LEFT: About Us Text */}
                    <div className="w-fit h-full text-start relative flex items-center justify-center gap-4 p-4 rounded-l-xl">
                        <div className="flex flex-col justify-evenly shadow-strong bg-primary items-center h-[80%] p-5">
                            <h2 className="text-7xl font-extrabold mb-2 text-white leading-tight p-5">
                                WHO
                            </h2>
                            <h2 className="text-7xl font-extrabold mb-2 text-white leading-tight p-5">
                                WE
                            </h2>
                            <h2 className="text-7xl font-extrabold mb-2 text-white leading-tight p-5">
                                ARE
                            </h2>
                        </div>
                    </div>

                    {/* 🩶 RIGHT: Placeholder for image or animation */}
                    <div className="w-fit h-full flex flex-col items-center justify-center text-primary p-5">

                        {sections && sections.length > 0 ? (
                            <div className="flex flex-col gap-3">
                                {sections.map((sec, idx) => (
                                    <div key={idx}>
                                        {sec.heading && (
                                            <h4 className="text-lg font-semibold mb-1">
                                                {sec.heading}
                                            </h4>
                                        )}
                                        <p className="text-md leading-relaxed">
                                            {sec.message}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-300">No About Us information available.</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
