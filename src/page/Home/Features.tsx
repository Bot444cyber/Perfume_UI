"use client"

import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Droplet, Leaf, ShieldCheck, Sparkles } from 'lucide-react';

const features = [
    {
        icon: <Droplet className="w-6 h-6" />,
        title: "Pure Extract",
        description: "Highly concentrated Extrait de Parfum lasting 24+ hours on skin."
    },
    {
        icon: <Leaf className="w-6 h-6" />,
        title: "Eco-Conscious",
        description: "Sustainably sourced rare ingredients from across the globe."
    },
    {
        icon: <ShieldCheck className="w-6 h-6" />,
        title: "Hypoallergenic",
        description: "Dermatologically tested for the most sensitive of wearers."
    },
    {
        icon: <Sparkles className="w-6 h-6" />,
        title: "Signature Scent",
        description: "Hand-blended in small batches for absolute exclusivity."
    }
];

const FeatureCard = ({ feature, index }: { feature: any, index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
            onMouseMove={handleMouseMove}
            className="group relative glass p-8 rounded-[2.5rem] border border-white/5 bg-white/2 backdrop-blur-xl overflow-hidden"
        >
            {/* Spotlight Gradient - Gold */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                          650px circle at ${mouseX}px ${mouseY}px,
                          rgba(212, 175, 55, 0.15),
                          transparent 80%
                        )
                      `,
                }}
            />
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                          300px circle at ${mouseX}px ${mouseY}px,
                          rgba(212, 175, 55, 0.1),
                          transparent 80%
                        )
                      `,
                    border: '1px solid rgba(212, 175, 55, 0.2)'
                }}
            />


            <div className="relative z-10">
                <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center text-[#D4AF37] mb-6 group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-500 shadow-lg shadow-[#D4AF37]/5 group-hover:shadow-[#D4AF37]/50">
                    {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-[#D4AF37] transition-colors">{feature.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-400 transition-colors font-light">
                    {feature.description}
                </p>
            </div>
        </motion.div>
    );
};

const Features: React.FC = () => {
    return (
        <section className="py-24 relative overflow-hidden bg-black">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#D4AF37]/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-zinc-500/5 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <FeatureCard key={idx} feature={feature} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;

