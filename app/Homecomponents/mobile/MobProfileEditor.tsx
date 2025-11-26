'use client';

import React, { useEffect, useState } from 'react';
import { filterAndFormatProfileData, revertToDatabaseKeys } from '@/app/utils/LandingPageFetchers';
import { Profile } from '@/app/utils/Interfaces';

interface ProfileEditorProps {
    profile: Profile;
}

const MobProfileEditor: React.FC<ProfileEditorProps> = ({ profile }) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

    const [profileData, setProfileData] = useState<Record<string, any>>({});
    const [originalProfileData, setOriginalProfileData] = useState<Record<string, any>>({});
    const [editState, setEditState] = useState<Record<string, boolean>>({});
    const [updateData, setUpdateData] = useState<Record<string, any>>({});
    const [statusMsg, setStatusMsg] = useState("");

    useEffect(() => {
        if (!profile) return;

        const filtered = filterAndFormatProfileData(profile);
        setProfileData(filtered);
        setOriginalProfileData(filtered);
        setEditState({});
    }, [profile]);

    const handleEditToggle = (field: string) => {
        if (field === "Subscription Expiry Date") return; // Read-only
        setEditState(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const handleInputChange = (field: string, value: any) => {
        setProfileData(prev => ({ ...prev, [field]: value }));
        setUpdateData(prev => ({ ...prev, [field]: value }));
    };

    const handleConfirm = async () => {
        const cleanedUpdateData = revertToDatabaseKeys(updateData);

        try {
            const res = await fetch(`${baseUrl}/api/profile/update`, {
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cleanedUpdateData),
            });

            const result = await res.json();

            if (result.success) {
                setStatusMsg("Profile updated successfully");
                setUpdateData({});
            } else {
                setStatusMsg(`Error: ${result.message}`);
            }
        } catch {
            setStatusMsg("Network error updating profile.");
        }
    };

    const handleCancel = () => {
        setProfileData(originalProfileData);
        setEditState({});
        setUpdateData({});
        setStatusMsg("Changes discarded.");
    };

    if (!profile) return null;

    return (
        <div className="w-full max-w-md mx-auto p-4 bg-white shadow-md rounded-lg mt-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile</h2>
            {Object.entries(profileData).map(([field, value]) => {
                const isReadOnly = field === "Subscription Expiry Date";

                return (
                    <div key={field} className="flex flex-col mb-4">
                        <label className="text-gray-700 font-medium mb-1">{field}</label>

                        {editState[field] && !isReadOnly ? (
                            <input
                                type="text"
                                value={value}
                                onChange={e => handleInputChange(field, e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        ) : (
                            <span className={`text-gray-600 px-2 py-2 ${isReadOnly ? "bg-gray-100 rounded border border-gray-200" : ""}`}>
                                {value || "-"}
                            </span>
                        )}

                        {!isReadOnly && (
                            <button
                                onClick={() => handleEditToggle(field)}
                                className="mt-2 w-24 self-start px-3 py-1 text-sm text-white bg-primary rounded hover:bg-primary/90 transition"
                            >
                                {editState[field] ? "Save" : "Edit"}
                            </button>
                        )}
                    </div>
                );
            })}

            <div className="flex flex-col sm:flex-row gap-2 mt-4">
                <button
                    onClick={handleConfirm}
                    className="flex-1 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition"
                >
                    Confirm Changes
                </button>
                <button
                    onClick={handleCancel}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                >
                    Cancel
                </button>
            </div>

            {statusMsg && <p className="mt-4 text-sm text-gray-600">{statusMsg}</p>}
        </div>
    );
};

export default MobProfileEditor;
