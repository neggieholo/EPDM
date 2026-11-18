import React from "react";

const MobCorporateGovernance: React.FC = () => {
  const points = [
    { title: "Data Transparency", desc: "Open and traceable data usage." },
    {
      title: "Regulatory Compliance",
      desc: "Full alignment with global standards.",
    },
    {
      title: "Ethical AI Practices",
      desc: "Responsible use of AI in analytics.",
    },
    {
      title: "Board Oversight",
      desc: "Strategic supervision of performance.",
    },
    {
      title: "Stakeholder Engagement",
      desc: "Regular reporting to the energy community.",
    },
  ];

  return (
    <section className="bg-white w-full px-5 py-10">
      <div className="w-full flex flex-col gap-6">
        {/* TOP: CORPORATE GOVERNANCE HEADING */}
        <div className="w-full bg-primary shadow-strong rounded-lg px-6 py-8 flex items-center justify-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight text-center">
            CORPORATE
            <br />
            GOVERNANCE
          </h2>
        </div>

        {/* CORPORATE GOVERNANCE CONTENT */}
        <div className="w-full flex flex-col text-primary p-4">
          {/* INTRODUCTION */}
          <p className="text-base text-gray-700 mb-8 text-center">
            Strong corporate governance is our foundation for accountability,
            transparency, and ethical leadership.
          </p>

          {/* GOVERNANCE POINTS */}
          <div className="flex flex-col gap-6">
            {points.map((point, idx) => (
              <div key={idx} className="border-l-4 border-primary pl-4 py-1">
                <h4 className="text-lg font-bold mb-1">{point.title}</h4>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {point.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobCorporateGovernance;
