import React from "react";

export interface Section {
    _id: string;
    type: "paragraph" | "image" | "video";
    content: string;
    caption?: string;
}

export interface ProjectInterview {
    _id: string;
    heading: string;
    sections: Section[];
    createdAt?: string;
    updatedAt?: string;
}

interface InterviewDisplayProps {
    interviewItem: ProjectInterview | null;
}

const formatDate = (timestamp?: string) => {
    if (!timestamp) return "";
    return new Date(timestamp).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

const MobInterviewDisplay: React.FC<InterviewDisplayProps> = ({ interviewItem }) => {
    if (!interviewItem) return 
    <section className="min-h-[70vh] flex items-center justify-center bg-white pt-20">
        <p className="text-center text-gray-500 text-lg">
            No interview available.
        </p>
    </section>;

    return (
        <section className="w-full bg-white min-h-screen flex justify-center items-start py-6 pt-20">
            <div className=" w-full sm:w-[95%] flex flex-col gap-5 p-5">
                {/* Heading */}
                <h2 className="text-lg font-bold text-start">{interviewItem.heading}</h2>

                {/* Sections */}
                <div className="flex flex-col gap-4">
                    {interviewItem.sections.map((section) => {
                        switch (section.type) {
                            case "image":
                                return (
                                    <div key={section._id} className="flex flex-col items-center">
                                        <img
                                            src={section.content}
                                            alt={section.caption || ""}
                                            className="w-full sm:max-w-full rounded-md shadow-md"
                                        />
                                        {section.caption && (
                                            <p className="mt-2 text-sm text-gray-500 italic text-center">
                                                {section.caption}
                                            </p>
                                        )}
                                    </div>
                                );
                            case "video":
                                return (
                                    <div key={section._id} className="flex flex-col items-center">
                                        <video
                                            src={section.content}
                                            controls
                                            className="w-full sm:max-w-full rounded-md shadow-md"
                                        />
                                        {section.caption && (
                                            <p className="mt-2 text-sm text-gray-500 italic text-center">
                                                {section.caption}
                                            </p>
                                        )}
                                    </div>
                                );
                            case "paragraph":
                                return (
                                    <p
                                        key={section._id}
                                        className="text-gray-700 leading-relaxed text-justify sm:text-left"
                                        dangerouslySetInnerHTML={{ __html: section.content }}
                                    />
                                );
                            default:
                                return null;
                        }
                    })}
                </div>
            </div>
        </section>
    );
};

export default MobInterviewDisplay;
