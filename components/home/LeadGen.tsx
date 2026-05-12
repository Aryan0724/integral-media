"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Mail, Send, ArrowRight } from "lucide-react";

export function LeadGen() {
  return (
    <section id="contact" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto glass-dark border border-white/10 rounded-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side: Info & CTA */}
            <div className="p-12 md:p-20 border-b lg:border-b-0 lg:border-r border-white/10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="text-brand-orange font-bold tracking-[0.4em] uppercase text-[10px] mb-6">Initialize Partnership</div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">Ready to Scale?</h2>
                <p className="text-white/50 text-lg mb-12">
                  We only partner with brands ready for exponential growth. 
                  Apply below for a strategy audit and systems consultation.
                </p>

                <div className="space-y-8">
                  <div className="flex gap-6 items-center">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      <Calendar className="w-5 h-5 text-brand-red" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Book Strategy Call</h4>
                      <p className="text-white/30 text-xs">Direct session with our growth architects.</p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-center">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      <Mail className="w-5 h-5 text-brand-yellow" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Direct Inquiry</h4>
                      <p className="text-white/30 text-xs">contact@integralmedia.com</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Side: Form */}
            <div className="p-12 md:p-20 bg-white/5">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Wick"
                      className="w-full bg-black/40 border border-white/10 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-brand-orange transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Company</label>
                    <input 
                      type="text" 
                      placeholder="Continental"
                      className="w-full bg-black/40 border border-white/10 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-brand-orange transition-colors"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Work Email</label>
                  <input 
                    type="email" 
                    placeholder="john@continental.com"
                    className="w-full bg-black/40 border border-white/10 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-brand-orange transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Systems Required</label>
                  <select className="w-full bg-black/40 border border-white/10 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-brand-orange transition-colors appearance-none">
                    <option>Cinematic Content</option>
                    <option>AI Automation</option>
                    <option>YouTube Growth</option>
                    <option>Full Growth Engine</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Project Overview</label>
                  <textarea 
                    rows={4}
                    placeholder="Tell us about your ambition..."
                    className="w-full bg-black/40 border border-white/10 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-brand-orange transition-colors resize-none"
                  />
                </div>

                <button className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-sm hover:bg-brand-red hover:text-white transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(255,136,0,0)] hover:shadow-[0_0_20px_rgba(255,51,51,0.3)]">
                  Submit Proposal
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Newsletter Cleanup */}
        <div className="mt-24 text-center">
          <div className="max-w-xl mx-auto glass p-8 rounded-sm border border-white/5">
            <h4 className="text-xl font-bold mb-2">Join the Intelligence Hub</h4>
            <p className="text-white/40 text-sm mb-6">Weekly insights on media infrastructure and future technology.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email Address"
                className="flex-grow bg-black/40 border border-white/10 rounded-sm px-4 py-2 text-sm focus:outline-none focus:border-brand-orange"
              />
              <button className="px-6 py-2 bg-white text-black font-bold text-sm rounded-sm hover:bg-brand-orange hover:text-white transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
