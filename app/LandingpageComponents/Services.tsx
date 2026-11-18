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

const Services: React.FC<ServicesProps> = ({ serviceData }) => {
  return (
    <section className="w-full bg-white py-12 md:py-16 px-5 items-start justify-center min-h-[70vh] flex">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-stretch justify-center gap-6 md:gap-10">
        {/* LEFT: Heading Section */}
        <div className="flex items-center justify-center bg-primary shadow-strong rounded-lg px-6 py-8 md:px-8 shrink-0">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight text-center sm:text-left">
            OUR
            <br />
            SERVICES
          </h2>
        </div>

        {/* RIGHT: Dynamic Services List */}
        <div className="flex-1 min-w-0 flex flex-col justify-center py-4 sm:py-6">
          {serviceData ? (
            <div className="flex flex-col gap-5 text-primary">
              <h3 className="text-xl md:text-2xl font-bold">
                {serviceData.heading}
              </h3>

              <ul className="grid grid-cols-1 gap-x-8 gap-y-3">
                {serviceData.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm md:text-base leading-relaxed"
                  >
                    <span className="text-primary font-bold shrink-0">✓</span>

                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-400">No services available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;
