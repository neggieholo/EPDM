
import React from "react";

interface AboutUsSection {
  heading?: string;
  message: string;
}

interface AboutUsProps {
  sections: AboutUsSection[] | null;
}

const AboutUs: React.FC<AboutUsProps> = ({ sections }) => {
  return (
    <section className="w-full bg-white py-12 md:py-16 px-5 items-start justify-center min-h-[70vh] flex">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-stretch justify-center gap-6 md:gap-10">

        {/* LEFT: Heading Section */}
        <div className="flex items-center justify-center bg-primary shadow-strong rounded-lg px-6 py-8 md:px-8 shrink-0">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight text-center sm:text-left">
            WHO
            <br />
            WE
            <br />
            ARE
          </h2>
        </div>

        {/* RIGHT: Dynamic About Us Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-center py-4 sm:py-6">
          {sections && sections.length > 0 ? (
            <div className="flex flex-col gap-5 text-primary">
              {sections.map((sec, idx) => (
                <div key={idx}>
                  {sec.heading && (
                    <h3 className="text-xl md:text-2xl font-bold mb-2">
                      {sec.heading}
                    </h3>
                  )}

                  <p className="text-sm md:text-base leading-relaxed">
                    {sec.message}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">
              No About Us information available.
            </p>
          )}
        </div>

      </div>
    </section>
  );
};

export default AboutUs;
