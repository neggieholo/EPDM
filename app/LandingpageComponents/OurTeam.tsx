import React from "react";
import TeamCard from "./TeamCard";

interface TeamMember {
    _id: string;
    name: string;
    role: string;
    image?: string;
    bio: string;
    order?: number;
}

interface TeamProps {
    members: TeamMember[] | null;
}

const Team: React.FC<TeamProps> = ({ members }) => {

    return (
        <section>
            <div className="flex justify-center bg-white items-center">
                <div className="w-[70%] flex justify-center h-screen pt-25 px-5 bg-white">
                    {/* 🩵 LEFT: Heading Section */}
                    <div className="w-full md:w-[30%] flex items-center justify-center p-4">
                        <div className="flex flex-col justify-evenly bg-primary items-center text-center md:text-left shadow-strong h-auto md:h-[80%] py-8 px-5">
                            <h2 className="text-6xl md:text-7xl font-extrabold text-white leading-tight">
                                OUR
                            </h2>
                            <h2 className="text-6xl md:text-7xl font-extrabold text-white leading-tight">
                                TEAM
                            </h2>
                        </div>
                    </div>
                    {/* RIGHT: Team Grid */}
                    <div className="w-full flex flex-col items-center justify-center text-primary p-5 max-h-60vh overflow-y-auto">
                        {members && members.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {members
                                    .sort((a, b) => (a.order || 0) - (b.order || 0))
                                    .map((member) => (
                                        <TeamCard key={member._id} member={member} />
                                    ))}
                            </div>
                        ) : (
                            <p className="text-gray-400">No team members available.</p>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Team;
