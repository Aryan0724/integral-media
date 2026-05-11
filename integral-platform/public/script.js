// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Page Reveal Animation
window.addEventListener('load', () => {
    revealHero();
});

// Hero Reveal function
function revealHero() {
    const tl = gsap.timeline();

    tl.from('.logo', {
        y: -10,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    })
        .from('.line', {
            y: 30,
            opacity: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: "power3.out"
        }, "-=0.8")
        .from('.hero-sub', {
            opacity: 0,
            y: 10,
            duration: 1.2,
            ease: "power3.out"
        }, "-=1");
}

// Menu Interaction
const menuBtn = document.querySelector('.menu-btn');
const menuClose = document.querySelector('.menu-close');
const menuOverlay = document.querySelector('.menu-overlay');
const menuLinks = document.querySelectorAll('.menu-link');

menuBtn.addEventListener('click', () => {
    gsap.to(menuOverlay, { width: "100%", duration: 1, ease: "power4.inOut" });
    gsap.fromTo(menuLinks,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, delay: 0.5, ease: "power3.out" }
    );
});

menuClose.addEventListener('click', () => {
    gsap.to(menuOverlay, { width: "0%", duration: 1, ease: "power4.inOut" });
});

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        gsap.to(menuOverlay, { width: "0%", duration: 1, ease: "power4.inOut" });
    });
});

// Custom Cursor
const cursor = document.querySelector('.cursor-follower');
const links = document.querySelectorAll('a, button, .menu-close, .menu-link, .project-card');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
    });
});

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
    });
    link.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
    });
});

// Floating Image Reveal for List (Only if present)
const listItems = document.querySelectorAll('.list-item');
const revealContainer = document.querySelector('.preview-reveal');
const revealImg = document.querySelector('#reveal-img');

if (listItems.length > 0 && revealContainer && revealImg) {
    // Pre-load images for smoother experience
    listItems.forEach(item => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = item.getAttribute('data-img');
        document.head.appendChild(link);
    });

    listItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            let imgUrl = item.getAttribute('data-img');
            revealImg.src = imgUrl;

            // Animate Container In
            gsap.to(revealContainer, {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: "power2.out"
            });

            // Animate Image Scale (Zoom Effect)
            gsap.fromTo(revealImg,
                { scale: 1.2 },
                { scale: 1, duration: 0.5, ease: "power2.out" }
            );
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(revealContainer, {
                opacity: 0,
                scale: 0.8,
                duration: 0.5,
                ease: "power2.out"
            });
        });

        item.addEventListener('mousemove', (e) => {
            // Move container with mouse
            // Offset centering so it floats near cursor but not blocking text
            gsap.to(revealContainer, {
                x: e.clientX - 200, // Center X
                y: e.clientY - 250, // Center Y
                duration: 0.5,
                ease: "power3.out"
            });

            // Tilt Effect
            let xDiff = e.clientX - window.innerWidth / 2;
            let rot = xDiff * 0.02;

            gsap.to(revealContainer, {
                rotation: rot,
                duration: 0.5,
                ease: "power3.out"
            });
        });
    });
}

// Services Reveal
gsap.from(".service-card", {
    scrollTrigger: {
        trigger: ".services",
        start: "top 80%"
    },
    y: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: "power2.out"
});

// Process Reveal
gsap.from(".step", {
    scrollTrigger: {
        trigger: ".process",
        start: "top 70%"
    },
    y: 30,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: "power2.out"
});

// About section text highlight
gsap.from('.about-content p', {
    scrollTrigger: {
        trigger: '.about',
        start: "top 70%"
    },
    opacity: 0,
    y: 30,
    duration: 1,
    ease: "power2.out"
});

// Parallax for Ticker
gsap.to('.ticker-wrap', {
    scrollTrigger: {
        trigger: '.ticker-wrap',
        scrub: 1
    },
    x: -100 // Moves slightly as you scroll
});
