import React from "react";
import { ShieldCheck, Database, FileText, Cpu, Users } from "lucide-react";

const CorporateGovernance: React.FC = () => {
  const points = [
    {
      icon: <Database className="w-6 h-6" />,
      title: "Data Transparency",
      desc: "We maintain open and traceable data sourcing and usage practices.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Regulatory Compliance",
      desc: "Full alignment with national and international energy regulations and standards.",
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Ethical AI Practices",
      desc: "Responsible use of AI and analytics in decision-making processes.",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Board Oversight",
      desc: "Strategic supervision of risk, sustainability, and performance metrics.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Stakeholder Engagement",
      desc: "Regular communication and reporting to our partners and the global energy community.",
    },
  ];

  return (
    <section className="flex justify-center bg-white items-center min-h-[80vh] py-8">
      <div className="w-[70%] flex justify-center px-5 bg-white gap-5">
        {/* LEFT: Branding Block (Matching AboutUs style) */}
        <div className="w-fit h-fit text-start relative flex items-center justify-center gap-4 rounded-l-xl">
          <div className="flex flex-col justify-evenly shadow-strong bg-primary items-center p-8 min-w-70">
            <h2 className="text-5xl font-extrabold text-white leading-tight">
              CORPORATE
            </h2>
            <h2 className="text-5xl font-extrabold text-white leading-tight">
              GOVERNANCE
            </h2>
          </div>
        </div>

        {/* RIGHT: Text Content */}
        <div className="flex-1 flex flex-col justify-center text-primary">
          <div className="mb-8">
            <p className="text-xl font-medium leading-relaxed text-gray-700">
              At EPDM, we believe that strong corporate governance is the
              foundation of sustainable energy innovation. Our governance
              structure ensures accountability, transparency, and ethical
              leadership across all operations.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {points.map((point, idx) => (
              <div key={idx} className="flex items-start gap-4 group">
                <div className="bg-primary/10 p-2 rounded-lg text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  {point.icon}
                </div>
                <div>
                  <h4 className="text-lg font-bold">{point.title}</h4>
                  <p className="text-gray-600">{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CorporateGovernance;
