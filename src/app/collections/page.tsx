"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, Star, Heart, Eye, ArrowRight, Sparkles, Zap, Crown } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';

// --- Mock Data ---
import { products } from '@/data/products';

const filters = [
    { title: "Collection", options: ["BYKAR Series"] },
    { title: "Bottle ML", options: ["5ml", "30ml", "50ml", "100ml"] },
    { title: "Price Range", options: ["$100 - $300", "$300 - $500", "$500+"] },
];

const CollectionsPage = () => {
    const [activeSort, setActiveSort] = useState("Featured");
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

    const toggleFilter = (option: string) => {
        if (selectedFilters.includes(option)) {
            setSelectedFilters(prev => prev.filter(item => item !== option));
        } else {
            setSelectedFilters(prev => [...prev, option]);
        }
    };

    // --- Filter Logic ---
    const filteredProducts = products.filter(product => {
        if (selectedFilters.length === 0) return true;

        const priceFilters = selectedFilters.filter(f => f.includes("$"));
        const collectionFilters = selectedFilters.filter(f => f.includes("Series"));
        const bottleFilters = selectedFilters.filter(f => f.includes("ml"));

        // Collection Filter
        const matchesCollection = collectionFilters.length === 0 ||
            collectionFilters.includes("BYKAR Series") ||
            collectionFilters.includes(product.collection);

        // Price Filter
        const matchesPrice = priceFilters.length === 0 || priceFilters.some(f => {
            if (f === "$100 - $300") return product.price >= 100 && product.price <= 300;
            if (f === "$300 - $500") return product.price > 300 && product.price <= 500;
            if (f === "$500+") return product.price > 500;
            return false;
        });

        // Bottle Size (Mock Logic)
        const bottleSize = product.price > 300 ? "30ml" : "5ml"; // Simplified mock logic
        const matchesBottle = bottleFilters.length === 0 || bottleFilters.includes(bottleSize);

        return matchesCollection && matchesPrice && matchesBottle;
    });

    // --- Sort Logic ---
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (activeSort === "Price: Low to High") return a.price - b.price;
        if (activeSort === "Price: High to Low") return b.price - a.price;
        if (activeSort === "Rating") return b.rating - a.rating;
        return 0; // Featured
    });

    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-teal-500/30 font-sans relative overflow-x-hidden">
            <Header />

            {/* Ambient Backgrounds */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-teal-900/10 via-purple-900/5 to-transparent opacity-60" />
                <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[120px]" />
                <div className="absolute top-[40%] left-[-10%] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]" />
            </div>

            {/* Hero Section */}
            <div className="relative z-10 pt-40 pb-20 px-6 lg:px-12 border-b border-white/5">
                <div className="max-w-[1920px] mx-auto flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-3 border border-teal-500/30 rounded-full bg-teal-500/10 text-teal-400 text-xs font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-md">
                            Exclusive Collection
                        </span>
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter mb-6 bg-gradient-to-b from-white via-zinc-200 to-zinc-600 bg-clip-text text-transparent">
                            Olfactory <span className="text-stroke-white text-transparent">Art</span>
                        </h1>
                        <p className="text-zinc-400 font-serif text-xl max-w-2xl mx-auto leading-relaxed">
                            Discover scents that transcend the ordinary. Each bottle is a masterpiece, crafted for those who dare to define their own essence.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="relative z-10 max-w-[1920px] mx-auto px-6 lg:px-12 py-16 flex flex-col lg:flex-row gap-16">

                {/* Sidebar Filters */}
                <aside className="w-full lg:w-72 shrink-0 space-y-12 hidden lg:block sticky top-36 h-fit z-20">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl shadow-black/50">
                        <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white mb-8 border-b border-white/10 pb-4">
                            <Filter className="w-4 h-4 text-teal-400" /> Filters
                        </div>
                        {filters.map((group, idx) => (
                            <div key={idx} className="mb-8 last:mb-0">
                                <h3 className="font-bold text-xs uppercase tracking-widest text-zinc-500 mb-4">{group.title}</h3>
                                <div className="space-y-3">
                                    {group.options.map((option) => (
                                        <label key={option} className="flex items-center gap-3 cursor-pointer group relative pl-1">
                                            <div
                                                className={`w-5 h-5 rounded-md border transition-all duration-300 flex items-center justify-center ${selectedFilters.includes(option)
                                                    ? 'bg-gradient-to-br from-teal-500 to-emerald-600 border-transparent shadow-lg shadow-teal-500/20'
                                                    : 'bg-black/40 border-white/20 group-hover:border-teal-400/50'
                                                    }`}
                                                onClick={() => toggleFilter(option)}
                                            >
                                                {selectedFilters.includes(option) && <ArrowRight className="w-3 h-3 text-white" />}
                                            </div>
                                            <span className={`text-sm transition-all duration-300 ${selectedFilters.includes(option) ? 'text-white font-bold translate-x-1' : 'text-zinc-400 group-hover:text-zinc-200'
                                                }`}>
                                                {option}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="flex-1">
                    {/* Toolbar */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-10 pb-6 border-b border-white/5 gap-4">
                        <p className="text-zinc-400 font-mono text-sm">
                            Showing <span className="text-white font-bold">{sortedProducts.length}</span> Masterpieces
                        </p>

                        <div className="relative group z-30">
                            <button className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-6 py-3 hover:bg-white/10 transition-all">
                                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Sort By</span>
                                <span className="text-sm font-bold text-white group-hover:text-teal-400 transition-colors">{activeSort}</span>
                                <ChevronDown className="w-4 h-4 text-zinc-400 group-hover:rotate-180 transition-transform duration-300" />
                            </button>

                            {/* Dropdown Menu (Simplified for demo, could be expanding) */}
                            <div className="absolute right-0 top-full mt-2 w-48 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl transform translate-y-2 group-hover:translate-y-0">
                                {["Featured", "Price: Low to High", "Price: High to Low", "Rating"].map(sort => (
                                    <div
                                        key={sort}
                                        onClick={() => setActiveSort(sort)}
                                        className={`px-6 py-3 text-sm cursor-pointer hover:bg-white/5 transition-colors ${activeSort === sort ? 'text-teal-400 font-bold' : 'text-zinc-400'}`}
                                    >
                                        {sort}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
                        <AnimatePresence mode="popLayout">
                            {sortedProducts.map((product, i) => (
                                <motion.div
                                    key={product.id}
                                    className="group relative"
                                    onMouseEnter={() => setHoveredProduct(product.id)}
                                    onMouseLeave={() => setHoveredProduct(null)}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                >
                                    {/* Card Container */}
                                    <div className="relative bg-[#0f0f0f] rounded-2xl p-4 transition-all duration-500 hover:shadow-2xl hover:shadow-teal-900/10 border border-white/5 hover:border-teal-500/30 group-hover:-translate-y-2">

                                        {/* Image Area */}
                                        <div className="aspect-[3/4] overflow-hidden rounded-xl relative bg-[#151515] mb-6">
                                            {/* Badges */}
                                            <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
                                                {product.tags.map(tag => (
                                                    <div key={tag} className="flex items-center gap-1 bg-black/60 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10 shadow-lg">
                                                        {tag === "Award Winner" && <Crown className="w-3 h-3 text-amber-400" />}
                                                        {tag === "Trending" && <Zap className="w-3 h-3 text-teal-400" />}
                                                        {tag === "New" && <Sparkles className="w-3 h-3 text-purple-400" />}
                                                        {tag}
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Action Buttons Float */}
                                            <div className={`absolute right-3 top-3 z-20 flex flex-col gap-2 transition-all duration-300 ${hoveredProduct === product.id ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                                                <button className="w-10 h-10 bg-black/60 backdrop-blur-md rounded-full text-white flex items-center justify-center hover:bg-teal-500 transition-colors shadow-lg border border-white/10">
                                                    <Heart className="w-4 h-4" />
                                                </button>
                                                <Link href={`/collections/${product.id}`}>
                                                    <button className="w-10 h-10 bg-black/60 backdrop-blur-md rounded-full text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors shadow-lg border border-white/10">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                </Link>
                                            </div>

                                            {/* Main Image */}
                                            <Link href={`/collections/${product.id}`} className="block w-full h-full">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className={`w-full h-full object-cover transition-transform duration-700 ease-in-out ${hoveredProduct === product.id ? 'scale-110 saturate-100' : 'scale-100 saturate-[.85]'}`}
                                                />
                                            </Link>

                                            {/* Overlay Gradient */}
                                            <div className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none`} />

                                            {/* Quick Add Button */}
                                            <div className={`absolute bottom-4 left-4 right-4 z-30 transition-all duration-500 transform ${hoveredProduct === product.id ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                                <Link href={`/collections/${product.id}`}>
                                                    <button className="w-full bg-white text-black py-3 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-teal-400 transition-colors shadow-lg shadow-black/50">
                                                        View Product
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Product Info */}
                                        <div className="px-2 pb-2">
                                            <Link href={`/collections/${product.id}`}>
                                                <div className="mb-3">
                                                    <h3 className="text-xl font-bold uppercase tracking-wide text-white group-hover:text-teal-400 transition-colors duration-300">{product.name}</h3>
                                                </div>
                                            </Link>

                                            <div className="flex items-center justify-between border-t border-white/5 pt-4">
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-zinc-500 font-serif italic mb-1">Price</span>
                                                    <span className="text-lg font-bold text-white">${product.price}</span>
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <span className="text-xs text-zinc-500 font-serif italic mb-1">Rating</span>
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                                        <span className="font-bold text-sm text-zinc-200">{product.rating}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CollectionsPage;
