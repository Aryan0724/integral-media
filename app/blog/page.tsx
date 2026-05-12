"use client";

import Script from "next/script";
import { useEffect } from "react";
import "../globals.css";

export default function BlogPublicPage() {
    return (
        <>
            <link rel="stylesheet" href="/style.css?v=2" />

            <div dangerouslySetInnerHTML={{
                __html: `
                <!-- BACKGROUND ANIMATION CANVAS -->
                <canvas id="bgCanvas"></canvas>
            
                <!-- Grain Overlay -->
                <div class="grain-overlay"></div>
            
                <!-- Cursor -->
                <div class="cursor-follower"></div>
            
                <!-- Floating Shapes -->
                <div class="shape shape-1"></div>
                <div class="shape shape-2"></div>
            
                <!-- HEADER -->
                <nav>
                    <div class="logo">INTEGRAL MEDIA.</div>
                    <div class="menu-btn">MENU</div>
                </nav>
            
                <!-- PAGE CONTENT -->
                <main style="padding-top: 20vh; min-height: 100vh;">
                    <div class="container" style="max-width: 1400px; margin: 0 auto; padding: 0 5%;">
            
                        <div class="section-header">
                            <h1 style="font-size: 8vw; line-height: 0.9; margin-bottom: 2rem;">INSIGHTS <br> <span
                                    class="accent-red">GROWTH ENGINE.</span></h1>
                            <div class="line-separator"></div>
                        </div>
            
                        <!-- BLOG GRID -->
                        <div id="blog-grid" class="blog-grid">
                            <div style="grid-column: 1/-1; text-align: center; color: #999; padding: 4rem; font-family: 'Oswald', sans-serif;">
                                Loading Articles...
                            </div>
                        </div>
            
                    </div>
                </main>
            
                <!-- FOOTER -->
                <footer>
                    <div class="footer-content">
                        <div class="footer-col">
                            <h3>Integral Media.</h3>
                            <p>Inbound marketing growth engines.</p>
                        </div>
                        <div class="footer-col">
                            <h4>Socials</h4>
                            <ul>
                                <li><a href="#">Instagram</a></li>
                                <li><a href="#">LinkedIn</a></li>
                                <li><a href="#">Twitter</a></li>
                            </ul>
                        </div>
                        <div class="footer-col">
                            <h4>Get in Touch</h4>
                            <a href="mailto:hello@integral.media">hello@integral.media</a>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <p>&copy; 2026 Integral Media. All Rights Reserved.</p>
                    </div>
            
                    <!-- Menu Overlay -->
                    <div class="menu-overlay">
                        <div class="menu-close">CLOSE</div>
                        <div class="menu-links">
                            <a href="/" class="menu-link">HOME</a>
                            <a href="/work.html" class="menu-link">WORK</a>
                            <a href="/blog" class="menu-link active">BLOG</a>
                            <a href="/#contact" class="menu-link">CONTACT</a>
                        </div>
                    </div>
                </footer>
            `}} />

            <Script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2" strategy="beforeInteractive" />
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="beforeInteractive" />
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" strategy="beforeInteractive" />

            <Script src="/bg-animation.js?v=2" strategy="lazyOnload" />
            <Script src="/script.js?v=2" strategy="lazyOnload" onLoad={() => {
                if (typeof window !== 'undefined' && (window as any).initSiteAnimations) {
                    (window as any).initSiteAnimations();
                }
            }} />
            <Script src="/blog-loader.js?v=2" strategy="lazyOnload" />
        </>
    );
}
