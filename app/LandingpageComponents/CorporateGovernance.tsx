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
    <section className="w-full bg-white py-12 md:py-16 px-5 items-start justify-center min-h-[70vh] flex">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-stretch justify-center gap-6 md:gap-10">
        {/* LEFT: Heading Section */}
        <div className="flex items-center justify-center bg-primary shadow-strong rounded-lg px-6 py-8 md:px-8 shrink-0">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight text-center sm:text-left">
            CORPORATE
            <br />
            GOVERNANCE
          </h2>
        </div>

        {/* RIGHT: Governance Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-center py-4 sm:py-6">
          <div className="mb-8">
            <p className="text-sm md:text-base font-medium leading-relaxed text-gray-700">
              At EPDM, we believe that strong corporate governance is the
              foundation of sustainable energy innovation. Our governance
              structure ensures accountability, transparency, and ethical
              leadership across all operations.
            </p>
          </div>

          <div className="flex flex-col gap-5 text-primary">
            {points.map((point, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-lg text-primary shrink-0 transition-colors">
                  {point.icon}
                </div>

                <div className="min-w-0">
                  <h4 className="text-lg font-bold">{point.title}</h4>
                  <p className="text-sm md:text-base leading-relaxed text-gray-600">
                    {point.desc}
                  </p>
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
