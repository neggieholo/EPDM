import React from "react";
import { ShieldCheck, Database, FileText, Cpu, Users } from "lucide-react";

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
    { title: "Board Oversight", desc: "Strategic supervision of performance." },
    {
      title: "Stakeholder Engagement",
      desc: "Regular reporting to the energy community.",
    },
  ];

  return (
    <section className="bg-white py-16 px-6">
      <div className="bg-primary p-6 rounded-t-xl mb-8">
        <h2 className="text-3xl font-black text-white text-center">
          CORPORATE GOVERNANCE
        </h2>
      </div>

      <div className="text-primary">
        <p className="text-lg text-gray-700 mb-8 text-center px-2">
          Strong corporate governance is our foundation for accountability,
          transparency, and ethical leadership.
        </p>

        <div className="space-y-6">
          {points.map((point, idx) => (
            <div key={idx} className="border-l-4 border-primary pl-4 py-1">
              <h4 className="text-lg font-bold">{point.title}</h4>
              <p className="text-gray-600 text-sm">{point.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MobCorporateGovernance;
