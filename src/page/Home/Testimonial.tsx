"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Alexander Vance",
    role: "Creative Director, NYC",
    text: "By KAR is a revelation. It manages to capture a specific type of atmospheric darkness that I've never encountered in perfumery before. Truly a masterclass in complexity.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Elena Rossi",
    role: "Fashion Consultant",
    text: "The longevity of the Extrait is unmatched. I wore it to an evening gala and could still catch notes of the warm amber the following morning. It's my new signature.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Marcus Thorne",
    role: "Scent Collector",
    text: "As a collector of rare niche fragrances, By KAR stands out as one of the most unique compositions of the decade. The transition from smoky obsidian to emerald flame is seamless.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="text-center mb-20 space-y-4">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-teal-400 font-bold tracking-[0.4em] uppercase text-[10px]"
          >
            The Collection Experience
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-black text-white leading-tight"
          >
            VOICES OF THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-emerald-400 to-teal-700 uppercase">ELITE</span>
          </motion.h2>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-transparent mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              className="group relative"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: idx * 2
                }}
                className="h-full"
              >
                <div className="glass p-8 lg:p-10 rounded-[2.5rem] h-full flex flex-col justify-between border-white/5 group-hover:border-teal-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(20,184,166,0.1)] backdrop-blur-2xl">
                  <div className="absolute top-8 right-8 text-teal-500/20 group-hover:text-teal-500/40 transition-colors">
                    <Quote size={40} fill="currentColor" />
                  </div>

                  <div className="space-y-6">
                    <div className="flex gap-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-teal-400 fill-current" />
                      ))}
                    </div>

                    <p className="text-zinc-400 text-lg leading-relaxed font-light italic group-hover:text-zinc-300 transition-colors">
                      "{item.text}"
                    </p>
                  </div>

                  <div className="mt-10 flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-teal-500/50 transition-colors">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white font-bold tracking-tight text-lg">{item.name}</span>
                      <span className="text-zinc-500 text-xs font-medium uppercase tracking-widest group-hover:text-teal-400 transition-colors">{item.role}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Decorative accent */}
              <div className="absolute -z-10 bottom-0 right-0 w-24 h-24 bg-teal-500/5 blur-[50px] rounded-full group-hover:bg-teal-500/20 transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Bottom Social Proof Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-20 py-8 border-y border-white/5 flex flex-wrap justify-center items-center gap-12 lg:gap-24 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
        >
          <span className="text-white font-black tracking-widest text-xl italic uppercase">VOGUE</span>
          <span className="text-white font-black tracking-widest text-xl uppercase">ELLE</span>
          <span className="text-white font-black tracking-widest text-xl uppercase">GQ</span>
          <span className="text-white font-black tracking-widest text-xl uppercase">BAZAAR</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
