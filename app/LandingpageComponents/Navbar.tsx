'use client'

import Link from 'next/link';
import Image from 'next/image';
import NavbarDropdown from './NavBarDropdown';
import { industryResourcesItems } from '../utils/NavbarItemsDesc';
import { useState } from 'react';
import { NavbarSections } from '../utils/LandingPageSections';


interface NavbarProps {
    zIndex?: number;     // optional, default 50
    disabled?: boolean;  // optional, default false
}


export default function Navbar({ zIndex = 50, disabled = false }: NavbarProps) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <nav
            className={`w-full fixed top-0 left-0 bg-primary text-white shadow-md flex justify-center items-center
                  ${disabled ? "pointer-events-none" : ""}`}
            style={{ zIndex }}
        >
            <div className="absolute left-0 top-0 h-full flex items-center p-2 w-[15%]">
                <Image
                    src="/epdm_logo.png"
                    alt="EPDM Logo"
                    className="object-cover"
                    fill
                />
            </div>
            <div className="absolute right-0 bottom-0 w-[15%] px-4 flex justify-end">
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full px-2 py-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className='flex flex-col w-[70%] h-full'>
                <div className="flex justify-end items-center gap-3">
                    <Link href="/login">Login</Link>
                    <span>|</span>
                    <Link href="/register">Register</Link>
                    <span>|</span>
                    <Link href="/contactus">Contact Us</Link>
                </div>

                <div className="flex text-start items-center gap-3 text-3xl font-extrabold text-primary border-b border-t border-accent">
                    <div className="flex flex-col">
                        <h1 className="text-white pl-0.5">ENERGY PROJECTS DATA MEDIA LTD.</h1>
                        <p className="p-2 rounded mt-2 bg-white" id="logocaption">
                            <i>your reliable and real-time energy projects data e-marketplace</i>
                        </p>
                    </div>
                </div>

                <div className="hidden md:flex flex-1 justify-evenly bg-white space-x-8 text-lg items-center pt-2">
                    {NavbarSections.map((s) => (
                        <a
                            key={s.name}
                            {...(!s.dropdown && { href: s.href })}
                            onMouseEnter={() => s.dropdown && setDropdownOpen(true)}
                            onMouseLeave={() => s.dropdown && setDropdownOpen(false)}
                            className="text-sm md:text-base text-primary font-medium px-3 py-2 rounded-md 
                            transition-colors duration-300 hover:bg-primary hover:text-white"
                        >
                            {s.name}
                        </a>
                    ))}
                </div>
            </div>
            {dropdownOpen &&
                <div className='w-full border-t border-accent'
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                    style={{ position: 'absolute', top: '100%' }}>
                <NavbarDropdown items={industryResourcesItems} />
            </div>}
        </nav>
    );
}
