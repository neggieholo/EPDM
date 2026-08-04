import { useRef, useEffect } from "react";

export default function LogoScroller() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let scrollAmount = 0;
        const speed = 1; // px per frame
        const interval = setInterval(() => {
            scrollAmount += speed;
            if (scrollAmount >= container.scrollWidth / 2) scrollAmount = 0;
            container.scrollLeft = scrollAmount;
        }, 16); // ~60fps

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-white border border-dotted border-accent">            
            <h5 className="text-lg text-center font-semibold">Our Partner:</h5>
            <div ref={containerRef} className="flex justify-center w-[70%] mx-auto gap-8 whitespace-nowrap mt-1 p-3">
                {/* <img src="/logos/shell.png" className="inline-block h-12 mx-4" />
                <img src="/logos/exxonmobil.png" className="inline-block h-12 mx-4" />
                <img src="/logos/agip.png" className="inline-block h-12 mx-4" />
                <img src="/logos/chevron.png" className="inline-block h-12 mx-4" />
                <img src="/logos/totalenergies.jpg" className="inline-block h-12 mx-4" />
                <img src="/logos/oando.png" className="inline-block h-12 mx-4" />
                <img src="/logos/nnpc.jpg" className="inline-block h-12 mx-4" />
                <img src="/logos/seplat.png" className="inline-block h-12 mx-4" /> */}
                <img src="/logos/ncdmb.webp" className="inline-block h-12 mx-4" />
            </div>
        </div>
    );
}
