'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { NavbarSections } from '../../utils/LandingPageSections';
import { industryResourcesItems } from '../../utils/NavbarItemsDesc';
import { HiOutlineSearch, HiMenu, HiX, HiPlus } from 'react-icons/hi';

export default function MobileNavbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [industryOpen, setIndustryOpen] = useState(false);

    // Helper: closes all menus
    const closeAllMenus = () => {
        setMenuOpen(false);
        setIndustryOpen(false);
    };

    return (
        <nav className="w-full fixed top-0 left-0 bg-primary text-white shadow-md flex justify-between items-center z-50">
            {/* Logo */}
            <div className="absolute w-[10%] h-full">
                <Image src="/epdm_logo.png" alt="EPDM Logo" fill className="object-cover" />
            </div>

            {/* Header Text + Icons */}
            <div className="flex items-center justify-end gap-2 h-full w-full bg-primary">
                <div className="w-[90%] flex justify-between p-2">
                    <div className="flex flex-col text-sm">
                        <span className="font-bold text-white">
                            ENERGY PROJECTS DATA MEDIA LTD.
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="text-white text-2xl border-l border-white/50 pl-2">
                            <HiOutlineSearch />
                        </button>

                        <button
                            onClick={() => setMenuOpen((prev) => !prev)}
                            className="text-white text-2xl border-l border-r border-white/50 pl-2 ml-2"
                        >
                            {menuOpen ? <HiX /> : <HiMenu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {menuOpen && (
                <div className="absolute top-full left-0 w-full bg-white text-primary shadow-md flex flex-col z-40">
                    {NavbarSections.map((s) => (
                        <div key={s.name} className="border-b border-gray-200">
                            {s.dropdown ? (
                                <button
                                    onClick={() => setIndustryOpen((prev) => !prev)}
                                    className="w-full flex justify-between items-center px-4 py-3 text-left text-base font-medium hover:bg-gray-100"
                                >
                                    <span>{s.name}</span>
                                    <HiPlus
                                        className={`transition-transform ${industryOpen ? 'rotate-45' : ''
                                            }`}
                                    />
                                </button>
                            ) : (
                                <Link
                                    href={s.href}
                                    className="block px-4 py-3 text-base font-medium hover:bg-gray-100"
                                    onClick={closeAllMenus}
                                >
                                    {s.name}
                                </Link>
                            )}

                            {/* Industry Dropdown Items */}
                            {s.dropdown && industryOpen && (
                                <div className="bg-gray-50 flex flex-col">
                                    {industryResourcesItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="pl-8 py-2 text-sm hover:bg-gray-200 border-b border-primary/60"
                                            onClick={closeAllMenus}
                                        >
                                            {item.heading}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Login / Register / Contact */}
                    <div className="border-b border-accent bg-primary text-white flex flex-col">
                        <Link
                            href="/login"
                            className="px-4 py-3 hover:bg-gray-100 hover:text-primary"
                            onClick={closeAllMenus}
                        >
                            Login
                        </Link>
                        <Link
                            href="/register"
                            className="px-4 py-3 hover:bg-gray-100 hover:text-primary"
                            onClick={closeAllMenus}
                        >
                            Register
                        </Link>
                        <Link
                            href="/contactus"
                            className="px-4 py-3 hover:bg-gray-100 hover:text-primary"
                            onClick={closeAllMenus}
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
