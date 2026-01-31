"use client"


import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Facebook, ChevronUp } from 'lucide-react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const footerLinks = [
    {
      title: "Explore",
      links: [
        { name: "Home", href: "/" },
        { name: "The Collection", href: "/collections" },
        { name: "Brand Story", href: "/story" }
      ]
    },
    {
      title: "Connect",
      links: [
        { name: "Contact Studio", href: "/contact" },
        { name: "Instagram", href: "#" },
        { name: "Twitter", href: "#" }
      ]
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black pt-32 pb-12 border-t border-white/5 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-12 lg:gap-x-16 mb-24">

          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="group inline-flex cursor-pointer items-center gap-4" onClick={scrollToTop}>
                <div className="w-24 h-24 rounded-full overflow-hidden transition-transform duration-500">
                  <img src="/image/logo.jpeg" alt="Logo" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="text-5xl font-black text-white tracking-tighter mb-1 transition-transform duration-500 group-hover:-translate-y-1">K.A.R</h2>
                  <div className="h-1 w-full bg-[#D4AF37] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
              </div>
              <p className="text-zinc-500 text-sm md:text-base max-w-sm leading-relaxed font-medium">
                Designing the future of olfactory art. A sanctuary for those who seek the sublime in the shadows of the sensory world.
              </p>
            </motion.div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row gap-16 lg:gap-24 lg:justify-end">
            {footerLinks.map((column, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="space-y-8 min-w-[140px]"
              >
                <div className="space-y-3">
                  <h3 className="text-white font-black uppercase tracking-[0.4em] text-[10px] opacity-50">{column.title}</h3>
                  <div className="w-8 h-[1px] bg-[#D4AF37]/30" />
                </div>
                <ul className="space-y-4">
                  {column.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        href={link.href}
                        className="text-zinc-400 hover:text-white transition-all text-sm group flex items-center gap-2 w-max font-medium tracking-wide"
                      >
                        <span className="relative overflow-hidden">
                          <span className="inline-block group-hover:-translate-y-full transition-transform duration-300">
                            {link.name}
                          </span>
                          <span className="absolute left-0 top-full inline-block group-hover:-translate-y-full transition-transform duration-300 text-[#D4AF37] italic">
                            {link.name}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-12 mt-12 flex flex-col lg:flex-row justify-between items-center gap-10 text-[10px] text-zinc-600 uppercase tracking-[0.3em] font-black">
          <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            <p>&copy; 2024 KAR Parfums Atelier.</p>
            <span className="hidden md:block w-1 h-1 rounded-full bg-zinc-800" />
            <p className="text-zinc-700">All rights reserved.</p>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <span className="opacity-50">Studio:</span>
              <span className="text-white border-b border-[#D4AF37]/40 pb-0.5">Paris / Grasse</span>
            </div>
            {/* Optimized Brand Seal */}
            <motion.div
              initial={{ opacity: 0, rotate: -10 }}
              whileInView={{ opacity: 0.3, rotate: 0 }}
              viewport={{ once: true }}
              className="hidden sm:block w-12 h-12 grayscale select-none"
            >
              <img
                src="https://img.icons8.com/ios/100/ffffff/guarantee--v1.png"
                alt="Atelier Seal"
                loading="lazy"
                className="w-full h-full object-contain"
              />
            </motion.div>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -3 }}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all"
            >
              <ChevronUp size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer >
  );
};

export default Footer;
