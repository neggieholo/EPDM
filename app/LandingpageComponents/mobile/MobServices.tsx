import React from "react";

interface ServiceItem {
  text: string;
}

interface ServiceSection {
  heading: string;
  items: ServiceItem[];
}

interface ServicesProps {
  serviceData: ServiceSection | null;
}

const MobServices: React.FC<ServicesProps> = ({ serviceData }) => {
  return (
    <section className="bg-white w-full px-5 py-10">
      <div className="w-full flex flex-col gap-6">
        {/* TOP: SERVICES HEADING */}
        <div className="w-full bg-primary shadow-strong rounded-lg px-6 py-8 flex items-center justify-center">
          <h2 className="text-4xl font-extrabold text-white leading-tight text-center">
            OUR
            <br />
            SERVICES
          </h2>
        </div>

        {/* SERVICES CONTENT */}
        <div className="w-full flex flex-col text-primary p-4">
          {serviceData ? (
            <div className="flex flex-col gap-4 text-left">
              {/* SERVICE HEADING */}
              <h3 className="text-xl font-semibold mb-2">
                {serviceData.heading}
              </h3>

              {/* SERVICES LIST */}
              <ul className="list-disc list-outside pl-5 space-y-3">
                {serviceData.items.map((item, i) => (
                  <li key={i} className="text-sm leading-relaxed">
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-400 text-center">No services available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default MobServices;
