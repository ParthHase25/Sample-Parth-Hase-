/*
 * ========================================
 * SHRIRAM ARCHITECTURE - ENHANCED JAVASCRIPT
 * ========================================
 * 
 * Interactive functionality for the architecture website
 * Features: Theme toggle, mobile navigation, animated counters, smooth scrolling
 * Enhanced with GSAP & Anime.js compatibility
 * Author: Shriram Architecture Team
 * Version: 3.0
 * Last Updated: 2024
 */

// Performance monitoring
performance.mark('script-start');

// Wait for DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Shriram Architecture website initializing...');
    
    // Check for advanced animation libraries
    const hasAdvancedAnimations = window.gsap && window.anime;
    if (hasAdvancedAnimations) {
        console.log('🎨 Advanced animation libraries detected, using enhanced mode');
        document.body.classList.add('advanced-animations-enabled');
    }

    /* ========================================
       THEME TOGGLE SYSTEM
       ======================================== */
    
    // Get theme toggle elements
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const html = document.documentElement;
    
    /**
     * Apply theme to both HTML and body elements
     * Ensures consistent theme application across all elements
     * @param {string} theme - Theme name ('light' or 'dark')
     */
    function applyTheme(theme) {
        // Add theme switching class for enhanced transitions
        body.classList.add('theme-switching');
        
        body.setAttribute('data-theme', theme);
        html.setAttribute('data-theme', theme);
        
        // Force a style recalculation to ensure immediate theme application
        body.offsetHeight;
        
        // Remove theme switching class after transition completes
        setTimeout(() => {
            body.classList.remove('theme-switching');
        }, 600); // 0.6s to match --transition-slow
    }
    
    // Initialize theme from localStorage or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    applyTheme(currentTheme);
    
    // Theme toggle event handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add visual feedback animation for theme toggle button (enhanced)
        themeToggle.style.transform = 'scale(0.9) rotate(180deg)';
        themeToggle.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        // Apply new theme with smooth transition
        setTimeout(() => {
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        }, 150);
        
        // Reset button transform
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
        
        // Clean up inline styles
        setTimeout(() => {
            themeToggle.style.transform = '';
            themeToggle.style.transition = '';
        }, 600);
    });

    /* ========================================
       ADVANCED SCROLL ANIMATIONS & INTERACTIONS
       ======================================== */
    
    // Initialize Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Create intersection observer for different animation types
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    function initScrollAnimations() {
        // Add animation classes to elements
        const headings = document.querySelectorAll('h1, h2, h3');
        const paragraphs = document.querySelectorAll('p');
        const cards = document.querySelectorAll('.project-card, .service-card, .testimonial-card');
        const images = document.querySelectorAll('img');
        
        // Apply reveal animations to headings
        headings.forEach((heading, index) => {
            heading.classList.add('reveal-text');
            setTimeout(() => {
                revealObserver.observe(heading);
            }, index * 100);
        });
        
        // Apply stagger animations to paragraphs
        paragraphs.forEach((p, index) => {
            p.classList.add('stagger-animation');
            setTimeout(() => {
                revealObserver.observe(p);
            }, index * 150);
        });
        
        // Apply scale animations to cards
        cards.forEach((card, index) => {
            card.classList.add('scale-on-scroll');
            setTimeout(() => {
                revealObserver.observe(card);
            }, index * 200);
        });
        
        // Apply image reveal animations
        images.forEach((img, index) => {
            img.classList.add('image-reveal');
            setTimeout(() => {
                revealObserver.observe(img);
            }, index * 100);
        });
    }
    
    // Parallax scrolling effect
    function initParallax() {
        const parallaxElements = document.querySelectorAll('.stats-bg-pattern, .hero-background');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }
    
    // Magnetic button effect
    function initMagneticButtons() {
        const buttons = document.querySelectorAll('.cta-button, .btn, .view-project-btn');
        
        buttons.forEach(button => {
            button.classList.add('magnetic-button');
            
            button.addEventListener('mouseenter', (e) => {
                e.target.style.transform = 'scale(1.05) translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', (e) => {
                e.target.style.transform = 'scale(1) translateY(0)';
            });
            
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                e.target.style.transform = `scale(1.05) translate(${x * 0.1}px, ${y * 0.1}px)`;
            });
        });
    }
    
    // Enhanced counter animation
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    let current = 0;
                    const increment = target / 60; // Animation duration
                    
                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            entry.target.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            entry.target.textContent = target;
                        }
                    };
                    
                    updateCounter();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counter.classList.add('counter-animation');
            counterObserver.observe(counter);
        });
    }
    
    // Smooth section background transitions
    function initSectionBackgrounds() {
        const sections = document.querySelectorAll('section');
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.opacity = '1';
                }
            });
        }, { threshold: 0.2 });
        
        sections.forEach(section => {
            section.classList.add('section-bg-animate');
            sectionObserver.observe(section);
        });
    }
    
    // Text reveal with stagger effect
    function initTextReveal() {
        const textElements = document.querySelectorAll('.section-subtitle, .section-description');
        
        textElements.forEach((element, index) => {
            if (index % 2 === 0) {
                element.classList.add('slide-in-left');
            } else {
                element.classList.add('slide-in-right');
            }
            revealObserver.observe(element);
        });
    }
    
    // Enhanced project card interactions
    function initProjectCardEffects() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) scale(1.02)';
                card.style.boxShadow = '0 25px 70px rgba(0,0,0,0.2)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            });
        });
    }
    
    // Scroll progress bar
    function initScrollProgress() {
        const progressBar = document.querySelector('.scroll-progress');
        
        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            if (progressBar) {
                progressBar.style.width = scrolled + '%';
            }
        });
    }
    
    // Initialize all animation systems
    function initAllAnimations() {
        initScrollAnimations();
        initParallax();
        initMagneticButtons();
        animateCounters();
        initSectionBackgrounds();
        initTextReveal();
        initProjectCardEffects();
        initScrollProgress();
        initInnovativePortfolio(); // Add innovative portfolio
        initInnovativeHero(); // Add innovative hero
    }
    
    // Start animations after page load
    setTimeout(initAllAnimations, 100);

    /* ========================================
       FIXED NAVBAR - ALWAYS VISIBLE ON SCROLL
       ======================================== */
    
    // Get navbar element
    const header = document.querySelector('header');
    
    // Ensure navbar is always fixed (fallback)
    if (header) {
        header.style.position = 'fixed';
        header.style.top = '0';
        header.style.left = '0';
        header.style.right = '0';
        header.style.zIndex = '99999';
        header.style.width = '100%';
    }
    
    let lastScrollY = window.scrollY;
    let isScrolling = false;
    
    /**
     * Handle navbar appearance during scroll
     * Adds enhanced styling when user scrolls down
     */
    function updateNavbarOnScroll() {
        if (!header) return;
        
        const currentScrollY = window.scrollY;
        
        // Add 'scrolled' class when user scrolls down more than 50px
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
        isScrolling = false;
    }
    
    // Throttled scroll event listener for better performance
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            requestAnimationFrame(updateNavbarOnScroll);
            isScrolling = true;
        }
    });
    
    // Also run on page load
    updateNavbarOnScroll();

    /* ========================================
       MOBILE NAVIGATION ENHANCEMENTS
       ======================================== */
    
    // Get mobile navigation elements
    const mobileToggle = document.getElementById('mobileToggle');
    const navbarMenu = document.querySelector('.navbar-menu');

    // Initialize mobile navigation functionality
    if (mobileToggle && navbarMenu) {
        // Mobile menu toggle handler
        mobileToggle.addEventListener('click', () => {
            // Toggle active states for hamburger button and menu
            mobileToggle.classList.toggle('active');
            navbarMenu.classList.toggle('active');
            
            // Prevent background scrolling when mobile menu is open
            if (navbarMenu.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
        
        // Close mobile nav when a link is clicked
        navbarMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (navbarMenu.classList.contains('active')) {
                    navbarMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    body.style.overflow = '';
                }
            });
        });
    }

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                hamburger.classList.remove('active');
                body.style.overflow = '';
            }
        }
    });

    // --- Preload Critical Portfolio Images ---
    const criticalImages = [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=800&h=600&fit=crop&crop=center'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });

    // --- Smooth Scrolling Enhancement ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Scroll Fade-in Animation ---
    const sections = document.querySelectorAll('.content-section');

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Project Card Interactions ---
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const viewBtn = card.querySelector('.view-project-btn');
        if (viewBtn) {
            viewBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const projectName = card.querySelector('h3').textContent;
                alert(`Opening detailed view for: ${projectName}\n\nThis would typically open a project detail page or gallery.`);
            });
        }
    });

    /* ========================================
       INNOVATIVE PORTFOLIO SYSTEM
       ======================================== */
    
    // Revolutionary morphing portfolio grid
    function initInnovativePortfolio() {
        // Target the innovative portfolio specifically, not the main project grid
        const portfolioContainer = document.querySelector('.portfolio-container');
        if (!portfolioContainer) return;
        
        const portfolioGrid = portfolioContainer.querySelector('.portfolio-grid');
        const filterButtons = portfolioContainer.querySelectorAll('.filter-btn');
        const portfolioItems = portfolioContainer.querySelectorAll('.portfolio-item');
        
        if (!portfolioGrid || !filterButtons.length || !portfolioItems.length) return;
        
        let currentFilter = 'all';
        let isAnimating = false;
        
        // Advanced filter system with morphing animations
        filterButtons.forEach((button, index) => {
            button.addEventListener('click', async (e) => {
                e.preventDefault();
                
                if (isAnimating) return;
                isAnimating = true;
                
                const newFilter = button.getAttribute('data-category') || 'all';
                
                // Update active states
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter and animate portfolio items
                await filterPortfolioItems(newFilter);
                
                currentFilter = newFilter;
                isAnimating = false;
            });
        });
        
        // Initialize portfolio cards with progressive loading animation
        portfolioItems.forEach((item, index) => {
            // Add loading animation with staggered delay
            setTimeout(() => {
                item.classList.add('loading');
            }, index * 100);
            
            // Add hover magnetic effects
            initPortfolioCardEffects(item);
        });
    }
    
    // Filter portfolio items with morphing animations
    async function filterPortfolioItems(filter) {
        const portfolioItems = document.querySelectorAll('.portfolio-container .portfolio-item');
        
        if (portfolioItems.length === 0) return;
        
        return new Promise((resolve) => {
            let visibleCount = 0;
            
            portfolioItems.forEach((item, index) => {
                const itemCategories = item.getAttribute('data-category') || '';
                const categoryArray = itemCategories.split(' ').filter(cat => cat.trim());
                const shouldShow = filter === 'all' || categoryArray.includes(filter);
                
                // Reset any previous animations
                item.classList.remove('morphing', 'hidden');
                item.style.display = 'block';
                
                if (shouldShow) {
                    // Show item with morphing animation
                    item.classList.add('morphing');
                    visibleCount++;
                    
                    // Remove morphing class after animation
                    setTimeout(() => {
                        item.classList.remove('morphing');
                    }, 800);
                } else {
                    // Hide item with animation
                    item.classList.add('morphing');
                    setTimeout(() => {
                        item.classList.remove('morphing');
                        item.classList.add('hidden');
                    }, 400);
                }
            });
            
            // Complete the animation
            setTimeout(resolve, 1000);
        });
    }
    
    // Enhanced portfolio card effects
    function initPortfolioCardEffects(card) {
        // Magnetic hover effect
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
        
        // Enhanced image hover effects
        const image = card.querySelector('.portfolio-image img');
        const overlay = card.querySelector('.portfolio-overlay');
        
        if (image && overlay) {
            card.addEventListener('mouseenter', () => {
                image.style.transform = 'scale(1.1) rotate(1deg)';
                overlay.style.opacity = '1';
            });
            
            card.addEventListener('mouseleave', () => {
                image.style.transform = 'scale(1) rotate(0deg)';
                overlay.style.opacity = '0';
            });
        }
    }
    
    // Morphing grid animation
    async function morphPortfolioGrid(fromFilter, toFilter) {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        const portfolioGrid = document.querySelector('.portfolio-grid');
        
        // Step 1: Shrink and fade out non-matching items
        const hidePromises = [];
        portfolioItems.forEach(item => {
            const categories = item.getAttribute('data-category').split(' ');
            const shouldShow = toFilter === 'all' || categories.includes(toFilter);
            
            if (!shouldShow) {
                const hidePromise = new Promise(resolve => {
                    item.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    item.style.transform = 'scale(0.8) rotateY(90deg)';
                    item.style.opacity = '0';
                    item.style.filter = 'blur(10px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                        resolve();
                    }, 400);
                });
                hidePromises.push(hidePromise);
            }
        });
        
        await Promise.all(hidePromises);
        
        // Step 2: Reorganize grid layout
        await reorganizeGrid(toFilter);
        
        // Step 3: Show and animate in matching items
        const showPromises = [];
        portfolioItems.forEach((item, index) => {
            const categories = item.getAttribute('data-category').split(' ');
            const shouldShow = toFilter === 'all' || categories.includes(toFilter);
            
            if (shouldShow) {
                const showPromise = new Promise(resolve => {
                    item.style.display = 'block';
                    item.style.transform = 'scale(0.8) rotateY(-90deg)';
                    item.style.opacity = '0';
                    item.style.filter = 'blur(10px)';
                    
                    setTimeout(() => {
                        item.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                        item.style.transform = 'scale(1) rotateY(0deg)';
                        item.style.opacity = '1';
                        item.style.filter = 'blur(0px)';
                        resolve();
                    }, index * 100);
                });
                showPromises.push(showPromise);
            }
        });
        
        await Promise.all(showPromises);
    }
    
    // Dynamic grid reorganization
    async function reorganizeGrid(filter) {
        const portfolioGrid = document.querySelector('.portfolio-grid');
        const gridState = {
            all: 'repeat(auto-fit, minmax(350px, 1fr))',
            residential: 'repeat(auto-fit, minmax(400px, 1fr))',
            commercial: 'repeat(auto-fit, minmax(450px, 1fr))',
            luxury: 'repeat(auto-fit, minmax(500px, 1fr))'
        };
        
        return new Promise(resolve => {
            portfolioGrid.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            portfolioGrid.style.gridTemplateColumns = gridState[filter] || gridState.all;
            setTimeout(resolve, 500);
        });
    }
    
    // Advanced portfolio card initialization
    function initPortfolioCard(card, index) {
        const image = card.querySelector('.portfolio-image');
        const overlay = card.querySelector('.image-overlay');
        const hoverReveal = card.querySelector('.card-hover-reveal');
        const exploreBtn = card.querySelector('.explore-btn');
        
        // Progressive image loading with blur effect
        if (image) {
            image.style.filter = 'blur(20px)';
            image.style.transform = 'scale(1.1)';
            
            image.addEventListener('load', () => {
                image.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                image.style.filter = 'blur(0px)';
                image.style.transform = 'scale(1)';
            });
        }
        
        // Advanced hover interactions
        card.addEventListener('mouseenter', () => {
            if (image) {
                image.style.transform = 'scale(1.1)';
                image.style.filter = 'brightness(0.7)';
            }
            if (hoverReveal) {
                hoverReveal.style.opacity = '1';
                hoverReveal.style.transform = 'translateY(0)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (image) {
                image.style.transform = 'scale(1)';
                image.style.filter = 'brightness(1)';
            }
            if (hoverReveal) {
                hoverReveal.style.opacity = '0';
                hoverReveal.style.transform = 'translateY(100%)';
            }
        });
        
        // Magnetic cursor effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            card.style.transform = `perspective(1000px) rotateY(${deltaX * 5}deg) rotateX(${-deltaY * 5}deg) translateZ(20px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
        });
        
        // Explore button interactions
        if (exploreBtn) {
            exploreBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const projectTitle = card.querySelector('.project-title').textContent;
                createProjectModal(card, projectTitle);
            });
        }
    }
    
    // Results counter animation
    function updateResultsCounter(newCount) {
        const resultsCount = document.getElementById('resultsCount');
        if (resultsCount) {
            const currentCount = parseInt(resultsCount.textContent);
            const targetCount = parseInt(newCount);
            
            animateCounter(resultsCount, currentCount, targetCount, 300);
        }
    }
    
    // Counter animation utility
    function animateCounter(element, from, to, duration) {
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(from + (to - from) * progress);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // Revolutionary project modal
    function createProjectModal(card, projectTitle) {
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${projectTitle}</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="project-gallery">
                        <div class="gallery-main">
                            <img src="${card.querySelector('.portfolio-image').src}" alt="${projectTitle}">
                        </div>
                        <div class="gallery-thumbs">
                            <div class="thumb active"></div>
                            <div class="thumb"></div>
                            <div class="thumb"></div>
                        </div>
                    </div>
                    <div class="project-info">
                        <div class="project-description">
                            <h3>Project Overview</h3>
                            <p>This innovative architectural project showcases modern design principles with sustainable living solutions. Every detail has been carefully crafted to create a harmonious blend of functionality and aesthetics.</p>
                        </div>
                        <div class="project-specs">
                            <div class="spec-item">
                                <span class="spec-label">Area</span>
                                <span class="spec-value">${card.querySelector('.detail-value').textContent}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Year</span>
                                <span class="spec-value">2023</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Status</span>
                                <span class="spec-value">Completed</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="cta-button">Start Similar Project</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Animate modal entrance
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.modal-close');
        const backdrop = modal.querySelector('.modal-backdrop');
        
        [closeBtn, backdrop].forEach(element => {
            element.addEventListener('click', () => {
                modal.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            });
        });
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Restore body scroll when modal closes
        modal.addEventListener('transitionend', () => {
            if (!modal.classList.contains('active')) {
                document.body.style.overflow = '';
            }
        });
    }

    // --- FAQ Accordion Functionality ---
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // --- Animated Counter for Statistics ---
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateStats = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const current = parseInt(stat.textContent);
            const increment = target / 50; // Adjust speed here
            
            if (current < target) {
                stat.textContent = Math.ceil(current + increment);
                setTimeout(animateStats, 30);
            } else {
                stat.textContent = target + '+';
            }
        });
    };

    // Trigger stats animation when section comes into view
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }

    // --- Enhanced Image Loading and Optimization ---
    const images = document.querySelectorAll('img');
    
    // Create intersection observer for lazy loading optimization
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Add loading class for visual feedback
                img.classList.add('loading');
                
                // If image is already loaded, fade it in immediately
                if (img.complete && img.naturalHeight !== 0) {
                    img.classList.add('loaded');
                    img.classList.remove('loading');
                } else {
                    // Load event handler
                    img.addEventListener('load', function() {
                        this.classList.add('loaded');
                        this.classList.remove('loading');
                    });
                    
                    // Error handler with architectural fallback
                    img.addEventListener('error', function() {
                        console.log('Image failed to load:', this.src);
                        console.log('Attempting fallback for:', this.alt);
                        
                        // Check if there's a data-fallback attribute first
                        if (this.dataset.fallback && this.src !== this.dataset.fallback) {
                            console.log('Using data-fallback image:', this.dataset.fallback);
                            this.src = this.dataset.fallback;
                            return;
                        }
                        
                        // Try backup images for specific projects
                        if (this.alt.includes('Lonavala Retreat')) {
                            // Try alternative retreat image
                            this.src = 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop&crop=center';
                        } else if (this.alt.includes('retreat') || this.alt.includes('Retreat')) {
                            // General retreat backup
                            this.src = 'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=800&h=600&fit=crop&crop=center';
                        } else {
                            // Use SVG fallback for other images
                            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjBGMEYwIi8+CjxwYXRoIGQ9Ik0yMDAgMjAwSDYwMFY0MDBIMjAwVjIwMFoiIHN0cm9rZT0iI0I4ODYwQiIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+CjxwYXRoIGQ9Ik0zMDAgMzAwSDUwMFYzNTBIMzAwVjMwMFoiIGZpbGw9IiNCODg2MEIiLz4KPHRleHQgeD0iNDAwIiB5PSI1MDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iI0I4ODYwQiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QXJjaGl0ZWN0dXJhbCBJbWFnZTwvdGV4dD4KPC9zdmc+';
                        }
                        
                        this.alt = 'Architectural project image - ' + this.alt;
                        this.classList.add('loaded');
                        this.classList.remove('loading');
                    });
                    
                    // Trigger loading if not already started
                    if (!img.src) {
                        img.src = img.dataset.src || img.src;
                    }
                }
                
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '100px 0px',
        threshold: 0.01
    });

    // Observe all images for lazy loading
    images.forEach(img => {
        if (img.loading === 'lazy') {
            imageObserver.observe(img);
        } else {
            // For non-lazy images, add loaded class immediately if already loaded
            if (img.complete && img.naturalHeight !== 0) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', function() {
                    this.classList.add('loaded');
                });
                img.addEventListener('error', function() {
                    this.classList.add('loaded'); // Still show something even on error
                });
            }
        }
    });

    // --- Preload critical images ---
    const preloadImages = [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1520637836862-4d197d17c38a?w=800&h=600&fit=crop&crop=center'
    ];
    
    preloadImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });

    // --- Performance optimization: Debounce scroll events ---

    // --- Performance optimization: Debounce scroll events ---
    let ticking = false;
    
    function updateScrollElements() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3; // Reduced parallax effect
        
        // Update scroll indicator with improved logic
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            // Fade out based on scroll position
            const fadeThreshold = 150;
            if (scrolled > fadeThreshold) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.transform = `translateX(-50%) translateY(20px)`;
            } else {
                const opacity = Math.max(0, 0.7 - (scrolled / fadeThreshold) * 0.7);
                scrollIndicator.style.opacity = opacity.toString();
                scrollIndicator.style.transform = `translateX(-50%) translateY(${Math.min(rate, 0)}px)`;
            }
        }
        
        // Update navbar background
        const header = document.querySelector('header');
        if (scrolled > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.9)';
            header.style.boxShadow = 'none';
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollElements);
            ticking = true;
        }
    }

    // --- Scroll Indicator Animation and Navbar Updates ---
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // --- Dynamic Scroll Indicator Management ---
    function adjustScrollIndicatorPosition() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        if (scrollIndicator) {
            const viewportHeight = window.innerHeight;
            
            // Hide on very small screens
            if (viewportHeight < 500) {
                scrollIndicator.style.display = 'none';
            } else {
                scrollIndicator.style.display = 'flex';
            }
            
            // Add click functionality to scroll to next section
            scrollIndicator.addEventListener('click', function() {
                const projectsSection = document.querySelector('#projects');
                if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }
    
    // Run on load and resize
    window.addEventListener('load', adjustScrollIndicatorPosition);
    window.addEventListener('resize', adjustScrollIndicatorPosition);
    
    // Also run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', adjustScrollIndicatorPosition);
    } else {
        adjustScrollIndicatorPosition();
    }
    
    /* ========================================
       SCROLL PROGRESS INDICATOR
       ======================================== */
    
    /**
     * Update scroll progress bar based on page scroll position
     * Creates a visual indicator of reading progress
     */
    function updateScrollProgress() {
        const scrolled = window.pageYOffset;
        const maxScrollHeight = document.body.scrollHeight - window.innerHeight;
        const scrollProgress = (scrolled / maxScrollHeight) * 100;
        
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            progressBar.style.width = scrollProgress + '%';
        }
    }
    
    // Add scroll listener with passive flag for better performance
    window.addEventListener('scroll', updateScrollProgress, { passive: true });

    /* ========================================
       ENHANCED FORM SUBMISSION HANDLING
       ======================================== */
    
    // Get contact form element
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        /**
         * Handle contact form submission with validation and user feedback
         */
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Extract form data
            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const phone = formData.get('phone').trim();
            const service = formData.get('service');
            const message = formData.get('message').trim();
            
            // Validate required fields
            if (!name || !email || !message || !service) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            // Validate email format using regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state on submit button
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            submitButton.style.opacity = '0.7';
            
            // Simulate form submission process (replace with actual API endpoint)
            setTimeout(() => {
                // Show success message with personalized content
                showFormMessage(`Thank you, ${name}! Your inquiry about ${service.replace('-', ' ')} has been sent successfully. We will contact you within 24 hours.`, 'success');
                
                // Reset form to clear all fields
                this.reset();
                
                // Reset submit button to original state
                submitButton.textContent = 'Send Message';
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
                
            }, 2000); // 2-second delay to simulate processing time
        });
    }

    /* ========================================
       FORM MESSAGE DISPLAY UTILITY
       ======================================== */
    
    /**
     * Display form submission messages (success/error)
     * @param {string} message - Message text to display
     * @param {string} type - Message type ('success' or 'error')
     */
    function showFormMessage(message, type) {
        // Remove any existing message to prevent duplicates
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.innerHTML = message;
        
        // Append message to form
        const form = document.querySelector('.contact-form');
        form.appendChild(messageDiv);
        
        // Auto-remove message after 6 seconds for better UX
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 6000);
    }

    /* ========================================
       INITIALIZE INNOVATIVE FEATURES
       ======================================== */
    
    // Initialize theme system (already done above in theme section)
    
    // Initialize innovative hero section if present
    if (document.querySelector('.hero')) {
        initInnovativeHero();
    }
    
    // Initialize innovative portfolio system
    if (document.querySelector('.portfolio-container')) {
        initInnovativePortfolio();
    }
    
    // Initialize additional interactive features throughout the website
    initScrollAnimations();
    initServiceCardEffects();
    initInteractiveFAQ();
    initParallaxEffects();
    initFormEnhancements();
    
    // Initialize global floating actions
    initFloatingActions();
    
    // Initialize global reading progress
    initReadingProgress();
    
    console.log('✅ All innovative features initialized successfully!');

}); // End of DOMContentLoaded event listener

/* ========================================
   ADDITIONAL UTILITY FUNCTIONS
   ======================================== */

// Scroll-triggered animations for all sections
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all service cards, testimonials, and other elements
    document.querySelectorAll('.service-card, .testimonial-card, .faq-item, .stat-item').forEach(el => {
        observer.observe(el);
    });
}

// Enhanced hover effects for service cards
function initServiceCardEffects() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add glowing effect
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 20px 40px rgba(184, 134, 11, 0.3)';
            
            // Animate icon
            const icon = card.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
            
            const icon = card.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });
}

// Interactive FAQ system
function initInteractiveFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        if (question && answer && toggle) {
            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const otherToggle = otherItem.querySelector('.faq-toggle');
                    if (otherToggle) otherToggle.textContent = '+';
                });
                
                // Toggle current item
                if (!isOpen) {
                    item.classList.add('active');
                    toggle.textContent = '−';
                } else {
                    toggle.textContent = '+';
                }
            });
        }
    });
}

// Global parallax effect for background elements
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    function updateParallax() {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateParallax);
    });
}

// Enhanced form interactions
function initFormEnhancements() {
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');
    
    formInputs.forEach(input => {
        // Add floating label effect
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Check if already has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
}

/**
 * Initialize any additional features that don't require DOM to be loaded
 * This section can be used for global utilities and configurations
 */

// Performance monitoring (optional)
if ('performance' in window) {
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    });
}

// Service Worker registration for PWA features (if applicable)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment below to register service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then((registration) => {
        //         console.log('SW registered: ', registration);
        //     })
        //     .catch((registrationError) => {
        //         console.log('SW registration failed: ', registrationError);
        //     });
    });
}

/* ========================================
   INNOVATIVE HERO SECTION EFFECTS
   ======================================== */

function initInnovativeHero() {
    try {
        initParticleSystem();
        initHeroAnimations();
        initInteractiveElements();
        initHeroStats();
        initCursorTrail();
        console.log('Innovative hero section initialized successfully');
    } catch (error) {
        console.error('Error initializing innovative hero:', error);
    }
}

// Particle System for Hero Background
function initParticleSystem() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 50;
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 3 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            
            // Wrap around edges
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections between nearby particles
        drawConnections();
        
        requestAnimationFrame(animateParticles);
    }
    
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(212, 175, 55, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    }
    
    animateParticles();
}

// Hero Text Animations
function initHeroAnimations() {
    // Animate hero statistics with intersection observer
    const statItems = document.querySelectorAll('.stat-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const numberElement = entry.target.querySelector('.stat-number');
                
                animateNumber(numberElement, 0, target, 2000);
                observer.unobserve(entry.target);
            }
        });
    });
    
    statItems.forEach(item => observer.observe(item));
    
    // Dynamic text rotation
    const textItems = document.querySelectorAll('.text-item');
    let currentIndex = 0;
    
    function rotateText() {
        textItems.forEach((item, index) => {
            item.classList.remove('active');
            if (index === currentIndex) {
                item.classList.add('active');
            }
        });
        
        currentIndex = (currentIndex + 1) % textItems.length;
    }
    
    if (textItems.length > 0) {
        setInterval(rotateText, 2000);
    }
}

// Interactive Elements
function initInteractiveElements() {
    // Virtual tour button
    const virtualTourBtn = document.getElementById('virtual-tour-btn');
    if (virtualTourBtn) {
        virtualTourBtn.addEventListener('click', () => {
            createVirtualTourModal();
        });
    }
    
    // Magnetic button effects
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mouseenter', (e) => {
            btn.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', (e) => {
            btn.style.transform = 'translateY(0) scale(1)';
        });
        
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translateY(-3px) scale(1.05) translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
    });
}

// Hero Statistics Animation
function initHeroStats() {
    function animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        
        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (end - start) * easeOutQuad(progress));
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        }
        
        requestAnimationFrame(updateNumber);
    }
    
    function easeOutQuad(t) {
        return t * (2 - t);
    }
}

// Cursor Trail Effect
function initCursorTrail() {
    const trail = document.getElementById('cursor-trail');
    if (!trail) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        trail.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        trail.style.opacity = '0';
    });
    
    function updateTrail() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        trail.style.left = trailX - 10 + 'px';
        trail.style.top = trailY - 10 + 'px';
        
        requestAnimationFrame(updateTrail);
    }
    
    updateTrail();
}

// Floating Action Buttons
function initFloatingActions() {
    const themeToggle = document.getElementById('global-theme-toggle');
    const soundToggle = document.getElementById('global-sound-toggle');
    const helpToggle = document.getElementById('global-help-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            // Toggle between light and dark themes
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            const icon = themeToggle.querySelector('.fab-icon');
            icon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
            
            // Add transition effect
            document.body.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        });
    }
    
    if (soundToggle) {
        let soundEnabled = localStorage.getItem('soundEnabled') !== 'false';
        const icon = soundToggle.querySelector('.fab-icon');
        icon.textContent = soundEnabled ? '🔊' : '🔇';
        
        soundToggle.addEventListener('click', () => {
            soundEnabled = !soundEnabled;
            localStorage.setItem('soundEnabled', soundEnabled);
            icon.textContent = soundEnabled ? '🔊' : '🔇';
            
            // Visual feedback
            soundToggle.style.transform = 'scale(0.9)';
            setTimeout(() => {
                soundToggle.style.transform = '';
            }, 150);
        });
    }
    
    if (helpToggle) {
        helpToggle.addEventListener('click', () => {
            createHelpModal();
        });
    }
}

// Reading Progress Indicator - Now Global
function initReadingProgress() {
    const progressBar = document.querySelector('.global-reading-progress .progress-bar');
    if (!progressBar) return;
    
    function updateProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = Math.min(scrollPercent, 100) + '%';
    }
    
    window.addEventListener('scroll', updateProgress);
    updateProgress();
}

// Initialize theme from localStorage on page load
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const themeToggle = document.getElementById('global-theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('.fab-icon');
        if (icon) {
            icon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
        }
    }
}

// Virtual Tour Modal
function createVirtualTourModal() {
    const modal = document.createElement('div');
    modal.className = 'virtual-tour-modal';
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>Virtual Tour Experience</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="tour-placeholder">
                    <h4>🏠 Interactive 3D Tour</h4>
                    <p>Experience our projects in immersive 3D virtual reality</p>
                    <div class="tour-buttons">
                        <button class="tour-btn">🏛️ Luxury Villas</button>
                        <button class="tour-btn">🏢 Modern Apartments</button>
                        <button class="tour-btn">🌿 Eco Retreats</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const backdrop = modal.querySelector('.modal-backdrop');
    
    closeBtn.addEventListener('click', () => modal.remove());
    backdrop.addEventListener('click', () => modal.remove());
    
    // Animate modal in
    setTimeout(() => modal.classList.add('active'), 10);
}

// Help Modal
function createHelpModal() {
    const modal = document.createElement('div');
    modal.className = 'help-modal';
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>Navigation Help</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="help-content">
                    <h4>🎯 Interactive Features</h4>
                    <ul>
                        <li>🖱️ Move cursor to see particle connections</li>
                        <li>🔄 Watch dynamic text animations</li>
                        <li>📊 Scroll to animate statistics</li>
                        <li>🎨 Use filter buttons in portfolio</li>
                        <li>🌙 Toggle theme with floating button</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const backdrop = modal.querySelector('.modal-backdrop');
    
    closeBtn.addEventListener('click', () => modal.remove());
    backdrop.addEventListener('click', () => modal.remove());
    
    // Animate modal in
    setTimeout(() => modal.classList.add('active'), 10);
}