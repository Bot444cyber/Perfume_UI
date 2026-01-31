"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { Star, Truck, ShieldCheck, Heart, Share2, MessageSquare, ArrowLeft, Phone, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Link from 'next/link';

import { products } from '@/data/products';
import { contactData } from '@/data/contact';

const ProductDetail = () => {
    const params = useParams();
    const router = useRouter();

    const [reviews, setReviews] = useState<{ user: string; rating: number; date: string; text: string }[]>([]);
    const [newReview, setNewReview] = useState({ rating: 5, text: '' });

    const handleAddReview = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newReview.text) return;

        const userName = "Verified Customer";

        const review = {
            user: userName,
            rating: newReview.rating,
            date: "Just now",
            text: newReview.text
        };

        setReviews([review, ...reviews]);
        setNewReview({ rating: 5, text: '' });
    };

    // Find product by ID or default to first for safety
    const product = products.find(p => p.id === Number(params.id)) || products[0];

    if (!product) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Product Not Found</div>;

    return (
        <main className="min-h-screen bg-black text-white selection:bg-[#D4AF37]/30 font-sans">
            <Header />

            <div className="flex flex-col lg:flex-row min-h-screen">
                {/* Left: Immersive Hero Image */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="relative w-full lg:w-1/2 h-[60vh] lg:h-screen lg:sticky lg:top-0 overflow-hidden bg-[#0A0A0A]"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black lg:to-transparent z-10 opacity-60" />
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center scale-110 motion-safe:animate-slow-pan opacity-80"
                    />

                    {/* Floating Brand Badge */}
                    <div className="absolute top-24 left-8 lg:top-32 lg:left-12 z-20">
                        <span className="inline-block px-4 py-2 border border-white/10 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">
                            {product.collection}
                        </span>
                    </div>
                </motion.div>

                {/* Right: Scrollable Content */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 lg:px-24 py-16 lg:py-32 relative z-20 bg-black">

                    {/* Back Link */}
                    <Link href="/collections" className="inline-flex items-center gap-2 text-zinc-500 hover:text-[#D4AF37] transition-colors uppercase text-[10px] font-bold tracking-[0.2em] mb-12">
                        <ArrowLeft className="w-3 h-3" /> Back
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Title */}
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter mb-8 leading-[0.85] text-white mix-blend-difference">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-6 mb-12 border-b border-white/5 pb-8">
                            <div className="flex items-center gap-2 text-[#D4AF37]">
                                <Star className="w-4 h-4 fill-current" />
                                <span className="font-mono text-sm pt-0.5">{product.rating} / 5.0</span>
                            </div>
                            <span className="w-px h-4 bg-white/10" />
                            <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
                                {product.reviews} Reviews
                            </span>
                        </div>

                        {/* Description */}
                        <p className="text-xl md:text-2xl font-serif text-zinc-300 leading-relaxed mb-16 max-w-xl">
                            {product.description}
                        </p>

                        {/* Olfactory Notes Simplified */}
                        <div className="mb-20 space-y-8">
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-6">Olfactory Composition</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    { title: "Top", note: product.notes.top },
                                    { title: "Heart", note: product.notes.heart },
                                    { title: "Base", note: product.notes.base }
                                ].map((item) => (
                                    <div key={item.title} className="flex flex-col gap-2">
                                        <span className="text-[10px] text-[#D4AF37]/80 uppercase tracking-widest font-bold">{item.title}</span>
                                        <span className="font-serif text-lg text-white border-l border-white/10 pl-4">{item.note}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Price & Contact */}
                        <div className="flex flex-col gap-6 mb-24">
                            <span className="text-4xl font-light tracking-tight text-white mb-4">
                                Rs. {product.price}
                            </span>

                            <div className="flex flex-col md:flex-row gap-4">
                                <motion.a
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    href={`${contactData.find(c => c.title === 'Email')?.href}?subject=Inquiry about ${product.name}`}
                                    className="group flex-1 h-12 md:h-14 bg-white text-black flex items-center justify-center gap-3 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs rounded-full shadow-lg shadow-white/5 hover:bg-[#D4AF37] hover:shadow-[#D4AF37]/20 transition-all duration-500"
                                >
                                    <span>Contact Concierge</span>
                                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </motion.a>
                                <motion.a
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    href={contactData.find(c => c.title === 'Phone')?.href || '#'}
                                    className="md:w-auto h-12 md:h-14 px-8 border border-white/10 flex items-center justify-center gap-3 text-white hover:bg-white/5 transition-colors group rounded-full"
                                >
                                    <Phone className="w-4 h-4 text-zinc-500 group-hover:text-[#D4AF37] transition-colors" />
                                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">{contactData.find(c => c.title === 'Phone')?.value}</span>
                                </motion.a>
                            </div>
                            <p className="text-[10px] text-zinc-600 uppercase tracking-widest text-center md:text-left mt-2">
                                Available for private purchase only.
                            </p>
                        </div>

                        {/* Reviews (Simplified) */}


                    </motion.div>
                </div>
            </div>
        </main>
    );
};

export default ProductDetail;
