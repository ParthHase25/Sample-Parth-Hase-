/*
 * ========================================
 * SHRIRAM ARCHITECTURE - JAVASCRIPT
 * ========================================
 * 
 * Interactive functionality for the architecture website
 * Features: Theme toggle, mobile navigation, animated counters, smooth scrolling
 * Author: Shriram Architecture Team
 * Version: 2.0
 * Last Updated: 2024
 */

// Wait for DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', () => {

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

    // --- Project Filtering System ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCardsList = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCardsList.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

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

}); // End of DOMContentLoaded event listener

/* ========================================
   ADDITIONAL UTILITY FUNCTIONS
   ======================================== */

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