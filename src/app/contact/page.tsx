"use client";

import React from 'react';
import Header from '@/components/Header';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Twitter } from 'lucide-react';
import { contactData } from '@/data/contact';

const ContactPage = () => {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-[#D4AF37]/30 font-sans">
            <Header />

            <div className="min-h-screen flex flex-col justify-center items-center py-32 px-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4 text-white">
                        Contact Us
                    </h1>
                    <p className="text-zinc-400 text-lg font-serif italic">
                        We are here to help. Reach out to us directly.
                    </p>
                </motion.div>

                {/* Simple Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                    {contactData.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 * (idx + 1) }}
                            className="bg-[#080808] border border-white/10 p-8 rounded-2xl text-center hover:border-[#D4AF37]/30 transition-colors group"
                        >
                            <div className="mx-auto w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-6 text-[#D4AF37] group-hover:scale-110 transition-transform duration-500">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-2">{item.title}</h3>
                            {item.href ? (
                                <a href={item.href} className="text-xl font-medium text-white hover:text-[#D4AF37] transition-colors">
                                    {item.value}
                                </a>
                            ) : (
                                <p className="text-lg font-medium text-white">
                                    {item.value}
                                </p>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Socials */}
                <div className="mt-20 flex gap-6">
                    {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                        <a key={i} href="#" className="text-zinc-500 hover:text-[#D4AF37] transition-colors hover:scale-110 transform duration-300">
                            <Icon className="w-6 h-6" />
                        </a>
                    ))}
                </div>

            </div>
        </main>
    );
};

export default ContactPage;
