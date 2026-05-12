"use client";

import React from "react";
import { motion } from "framer-motion";
import { Share2, Rocket, Shield, Globe } from "lucide-react";

const visionPoints = [
  {
    icon: Share2,
    title: "Modular Ecosystem",
    desc: "A plug-and-play growth engine where media, SaaS, and infrastructure work in perfect synergy."
  },
  {
    icon: Rocket,
    title: "Execution-First",
    desc: "Philosophy focused on speed, precision, and tangible market dominance over generic strategy."
  },
  {
    icon: Globe,
    title: "Future Conglomerate",
    desc: "Building the foundations of a decentralized, technology-driven conglomerate for the 2030s."
  },
  {
    icon: Shield,
    title: "Institutional Power",
    desc: "Enabling brands to operate with the resource intelligence of a high-tier intelligence firm."
  }
];

export function Vision() {
  return (
    <section id="vision" className="py-32 bg-surface-900 border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {visionPoints.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 glass-dark border border-white/5 rounded-sm hover:border-brand-blue/30 transition-all group"
                >
                  <point.icon className="w-8 h-8 text-white/20 mb-6 group-hover:text-brand-blue transition-colors" />
                  <h4 className="text-xl font-bold mb-4">{point.title}</h4>
                  <p className="text-white/40 text-sm leading-relaxed">{point.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-brand-cyan font-bold tracking-[0.4em] uppercase text-[10px] mb-6">Long-Term Vision</div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                Building the Future <br />
                <span className="text-brand-blue">of Influence.</span>
              </h2>
              <p className="text-white/50 text-lg mb-10 leading-relaxed">
                Integral Media is more than a service provider. We are the architects of a 
                decentralized media empire. Our vision is to unify content, intelligence, 
                and technology into a singular ecosystem that powers the next generation 
                of global entities.
              </p>
              
              <div className="flex items-center gap-12 pt-8 border-t border-white/5">
                <div>
                  <div className="text-3xl font-black mb-1">2030</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Horizon Goal</div>
                </div>
                <div>
                  <div className="text-3xl font-black mb-1">100+</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/30 font-bold">System Nodes</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
