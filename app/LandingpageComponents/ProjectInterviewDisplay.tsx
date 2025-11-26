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

const InterviewDisplay: React.FC<InterviewDisplayProps> = ({ interviewItem }) => {
    return (
        <section className="w-full bg-white min-h-screen flex justify-center pt-50">
            <div className="bg-white w-[70%] p-1 flex flex-col gap-6">
                {!interviewItem ? (
                    <section className="min-h-[80vh] flex items-center justify-center bg-white pt-32">
                        <p className="text-center text-gray-500 text-lg">
                            No interview available.
                        </p>
                    </section>

                ) : (
                    <>
                        <h2 className="text-3xl font-bold text-center">{interviewItem.heading}</h2>
                        <div className="flex flex-col gap-4">
                            {interviewItem.sections.map((section) => {
                                switch (section.type) {
                                    case "image":
                                        return (
                                            <div key={section._id} className="flex flex-col items-center w-full">
                                                <img
                                                    src={section.content}
                                                    alt={section.caption || ""}
                                                    className="w-full max-h-[500px] h-auto rounded-md shadow-md object-cover"
                                                />
                                                {section.caption && (
                                                    <p className="mt-2 text-sm text-gray-500 italic text-center">{section.caption}</p>
                                                )}
                                            </div>
                                        );

                                    case "video":
                                        return (
                                            <div key={section._id} className="flex flex-col items-center">
                                                <video
                                                    src={section.content}
                                                    controls
                                                    className="max-w-full max-h-[500px] rounded-md shadow-md"
                                                />
                                                {section.caption && (
                                                    <p className="mt-2 text-sm text-gray-500 italic">{section.caption}</p>
                                                )}
                                            </div>
                                        );
                                    case "paragraph":
                                        return (
                                            <p
                                                key={section._id}
                                                className="text-gray-700 leading-relaxed"
                                                dangerouslySetInnerHTML={{ __html: section.content }}
                                            />
                                        );
                                    default:
                                        return null;
                                }
                            })}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};


export default InterviewDisplay;
