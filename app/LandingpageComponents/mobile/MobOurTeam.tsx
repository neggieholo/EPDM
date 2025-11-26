import React from "react";
import TeamCard from "@/app/LandingpageComponents/TeamCard";

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

const MobTeam: React.FC<TeamProps> = ({ members }) => {
    return (
        <section className="bg-white w-full px-5 py-10">
            <div className="flex flex-col md:flex-row h-auto md:h-screen pt-10 md:pt-25">
                {/* 🩵 LEFT: Header Section */}
                <div className="w-full md:w-[30%] flex items-center justify-center p-4">
                    <div className="flex flex-col justify-evenly bg-primary items-center text-center md:text-left shadow-strong h-auto md:h-[80%] py-8 px-5">
                        <h2 className="text-4xl font-extrabold text-white leading-tight">
                            OUR
                        </h2>
                        <h2 className="text-4xl font-extrabold text-white leading-tight">
                            TEAM
                        </h2>
                    </div>
                </div>

                {/* 🩶 RIGHT: Team Members Grid */}
                <div className="w-full md:w-[70%] flex flex-col items-center justify-start 
                text-primary p-5 mt-6 md:mt-0 max-h-[60vh] overflow-y-auto">
                    {members && members.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
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
        </section>
    );
};

export default MobTeam;
