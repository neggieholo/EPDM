'use client';

import React, { useState, FormEvent, useEffect } from 'react';
import { toast } from 'react-toastify'; // optional toast, install react-toastify

const SiteBlocker: React.FC = () => {
    const [passwordInput, setPasswordInput] = useState('');
    const [unlocked, setUnlocked] = useState(false);

    const correctPassword = process.env.NEXT_PUBLIC_SITE_PASSWORD;

    useEffect(() => {
        const siteUnlocked = localStorage.getItem('siteUnlocked') === 'true';
        if (siteUnlocked) setUnlocked(true);
    }, []);

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();

        if (passwordInput === correctPassword) {
            setUnlocked(true);
            localStorage.setItem('siteUnlocked', 'true');
        } else {
            toast.error('Incorrect password', { position: 'top-center' });
            setPasswordInput('');
        }
    };

    // Prevent scroll when blocker is visible
    useEffect(() => {
        if (!unlocked) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';

        return () => {
            document.body.style.overflow = '';
        };
    }, [unlocked]);

    if (unlocked) return null;

    return (
        <div className="fixed inset-0 bg-black/95 z-99999 flex items-center justify-center">
            <div className="bg-primary text-white rounded-lg p-6 w-[90%] max-w-sm shadow-2xl flex flex-col gap-4">
                <h5 className="text-2xl font-semibold text-center">🔒 Site Locked</h5>

                <form onSubmit={submitHandler} className="flex flex-col gap-3">
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        autoFocus
                        className="w-full bg-white px-4 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <button
                        type="submit"
                        className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-2 rounded-md transition-all"
                    >
                        Unlock
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SiteBlocker;
