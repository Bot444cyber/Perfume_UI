"use client";

import React from 'react';
import Header from '@/components/Header';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Twitter } from 'lucide-react';
import { contactData } from '@/data/contact';

const ContactPage = () => {
    const [selectedPhone, setSelectedPhone] = React.useState<string | null>(null);

    const handleContactClick = (e: React.MouseEvent, item: any) => {
        if (item.type === 'phone' && item.value) {
            e.preventDefault();
            setSelectedPhone(item.value);
        }
    };

    const handleWhatsApp = () => {
        if (!selectedPhone) return;
        const number = selectedPhone.replace(/\D/g, ''); // Remove non-numeric chars
        window.open(`https://wa.me/${number}`, '_blank');
        setSelectedPhone(null);
    };

    const handlePhone = () => {
        if (!selectedPhone) return;
        window.location.href = `tel:${selectedPhone}`;
        setSelectedPhone(null);
    };

    return (
        <main className="min-h-screen bg-black text-white selection:bg-[#D4AF37]/30 font-sans relative">
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
                    {contactData.map((item: any, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 * (idx + 1) }}
                            className="bg-[#080808] border border-white/10 p-8 rounded-2xl text-center hover:border-[#D4AF37]/30 transition-colors group relative overflow-hidden"
                        >
                            <div className="mx-auto w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-6 text-[#D4AF37] group-hover:scale-110 transition-transform duration-500">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-2">{item.title}</h3>
                            {item.href ? (
                                <a
                                    href={item.href}
                                    onClick={(e) => handleContactClick(e, item)}
                                    className="text-xl font-medium text-white hover:text-[#D4AF37] transition-colors cursor-pointer"
                                >
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

            {/* Modal */}
            {selectedPhone && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-[#080808] border border-white/10 p-8 rounded-3xl max-w-sm w-full shadow-2xl relative"
                    >
                        <button
                            onClick={() => setSelectedPhone(null)}
                            className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
                        >
                            ✕
                        </button>

                        <h3 className="text-xl font-black text-white mb-2 uppercase tracking-wide">Contact Method</h3>
                        <p className="text-zinc-400 text-sm mb-8">How would you like to connect with us?</p>

                        <div className="space-y-3">
                            <button
                                onClick={handleWhatsApp}
                                className="w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-all group"
                            >
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.357-5.198c0-5.444 4.429-9.876 9.872-9.876 2.636 0 5.115 1.026 6.983 2.89s2.895 4.348 2.895 7.042-4.434 9.873-9.876 9.873m0-19.746c-5.443 0-9.872 4.429-9.872 9.876 0 1.743.454 3.461 1.317 4.96L2 22l6.19-1.624a9.86 9.86 0 014.862 1.28c5.441 0 9.872-4.429 9.872-9.876 0-5.447-4.431-9.876-9.872-9.876" /></svg>
                                WhatsApp
                            </button>
                            <button
                                onClick={handlePhone}
                                className="w-full py-4 bg-[#0a84ff] hover:bg-[#0070e0] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone w-5 h-5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                Phone Call
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </main>
    );
};

export default ContactPage;
