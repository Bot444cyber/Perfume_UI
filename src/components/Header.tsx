"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, Globe } from 'lucide-react';

import MagneticButton from './MagneticButton';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '/home' },
    { name: 'Collections', href: '/collections' },
    { name: 'Our Story', href: '/story' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[900] px-6 md:px-12 pointer-events-none">
      {/* Background Layer - Absolute & Interactive */}
      <div className={`absolute inset-0 -z-10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-auto ${isScrolled
        ? 'bg-black/60 backdrop-blur-2xl border-b border-white/5 shadow-lg shadow-black/20'
        : 'bg-transparent'
        }`} />

      {/* Content Layer - Interactive */}
      <div className={`max-w-screen-2xl mx-auto flex items-center justify-between relative z-[920] pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled ? 'py-4' : 'py-8'
        }`}>

        {/* Brand/Logo */}
        <Link href="/">
          <div className="flex items-center gap-4 group cursor-pointer relative z-[920]">
            <div className="w-16 h-16 rounded-full overflow-hidden group-hover:rotate-[5deg] transition-transform duration-500">
              <img src="/image/logo.jpeg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase italic text-white group-hover:text-[#D4AF37] transition-colors duration-500">K.A.R</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[11px] font-black text-zinc-400 hover:text-white transition-all duration-500 tracking-[0.2em] uppercase relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 lg:gap-8 z-[920]">
          <button className="hidden sm:flex items-center gap-2 text-[10px] font-black text-zinc-400 hover:text-white transition-colors tracking-widest uppercase">
            <Globe className="w-3.5 h-3.5" />
            <span>EN</span>
            <ChevronDown className="w-3 h-3" />
          </button>

          <Link href="/contact" className="hidden md:block">
            <MagneticButton primary>
              Contact Now
            </MagneticButton>
          </Link>

          <button
            className="lg:hidden p-2 text-zinc-300 hover:text-[#D4AF37] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#050505] z-[910] flex flex-col items-center justify-center lg:hidden pointer-events-auto"
          >
            <div className="absolute top-1/4 left-1/4 w-full h-full bg-[#D4AF37]/10 blur-[200px] rounded-full -z-10" />

            <div className="flex flex-col items-center gap-10 text-center">
              {navLinks.map((link, i) => (
                <Link
                  key={link.name}
                  href={link.href}
                  passHref
                  legacyBehavior
                >
                  <motion.a
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    className="text-5xl font-black tracking-tighter text-white hover:text-[#D4AF37] transition-colors block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </motion.a>
                </Link>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="w-12 h-px bg-white/20 my-4"
              />
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-2 text-zinc-400 text-lg font-bold uppercase tracking-widest"
              >
                <span>English</span>
                <ChevronDown className="w-4 h-4" />
              </motion.button>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <MagneticButton primary className="mt-8 scale-125">
                    Contact Now
                  </MagneticButton>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;
