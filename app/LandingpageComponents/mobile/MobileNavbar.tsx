/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { NavbarSections } from "../../utils/LandingPageSections";
import { aboutUsItems, industryResourcesItems, industryShowcaseItems } from "../../utils/NavbarItemsDesc";
import { HiOutlineSearch, HiMenu, HiX, HiPlus } from "react-icons/hi";

export default function MobileNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const closeAllMenus = () => {
    setMenuOpen(false);
    setOpenDropdown(null);
  };

  const toggleSectionDropdown = (sectionName: string) => {
    setOpenDropdown((prev) => (prev === sectionName ? null : sectionName));
  };

  const getDropdownItems = (sectionName: string) => {
    switch (sectionName) {
      case "ABOUT US":
        return aboutUsItems;
      case "INDUSTRY RESOURCES":
        return industryResourcesItems;
      case "INDUSTRY SHOWCASE":
      default:
        return industryShowcaseItems;
    }
  };

  return (
    <nav className="w-full max-w-full fixed top-0 left-0 bg-primary text-white shadow-md flex items-center justify-between px-2 z-50">
      {/* Logo + Brand Name */}
      <div className="flex items-center gap-2 min-w-0 flex-1 pr-2">
        <div className="relative w-14 h-14 shrink-0">
          <Image
            src="/epdm_logo_m.png"
            alt="EPDM Logo"
            fill
            sizes="36px"
            className="object-contain"
          />
        </div>
        <span className="font-bold text-white text-[16px] sm:text-sm leading-tight truncate">
          ENERGY PROJECT DATA MEDIA LTD.
        </span>
      </div>

      {/* Header Action Icons */}
      <div className="flex items-center shrink-0">
        <button
          aria-label="Search"
          className="text-white text-xl border-l border-white/50 px-2.5 py-1"
        >
          <HiOutlineSearch />
        </button>

        <button
          aria-label="Toggle Menu"
          onClick={() => {
            setMenuOpen((prev) => {
              if (prev) setOpenDropdown(null);
              return !prev;
            });
          }}
          className="text-white text-2xl border-l border-r border-white/50 px-2.5 py-1 ml-1"
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white text-primary shadow-md flex flex-col z-40 max-h-[calc(100vh-60px)] overflow-y-auto">
          {NavbarSections.map((s) => {
            const isSectionOpen = openDropdown === s.name;
            const subItems = s.dropdown ? getDropdownItems(s.name) : [];

            return (
              <div key={s.name} className="border-b border-gray-200">
                {s.dropdown ? (
                  <button
                    onClick={() => toggleSectionDropdown(s.name)}
                    className="w-full flex justify-between items-center px-4 py-3 text-left text-base font-medium hover:bg-gray-100"
                  >
                    <span>{s.name}</span>
                    <HiPlus
                      className={`transition-transform duration-200 ${
                        isSectionOpen ? "rotate-45" : ""
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

                {/* Distinct Section Sub-Items */}
                {s.dropdown && isSectionOpen && (
                  <div className="bg-gray-50 flex flex-col">
                    {subItems.map((item: any) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="pl-8 pr-4 py-2.5 text-sm hover:bg-gray-200 border-b border-primary/20 last:border-b-0"
                        onClick={closeAllMenus}
                      >
                        {item.heading}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Login / Register / Contact */}
          <div className="border-b border-accent bg-primary text-white flex flex-col">
            <Link
              href="/login"
              className="px-4 py-3 hover:bg-white hover:text-primary transition-colors"
              onClick={closeAllMenus}
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-3 hover:bg-white hover:text-primary transition-colors"
              onClick={closeAllMenus}
            >
              Register
            </Link>
            <Link
              href="/contactus"
              className="px-4 py-3 hover:bg-white hover:text-primary transition-colors"
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
