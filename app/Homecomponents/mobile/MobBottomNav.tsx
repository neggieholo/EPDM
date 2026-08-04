'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Home, Archive, Calendar, FileText, Settings} from 'lucide-react';

const MobBottomNav = () => {
    const router = useRouter();
    const pathname = usePathname();
    // const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    const isActive = (path: string) => pathname === path;


    const navItems = [
        { path: '/home', icon: <Home className="w-5 h-5 text-primary" />, label: 'Home' },
        { path: '/home/projects', icon: <Archive className="w-5 h-5 text-primary" />, label: 'Projects' },
        { path: '/home/energydata', icon: <Calendar className="w-5 h-5 text-primary" />, label: 'Energy Data' },
        { path: '/home/projects/subscribed', icon: <FileText className="w-5 h-5 text-primary" />, label: 'Newsletter' },
        { path: '/home/projects/favorites', icon: <Settings className="w-5 h-5 text-primary" />, label: 'Favourites' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center bg-base-100 border-t border-base-300 shadow-lg md:hidden py-2">
            {navItems.map(({ path, icon, label }) => {
                const active = isActive(path);
                return (
                    <button
                        key={path}
                        onClick={() => router.push(path)}
                        className={`flex flex-col items-center px-2 py-1 transition-all duration-200
              ${active
                                ? 'text-primary font-semibold scale-110 bg-base-200 rounded-lg'
                                : 'text-base-content/60 hover:text-primary'
                            }`}
                    >
                        {icon}
                        <span className="text-[10px] mt-0.5 text-primary">{label}</span>
                    </button>
                );
            })}

            {/* Logout button
            <button
                onClick={handleLogout}
                className="flex flex-col items-center px-2 py-1 text-base-content/60 hover:text-error transition-all"
            >
                <Power className="w-5 h-5" />
                <span className="text-[10px] mt-0.5 text-primary">Logout</span>
            </button> */}
        </nav>
    );
};

export default MobBottomNav;
