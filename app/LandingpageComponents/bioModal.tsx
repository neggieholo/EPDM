'use client';

import React, { useRef } from "react";

interface TeamMember {
    name: string;
    image?: string;
    bio: string;
}

interface BioModalProps {
    member: TeamMember | null;
    isOpen: boolean;
    onClose: () => void;
}

const BioModal: React.FC<BioModalProps> = ({ member, isOpen, onClose }) => {
    const imageDialogRef = useRef<HTMLDialogElement>(null);

    if (!member) return null;

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 w-full sm:w-[90%] md:w-[500px] lg:w-[90vh] max-h-[90vh] overflow-y-auto relative flex flex-col items-center">
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold"
                        >
                            ✕
                        </button>

                        {/* Member Info */}
                        {member.image && (
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-32 h-32 object-cover rounded-full cursor-pointer mx-auto"
                                onClick={() => imageDialogRef.current?.showModal()}
                            />
                        )}

                        <h3 className="text-3xl font-semibold mt-4 text-center">{member.name}</h3>
                        <p className="text-lg text-gray-700 mt-2 text-center">{member.bio}</p>
                    </div>
                </div>
            )}

            {/* Expandable Image Dialog */}
            <dialog
                ref={imageDialogRef}
                className="border-none rounded-lg p-0 bg-black/80 w-full max-w-full"
            >
                <div className="relative flex justify-center items-center">
                    <img
                        src={member.image}
                        alt={member.name}
                        className="max-w-[95vw] max-h-[95vh] mx-auto"
                    />
                    <button
                        onClick={() => imageDialogRef.current?.close()}
                        className="absolute top-2 right-2 bg-white rounded px-3 py-1 font-bold cursor-pointer"
                    >
                        Close
                    </button>
                </div>
            </dialog>
        </>
    );
};

export default BioModal;
