document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // 1. FLIP CARDS 
    // ============================================
    function initFlipCards() {
        document.querySelectorAll('.flip-card').forEach(card => {
            card.removeEventListener('click', card._flipHandler);
            const handler = function (e) {
                if (e.target.closest('a, button')) return;
                this.classList.toggle('flipped');
            };
            card._flipHandler = handler;
            card.addEventListener('click', handler);
        });
        console.log('Flip cards initialized. Found:', document.querySelectorAll('.flip-card').length);
    }

    // ============================================
    // 2. CAROUSEL - SMOOTHER & FASTER
    // ============================================
    function initCarousel() {
        const track = document.getElementById('carouselTrack');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const pauseBtn = document.getElementById('pauseBtn');

        if (!track) return;

        // Card Data
        const athletes = [
            {
                name: "Isaac Terrell",
                info: "Iowa State | Defensive End",
                img: "images/IsaacTerell.jpg",
                details: [
                    { label: "Height", value: "6'2\"" },
                    { label: "Weight", value: "247 lbs" },
                    { label: "School", value: "Iowa State" },
                    { label: "Class", value: "Junior" },
                    { label: "Stats", value: "15 tackles, 7 sacks, 1 FF" }
                ]
            },
            {
                name: "Brandon Booker",
                info: "SMU | Linebacker",
                img: "images/athlete2.jpg",
                details: [
                    { label: "Height", value: "6'1\"" },
                    { label: "Weight", value: "225 lbs" },
                    { label: "School", value: "SMU" },
                    { label: "Class", value: "Sophomore" },
                    { label: "Stats", value: "26 tackles, 0.5 sacks" }
                ]
            },
            {
                name: "Bryson Lamb",
                info: "Iowa State | Defensive Tackle",
                img: "images/BrysonLamb.jpg",
                details: [
                    { label: "Height", value: "6'2\"" },
                    { label: "Weight", value: "301 lbs" },
                    { label: "School", value: "Iowa State" },
                    { label: "Class", value: "Junior" },
                    { label: "Stats", value: "13 tackles, 1.5 sacks" }
                ]
            },
            {
                name: "Montana Wheeler",
                info: "Kansas State | Guard",
                img: "images/MontanaW.jpg",
                details: [
                    { label: "Height", value: "5'10\"" },
                    { label: "Weight", value: "170 lbs" },
                    { label: "School", value: "Bradley" },
                    { label: "Class", value: "Freshman" },
                    { label: "Stats", value: "8.5 PTs, 2.8 ASTs" }
                ]
            },
            {
                name: "Eric Fiedler",
                info: "Colorado St | Forward",
                img: "images/athlete5.jpg",
                details: [
                    { label: "Height", value: "6'8\"" },
                    { label: "Weight", value: "210 lbs" },
                    { label: "School", value: "Colorado State" },
                    { label: "Class", value: "Rising Freshman" },
                    { label: "Stats", value: "N/A" }
                ]
            },
            {
                name: "Daylen Russell",
                info: "Louisville | Defensive Tackle",
                img: "images/athlete6.jpg",
                details: [
                    { label: "Height", value: "6'3\"" },
                    { label: "Weight", value: "300 lbs" },
                    { label: "School", value: "Louisville" },
                    { label: "Class", value: "Freshmen" },
                    { label: "Stats", value: "N/A" }
                ]
            },
            {
                name: "JT Rock",
                info: "Kansas State | Center",
                img: "images/JTRock.jpg",
                details: [
                    { label: "Height", value: "7'1\"" },
                    { label: "Weight", value: "260 lbs" },
                    { label: "School", value: "Kansas State" },
                    { label: "Class", value: "Junior" },
                    { label: "Stats", value: "6.2 PTs, 3.5 REBs" }
                ]
            }
        ];

        // Build Cards (SINGLE definition)
        function buildCard(athlete) {
            return `
                <div class="flip-card">
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <div class="card-image-wrapper">
                                <img src="${athlete.img}" alt="${athlete.name}">
                                <div class="card-image-overlay"></div>
                            </div>
                            <div class="card-content">
                                <h3>${athlete.name}</h3>
                                <p>${athlete.info}</p>
                                <span class="flip-hint">Click to view stats →</span>
                            </div>
                        </div>
                        <div class="flip-card-back">
                            <div class="back-content">
                                <h3>${athlete.name}</h3>
                                <div class="athlete-details">
                                    ${athlete.details.map(d => `
                                        <div class="detail-row">
                                            <span class="detail-label">${d.label}</span>
                                            <span class="detail-value">${d.value}</span>
                                        </div>
                                    `).join('')}
                                </div>
                                <span class="flip-back-hint">Click to flip back</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        // Build the carousel with 2 sets for seamless loop
        const cardsHTML = athletes.map(a => buildCard(a)).join('');
        track.innerHTML = cardsHTML + cardsHTML;

        // Initialize flip cards after they are created
        initFlipCards();

        // --- Carousel State ---
        let currentIndex = 0;
        let autoPlayInterval = null;
        let isPaused = false;
        let isTransitioning = false;
        const totalCards = athletes.length;
        const cardWidth = 300;
        const transitionDuration = 400;
        const autoPlayDelay = 2800;

        // --- Move to a specific index ---
        function goTo(index, animate = true) {
            if (isTransitioning) return;
            isTransitioning = true;

            const offset = -(index * cardWidth);
            track.style.transition = animate
                ? `transform ${transitionDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`
                : 'none';
            track.style.transform = `translateX(${offset}px)`;

            setTimeout(() => {
                isTransitioning = false;
            }, transitionDuration + 50);

            if (index >= totalCards) {
                setTimeout(() => {
                    track.style.transition = 'none';
                    track.style.transform = 'translateX(0px)';
                    currentIndex = 0;
                    void track.offsetHeight;
                }, transitionDuration + 100);
            }
        }

        // --- Next/Previous ---
        function next() {
            if (isTransitioning) return;
            currentIndex++;
            if (currentIndex > totalCards) {
                currentIndex = 1;
                goTo(currentIndex);
                setTimeout(() => {
                    track.style.transition = 'none';
                    track.style.transform = 'translateX(0px)';
                    currentIndex = 0;
                    void track.offsetHeight;
                }, 100);
            } else {
                goTo(currentIndex);
            }
        }

        function prev() {
            if (isTransitioning) return;
            if (currentIndex <= 0) {
                currentIndex = totalCards - 1;
                goTo(currentIndex);
            } else {
                currentIndex--;
                goTo(currentIndex);
            }
        }

        // --- Auto-Play ---
        function startAutoPlay() {
            if (autoPlayInterval) clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(() => {
                if (!isPaused) {
                    next();
                }
            }, autoPlayDelay);
        }

        function togglePause() {
            isPaused = !isPaused;
            if (pauseBtn) {
                if (isPaused) {
                    pauseBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg>`;
                    pauseBtn.setAttribute('aria-label', 'Resume');
                } else {
                    pauseBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>`;
                    pauseBtn.setAttribute('aria-label', 'Pause');
                }
            }
        }

        // --- Event Listeners ---
        if (nextBtn) nextBtn.addEventListener('click', next);
        if (prevBtn) prevBtn.addEventListener('click', prev);
        if (pauseBtn) pauseBtn.addEventListener('click', togglePause);

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
            if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
            if (e.key === ' ') { e.preventDefault(); togglePause(); }
        });

        // --- Resize handling ---
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                goTo(currentIndex, false);
            }, 300);
        });

        // --- Init ---
        goTo(0, false);
        startAutoPlay();
    }

    // ============================================
    // 3. HORIZONTAL SCROLL (if using old grid)
    // ============================================
    function initHorizontalScroll() {
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
    }

    // ============================================
    // 4. ACCORDION (Process Page)
    // ============================================
    function initAccordion() {
        const accordionItems = document.querySelectorAll('.accordion-item');
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            if (header) {
                header.addEventListener('click', () => {
                    accordionItems.forEach(other => {
                        if (other !== item && other.classList.contains('active')) {
                            other.classList.remove('active');
                        }
                    });
                    item.classList.toggle('active');
                });
            }
        });
    }

    // ============================================
    // 5. COUNT UP ANIMATION FOR STATS
    // ============================================
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
                        const targetNum = parseFloat(targetValue.replace(/[^0-9.]/g, ''));
                        const prefix = rawText.match(/^\$/) ? '$' : '';
                        let suffix = '';
                        if (rawText.includes('M+')) suffix = 'M+';
                        else if (rawText.includes('+')) suffix = '+';
                        else if (rawText.includes('M')) suffix = 'M';

                        let current = 0;
                        const duration = 2000;
                        const stepTime = 20;
                        const steps = duration / stepTime;
                        const increment = targetNum / steps;

                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= targetNum) {
                                el.innerText = prefix + targetNum + suffix;
                                clearInterval(timer);
                            } else {
                                el.innerText = prefix + Math.floor(current) + suffix;
                            }
                        }, stepTime);
                    }
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(el => observer.observe(el));
    }

    // ============================================
    // 6. HEADER SCROLL EFFECT
    // ============================================
    function initHeaderScroll() {
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
    }

    // ============================================
    // 7. MOBILE MENU TOGGLE
    // ============================================
    function initMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (menuToggle && navMenu) {
            menuToggle.removeAttribute('onclick');

            menuToggle.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                navMenu.classList.toggle('active');
                this.classList.toggle('active');

                if (navMenu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });

            const navLinks = document.querySelectorAll('.nav-menu a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    if (menuToggle) menuToggle.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });

            document.addEventListener('click', function (e) {
                if (navMenu.classList.contains('active') &&
                    !navMenu.contains(e.target) &&
                    !menuToggle.contains(e.target)) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        } else {
            console.log('Menu elements not found - check your HTML');
        }
    }

    // ============================================
    // 8. SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    function initSmoothScroll() {
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
    }

    // ============================================
    // 9. SCROLL REVEAL ANIMATIONS
    // ============================================
    function initScrollReveal() {
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
    }

    // ============================================
// STATS TICKER - GOOGLE SHEETS INTEGRATION
// ============================================

// Replace with your published Google Sheets CSV URL
const SHEETS_URL = 'https://docs.google.com/spreadsheets/d/e/YOUR_SHEET_ID/pub?output=csv';

async function loadTickerStats() {
    const track = document.getElementById('tickerTrack');
    if (!track) {
        console.warn('Ticker track not found');
        return;
    }

    try {
        const response = await fetch(SHEETS_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const csvText = await response.text();
        const rows = csvText.split('\n').filter(row => row.trim() !== '');
        
        if (rows.length < 2) {
            throw new Error('No data found in spreadsheet');
        }
        
        // Parse headers
        const headers = rows[0].split(',').map(h => h.trim());
        
        // Build HTML
        let html = '';
        let playerCount = 0;
        
        for (let i = 1; i < rows.length; i++) {
            const values = rows[i].split(',').map(v => v.trim());
            
            // Skip empty rows
            if (values.length < 3 || values.every(v => v === '')) continue;
            
            const player = {};
            headers.forEach((header, index) => {
                player[header] = values[index] || '';
            });
            
            // Only show active players (if "Active" column exists)
            if (player.Active && player.Active.toLowerCase() === 'false') continue;
            
            html += `
                <span class="ticker-item">
                    <span class="player-name">${player.Name || 'Player'}</span>
                    <span class="player-college">${player.College || player.Team || ''}</span>
                    <span class="divider">|</span>
                    <span class="player-stats">${player.Stats || 'N/A'}</span>
                </span>
            `;
            
            playerCount++;
        }
        
        if (html && playerCount > 0) {
            // Duplicate for seamless scrolling
            track.innerHTML = html + html;
            console.log(`Ticker loaded with ${playerCount} players`);
        } else {
            throw new Error('No players found in spreadsheet');
        }
        
    } catch (error) {
        console.error('Ticker error:', error);
        // Show fallback message
        track.innerHTML = `
            <span class="ticker-item">
                <span class="player-name">Loading stats...</span>
                <span class="player-college">Please check console for errors</span>
            </span>
        `;
    }
}

// Load ticker when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    loadTickerStats();
});

    // ============================================
    // 10. INIT ALL
    // ============================================
    initFlipCards();
    initCarousel();
    initHorizontalScroll();
    initAccordion();
    initCountUp();
    initHeaderScroll();
    initMobileMenu();
    initSmoothScroll();
    initScrollReveal();

    console.log('Prodigy Sports Group - Site loaded successfully');
});
