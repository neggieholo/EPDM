"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Partner } from "../utils/Interfaces";
import { toast } from "react-toastify";

// 2. Component matching the AboutUs / Team layout style
const Partners = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/partners`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setPartners(data.partners);
          console.log("Fetched Partners:", data.partners);
        } else {
          toast.error(data.error || "Failed to fetch partners");
        }
      } catch (err) {
        toast.error("Server error");
        console.error(err);
      }
    };
    fetchPartners();
  }, [baseUrl]);

  return (
    <section className="flex justify-center bg-white items-start min-h-[80vh] py-8">
      <div className="w-[70%] flex justify-center items-start px-5 bg-white gap-8">
        {/* LEFT: Branding Block (Sticky on Scroll with Navbar Offset) */}
        <div className="w-fit h-fit text-start relative flex items-center justify-start rounded-l-xl sticky top-36 z-10 self-start shrink-0">
          <div className="flex flex-col justify-evenly shadow-strong bg-primary items-center p-8 min-w-70">
            <h2 className="text-5xl font-extrabold text-white leading-tight">
              OUR
            </h2>
            <h2 className="text-5xl font-extrabold text-white leading-tight">
              PARTNERS
            </h2>
          </div>
        </div>

        {/* RIGHT: Text Content */}
        <div className="w-full md:w-[70%] flex flex-col justify-start text-primary p-2">
          {partners && partners.length > 0 ? (
            <div className="flex flex-col gap-4 w-full items-start">
              {partners.map((partner, index) => {
                const cardContent = (
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-[#f2f7ff] border border-gray-100 shadow-sm hover:shadow-md transition-shadow w-full">
                    {partner.logoUrl && (
                      <div className="relative w-24 h-24 shrink-0 rounded bg-white overflow-hidden border border-gray-100">
                        <Image
                          src={partner.logoUrl}
                          alt={partner.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                    )}
                    <div className="flex flex-col justify-start">
                      <h5 className="font-semibold text-lg text-primary leading-snug">
                        {partner.name}
                      </h5>
                      {partner.website && (
                        <p className="text-sm text-gray-600 mt-1 break-all">
                          {partner.website}
                        </p>
                      )}
                    </div>
                  </div>
                );

                return partner.website ? (
                  <a
                    key={`${partner._id || partner.name}-${index}`}
                    href={
                      partner.website.startsWith("http")
                        ? partner.website
                        : `https://${partner.website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    {cardContent}
                  </a>
                ) : (
                  <div
                    key={`${partner._id || partner.name}-${index}`}
                    className="w-full"
                  >
                    {cardContent}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-10">
              No partners available at the moment.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Partners;
