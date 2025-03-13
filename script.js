/*//////////////   APPARITION TEXT + FOOTER   /////////////// */


document.addEventListener('DOMContentLoaded', function () {
    const footer = document.getElementById('footer');
    const footerLinks = footer.querySelectorAll('a'); // Sélectionne tous les liens dans le footer
    const navText2Links = document.querySelectorAll('.nav a');

    // Vérification des éléments nécessaires
    if (!footer || footerLinks.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Déclenchement à 10% de visibilité
    };

    const handleIntersection = (entries) => {
        let isVisible = false;
        entries.forEach((entry) => {
            if (entry.isIntersecting) isVisible = true;
        });

        if (isVisible) {
            footer.style.bottom = '0';
            footerLinks.forEach(link => link.classList.add('active')); // Ajoute une classe active aux liens du footer
            navText2Links.forEach(link => link.classList.add('active'));
        } else {
<<<<<<< HEAD
            footer.style.bottom = '-115px';
=======
            footer.style.bottom = '-90px';
>>>>>>> 15aa98b2e51d9f05b395e149ed168e4051ba83cd
            footerLinks.forEach(link => link.classList.remove('active')); // Retire la classe active
            navText2Links.forEach(link => link.classList.remove('active'));
        }
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Observer les éléments déclencheurs si nécessaires
<<<<<<< HEAD
    // const autoGrid = document.querySelector('.auto-grid');
    const page2 = document.getElementById('page2');
    // if (autoGrid) observer.observe(autoGrid);
=======
    const autoGrid = document.querySelector('.auto-grid');
    const page2 = document.getElementById('page2');
    if (autoGrid) observer.observe(autoGrid);
>>>>>>> 15aa98b2e51d9f05b395e149ed168e4051ba83cd
    if (page2) observer.observe(page2);
});




/*//////////////   SMOOTH ANIMATION PAGE2  /////////////// */

let lastScrollPosition = 0;

window.addEventListener('scroll', () => {
    const currentScrollPosition = window.scrollY;

    const page2 = document.querySelector('#page2');
    const headerHeight = document.querySelector('header')?.offsetHeight || 0;
    const page2OffsetTop = page2.offsetTop - headerHeight;

    // Scrolling down from the top to #page2
    if (currentScrollPosition > lastScrollPosition && lastScrollPosition === 0) {
        window.scrollTo({
            top: page2OffsetTop,
            behavior: 'smooth'
        });
    }

    // // Scrolling up from #page2 to the top of the page
    // if (currentScrollPosition < lastScrollPosition && currentScrollPosition <= page2OffsetTop) {
    //     window.scrollTo({
    //         top: 0,
    //         behavior: 'smooth'
    //     });
    // }

    lastScrollPosition = currentScrollPosition;
});

