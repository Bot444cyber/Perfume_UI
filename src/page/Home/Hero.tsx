"use client";


import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
    motion,
    useScroll,
    useTransform,
    useMotionValue,
    useSpring,
    useMotionTemplate,
} from 'framer-motion';
import { Play, ArrowRight, Star, Info } from 'lucide-react';
import Header from '@/components/Header';

// --- Sub-components ---

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
            className={`relative group px-8 py-4 rounded-full text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-300 active:scale-95 ${primary
                ? "bg-teal-500 text-black hover:bg-teal-400"
                : "bg-transparent border border-white/10 text-white hover:border-teal-500/50"
                } ${className}`}
        >
            <span className="relative z-10 flex items-center justify-center gap-3">
                {children}
            </span>
            {primary && (
                <div className="absolute inset-0 rounded-full bg-teal-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
            )}
        </motion.button>
    );
};

const GlitchText: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    const [displayText, setDisplayText] = useState(text);

    const triggerGlitch = useCallback(() => {
        let iterations = 0;
        const interval = setInterval(() => {
            setDisplayText(
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iterations) return text[index];
                        return letters[Math.floor(Math.random() * letters.length)];
                    })
                    .join("")
            );
            if (iterations >= text.length) clearInterval(interval);
            iterations += 1 / 2;
        }, 40);
        return () => clearInterval(interval);
    }, [text]);

    useEffect(() => {
        const timer = setTimeout(() => triggerGlitch(), delay * 1000);
        return () => clearTimeout(timer);
    }, [triggerGlitch, delay]);

    return (
        <span
            className="inline-block relative cursor-default"
            onMouseEnter={() => triggerGlitch()}
        >
            <span className="relative z-10">{displayText}</span>
            <span className="absolute top-0 left-0 -z-10 text-teal-500 opacity-40 translate-x-[2px] translate-y-[-1px] select-none">{displayText}</span>
            <span className="absolute top-0 left-0 -z-10 text-rose-500 opacity-40 -translate-x-[2px] translate-y-[1px] select-none">{displayText}</span>
        </span>
    );
};

const AmbientDust: React.FC = () => {
    const particles = useMemo(() => {
        return Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            size: Math.random() * 2 + 0.5,
            delay: Math.random() * 10,
            duration: Math.random() * 15 + 20,
        }));
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none z-[5] overflow-hidden">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute bg-white/20 rounded-full blur-[1px]"
                    style={{
                        left: p.left,
                        top: p.top,
                        width: p.size,
                        height: p.size,
                    }}
                    animate={{
                        y: [0, -250, 0],
                        x: [0, 80, 0],
                        opacity: [0, 0.4, 0]
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
};

const Hero: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    // Transformations
    const bottleY = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const bottleRotate = useTransform(scrollYProgress, [0, 1], [0, 20]);
    const textParallax = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const opacityFade = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

    const spotlightBackground = useMotionTemplate`
        radial-gradient(
            600px circle at ${mouseX}px ${mouseY}px,
            rgba(20, 184, 166, 0.1),
            transparent 80%
        )
    `;

    return (
        <section
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#050505] selection:bg-teal-500 selection:text-black"
        >
            <Header />

            {/* Dynamic Background Elements */}
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{ background: spotlightBackground }}
            />

            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(10,10,10,0)_0%,#050505_100%)] z-10" />
                <motion.div
                    style={{ y: textParallax }}
                    className="absolute inset-0 opacity-[0.08] blur-3xl scale-125"
                >
                    <img
                        src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2560&auto=format&fit=crop"
                        alt="Cinematic Forest"
                        className="w-full h-full object-cover"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/40 to-[#050505]" />
            </div>

            <AmbientDust />

            {/* Main Interactive Container - Scaled down for better fit */}
            <div className="max-w-screen-xl mx-auto w-full px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-16 relative z-10 pt-32 pb-24 lg:pt-40 lg:pb-32">

                {/* Information Layer: Left */}
                <motion.div
                    className="lg:col-span-6 z-20 space-y-6 text-center lg:text-left order-2 lg:order-1"
                    style={{ y: textParallax, opacity: opacityFade }}
                >
                    <div className="space-y-4">
                        <h1 className="text-6xl md:text-8xl xl:text-9xl font-black leading-[0.8] tracking-tighter text-white uppercase">
                           By KAR
                        </h1>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1.5 }}
                        className="max-w-md mx-auto lg:mx-0 space-y-4"
                    >
                        <p className="text-zinc-300 text-base lg:text-xl font-serif italic">
                            Where obsidian silence meets the emerald roar.
                        </p>
                        <p className="text-zinc-200 text-xs lg:text-sm leading-relaxed font-light border-l border-teal-500/50 pl-6 text-left">
                            A curated olfactory assault. Hand-poured into cold-pressed obsidian glass, By KAR represents the intersection of forgotten apothecary techniques and modern scent synthesis.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.3, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2"
                    >
                        <Link href="/collections">
                            <MagneticButton primary>
                                Secure Reserve <ArrowRight className="w-3.5 h-3.5" />
                            </MagneticButton>
                        </Link>
                        <Link href="/contact">
                            <MagneticButton>
                                Contact Us <ArrowRight className="w-3.5 h-3.5" />
                            </MagneticButton>
                        </Link>
                    </motion.div>

                    <div className="flex items-center gap-10 pt-6 justify-center lg:justify-start">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-black overflow-hidden bg-zinc-800 shadow-lg">
                                    <img src={`https://picsum.photos/seed/${i + 25}/100/100`} alt="collector" className="w-full h-full object-cover" />
                                </div>
                            ))}
                            <div className="w-10 h-10 rounded-full border-2 border-black bg-teal-500 flex items-center justify-center text-[9px] font-black text-black shadow-lg">
                                +2k
                            </div>
                        </div>
                        <div className="text-left space-y-0.5">
                            <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-2.5 h-2.5 fill-teal-500 text-teal-500" />)}
                            </div>
                            <span className="text-[9px] text-zinc-500 uppercase tracking-[0.2em] font-black block">Collectors Verified</span>
                        </div>
                    </div>
                </motion.div>



                {/* Media & Stats: Right */}
                <motion.div
                    className="lg:col-span-6 flex flex-col items-center lg:items-end space-y-10 z-20 order-3"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    style={{ y: textParallax, opacity: opacityFade }}
                >
                    <div className="relative w-full max-w-sm aspect-[4/3] rounded-[2rem] overflow-hidden group cursor-pointer border border-white/10 shadow-2xl bg-black">
                        <img
                            src="https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop"
                            alt="Brand Heritage"
                            className="w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-110 transition-all duration-1000 ease-out"
                        />
                        <div className="absolute inset-0 bg-teal-900/5 mix-blend-color" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-2xl flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-500">
                                <Play className="w-6 h-6 text-white fill-current ml-1" />
                            </div>
                        </div>

                        <div className="absolute bottom-6 left-6 text-left">
                            <span className="text-[9px] font-black text-teal-400 tracking-[0.3em] uppercase block mb-1">Cinéma Privé</span>
                            <p className="text-white text-lg font-black tracking-tighter">The Process of Void</p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                                <span className="text-[8px] uppercase tracking-[0.2em] text-zinc-400 font-black">Live Archive</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-px bg-white/5 w-full max-w-sm rounded-[1.2rem] overflow-hidden border border-white/10 shadow-xl">
                        <div className="bg-[#080808] p-6 space-y-1 text-center group">
                            <span className="block text-4xl font-black text-white group-hover:text-teal-400 transition-colors">4.95</span>
                            <span className="text-[9px] text-zinc-500 uppercase tracking-[0.2em] block font-black">Rating</span>
                        </div>
                        <div className="bg-[#080808] p-6 space-y-1 text-center group">
                            <span className="block text-4xl font-black text-white group-hover:text-teal-400 transition-colors">24h+</span>
                            <span className="text-[9px] text-zinc-500 uppercase tracking-[0.2em] block font-black">Longevity</span>
                        </div>
                        <div className="bg-[#080808] p-6 space-y-2 text-center group col-span-2">
                            <div className="flex justify-center gap-1.5 mb-1 flex-wrap">
                                {['Smoky', 'Woody', 'Obsidian'].map((note) => (
                                    <span key={note} className="px-2.5 py-0.5 border border-white/10 rounded-full text-[7px] uppercase tracking-widest text-zinc-500 font-black">{note}</span>
                                ))}
                            </div>
                            <span className="text-[9px] text-zinc-400 uppercase tracking-[0.2em] block font-black">Dominant Olfactory Accords</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-zinc-600">
                        <Info className="w-4 h-4" />
                        <span className="text-[9px] uppercase tracking-[0.3em] font-black">Ethically Sourced Provenance</span>
                    </div>
                </motion.div>
            </div>

            {/* Minimalist Navigation Footer - Scaled Down */}
            <div className="absolute bottom-12 left-0 w-full px-12 hidden lg:flex justify-between items-center z-20">
                <div className="flex gap-12">
                    <div className="flex flex-col gap-1">
                        <span className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.3em]">Current Batch</span>
                        <span className="text-[10px] font-black text-white tracking-widest">NO. 008 / 100</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.3em]">Status</span>
                        <span className="text-[10px] font-black text-teal-500 tracking-widest flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.6)]" />
                            AVAILABLE
                        </span>
                    </div>
                </div>

                <motion.div
                    className="flex flex-col items-center gap-3 cursor-pointer group"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    <span className="text-[8px] uppercase tracking-[0.4em] text-white/20 group-hover:text-teal-500 transition-colors duration-500">Explore</span>
                    <div className="w-[px] h-12 bg-gradient-to-b from-white/0 via-teal-500/20 to-white/0 group-hover:via-teal-500 transition-all duration-700" />
                </motion.div>

                <div className="flex gap-10 items-center">
                    <div className="flex flex-col items-end gap-1">
                        <span className="text-[8px] text-zinc-600 uppercase tracking-[0.3em] font-black">Locators</span>
                        <div className="w-full h-[0.5px] bg-white/5" />
                    </div>
                    <div className="flex gap-5">
                        {['NYC', 'PAR', 'TYO', 'LDN'].map(city => (
                            <span key={city} className="text-[10px] font-black text-white/30 hover:text-white transition-colors cursor-pointer tracking-[0.15em]">{city}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed bottom-0 left-0 h-1 bg-teal-500 z-[120] origin-left shadow-[0_0_10px_rgba(20,184,166,0.4)]"
                style={{ scaleX: scrollYProgress }}
            />
        </section>
    );
};

export default Hero;
