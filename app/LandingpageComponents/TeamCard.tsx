'use client';

import React, { useState } from "react";
import BioModal from "./bioModal";

interface TeamMember {
    _id: string;
    name: string;
    role: string;
    image?: string;
    bio: string;
}

interface TeamCardProps {
    member: TeamMember;
}

const TeamCard: React.FC<TeamCardProps> = ({ member }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div
                className="bg-accent/50 rounded-lg p-4 shadow-md flex flex-col items-center text-center hover:shadow-lg transition cursor-pointer"
                onClick={() => setIsModalOpen(true)}
            >
                {member.image ? (
                    <img
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 object-cover rounded-full mb-3"
                    />
                ) : (
                    <div className="w-24 h-24 bg-gray-300 rounded-full mb-3 flex items-center justify-center text-white text-2xl">
                        {member.name.charAt(0)}
                    </div>
                )}

                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{member.role}</p>
                <span className="text-blue-600 font-bold hover:underline text-sm">
                    Read Bio
                </span>
            </div>

            {/* Modal */}
            <BioModal
                member={member}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default TeamCard;
