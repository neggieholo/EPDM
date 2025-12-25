/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter, FaYoutube, FaTiktok } from "react-icons/fa6";
import { getSocialLinks } from "../../utils/MiscFectchers";
import { fetchDocuments } from "@/app/utils/SignUpFetchers";
import LegalDocBtn from "../legalDocBtn";

const Footer = async () => {
    const {socialLinks, phones} = await getSocialLinks();
    const { terms, privacy } = await fetchDocuments();

    return (
        <footer className="bg-gray-900 text-gray-200 py-12 px-6 md:px-12 border-t border-gray-800 shadow-[0_-3px_10px_rgba(0,0,0,0.3)] flex flex-col space-y-8 items-center justify-center">
                <div className="flex-1 text-center md:text-left">
                    {/* 🌐 Socials */}
                    <div className="my-4 flex justify-center md:justify-start gap-5">
                        {socialLinks.facebook && (
                            <a
                                href={socialLinks.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-500 transition"
                            >
                                <FaFacebook className="w-6 h-6" />
                            </a>
                        )}
                        {socialLinks.x && (
                            <a
                                href={socialLinks.x}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-400 transition"
                            >
                                <FaXTwitter className="w-6 h-6" />
                            </a>
                        )}
                        {socialLinks.linkedin && (
                            <a
                                href={socialLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-300 transition"
                            >
                                <FaLinkedin className="w-6 h-6" />
                            </a>
                        )}
                        {socialLinks.instagram && (
                            <a
                                href={socialLinks.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-pink-400 transition"
                            >
                                <FaInstagram className="w-6 h-6" />
                            </a>
                        )}
                        {socialLinks.youtube && (
                            <a
                                href={socialLinks.youtube}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-red-600 transition"
                            >
                                <FaYoutube className="w-6 h-6 text-red-600 hover:text-red-700 transition" />
                            </a>
                        )}
                        {socialLinks.tiktok && (
                            <a
                                href={socialLinks.tiktok}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-black transition"
                            >
                                <FaTiktok className="w-6 h-6" />
                            </a>
                        )}
                    </div>
                </div>

                {/* 🏢 Company Links */}
                <div className="flex-1 flex flex-col gap-6 text-center md:text-left w-full items-center">
                        <h3 className="font-semibold text-lg mb-3 border-b border-gray-700 pb-1 text-white text-center">
                            Company
                        </h3>
                        <ul className="gap-10 flex justify-evenly w-[50%]">
                            <li><a href="#" className="hover:text-blue-400">About</a></li>
                            <li><a href="#" className="hover:text-blue-400">Careers</a></li>                            
                            <li><a href="#" className="hover:text-blue-400">Contact</a></li>
                            <li><a href="#" className="hover:text-blue-400">Events</a></li>
                        </ul>
                </div>

            {/* ⚖️ Policies */}
            <div className="mt-10 text-center text-sm text-gray-400 space-x-3">
                <LegalDocBtn docType="terms" content={terms} />
                <span>|</span>
                <LegalDocBtn docType="privacy" content={privacy} />
            </div>
            <div className="mt-6 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Energy Projects Data Media Ltd. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
