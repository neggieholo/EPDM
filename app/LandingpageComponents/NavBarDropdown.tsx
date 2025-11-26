"use client";

import Link from "next/link";
import { DropdownItem } from "../utils/Interfaces";

export interface NavbarDropdownProps {
    items: DropdownItem[];
}

export default function NavbarDropdown({ items }: NavbarDropdownProps) {
    // Determine grid columns based on number of items
    const getGridCols = (count: number) => {
        if (count <= 2) return 2;
        if (count <= 4) return 2;
        if (count <= 6) return 3;
        return 4; // 7-8 items
    };

    const columns = getGridCols(items.length);
    const rows = Math.ceil(items.length / columns);

    return (
        <div className="p-4 bg-white shadow-lg min-w-[300px]">
            <div
                className="grid"
                style={{
                    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                }}
            >
                {items.map((item, index) => {
                    const isLastColumn = (index + 1) % columns === 0;
                    const isLastRow = Math.ceil((index + 1) / columns) === rows;

                    return (
                        <div
                            key={index}
                            className={`p-4 ${!isLastColumn ? "border-r border-accent" : ""
                                } ${!isLastRow ? "border-b border-accent" : ""}`}
                        >
                            <h3 className="text-lg text-primary font-semibold">{item.heading}</h3>
                            <p className="text-sm mt-1 text-gray-600">{item.description}</p>
                            <Link
                                href={item.href}
                                className="mt-2 inline-flex items-center text-primary font-medium hover:underline"
                            >
                                See More <span className="ml-1">→</span>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
