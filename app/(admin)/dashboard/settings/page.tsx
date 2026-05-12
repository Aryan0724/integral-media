"use client";

import { useState } from "react";
import { Save, Lock, Globe, FileCode, Check, Copy } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function SettingsPage() {
    const [sitemapXml, setSitemapXml] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [hasCopied, setHasCopied] = useState(false);

    const generateSitemap = async () => {
        setIsGenerating(true);
        try {
            // 1. Fetch Pages
            const { data: pages } = await supabase
                .from('pages')
                .select('slug, updated_at, is_indexed')
                .eq('is_indexed', true);

            // 2. Fetch Portfolio (If we had internal pages)
            // Currently portfolio links out, so strictly speaking they aren't part of *our* sitemap 
            // unless we have a landing page for them.
            // We will just assume static pages + CMS pages.

            const baseUrl = "https://integral.media"; // Real domain should be config
            const today = new Date().toISOString();

            let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
            xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

            // Static Home
            xml += `  <url>\n`;
            xml += `    <loc>${baseUrl}/</loc>\n`;
            xml += `    <lastmod>${today}</lastmod>\n`;
            xml += `    <changefreq>weekly</changefreq>\n`;
            xml += `    <priority>1.0</priority>\n`;
            xml += `  </url>\n`;

            // Static Work
            xml += `  <url>\n`;
            xml += `    <loc>${baseUrl}/work.html</loc>\n`;
            xml += `    <lastmod>${today}</lastmod>\n`;
            xml += `    <changefreq>weekly</changefreq>\n`;
            xml += `    <priority>0.9</priority>\n`;
            xml += `  </url>\n`;

            // CMS Pages
            if (pages) {
                pages.forEach(page => {
                    if (page.slug === 'home') return; // Handled above
                    const slug = page.slug.startsWith('/') ? page.slug.slice(1) : page.slug;
                    xml += `  <url>\n`;
                    // If the site is served statically, these might be slug + .html or just slug depending on server config
                    // Assuming clean URLs for modern hosting or hash routing. 
                    // For now, let's output them as /slug
                    xml += `    <loc>${baseUrl}/${slug}</loc>\n`;
                    xml += `    <lastmod>${page.updated_at || today}</lastmod>\n`;
                    xml += `    <changefreq>monthly</changefreq>\n`;
                    xml += `    <priority>0.7</priority>\n`;
                    xml += `  </url>\n`;
                });
            }

            xml += `</urlset>`;
            setSitemapXml(xml);

        } catch (error) {
            console.error("Error generating sitemap:", error);
            alert("Failed to generate sitemap");
        } finally {
            setIsGenerating(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(sitemapXml);
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), 2000);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Settings</h1>
                    <p className="text-sm text-gray-500">System configuration and preferences.</p>
                </div>
                <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800">
                    <Save className="h-4 w-4" />
                    Save Changes
                </button>
            </div>

            {/* SEO Automation */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <Globe className="h-5 w-5 text-gray-500" />
                    SEO Automation
                </h3>
                <div className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Site Base URL</label>
                            <input
                                type="text"
                                defaultValue="https://integral.media"
                                className="w-full rounded-lg border border-gray-300 p-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Robots.txt Mode</label>
                            <select className="w-full rounded-lg border border-gray-300 p-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black">
                                <option>Allow All (Default)</option>
                                <option>Disallow All (Private)</option>
                                <option>Custom</option>
                            </select>
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h4 className="font-medium text-gray-900">Sitemap Generator</h4>
                                <p className="text-xs text-gray-500">Auto-generate sitemap based on your published CMS pages.</p>
                            </div>
                            <button
                                onClick={generateSitemap}
                                disabled={isGenerating}
                                className="text-sm border border-gray-300 rounded px-3 py-1 hover:bg-gray-50 flex items-center gap-2"
                            >
                                <FileCode className="h-4 w-4" />
                                {isGenerating ? "Generating..." : "Generate XML"}
                            </button>
                        </div>

                        {sitemapXml && (
                            <div className="relative">
                                <textarea
                                    readOnly
                                    value={sitemapXml}
                                    className="w-full h-48 rounded-lg bg-gray-900 text-gray-300 p-4 text-xs font-mono"
                                />
                                <button
                                    onClick={copyToClipboard}
                                    className="absolute top-2 right-2 bg-white/10 hover:bg-white/20 text-white p-2 rounded transition-colors"
                                    title="Copy to Clipboard"
                                >
                                    {hasCopied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Placeholder for General Settings */}
            <div className="rounded-xl border bg-white p-6 shadow-sm opacity-60 pointer-events-none">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <Lock className="h-5 w-5 text-gray-500" />
                    Security (Coming Soon)
                </h3>
                <p className="text-sm text-gray-500">Security settings are managed securely via Supabase Auth.</p>
            </div>
        </div>
    );
}
