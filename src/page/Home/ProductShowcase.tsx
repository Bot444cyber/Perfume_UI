"use client"

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Star, ShoppingBag } from 'lucide-react';
import { products } from '@/data/products';



const TiltCard = ({ product, isBestSeller }: { product: any, isBestSeller: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;

    const xPct = mouseXFromCenter / width;
    const yPct = mouseYFromCenter / height;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      className="group relative preserve-3d perspective-1000"
    >
      <div
        style={{ transform: "translateZ(20px)" }}
        className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-zinc-900/50 border border-white/5 mb-8 group-hover:border-[#D4AF37]/30 transition-all duration-700 shadow-2xl"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 group-hover:opacity-100 mix-blend-overlay"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
        <div className="absolute inset-0 bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/10 transition-colors duration-700 mix-blend-overlay" />

        {/* Best Seller Badge */}
        {isBestSeller && (
          <div className="absolute top-6 right-6 z-20 flex items-center gap-1 bg-[#D4AF37] text-black px-3 py-1 rounded-full shadow-lg shadow-[#D4AF37]/20" style={{ transform: "translateZ(35px)" }}>
            <Star className="w-3 h-3 fill-black text-black" />
            <span className="text-[10px] font-black uppercase tracking-wider">Most Selling</span>
          </div>
        )}

        <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 group-hover:border-[#D4AF37]/30 transition-colors" style={{ transform: "translateZ(30px)" }}>
          <Star className="w-3 h-3 text-[#D4AF37] fill-current" />
          <span className="text-xs font-bold text-white tracking-widest">{product.rating}</span>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500" style={{ transform: "translateZ(40px)" }}>
          <Link href={`/collections/${product.id}`} className="w-full py-4 bg-white text-black font-black text-xs uppercase tracking-[0.2em] rounded-2xl opacity-100 md:opacity-0 md:group-hover:opacity-100 flex items-center justify-center gap-2 hover:bg-[#D4AF37] transition-all transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 duration-500 delay-100">
            <ShoppingBag className="w-4 h-4" /> View Collection
          </Link>
        </div>
      </div>

      <div className="space-y-3 px-2" style={{ transform: "translateZ(10px)" }}>
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] font-black tracking-[0.3em] text-[#D4AF37] uppercase block mb-1">{product.collection}</span>
            <h3 className="text-3xl font-black text-white tracking-tighter group-hover:text-zinc-300 transition-colors">{product.name}</h3>
          </div>
          <span className="text-2xl font-black text-white/50 group-hover:text-white transition-colors">Rs. {product.price}</span>
        </div>
      </div>
    </motion.div>
  );
};

const ProductShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'middle' | 'high'>('middle');

  // Determine top 3 best sellers based on review count
  const bestSellersIds = React.useMemo(() => {
    return [...products]
      .sort((a, b) => b.reviews - a.reviews)
      .slice(0, 3)
      .map(p => p.id);
  }, []);

  const displayedProducts = React.useMemo(() => {
    if (activeTab === 'middle') {
      return products.filter(p => p.price >= 500 && p.price <= 1000);
    } else {
      return products.filter(p => p.price > 1000);
    }
  }, [activeTab]);

  return (
    <section className="py-24 relative overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4 max-w-2xl">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[#D4AF37] font-bold tracking-[0.4em] uppercase text-xs pl-1"
            >
              Curated Selection
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-7xl font-black text-white leading-tight"
            >
              THE <span className="text-[#D4AF37]">COLLECTIONS</span>
            </motion.h2>
          </div>

          {/* Professional Tab Switcher */}
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-sm">
            <button
              onClick={() => setActiveTab('middle')}
              className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${activeTab === 'middle' ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20' : 'text-zinc-400 hover:text-white'}`}
            >
              Signature (₹500-1k)
            </button>
            <button
              onClick={() => setActiveTab('high')}
              className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${activeTab === 'high' ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20' : 'text-zinc-400 hover:text-white'}`}
            >
              Luxury Edition (₹1k+)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 min-h-[500px]">
          {displayedProducts.length > 0 ? (
            displayedProducts.slice(0, 3).map((product, idx) => (
              <TiltCard key={product.id} product={product} isBestSeller={bestSellersIds.includes(product.id)} />
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center h-64 border border-dashed border-white/10 rounded-3xl">
              <p className="text-zinc-500 font-mono text-sm">No masterpieces found in this range.</p>
            </div>
          )}
        </div>

        <div className="mt-16 flex justify-center">
          <Link href="/collections">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 text-white group font-bold tracking-[0.2em] text-sm uppercase hover:text-[#D4AF37] transition-all cursor-pointer border-b border-white/20 pb-1 hover:border-[#D4AF37]"
            >
              View Full Catalog <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform text-[#D4AF37]" />
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
