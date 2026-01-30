"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Header from '@/components/Header';
import { Sparkles, FlaskConical, Globe, Leaf } from 'lucide-react';

const StoryPage = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    const y1 = useTransform(smoothProgress, [0, 1], [0, -200]);
    const y2 = useTransform(smoothProgress, [0, 1], [0, -400]);
    const scale = useTransform(smoothProgress, [0, 0.5], [1, 0.8]);
    const opacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);

    return (
        <main ref={containerRef} className="bg-[#050505] text-white selection:bg-teal-500/30 font-sans overflow-x-hidden relative">
            <Header />

            {/* Ambient Background - Dynamic Color Shift */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#050505]" />
                <motion.div
                    style={{ y: y1 }}
                    className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-teal-600/10 rounded-full blur-[120px] mix-blend-screen"
                />
                <motion.div
                    style={{ y: y2 }}
                    className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] mix-blend-screen"
                />
                <div className="absolute top-[40%] left-[30%] w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[150px] mix-blend-screen animate-pulse-subtle" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
            </div>

            {/* Hero Section */}
            <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden z-10 px-6">
                <motion.div
                    style={{ opacity, scale }}
                    className="text-center relative"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
                    >
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-300">Est. 2024</span>
                    </motion.div>

                    <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.9] mb-8 bg-gradient-to-br from-white via-zinc-200 to-zinc-600 bg-clip-text text-transparent mix-blend-overlay">
                        Our<br />Genesis
                    </h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="text-zinc-400 font-serif italic text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed"
                    >
                        Born from the shadows, forged in flame. We do not just create scents;<br className="hidden md:block" /> we engineer memories that linger in the soul.
                    </motion.p>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-zinc-600"
                >
                    <span className="text-[10px] uppercase font-bold tracking-widest">Scroll to Explore</span>
                    <div className="w-[1px] h-16 bg-gradient-to-b from-teal-500/50 to-transparent"></div>
                </motion.div>
            </section>

            {/* Narrative Sections */}
            <div className="relative z-10 space-y-40 pb-40">

                {/* Chapter I: Philosophy */}
                <section className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="sticky top-40">
                            <span className="text-9xl font-black text-white/[0.03] absolute -top-20 -left-10 select-none">I</span>
                            <span className="text-teal-500 font-bold uppercase tracking-[0.2em] text-sm mb-4 block">The Philosophy</span>
                            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tight mb-8 leading-[0.9]">
                                Beyond The <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">Visible</span>
                            </h2>
                            <p className="text-xl font-serif text-zinc-400 leading-loose border-l border-white/10 pl-8 mb-8">
                                Perfume is the most intense form of memory. In 2024, we set out to break the monotony of mass-market fragrances. We wanted to create something dangerous, something that demands attention. The "Shadow Flame" concept represents the duality of man—the cool, mysterious void and the burning, passionate core.
                            </p>
                            <div className="flex gap-4">
                                <span className="px-4 py-2 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-zinc-500 hover:border-teal-500/50 hover:text-teal-400 transition-colors cursor-default">Duality</span>
                                <span className="px-4 py-2 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-zinc-500 hover:border-teal-500/50 hover:text-teal-400 transition-colors cursor-default">Mystery</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="h-[600px] bg-gradient-to-b from-zinc-900 to-black rounded-2xl border border-white/5 overflow-hidden relative group"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=1000&auto=format&fit=crop"
                            alt="Philosophy Abstract"
                            className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-[1.5s]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                        <div className="absolute bottom-8 left-8 right-8">
                            <h3 className="text-2xl font-bold uppercase tracking-wide mb-2">The Void</h3>
                            <p className="text-zinc-500 text-sm">Where silence speaks louder than words.</p>
                        </div>
                    </motion.div>
                </section>

                {/* Chapter II: Process */}
                <section className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="h-[600px] bg-gradient-to-b from-zinc-900 to-black rounded-2xl border border-white/5 overflow-hidden relative group order-2 lg:order-1"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1595867204964-b80c55455800?q=80&w=1000&auto=format&fit=crop"
                            alt="Process Lab"
                            className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-[1.5s]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

                        {/* Floating Stats */}
                        <div className="absolute top-8 right-8 flex flex-col gap-4 items-end">
                            <div className="bg-black/50 backdrop-blur-md p-4 rounded-xl border border-white/10 text-right">
                                <span className="block text-2xl font-bold text-teal-400">6 Mo</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Aging Process</span>
                            </div>
                            <div className="bg-black/50 backdrop-blur-md p-4 rounded-xl border border-white/10 text-right">
                                <span className="block text-2xl font-bold text-purple-400">100%</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Pure Extracts</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="order-1 lg:order-2 text-right"
                    >
                        <div className="sticky top-40 flex flex-col items-end">
                            <span className="text-9xl font-black text-white/[0.03] absolute -top-20 -right-10 select-none">II</span>
                            <span className="text-purple-500 font-bold uppercase tracking-[0.2em] text-sm mb-4 block">The Alchemist's Lab</span>
                            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tight mb-8 leading-[0.9]">
                                Art of <span className="text-transparent bg-clip-text bg-gradient-to-l from-purple-400 to-pink-500">Extraction</span>
                            </h2>
                            <p className="text-xl font-serif text-zinc-400 leading-loose border-r border-white/10 pr-8 mb-10 max-w-xl">
                                We source our ingredients from the edges of the world. Oud from the depths of Southeast Asian jungles, Rose from the high altitudes of Bulgaria, and Ambergris washed ashore on forgotten coasts. Every bottle is hand-poured, aged for 6 months in obsidian glass to preserve the molecular integrity of the scent.
                            </p>

                            <div className="grid grid-cols-2 gap-6 w-full max-w-md">
                                <div className="p-4 bg-white/5 border border-white/5 rounded-xl flex flex-col items-center gap-2 group hover:bg-white/10 transition-colors">
                                    <Globe className="w-6 h-6 text-zinc-500 group-hover:text-teal-400 transition-colors" />
                                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Global Sourcing</span>
                                </div>
                                <div className="p-4 bg-white/5 border border-white/5 rounded-xl flex flex-col items-center gap-2 group hover:bg-white/10 transition-colors">
                                    <FlaskConical className="w-6 h-6 text-zinc-500 group-hover:text-purple-400 transition-colors" />
                                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Molecular Distillation</span>
                                </div>
                                <div className="p-4 bg-white/5 border border-white/5 rounded-xl flex flex-col items-center gap-2 group hover:bg-white/10 transition-colors">
                                    <Leaf className="w-6 h-6 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
                                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Sustainable</span>
                                </div>
                                <div className="p-4 bg-white/5 border border-white/5 rounded-xl flex flex-col items-center gap-2 group hover:bg-white/10 transition-colors">
                                    <Sparkles className="w-6 h-6 text-zinc-500 group-hover:text-amber-400 transition-colors" />
                                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Hand Crafted</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Final Quote */}
                <div className="relative py-40 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="text-center px-6"
                    >
                        <p className="text-5xl md:text-8xl font-serif italic text-center max-w-5xl text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-white to-zinc-400 opacity-90 leading-tight">
                            "Scent is the only invisible <span className="text-teal-500">luxury</span>."
                        </p>
                        <div className="mt-12 w-24 h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent mx-auto"></div>
                    </motion.div>
                </div>

            </div>
        </main>
    );
};

export default StoryPage;
