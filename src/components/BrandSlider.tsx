"use client";

import React, { useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

const brands = [
    { name: "ROJA", sub: "Parfums" },
    { name: "CLIVE", sub: "Christian" },
    { name: "XERJOFF", sub: "Torino" },
    { name: "AMOUAGE", sub: "Oman" },
    { name: "KURKDJIAN", sub: "Paris" },
    { name: "BYREDO", sub: "Stockholm" },
    { name: "CREED", sub: "1760" },
    { name: "NISHANE", sub: "Istanbul" },
    { name: "ROJA", sub: "Parfums" },
    { name: "CLIVE", sub: "Christian" },
    { name: "XERJOFF", sub: "Torino" },
    { name: "AMOUAGE", sub: "Oman" },
    { name: "KURKDJIAN", sub: "Paris" },
    { name: "BYREDO", sub: "Stockholm" },
    { name: "CREED", sub: "1760" },
    { name: "NISHANE", sub: "Istanbul" },
];

const BrandSlider = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="relative w-full bg-[#0c0805] border-y border-white/10 py-10 lg:py-16 overflow-hidden z-20">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0c0805] via-teal-900/10 to-[#0c0805] pointer-events-none" />

            {/* Side Masks */}
            <div className="absolute top-0 left-0 h-full w-20 lg:w-40 bg-gradient-to-r from-[#0c0805] to-transparent z-20 pointer-events-none" />
            <div className="absolute top-0 right-0 h-full w-20 lg:w-40 bg-gradient-to-l from-[#0c0805] to-transparent z-20 pointer-events-none" />

            <div className="flex mask-gradient-x select-none">
                {[0, 1].map((setIndex) => (
                    <motion.div
                        key={setIndex}
                        className="flex items-center shrink-0 gap-16 lg:gap-32 pr-16 lg:pr-32"
                        animate={{ x: ["0%", "-100%"] }}
                        transition={{
                            duration: 40,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        {brands.map((brand, idx) => {
                            const isDimmed = hoveredIndex !== null && hoveredIndex !== idx;

                            return (
                                <motion.div
                                    key={`${setIndex}-${idx}`}
                                    className="group relative cursor-pointer flex flex-col items-center justify-center text-center mix-blend-screen"
                                    onMouseEnter={() => setHoveredIndex(idx)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    animate={{
                                        opacity: isDimmed ? 0.3 : 1,
                                        scale: isDimmed ? 0.95 : 1,
                                        filter: isDimmed ? "blur(3px)" : "blur(0px)"
                                    }}
                                    transition={{ duration: 0.4 }}
                                >
                                    {/* Main Text - Balanced Pro Size */}
                                    <span
                                        className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter text-zinc-300 group-hover:text-white transition-colors duration-300 uppercase font-sans"
                                        style={{ textShadow: "0 0 20px rgba(255,255,255,0.05)" }}
                                    >
                                        {brand.name}
                                    </span>

                                    {/* Subtext */}
                                    <div className="flex items-center gap-3 mt-3 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                        <span className="h-px w-6 bg-teal-500" />
                                        <span className="text-xs uppercase tracking-[0.4em] text-teal-400 font-bold drop-shadow-md">
                                            {brand.sub}
                                        </span>
                                        <span className="h-px w-6 bg-teal-500" />
                                    </div>

                                    {/* Subtle Reflection */}
                                    <div className="absolute top-full left-0 w-full h-1/2 opacity-0 group-hover:opacity-10 scale-y-[-0.5] origin-top bg-gradient-to-b from-teal-400 to-transparent blur-sm pointer-events-none transition-opacity duration-300" />
                                </motion.div>
                            )
                        })}
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default BrandSlider;
