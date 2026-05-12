import React from "react";
import Link from "next/link";
import { Twitter, Linkedin, Youtube, Instagram, ArrowUpRight } from "lucide-react";

const footerLinks = [
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Vision", href: "#vision" },
      { name: "Careers", href: "/careers" },
      { name: "Integral Group", href: "https://integralgroup.com" },
    ],
  },
  {
    title: "Services",
    links: [
      { name: "Cinematic Content", href: "#services" },
      { name: "AI Automation", href: "#services" },
      { name: "Growth Systems", href: "#services" },
      { name: "Performance Marketing", href: "#services" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-white flex items-center justify-center rounded-sm">
                <span className="text-black font-black text-xl italic">I</span>
              </div>
              <span className="text-xl font-bold tracking-tighter uppercase">Integral Media</span>
            </Link>
            <p className="text-white/50 max-w-sm mb-8 leading-relaxed">
              A next-generation media intelligence and growth systems company powering the world's most ambitious brands through precision execution.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Twitter className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Youtube className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Instagram className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-6">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-white/40 hover:text-white transition-colors text-sm flex items-center gap-1 group">
                      {link.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Integral Media. A Division of Integral Group. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link href="#" className="text-white/30 hover:text-white text-xs transition-colors">
              Systems Status
            </Link>
            <Link href="#" className="text-white/30 hover:text-white text-xs transition-colors">
              Intelligence Hub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
