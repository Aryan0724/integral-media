"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Tag } from "lucide-react";

const articles = [
  {
    category: "AI & Systems",
    title: "Autonomous Content Infrastructure: The 2026 Blueprint",
    desc: "How neural networks are reshaping the industrial media landscape.",
    date: "May 12, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop"
  },
  {
    category: "Growth Strategy",
    title: "The Death of Generic Performance Marketing",
    desc: "Why precision intelligence is the only moat left for digital brands.",
    date: "May 08, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=1000&auto=format&fit=crop"
  },
  {
    category: "YouTube Systems",
    title: "Algorithmic Dominance: Engineering 10M Views",
    desc: "A data-driven breakdown of high-retention cinematic systems.",
    date: "May 04, 2026",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop"
  }
];

export function Insights() {
  return (
    <section id="blog" className="py-32 bg-black/30">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-24">
          <div>
            <div className="text-brand-yellow font-bold tracking-[0.4em] uppercase text-[10px] mb-6">Intelligence Hub</div>
            <h2 className="text-4xl md:text-5xl font-bold">Insights & Research.</h2>
          </div>
          <button className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-brand-orange transition-colors group">
            All Intelligence
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {articles.map((article, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-sm mb-8 border border-white/5 group-hover:border-brand-orange/30 transition-all">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
                  <Tag className="w-3 h-3 text-brand-orange" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white">{article.category}</span>
                </div>
              </div>
              
              <h4 className="text-xl font-bold mb-4 group-hover:text-brand-orange transition-colors leading-tight">
                {article.title}
              </h4>
              <p className="text-white/40 text-sm mb-6 line-clamp-2">{article.desc}</p>
              
              <div className="flex items-center gap-6 pt-6 border-t border-white/5 text-[10px] uppercase tracking-widest font-bold text-white/30">
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-brand-yellow" />
                  {article.readTime}
                </div>
                <span>{article.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
