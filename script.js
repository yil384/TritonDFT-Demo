// TritonDFT — Automating DFT Multi-Agent Framework Website
// Project page interactions: TOC, smooth scroll, share links, fade-ins.

(function () {
    'use strict';

    const NAVBAR_OFFSET = 60;
    const TOC_BREAKPOINT = 1199;
    const SHARE_TITLE = 'TritonDFT: Automating DFT with a Multi-Agent Framework';
    const FALLBACK_URL = 'https://tritondft.com';

    // ---- TOC visibility ----
    function updateTOCVisibility() {
        const tocSidebar = document.getElementById('tocSidebar');
        if (!tocSidebar) return;
        tocSidebar.style.display = window.innerWidth > TOC_BREAKPOINT ? 'block' : 'none';
    }

    // ---- Smooth scrolling for anchor links ----
    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', (e) => {
                const targetId = anchor.getAttribute('href');
                if (!targetId || targetId === '#') return;

                const target = document.querySelector(targetId);
                if (!target) return;

                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - NAVBAR_OFFSET,
                    behavior: 'smooth',
                });
            });
        });
    }

    // ---- Active section highlighting in TOC ----
    function setupTOCHighlight() {
        const sections = document.querySelectorAll('section[id]');
        const tocLinks = document.querySelectorAll('.toc-content nav a');
        if (!sections.length || !tocLinks.length) return;

        function highlight() {
            const scrollPosition = window.pageYOffset + 100;
            let currentSection = '';

            sections.forEach((section) => {
                const top = section.offsetTop;
                const height = section.clientHeight;
                if (scrollPosition >= top && scrollPosition < top + height) {
                    currentSection = section.getAttribute('id');
                }
            });

            tocLinks.forEach((link) => {
                link.classList.toggle(
                    'active',
                    link.getAttribute('href') === '#' + currentSection
                );
            });
        }

        window.addEventListener('scroll', highlight, { passive: true });
        highlight();
    }

    // ---- Dynamic share URLs (use live URL when hosted) ----
    function setupShareLinks() {
        const pageUrl =
            window.location.protocol === 'http:' || window.location.protocol === 'https:'
                ? window.location.href
                : FALLBACK_URL;
        const encodedUrl = encodeURIComponent(pageUrl);
        const encodedTitle = encodeURIComponent(SHARE_TITLE);

        const twitter = document.getElementById('share-twitter');
        if (twitter) {
            twitter.href = 'https://twitter.com/intent/tweet?text=' + encodedTitle + '&url=' + encodedUrl;
        }

        const linkedin = document.getElementById('share-linkedin');
        if (linkedin) {
            linkedin.href = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodedUrl;
        }
    }

    // ---- Fade-in animations on scroll ----
    function setupFadeIn() {
        if (!('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in-up');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        document
            .querySelectorAll(
                '.agent-card, .dimension-box, .finding-box, .stat-box, .figure-container, .demo-video-container'
            )
            .forEach((el) => observer.observe(el));
    }

    // ---- Image error fallback ----
    function setupImageFallback() {
        document.querySelectorAll('img[src*="assets/"]').forEach((img) => {
            img.addEventListener('error', function () {
                this.style.background =
                    'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
                this.style.minHeight = '300px';
                this.style.display = 'block';
            });
        });
    }

    // ---- Wrap any unwrapped results tables for horizontal scroll ----
    function wrapResultsTables() {
        document.querySelectorAll('.results-table').forEach((table) => {
            if (!table.parentElement.classList.contains('results-table-container')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'results-table-container';
                table.parentNode.insertBefore(wrapper, table);
                wrapper.appendChild(table);
            }
        });
    }

    // ---- Single bootstrap entry point ----
    document.addEventListener('DOMContentLoaded', () => {
        updateTOCVisibility();
        setupSmoothScroll();
        setupTOCHighlight();
        setupShareLinks();
        setupFadeIn();
        setupImageFallback();
        wrapResultsTables();
    });

    window.addEventListener('resize', updateTOCVisibility);
})();
