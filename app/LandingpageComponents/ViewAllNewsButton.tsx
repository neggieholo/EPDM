'use client';

import Link from "next/link";
import React from "react";

const ViewAllButton: React.FC = () => {
    return (
        <Link
            href="/pressreleases"
            className="inline-block px-8 py-3 bg-accent rounded-full font-semibold text-white hover:scale-105 transition-transform shadow-md hover:shadow-lg"
        >
            View All Press Releases
        </Link>
    );
};

export default ViewAllButton;
