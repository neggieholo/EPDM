'use client';

import React, { useEffect, useState } from 'react';
import SiteBlocker from './SiteBlocker';

const CookieConsentBanner: React.FC = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consentGiven = localStorage.getItem('cookieConsent') === 'true';
        if (!consentGiven) {
            setVisible(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookieConsent', 'true');
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <>
            <SiteBlocker />
            <div className="fixed inset-0 bg-black/60 z-9999 flex items-end justify-center">
                <div className="w-full bg-accent text-white p-5 flex flex-col items-center gap-4 shadow-lg">
                    <p className="text-center text-sm sm:text-base leading-relaxed">
                        We use cookies to improve your experience. By using our site, you accept cookies.
                    </p>
                    <button
                        onClick={acceptCookies}
                        className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-2 rounded-md transition-all"
                    >
                        Accept
                    </button>
                </div>
            </div>
        </>
    );
};

export default CookieConsentBanner;
