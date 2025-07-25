/**
 * NEXT-GENERATION ANIMATION SYSTEM
 * Ultra-Fast, Innovative, Responsive
 * Using Modern Libraries & Best Practices
 */

/* ========================================
   INITIALIZATION & SETUP
   ======================================== */

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    new ModernAnimationSystem();
});

class ModernAnimationSystem {
    constructor() {
        this.initializeLibraries();
        this.createPreloader();
        this.setupScrollSystem();
        this.initializeAnimations();
        this.setupInteractions();
        this.createInnovativeElements();
    }

    /* ========================================
       LIBRARY INITIALIZATION
       ======================================== */

    initializeLibraries() {
        // Initialize AOS (Animate On Scroll)
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 0,
            disable: 'mobile' // Disable on mobile for performance
        });

        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger);

        // Set GSAP defaults for performance
        gsap.defaults({
            duration: 0.6,
            ease: "power2.out"
        });
    }

    /* ========================================
       MODERN PRELOADER
       ======================================== */

    createPreloader() {
        const preloader = document.createElement('div');
        preloader.id = 'modern-preloader';
        preloader.innerHTML = `
            <div class="preloader-container">
                <div class="logo-animation">
                    <h1 class="logo-text">SA</h1>
                    <div class="loading-bar">
                        <div class="loading-progress"></div>
                    </div>
                    <p class="loading-text">Loading Architecture...</p>
                </div>
            </div>
        `;

        // Add styles
        preloader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            font-family: 'Inter', sans-serif;
        `;

        document.body.appendChild(preloader);
        this.animatePreloader();
    }

    animatePreloader() {
        const tl = gsap.timeline();
        
        tl.from('.logo-text', {
            y: 50,
            opacity: 0,
            scale: 0.8,
            duration: 0.8,
            ease: "back.out(1.7)"
        })
        .from('.loading-bar', {
            width: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.3")
        .to('.loading-progress', {
            width: '100%',
            duration: 1.5,
            ease: "power2.out"
        })
        .from('.loading-text', {
            y: 20,
            opacity: 0,
            duration: 0.5
        }, "-=1")
        .to('#modern-preloader', {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
                document.getElementById('modern-preloader').remove();
                this.startMainAnimations();
            }
        }, "+=0.5");
    }

    startMainAnimations() {
        // Refresh AOS
        AOS.refresh();
        
        // Start hero animations
        this.animateHero();
    }

    /* ========================================
       SCROLL SYSTEM
       ======================================== */

    setupScrollSystem() {
        // Initialize Locomotive Scroll
        this.locomotiveScroll = new LocomotiveScroll({
            el: document.querySelector('body'),
            smooth: true,
            multiplier: 1,
            class: 'is-revealed',
            smartphone: {
                smooth: false // Disable on mobile for performance
            },
            tablet: {
                smooth: false
            }
        });

        // Update ScrollTrigger
        this.locomotiveScroll.on('scroll', ScrollTrigger.update);
        
        ScrollTrigger.scrollerProxy('body', {
            scrollTop(value) {
                return arguments.length ? 
                    locomotiveScroll.scrollTo(value, 0, 0) : 
                    locomotiveScroll.scroll.instance.scroll.y;
            },
            getBoundingClientRect() {
                return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
            }
        });

        ScrollTrigger.addEventListener('refresh', () => locomotiveScroll.update());
        ScrollTrigger.refresh();
    }

    /* ========================================
       HERO ANIMATIONS
       ======================================== */

    animateHero() {
        // Animate hero title with stagger
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            // Split text into words
            const words = heroTitle.textContent.split(' ');
            heroTitle.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');

            gsap.from('.hero-title .word', {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out"
            });
        }

        // Animate hero elements
        const tl = gsap.timeline({ delay: 0.5 });
        
        tl.from('.hero-description', {
            y: 50,
            opacity: 0,
            duration: 0.8
        })
        .from('.hero-buttons .cta-button', {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1
        }, "-=0.4")
        .from('.hero-stats .stat-item', {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1
        }, "-=0.2");

        // Add floating animation to hero
        gsap.to('.hero-title', {
            y: -10,
            duration: 3,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        });
    }

    /* ========================================
       SCROLL ANIMATIONS
       ======================================== */

    initializeAnimations() {
        // Parallax elements
        gsap.utils.toArray('[data-speed]').forEach(element => {
            const speed = element.dataset.speed;
            
            gsap.to(element, {
                y: (i, target) => -speed * ScrollTrigger.maxScroll(window),
                ease: "none",
                scrollTrigger: {
                    trigger: element,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                    invalidateOnRefresh: true
                }
            });
        });

        // Counter animations
        gsap.utils.toArray('.stat-number').forEach(counter => {
            const target = parseInt(counter.dataset.target);
            
            gsap.to(counter, {
                textContent: target,
                duration: 2,
                ease: "power2.out",
                snap: { textContent: 1 },
                scrollTrigger: {
                    trigger: counter,
                    start: "top 80%"
                }
            });
        });

        // Section reveals
        gsap.utils.toArray('.content-section').forEach(section => {
            gsap.from(section.children, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "bottom 20%"
                }
            });
        });
    }

    /* ========================================
       INTERACTIVE ELEMENTS
       ======================================== */

    setupInteractions() {
        // Magnetic buttons
        this.setupMagneticButtons();
        
        // Portfolio filters
        this.setupPortfolioFilters();
        
        // Smooth anchor links
        this.setupSmoothLinks();
        
        // Dynamic cursor
        this.setupDynamicCursor();
    }

    setupMagneticButtons() {
        const magneticElements = document.querySelectorAll('.cta-button, .magnetic-btn');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                gsap.to(element, {
                    x: x * 0.2,
                    y: y * 0.2,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            element.addEventListener('mouseleave', () => {
                gsap.to(element, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.3)"
                });
            });
        });
    }

    setupPortfolioFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item, .project-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter || e.target.dataset.category;
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter items with animation
                portfolioItems.forEach(item => {
                    const categories = item.dataset.category;
                    const shouldShow = filter === 'all' || categories.includes(filter);
                    
                    gsap.to(item, {
                        opacity: shouldShow ? 1 : 0.3,
                        scale: shouldShow ? 1 : 0.8,
                        duration: 0.4,
                        ease: "power2.out"
                    });
                });
            });
        });
    }

    setupSmoothLinks() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target && this.locomotiveScroll) {
                    this.locomotiveScroll.scrollTo(target);
                }
            });
        });
    }

    setupDynamicCursor() {
        // Only on desktop
        if (window.innerWidth > 768) {
            const cursor = document.createElement('div');
            cursor.className = 'dynamic-cursor';
            cursor.style.cssText = `
                position: fixed;
                width: 20px;
                height: 20px;
                background: #667eea;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                mix-blend-mode: difference;
                transition: transform 0.1s ease;
            `;
            document.body.appendChild(cursor);

            document.addEventListener('mousemove', (e) => {
                gsap.to(cursor, {
                    x: e.clientX - 10,
                    y: e.clientY - 10,
                    duration: 0.1
                });
            });

            // Scale on hover
            document.querySelectorAll('a, button, .hover-scale').forEach(element => {
                element.addEventListener('mouseenter', () => {
                    gsap.to(cursor, { scale: 2, duration: 0.2 });
                });
                element.addEventListener('mouseleave', () => {
                    gsap.to(cursor, { scale: 1, duration: 0.2 });
                });
            });
        }
    }

    /* ========================================
       INNOVATIVE ELEMENTS
       ======================================== */

    createInnovativeElements() {
        this.createParticleSystem();
        this.setupTypewriter();
        this.createScrollProgress();
        this.setupResponsiveAnimations();
    }

    createParticleSystem() {
        // Only on desktop for performance
        if (window.innerWidth > 768) {
            const particlesContainer = document.createElement('div');
            particlesContainer.id = 'particles-js';
            particlesContainer.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 1;
            `;
            document.body.insertBefore(particlesContainer, document.body.firstChild);

            particlesJS('particles-js', {
                particles: {
                    number: { value: 50 },
                    color: { value: "#667eea" },
                    shape: { type: "circle" },
                    opacity: { value: 0.3 },
                    size: { value: 3 },
                    move: {
                        enable: true,
                        speed: 1,
                        direction: "none",
                        random: true
                    }
                },
                interactivity: {
                    events: {
                        onhover: { enable: true, mode: "repulse" },
                        onclick: { enable: true, mode: "push" }
                    }
                }
            });
        }
    }

    setupTypewriter() {
        const typewriterElement = document.querySelector('.dynamic-text');
        if (typewriterElement) {
            new Typed('.dynamic-text', {
                strings: ['Innovation', 'Excellence', 'Design', 'Architecture'],
                typeSpeed: 100,
                backSpeed: 50,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });
        }
    }

    createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 4px;
            background: linear-gradient(90deg, #667eea, #764ba2);
            z-index: 1000;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    setupResponsiveAnimations() {
        // Disable heavy animations on mobile
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Disable expensive animations on mobile
            gsap.set('*', { clearProps: 'transform' });
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        }

        // Update on resize
        window.addEventListener('resize', () => {
            if (this.locomotiveScroll) {
                this.locomotiveScroll.update();
            }
            ScrollTrigger.refresh();
        });
    }
}

/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

// Performance monitoring
let fps = 0;
let lastTime = performance.now();

function updateFPS() {
    const now = performance.now();
    fps = Math.round(1000 / (now - lastTime));
    lastTime = now;
    
    if (fps < 30) {
        console.warn('Low FPS detected:', fps);
        // Automatically reduce animations quality
        gsap.globalTimeline.timeScale(0.5);
    }
    
    requestAnimationFrame(updateFPS);
}

// Start FPS monitoring in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    updateFPS();
}

/* ========================================
   CSS STYLES
   ======================================== */

// Inject critical CSS
const criticalCSS = document.createElement('style');
criticalCSS.textContent = `
    .preloader-container {
        text-align: center;
        color: white;
    }
    
    .logo-text {
        font-size: 4rem;
        font-weight: 700;
        margin-bottom: 2rem;
        background: linear-gradient(45deg, #fff, #f0f0f0);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    
    .loading-bar {
        width: 200px;
        height: 4px;
        background: rgba(255,255,255,0.2);
        border-radius: 2px;
        margin: 0 auto 1rem;
        overflow: hidden;
    }
    
    .loading-progress {
        width: 0%;
        height: 100%;
        background: linear-gradient(90deg, #fff, #f0f0f0);
        border-radius: 2px;
    }
    
    .loading-text {
        font-size: 1.1rem;
        opacity: 0.8;
        letter-spacing: 0.1em;
    }
    
    .dynamic-cursor {
        pointer-events: none !important;
    }
    
    @media (max-width: 768px) {
        .dynamic-cursor {
            display: none !important;
        }
    }
`;

document.head.appendChild(criticalCSS);
