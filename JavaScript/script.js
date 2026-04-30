// PRODIGY SPORTS GROUP

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {

    // ===== FLIP CARDS =====
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
        card.addEventListener('click', function () {
            this.classList.toggle('flipped');
        });
    });

    // ===== HORIZONTAL SCROLL FUNCTIONALITY =====
    const scrollContainer = document.querySelector('.athletes-grid');
    const leftArrow = document.querySelector('.scroll-arrow.left');
    const rightArrow = document.querySelector('.scroll-arrow.right');

    if (scrollContainer && leftArrow && rightArrow) {
        leftArrow.addEventListener('click', () => {
            scrollContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        rightArrow.addEventListener('click', () => {
            scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });

        // Optional: Hide arrows when at edges
        const updateArrows = () => {
            const isAtStart = scrollContainer.scrollLeft <= 10;
            const isAtEnd = scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 10;

            leftArrow.style.opacity = isAtStart ? '0.4' : '1';
            leftArrow.style.cursor = isAtStart ? 'default' : 'pointer';
            rightArrow.style.opacity = isAtEnd ? '0.4' : '1';
            rightArrow.style.cursor = isAtEnd ? 'default' : 'pointer';
        };

        scrollContainer.addEventListener('scroll', updateArrows);
        window.addEventListener('resize', updateArrows);
        updateArrows();
    }

    // ===== ACCORDION (Process Page) =====
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            // Close other items
            accordionItems.forEach(other => {
                if (other !== item && other.classList.contains('active')) {
                    other.classList.remove('active');
                }
            });
            // Toggle current
            item.classList.toggle('active');
        });
    });

    // ===== COUNT UP ANIMATION FOR STATS =====
    function initCountUp() {
        const statNumbers = document.querySelectorAll('.stat-number');

        if (statNumbers.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const rawText = el.innerText;
                    const targetValue = el.getAttribute('data-target');

                    if (targetValue && !el.hasAttribute('data-counted')) {
                        el.setAttribute('data-counted', 'true');

                        // Extract the numeric value (remove $, +, M, etc.)
                        const targetNum = parseFloat(targetValue.replace(/[^0-9.]/g, ''));

                        // Store the prefix ($) and suffix (+ or M+)
                        const prefix = rawText.match(/^\$/) ? '$' : '';
                        let suffix = '';
                        if (rawText.includes('M+')) suffix = 'M+';
                        else if (rawText.includes('+')) suffix = '+';
                        else if (rawText.includes('M')) suffix = 'M';

                        animateNumber(el, targetNum, prefix, suffix);
                    }
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(el => observer.observe(el));
    }

    function animateNumber(element, target, prefix, suffix) {
        let start = 0;
        const duration = 2000;
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.innerText = prefix + target + suffix;
                clearInterval(timer);
            } else {
                element.innerText = prefix + Math.floor(current) + suffix;
            }
        }, stepTime);
    }

    // ===== HEADER SCROLL EFFECT =====
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ===== MOBILE MENU TOGGLE =====
    document.addEventListener('DOMContentLoaded', function () {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (menuToggle && navMenu) {
            // Remove any existing listeners by cloning
            const newToggle = menuToggle.cloneNode(true);
            menuToggle.parentNode.replaceChild(newToggle, menuToggle);

            newToggle.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                navMenu.classList.toggle('active');
                this.classList.toggle('active');

                // Prevent body scroll when menu is open
                if (navMenu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });

            // Close menu when clicking a link
            const navLinks = document.querySelectorAll('.nav-menu a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    newToggle.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', function (e) {
                if (navMenu.classList.contains('active') &&
                    !navMenu.contains(e.target) &&
                    !newToggle.contains(e.target)) {
                    navMenu.classList.remove('active');
                    newToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        } else {
            console.log('Menu elements not found');
        }
    });
    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== SCROLL REVEAL ANIMATIONS =====
    const revealElements = document.querySelectorAll('.service-section, .team-card, .accordion-item, .stat');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });

    console.log('Prodigy Sports Group - Site loaded successfully');
});

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// ===== MOBILE MENU TOGGLE =====
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
});
