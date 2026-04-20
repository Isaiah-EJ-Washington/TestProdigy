// ============================================
// PRODIGY SPORTS GROUP - WORKING JAVASCRIPT
// Last known working state
// ============================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {

    // ===== FLIP CARDS =====
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
        card.addEventListener('click', function () {
            this.classList.toggle('flipped');
        });
    });

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

    // ===== COUNT UP ANIMATION (Stats) =====
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length) {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const targetText = el.innerText;
                    const targetNum = parseInt(targetText.replace(/[^0-9]/g, ''));

                    if (!isNaN(targetNum)) {
                        let current = 0;
                        const increment = targetNum / 60;
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= targetNum) {
                                el.innerText = targetNum + (targetText.includes('+') ? '+' : '');
                                clearInterval(timer);
                            } else {
                                el.innerText = Math.floor(current) + (targetText.includes('+') ? '+' : '');
                            }
                        }, 25);
                    }
                    countObserver.unobserve(el);
                }
            });
        }, observerOptions);

        statNumbers.forEach(el => countObserver.observe(el));
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
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                if (menuToggle) menuToggle.classList.remove('active');
            });
        });
    }

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