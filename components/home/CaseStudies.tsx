"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Users, Target, ArrowRight, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const projects = [
  {
    title: "Project Obsidian",
    client: "Global Tech Entity",
    visual: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
    metrics: "420% Growth in 6 Months",
    strategy: "Implemented a decentralized content distribution node system paired with AI-driven narrative optimization.",
    outcomes: [
      "12M+ Organic reach",
      "$2.4M Attribution value",
      "Top 0.1% Industry authority"
    ]
  },
  {
    title: "Project Alpha",
    client: "AI Research Lab",
    visual: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000&auto=format&fit=crop",
    metrics: "10x Institutional Trust",
    strategy: "Cinematic repositioning and high-fidelity thought leadership systems for venture-backed entities.",
    outcomes: [
      "Series B Oversubscribed",
      "Global Tier-1 Press control",
      "140% Lead quality lift"
    ]
  },
  {
    title: "Project Citadel",
    client: "Fintech Growth Hub",
    visual: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
    metrics: "0 to 1M Community Nodes",
    strategy: "Architected a self-sustaining YouTube ecosystem powered by algorithmic precision and performance content.",
    outcomes: [
      "1M+ Active subscribers",
      "Zero-cost acquisition fly-wheel",
      "Industry-defining case study"
    ]
  }
];

export function CaseStudies() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section id="case-studies" className="py-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <div className="text-brand-purple font-bold tracking-[0.4em] uppercase text-[10px] mb-6">Execution Proof</div>
            <h2 className="text-4xl md:text-5xl font-bold">Case Studies.</h2>
          </div>
          <p className="text-white/40 text-sm max-w-xs mb-2">
            Tangible results delivered through unconventional intelligence and precision systems.
          </p>
        </div>

        <div className="space-y-6">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "glass-dark border rounded-sm overflow-hidden transition-all duration-700",
                expanded === i ? "border-brand-blue/40" : "border-white/5 hover:border-white/20"
              )}
            >
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="w-full p-8 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-8">
                  <span className="text-sm font-bold text-white/20 font-mono">0{i + 1}</span>
                  <div>
                    <h4 className="text-2xl font-bold mb-1">{project.title}</h4>
                    <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">{project.client}</span>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-12">
                  <div className="text-right">
                    <div className="text-xs uppercase tracking-widest text-white/30 mb-1">Impact</div>
                    <div className="text-sm font-bold">{project.metrics}</div>
                  </div>
                  {expanded === i ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
              </button>

              <AnimatePresence>
                {expanded === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <div className="px-8 pb-12 pt-4 border-t border-white/5">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <div className="aspect-video rounded-sm overflow-hidden relative group">
                          <img 
                            src={project.visual} 
                            alt={project.title}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                          />
                          <div className="absolute inset-0 bg-brand-blue/20 mix-blend-overlay opacity-50" />
                        </div>
                        
                        <div className="space-y-8">
                          <div>
                            <h5 className="text-[10px] uppercase tracking-widest text-brand-blue font-bold mb-4">Core Strategy</h5>
                            <p className="text-white/60 leading-relaxed">{project.strategy}</p>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div>
                              <h5 className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-4">Key Outcomes</h5>
                              <ul className="space-y-3">
                                {project.outcomes.map((outcome, idx) => (
                                  <li key={idx} className="text-sm flex items-center gap-2">
                                    <div className="w-1 h-1 bg-brand-cyan rounded-full" />
                                    {outcome}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="flex flex-col justify-end items-end lg:items-start">
                              <button className="px-6 py-3 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-sm flex items-center gap-2 hover:bg-brand-blue hover:text-white transition-all">
                                View Full Intelligence Report
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
