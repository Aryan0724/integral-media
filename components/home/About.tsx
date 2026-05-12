"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Database, BarChart3, Globe, Zap } from "lucide-react";

const pillars = [
  {
    icon: Database,
    title: "Media as Infrastructure",
    desc: "We treat media not as a marketing expense, but as core industrial infrastructure for modern business growth.",
    color: "text-brand-red"
  },
  {
    icon: Zap,
    title: "Growth Systems",
    desc: "Engineered pipelines designed to capture, nurture, and scale attention with mathematical precision.",
    color: "text-brand-orange"
  },
  {
    icon: Cpu,
    title: "AI-Powered Execution",
    desc: "Leveraging state-of-the-art neural networks to automate content intelligence and distribution at scale.",
    color: "text-brand-yellow"
  },
  {
    icon: BarChart3,
    title: "Storytelling + Analytics",
    desc: "The fusion of cinematic narrative power with deep-data behavioral analytics.",
    color: "text-white"
  },
  {
    icon: Globe,
    title: "Future Innovation",
    desc: "Building the decentralized media systems of the next decade, today.",
    color: "text-brand-purple"
  }
];

export function About() {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-brand-orange font-bold tracking-[0.3em] uppercase text-xs mb-6"
            >
              The Philosophy
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-8 leading-tight"
            >
              Intelligence Beyond <br />
              Standard Marketing.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white/50 text-lg leading-relaxed mb-12"
            >
              Integral Media is the growth systems division of Integral Group. 
              We don&apos;t just &quot;create content&quot;&mdash;we architect intelligence systems 
              that allow brands to operate with the strategic power of a modern superpower.
            </motion.p>
            
            <div className="space-y-8">
              {pillars.slice(0, 3).map((pillar, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-brand-orange transition-colors">
                    <pillar.icon className={`w-5 h-5 ${pillar.color}`} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">{pillar.title}</h4>
                    <p className="text-white/40 text-sm">{pillar.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            {/* Visual Representation of Intelligence */}
            <div className="aspect-square glass-dark rounded-sm border border-white/10 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/20 to-transparent opacity-50" />
              
              {/* Animated HUD Elements */}
              <div className="absolute top-10 left-10 w-32 h-32 border-l border-t border-brand-red/20" />
              <div className="absolute bottom-10 right-10 w-32 h-32 border-r border-b border-brand-yellow/20" />
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="text-8xl font-black italic opacity-10 text-brand-orange"
                >
                  INTEGRAL
                </motion.div>
              </div>

              {/* Data Visualization Mockup */}
              <div className="absolute inset-20 flex items-end gap-2">
                {[40, 70, 45, 90, 65, 80, 50, 85].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    transition={{ delay: i * 0.1, duration: 1 }}
                    className="flex-1 bg-white/10 group-hover:bg-brand-orange/40 transition-colors"
                  />
                ))}
              </div>
            </div>
            
            {/* Floating Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="absolute -bottom-10 -left-10 glass p-6 rounded-sm border border-white/10 max-w-[200px]"
            >
              <div className="text-3xl font-black mb-1 text-brand-yellow">99.9%</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">Execution Precision</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
