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
            <div className="flex flex-col md:flex-row h-auto md:h-screen pt-10 md:pt-25">
                {/* 🩵 LEFT: Title Section */}
                <div className="w-full md:w-[30%] flex items-center justify-center p-4">
                    <div className="flex flex-col justify-evenly bg-primary items-center text-center md:text-left shadow-strong h-auto md:h-[80%] py-8 px-5">
                        <h2 className="text-4xl font-extrabold text-white leading-tight">
                            OUR
                        </h2>
                        <h2 className="text-4xl font-extrabold text-white leading-tight">
                            SERVICES
                        </h2>
                    </div>
                </div>

                {/* 🩶 RIGHT: Services List */}
                <div className="w-full md:w-[70%] flex flex-col items-center justify-center text-primary p-5 mt-6 md:mt-0">
                    {serviceData ? (
                        <div className="flex flex-col gap-4 text-center md:text-left">
                            <h3 className="text-xl md:text-2xl font-semibold mb-2">
                                {serviceData.heading}
                            </h3>
                            <ul className="list-disc list-inside space-y-2">
                                {serviceData.items.map((item, i) => (
                                    <li
                                        key={i}
                                        className="text-sm md:text-md leading-relaxed"
                                    >
                                        {item.text}
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

export default MobServices;
