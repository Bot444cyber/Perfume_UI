"use client";

import React from 'react';
import Header from '@/components/Header';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter } from 'lucide-react';

const ContactPage = () => {
    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-teal-500/30 font-sans">
            <Header />

            <div className="min-h-screen flex flex-col justify-center items-center py-32 px-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4 text-white">
                        Contact Us
                    </h1>
                    <p className="text-zinc-400 text-lg">
                        We are here to help. Reach out to us directly.
                    </p>
                </motion.div>

                {/* Simple Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">

                    {/* Email */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-zinc-900/50 border border-white/10 p-8 rounded-2xl text-center hover:bg-zinc-900 transition-colors"
                    >
                        <div className="mx-auto w-12 h-12 bg-teal-500/10 rounded-full flex items-center justify-center mb-6 text-teal-400">
                            <Mail className="w-6 h-6" />
                        </div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-2">Email</h3>
                        <a href="mailto:info@karfragrance.com" className="text-xl font-medium text-white hover:text-teal-400 transition-colors">
                            info@karfragrance.com
                        </a>
                    </motion.div>

                    {/* Phone */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-zinc-900/50 border border-white/10 p-8 rounded-2xl text-center hover:bg-zinc-900 transition-colors"
                    >
                        <div className="mx-auto w-12 h-12 bg-teal-500/10 rounded-full flex items-center justify-center mb-6 text-teal-400">
                            <Phone className="w-6 h-6" />
                        </div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-2">Phone</h3>
                        <a href="tel:+15550000000" className="text-xl font-medium text-white hover:text-teal-400 transition-colors">
                            +1 (555) 000-0000
                        </a>
                    </motion.div>

                    {/* Address */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-zinc-900/50 border border-white/10 p-8 rounded-2xl text-center hover:bg-zinc-900 transition-colors"
                    >
                        <div className="mx-auto w-12 h-12 bg-teal-500/10 rounded-full flex items-center justify-center mb-6 text-teal-400">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-2">Address</h3>
                        <p className="text-lg font-medium text-white">
                            Los Santos, CA
                        </p>
                    </motion.div>
                </div>

                {/* Socials */}
                <div className="mt-20 flex gap-6">
                    {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                        <a key={i} href="#" className="text-zinc-500 hover:text-white transition-colors">
                            <Icon className="w-6 h-6" />
                        </a>
                    ))}
                </div>

            </div>
        </main>
    );
};

export default ContactPage;
