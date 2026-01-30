"use client";

import React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const MagneticButton: React.FC<{ children: React.ReactNode; className?: string; primary?: boolean }> = ({ children, className, primary }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 150 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        mouseX.set((clientX - centerX) * 0.4);
        mouseY.set((clientY - centerY) * 0.4);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.button
            style={{ x, y }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative group px-7 py-2.5 rounded-full text-xs font-black tracking-widest uppercase transition-all duration-300 active:scale-95 ${primary
                ? "bg-linear-to-r from-teal-500 to-emerald-600 text-black shadow-lg shadow-teal-900/20"
                : "bg-transparent border border-white/10 text-white hover:border-teal-500/50"
                } ${className}`}
        >
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>
            {primary && (
                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            )}
        </motion.button>
    );
};

export default MagneticButton;
