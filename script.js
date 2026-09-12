// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navEl = document.querySelector('header nav');

if (navToggle && navEl) {
    navToggle.addEventListener('click', () => {
        const isOpen = navEl.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        navToggle.textContent = isOpen ? '✕' : '☰';
    });

    navEl.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navEl.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.textContent = '☰';
        });
    });
}

// Scroll-reveal animation (progressive enhancement — safe if JS fails/disabled)
const revealTargets = document.querySelectorAll('main section:not(#about), .project-item, .photo-item');

if (revealTargets.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealTargets.forEach((el) => {
        el.classList.add('reveal-init');
        observer.observe(el);
    });
}
