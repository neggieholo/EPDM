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
        <section>
            <div className="flex justify-center bg-white items-center">
                <div className="w-[70%] flex justify-center h-screen pt-25 px-5 bg-white">

                    {/* 🩵 LEFT: Heading Section */}
                    <div className="w-fit h-full text-start relative flex items-center justify-center gap-4 p-4 rounded-l-xl">
                        <div className="flex flex-col justify-evenly shadow-strong bg-primary items-center h-[80%] p-5">
                            <h2 className="text-7xl font-extrabold mb-2 text-white leading-tight">
                                OUR
                            </h2>
                            <h2 className="text-7xl font-extrabold mb-2 text-white leading-tight">
                                SERVICES
                            </h2>
                        </div>
                    </div>

                    {/* 🩶 RIGHT: Dynamic Services List */}
                    <div className="w-fit h-full flex flex-col items-center justify-center text-primary p-5">
                        {serviceData ? (
                            <div className="flex flex-col gap-5 text-start">
                                <h3 className="text-2xl font-semibold mb-2">{serviceData.heading}</h3>
                                <ul className="list-disc list-inside space-y-1">
                                    {serviceData.items.map((item, i) => (
                                        <li key={i} className="text-md leading-relaxed">
                                            {item.text}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p className="text-gray-300">No services available.</p>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Services;
