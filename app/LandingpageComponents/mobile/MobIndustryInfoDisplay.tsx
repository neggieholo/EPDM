import React from "react";

export interface IndustrySection {
    _id: string;
    type: "paragraph" | "image" | "video" | "pdf";
    content: string;
    caption?: string;
}

export interface IndustryInfo {
    _id: string;
    heading: string;
    sections: IndustrySection[];
    createdAt?: string;
    updatedAt?: string;
}

interface IndustryInfoProps {
    content: IndustryInfo | null;
}

const MobIndustryInfoDisplay: React.FC<IndustryInfoProps> = ({ content }) => {
    if (!content) {
        return (
            <section className="min-h-[80vh] flex items-center justify-center bg-white px-4">
                <p className="text-center text-gray-500 text-base">
                    No industry information available.
                </p>
            </section>
        );
    }

    const pdfSection = content.sections.find((s) => s.type === "pdf");
    const otherSections = content.sections.filter((s) => s.type !== "pdf");

    return (
        <section className="w-full bg-white min-h-screen flex justify-center pt-6 px-4">
            <div className="bg-white w-full max-w-md flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-center">{content.heading}</h2>

                <div className="flex flex-col gap-4">
                    {otherSections.map((section) => {
                        switch (section.type) {
                            case "image":
                                return (
                                    <div key={section._id} className="flex flex-col items-center w-full">
                                        <img
                                            src={section.content}
                                            alt={section.caption || ""}
                                            className="w-full max-h-[300px] h-auto rounded-md shadow-md object-cover"
                                        />
                                        {section.caption && (
                                            <p className="mt-1 text-sm text-gray-500 italic text-center">{section.caption}</p>
                                        )}
                                    </div>
                                );
                            case "video":
                                return (
                                    <div key={section._id} className="flex flex-col items-center w-full">
                                        <video
                                            src={section.content}
                                            controls
                                            className="w-full max-h-[300px] rounded-md shadow-md"
                                        />
                                        {section.caption && (
                                            <p className="mt-1 text-sm text-gray-500 italic text-center">{section.caption}</p>
                                        )}
                                    </div>
                                );
                            case "paragraph":
                                return (
                                    <p
                                        key={section._id}
                                        className="text-gray-700 text-sm leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: section.content }}
                                    />
                                );
                            default:
                                return null;
                        }
                    })}

                    {pdfSection && (
                        <div
                            style={{
                                marginTop: "15px",
                                padding: "10px",
                                backgroundColor: "#f2f2f2",
                                borderRadius: "6px",
                                textAlign: "center",
                            }}
                        >
                            <a
                                href={pdfSection.content}
                                className="btn btn-primary w-full"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Get PDF
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default MobIndustryInfoDisplay;
