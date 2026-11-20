"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { HomeNavbarSections } from "@/app/utils/LandingPageSections";
import { settingsItems } from "@/app/utils/NavbarItemsDesc";
import { HiOutlineSearch, HiMenu, HiX, HiPlus } from "react-icons/hi";
import MobSocketProvider from "./MobSocketProvider";
import { useRouter } from "next/navigation";

export default function MobileNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [industryOpen, setIndustryOpen] = useState(false);
  const router = useRouter();

  // Helper: closes all menus
  const closeAllMenus = () => {
    setMenuOpen(false);
    setIndustryOpen(false);
  };

  const handleLogOut = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`, {
      method: "POST",
      credentials: "include",
    });
    localStorage.clear();
    router.push("/login");
  };

  return (
    <nav className="w-full h-14 sticky top-0 bg-primary text-white shadow-md flex items-center justify-between px-3 z-50">
      {/* Left: Logo + Title */}
      <div className="flex items-center gap-2 min-w-0">
        <div className="relative w-8 h-8 shrink-0">
          <Image
            src="/epdm_logo.png"
            alt="EPDM Logo"
            fill
            className="object-contain"
          />
        </div>
        <span className="font-bold text-xs sm:text-sm text-white truncate">
          ENERGY PROJECTS DATA MEDIA LTD.
        </span>
      </div>

      {/* Right: Search & Menu */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          className="text-white text-xl border-l border-white/50 pl-2"
          aria-label="Search"
        >
          <HiOutlineSearch />
        </button>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="text-white text-xl border-l border-white/50 pl-2"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>
      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white text-primary shadow-md flex flex-col z-40">
          {HomeNavbarSections.map((s) => (
            <div key={s.name} className="border-b border-gray-200">
              {s.dropdown ? (
                <button
                  onClick={() => setIndustryOpen((prev) => !prev)}
                  className="w-full flex justify-between items-center px-4 py-3 text-left text-base font-medium hover:bg-gray-100"
                >
                  <span>{s.name}</span>
                  <HiPlus
                    className={`transition-transform ${
                      industryOpen ? "rotate-45" : ""
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
                  {settingsItems.map((item) =>
                    item.heading === "Logout" ? (
                      <button
                        key={item.heading}
                        className="pl-8 py-2 text-sm hover:bg-gray-200 border-b border-primary/60 text-left"
                        onClick={() => {
                          closeAllMenus();
                          handleLogOut(); // your logout handler
                        }}
                      >
                        {item.heading}
                      </button>
                    ) : (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="pl-8 py-2 text-sm hover:bg-gray-200 border-b border-primary/60"
                        onClick={closeAllMenus}
                      >
                        {item.heading}
                      </Link>
                    ),
                  )}
                </div>
              )}
            </div>
          ))}
          {/* <MobSocketProvider /> */}
        </div>
      )}
    </nav>
  );
}
