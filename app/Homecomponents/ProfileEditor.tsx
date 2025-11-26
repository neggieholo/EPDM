'use client';

import React, { useEffect, useState } from 'react';
import { filterAndFormatProfileData, revertToDatabaseKeys } from '../utils/LandingPageFetchers';
import { Profile } from '../utils/Interfaces';

interface ProfileEditorProps {
    profile: Profile;
}

const ProfileEditor: React.FC<ProfileEditorProps> = ({ profile }) => {
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
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile</h2>

            {Object.entries(profileData).map(([field, value]) => {
                const isReadOnly = field === "Subscription Expiry Date";

                return (
                    <div key={field} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center mb-4">
                        <label className="text-gray-700 font-medium">{field}:</label>

                        {editState[field] && !isReadOnly ? (
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => handleInputChange(field, e.target.value)}
                                className="col-span-2 w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:outline-none"
                            />
                        ) : (
                            <span className="col-span-2 text-gray-700 px-3 py-2 bg-gray-50 rounded border border-gray-200">
                                {value || "-"}
                            </span>
                        )}

                        {!isReadOnly && (
                            <button
                                onClick={() => handleEditToggle(field)}
                                className="mt-2 sm:mt-0 px-4 py-2 text-sm font-medium rounded border border-gray-300 hover:bg-gray-100 transition-colors"
                            >
                                {editState[field] ? "Save" : "Edit"}
                            </button>
                        )}
                    </div>
                );
            })}

            <div className="flex flex-wrap gap-4 mt-6">
                <button
                    onClick={handleConfirm}
                    className="px-6 py-2 bg-primary text-white font-medium rounded hover:bg-primary/90 transition-colors"
                >
                    Confirm Changes
                </button>

                <button
                    onClick={handleCancel}
                    className="px-6 py-2 bg-gray-200 text-gray-800 font-medium rounded hover:bg-gray-300 transition-colors"
                >
                    Cancel
                </button>
            </div>

            {statusMsg && <p className="mt-4 text-sm text-gray-600">{statusMsg}</p>}
        </div>
    );
};

export default ProfileEditor;
