'use client';

import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPasswordPage: React.FC = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePasswordReset = async () => {
        if (!email) {
            toast.error('Please enter a valid email');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${baseUrl}/api/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (data.success) {
                toast.success(`✅ ${data.message} sent to ${email}`);
                setEmail('');
            } else {
                toast.error(`❌ ${data.message}`);
            }
        } catch (err) {
            toast.error('❌ Error connecting to server');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-accent/50 p-6 md:p-8">
                <h1 className="text-xl md:text-2xl font-semibold mb-4 text-center">
                    Enter your Email to receive a password reset link
                </h1>

                <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.trim())}
                    required
                    className="w-full bg-white px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-accent focus:outline-none mb-4"
                    placeholder="you@example.com"
                />

                <button
                    onClick={handlePasswordReset}
                    disabled={loading}
                    className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-2 rounded-md transition-all disabled:opacity-50 flex justify-center items-center"
                >
                    {loading ? (
                        <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4l-3 3 3 3H4z"
                            ></path>
                        </svg>
                    ) : (
                        'Confirm'
                    )}
                </button>
            </div>
            <ToastContainer position="top-center" />
        </div>
    );
};

export default ForgotPasswordPage;
