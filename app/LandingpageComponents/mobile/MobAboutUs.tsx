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
      <div className="w-full flex flex-col gap-6">
        {/* TOP: ABOUT US HEADING */}
        <div className="w-full bg-primary shadow-strong rounded-lg px-6 py-8 flex items-center justify-center">
          <h2 className="text-4xl font-extrabold text-white leading-tight text-center">
            ABOUT
            <br />
            US
          </h2>
        </div>

        {/* ABOUT US CONTENT */}
        <div className="w-full flex flex-col items-center justify-center text-primary p-4">
          {sections && sections.length > 0 ? (
            <div className="w-full flex flex-col gap-5 text-left">
              {sections.map((sec, idx) => (
                <div key={idx}>
                  {sec.heading && (
                    <h4 className="text-lg font-semibold mb-2">
                      {sec.heading}
                    </h4>
                  )}

                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {sec.message}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center">
              No About Us information available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default MobAboutUs;
