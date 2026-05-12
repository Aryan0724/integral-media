"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Camera, Cpu, TrendingUp, Search, 
  Youtube, BarChart, Globe, Sparkles,
  ArrowUpRight, AlertCircle, CheckCircle2, Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Cinematic Content",
    icon: Camera,
    problem: "Generic content that fades into the noise.",
    solution: "Industrial-grade cinematic production that commands authority.",
    outcome: "95% Higher audience retention and brand prestige.",
    color: "from-brand-red/30"
  },
  {
    title: "AI Automation",
    icon: Cpu,
    problem: "Manual growth workflows that don't scale.",
    solution: "Proprietary AI agents managing content and lead generation.",
    outcome: "10x Operational efficiency with 0 extra headcount.",
    color: "from-brand-orange/30"
  },
  {
    title: "YouTube Growth",
    icon: Youtube,
    problem: "Stagnant channels with low conversion.",
    solution: "Data-driven systems for algorithmic dominance.",
    outcome: "Multi-million view reach with high-intent lead flow.",
    color: "from-brand-yellow/30"
  },
  {
    title: "Performance Marketing",
    icon: TrendingUp,
    problem: "Wasted ad spend on low-intent traffic.",
    solution: "Precision-targeted growth system with real-time optimization.",
    outcome: "Industry-leading ROAS and hyper-targeted scaling.",
    color: "from-brand-red/30"
  },
  {
    title: "SEO Systems",
    icon: Search,
    problem: "Invisible presence on search engines.",
    solution: "Top-tier domain authority and search ecosystem control.",
    outcome: "Dominating high-intent search queries sustainably.",
    color: "from-brand-orange/30"
  },
  {
    title: "Web Intelligence",
    icon: Globe,
    problem: "Slow websites that fail to convert.",
    solution: "High-performance Next.js systems engineered for conversion.",
    outcome: "99+ Lighthouse scores and 40% conversion lift.",
    color: "from-brand-yellow/30"
  },
  {
    title: "Branding",
    icon: Sparkles,
    problem: "Weak identity that fails to project power.",
    solution: "Strategic brand architecture for global market presence.",
    outcome: "Immediate institutional trust and market authority.",
    color: "from-brand-red/30"
  },
  {
    title: "Content Strategy",
    icon: BarChart,
    problem: "Random acts of content with no ROI.",
    solution: "Strategic growth blueprints aligned with business goals.",
    outcome: "Linear relationship between content and revenue.",
    color: "from-brand-orange/30"
  }
];

export function Services() {
  return (
    <section id="services" className="py-32 bg-black/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-brand-orange font-bold tracking-[0.4em] uppercase text-[10px] mb-4"
          >
            Tactical Capabilities
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Growth Systems & Execution.
          </motion.h2>
          <div className="w-20 h-1 bg-brand-red mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative"
            >
              <div className="h-full glass-dark p-8 rounded-sm border border-white/5 hover:border-brand-orange/20 transition-all duration-500 flex flex-col">
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 rounded-sm",
                  service.color
                )} />
                
                <div className="w-12 h-12 rounded-sm bg-white/5 flex items-center justify-center mb-8 group-hover:bg-brand-orange group-hover:text-white transition-all shadow-[0_0_15px_rgba(255,136,0,0)] group-hover:shadow-[0_0_15px_rgba(255,136,0,0.3)]">
                  <service.icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold mb-6">{service.title}</h3>

                <div className="space-y-4 mb-8 flex-grow">
                  <div className="flex gap-3">
                    <AlertCircle className="w-4 h-4 text-brand-red/40 flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-brand-red/60 mb-1">Problem</div>
                      <div className="text-sm text-white/60">{service.problem}</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Zap className="w-4 h-4 text-brand-orange flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-brand-orange/60 mb-1">Solution</div>
                      <div className="text-sm text-white/80">{service.solution}</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="w-4 h-4 text-brand-yellow flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-brand-yellow/60 mb-1">Outcome</div>
                      <div className="text-sm font-bold text-white">{service.outcome}</div>
                    </div>
                  </div>
                </div>

                <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest group/btn text-brand-orange">
                  Initialize
                  <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
