'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Partner } from "@/app/utils/Interfaces";
import { toast } from "react-toastify";

const MobPartners = () => {
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
    <section className="bg-white w-full px-5 py-10">
      <div className="flex flex-col md:flex-row h-auto md:h-screen">
        {/* 🩵 LEFT: Banner Title Block */}
        <div className="w-full md:w-[30%] flex items-center justify-center p-4">
          <div className="flex flex-col justify-evenly bg-primary items-center text-center md:text-left shadow-strong h-auto md:h-[80%] py-8 px-5 w-full">
            <h2 className="text-4xl font-extrabold text-white leading-tight">
              OUR
            </h2>
            <h2 className="text-4xl font-extrabold text-white leading-tight">
              PARTNERS
            </h2>
          </div>
        </div>

        {/* 🩶 RIGHT: Content / Partners Grid */}
        <div className="w-full md:w-[70%] flex flex-col items-center justify-center text-primary p-5 mt-6 md:mt-0">
          {partners && partners.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full items-center">
              {partners.map((partner) => {
                const cardContent = (
                  <div className="flex flex-col items-center justify-center p-4 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white h-32 relative group">
                    <div className="relative w-full h-16 mb-2">
                      {partner.logoUrl && (
                        <Image
                          src={partner.logoUrl}
                          alt={partner.name}
                          fill
                          className="object-contain"
                        />
                      )}
                    </div>
                    <p className="text-xs font-semibold text-center text-gray-700 group-hover:text-primary transition-colors line-clamp-1">
                      {partner.name}
                    </p>
                  </div>
                );

                return partner.website ? (
                  <a
                    key={partner._id || partner.name}
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    {cardContent}
                  </a>
                ) : (
                  <div key={partner._id || partner.name} className="w-full">
                    {cardContent}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-400">
              No partners available at the moment.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default MobPartners;
