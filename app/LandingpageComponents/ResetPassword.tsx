'use client';

import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ResetPasswordPageProps {
    token: string;
}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({ token }) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePasswordReset = async () => {
        if (!password || !confirmPassword) {
            toast.error('Please fill in all fields.');
            return;
        }
        if (password !== confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`${baseUrl}/api/reset-password/${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            const data = await res.json();

            if (data.success) {
                toast.success(`✅ ${data.message}`);
            } else {
                toast.error(`❌ ${data.message}`);
            }
        } catch (err: any) {
            toast.error(`Password reset failed: ${err.message}`);
        } finally {
            setPassword('');
            setConfirmPassword('');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md bg-accent/50 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-4">
                    Reset Your Password
                </h2>
                <div className="flex flex-col gap-4">
                    <input
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-white px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <button
                        onClick={handlePasswordReset}
                        disabled={loading}
                        className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-2 rounded-md transition-all"
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </div>
            <ToastContainer position="top-center" />
        </div>
    );
};

export default ResetPasswordPage;
