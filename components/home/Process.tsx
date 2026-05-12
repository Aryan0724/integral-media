"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Compass, Layers, Zap, Activity, Maximize } from "lucide-react";

const steps = [
  { icon: Search, title: "Research", desc: "Deep-data analysis of market dynamics." },
  { icon: Compass, title: "Strategy", desc: "Architecting the growth blueprint." },
  { icon: Layers, title: "Systems", desc: "Building the industrial infrastructure." },
  { icon: Zap, title: "Execution", desc: "Precision deployment of assets." },
  { icon: Activity, title: "Optimization", desc: "Real-time performance tuning." },
  { icon: Maximize, title: "Scale", desc: "Exponential expansion of reach." }
];

export function Process() {
  return (
    <section id="process" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-brand-orange font-bold tracking-[0.4em] uppercase text-[10px] mb-4"
            >
              Operational Workflow
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold"
            >
              The Execution Engine.
            </motion.h2>
          </div>
          <p className="text-white/40 text-sm max-w-xs mb-2">
            Our modular process ensures consistent, world-class results through mathematical precision and high-fidelity execution.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 hidden lg:block -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative z-10"
              >
                <div className="group text-center">
                  <div className="w-16 h-16 rounded-full bg-surface-800 border border-white/10 flex items-center justify-center mx-auto mb-6 group-hover:border-brand-orange group-hover:bg-brand-orange/10 transition-all duration-500 relative shadow-[0_0_20px_rgba(255,136,0,0)] group-hover:shadow-[0_0_20px_rgba(255,136,0,0.2)]">
                    <step.icon className="w-6 h-6 text-white group-hover:text-brand-orange transition-colors" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-orange text-black text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-black">
                      0{i + 1}
                    </div>
                  </div>
                  <h4 className="text-lg font-bold mb-3">{step.title}</h4>
                  <p className="text-white/40 text-xs leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
