"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Play, Shield, Zap, Target } from "lucide-react";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Cinematic Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-blue/10 rounded-full blur-[120px] opacity-50" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-purple/5 rounded-full blur-[100px] opacity-30 animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-cyan/5 rounded-full blur-[100px] opacity-30 animate-pulse-slow" />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] opacity-40" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
            Next-Generation Media Intelligence
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[0.95]"
        >
          Powering Future <br />
          <span className="text-gradient">Growth Systems.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          We build the industrial-grade media infrastructure that powers world-class brands. 
          Intelligence, execution, and strategic power—delivered with precision.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-sm hover:bg-brand-blue hover:text-white transition-all flex items-center justify-center gap-2 group">
            Initialize Systems
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-transparent text-white border border-white/10 font-bold rounded-sm hover:bg-white/5 transition-all flex items-center justify-center gap-2 group">
            <Play className="w-4 h-4 fill-white" />
            Watch Vision
          </button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-24 pt-12 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {[
            { icon: Shield, label: "Institutional Grade" },
            { icon: Zap, label: "Hyper-Execution" },
            { icon: Target, label: "Precision Strategy" },
            { icon: "AI", label: "Autonomous Growth" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-3 opacity-40 hover:opacity-100 transition-opacity cursor-default">
              {typeof item.icon === 'string' ? (
                <span className="text-xl font-black italic">{item.icon}</span>
              ) : (
                <item.icon className="w-5 h-5" />
              )}
              <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Industrial Visual Element (Sidebars) */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 opacity-20">
        <div className="w-1 h-20 bg-white/50" />
        <div className="w-1 h-8 bg-white/20" />
        <div className="w-1 h-4 bg-white/10" />
      </div>
      <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 opacity-20 items-end">
        <div className="w-1 h-20 bg-white/50" />
        <div className="w-1 h-8 bg-white/20" />
        <div className="w-1 h-4 bg-white/10" />
      </div>
    </section>
  );
}
