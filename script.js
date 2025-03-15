/*//////////////   APPARITION TEXT + FOOTER   /////////////// */

document.addEventListener('DOMContentLoaded', function () {
    const footer = document.getElementById('footer');
    const footerLinks = footer.querySelectorAll('a');
    const navText2Links = document.querySelectorAll('.nav a');

    if (!footer || footerLinks.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const handleIntersection = (entries) => {
        let isVisible = false;
        entries.forEach((entry) => {
            if (entry.isIntersecting) isVisible = true;
        });

        if (isVisible) {
            footer.style.bottom = '0';
            footerLinks.forEach(link => link.classList.add('active'));
            navText2Links.forEach(link => link.classList.add('active'));
        } else {
            footer.style.bottom = '-115px';
            footerLinks.forEach(link => link.classList.remove('active'));
            navText2Links.forEach(link => link.classList.remove('active'));
        }
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    const page2 = document.getElementById('page2');
    if (page2) observer.observe(page2);
});

/*//////////////   SMOOTH ANIMATION PAGE2 (Désactivé sur Mobile) /////////////// */

if (!isMobile()) {
    let lastScrollPosition = 0;

    window.addEventListener('scroll', () => {
        const currentScrollPosition = window.scrollY;

        const page2 = document.querySelector('#page2');
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        const page2OffsetTop = page2.offsetTop - headerHeight;

        if (currentScrollPosition > lastScrollPosition && lastScrollPosition === 0) {
            window.scrollTo({
                top: page2OffsetTop,
                behavior: 'smooth'
            });
        }

        lastScrollPosition = currentScrollPosition;
    });
}
