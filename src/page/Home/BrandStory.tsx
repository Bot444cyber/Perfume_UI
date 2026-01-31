"use client"

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Quote } from 'lucide-react';

const BrandStory: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const isTextInView = useInView(textRef, { once: true, margin: "-10%" });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

    const storyText = "In the heart of the ancient world, where obsidian silence meets the golden roar, we discovered the essence of eternity. By KAR is not just a scent; it is a memory etched in time, a whisper of the void, a revolution of passion. We craft liquid emotions for those who dare to feel deeply.";
    const words = storyText.split(" ");

    return (
        <section ref={sectionRef} className="py-32 relative overflow-hidden bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Visual Side */}
                    <div className="relative group">
                        <div className="absolute top-10 left-10 w-full h-full border border-white/10 rounded-2xl -z-10 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-500" />
                        <div className="absolute -top-4 -left-4 w-24 h-24 border-t border-l border-[#D4AF37]/30 rounded-tl-2xl pointer-events-none" />
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b border-r border-[#D4AF37]/30 rounded-br-2xl pointer-events-none" />

                        <div className="relative overflow-hidden rounded-2xl grayscale transition-all duration-1000">
                            <img
                                src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=1000&auto=format&fit=crop"
                                alt="Our Origin"
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                        </div>
                    </div>

                    {/* Text Side */}
                    <div ref={textRef} className="space-y-8">
                        <Quote className="w-12 h-12 text-[#D4AF37]/20 rotate-180 mb-4" />

                        <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                            FORGING <br />
                            <span className="text-[#D4AF37]">THE UNSEEN</span>
                        </h2>

                        <p className="text-lg lg:text-xl text-zinc-400 leading-relaxed font-light">
                            {words.map((word, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                                    animate={isTextInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                                    transition={{ duration: 0.6, delay: i * 0.02 + 0.2 }}
                                    className="inline-block mr-[0.3em]"
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </p>

                        <motion.div
                            style={{ y }}
                            className="pt-8"
                        >
                            <div className="flex items-center gap-4">
                                <div className="h-px flex-1 bg-white/10" />
                                <span className="text-xs font-bold tracking-[0.3em] text-[#D4AF37] uppercase">Est. 2024</span>
                                <div className="h-px flex-1 bg-white/10" />
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default BrandStory;

