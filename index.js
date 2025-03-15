/*//////////////   FUNCTION IS MOBILE  /////////////// */

function isMobile() {
    return window.innerWidth <= 768; 
}

/*//////////////   CHANGE VIDEO SOURCES FOR MOBILE  /////////////// */

// Fonction qui change les sources des vidéos en fonction du type d'appareil (mobile ou non)
function changeVideoSourcesForMobile() {
    if (isMobile()) {
        // Sélectionne toutes les vidéos avec la classe '.video'
        const videos = document.querySelectorAll('.video');

        // Change la source de chaque vidéo pour la version basse résolution
        videos.forEach((video) => {
            const currentSrc = video.src;

            // Si la vidéo n'est pas encore une version basse résolution
            if (currentSrc.indexOf('preview') !== -1) {
                // Remplace 'preview' par 'low' dans le nom du fichier
                const lowResolutionSrc = currentSrc.replace('preview', 'low');

                // Met à jour la source de la vidéo
                video.src = lowResolutionSrc;
                video.load(); // Recharge la vidéo avec la nouvelle source
            }
        });
    }
}

// Exécute la fonction pour changer les sources lorsque la page est chargée
document.addEventListener('DOMContentLoaded', changeVideoSourcesForMobile);

// Optionnel : Exécute la fonction de nouveau lorsque la taille de la fenêtre change (si l'utilisateur redimensionne)
window.addEventListener('resize', changeVideoSourcesForMobile);


/*//////////////   SCROLL APRES VIDEO - Desktop /////////////// */

if (!isMobile()) {
    document.addEventListener("DOMContentLoaded", function () {
        const introVideo = document.getElementById("intro");
        const introLoopVideo = document.getElementById("introLoop");
        const marginP2 = document.getElementById("margin_p2");
        let hasScrolled = false;

        if (!localStorage.getItem("hasVisited")) {
            localStorage.setItem("hasVisited", "true");
            introVideo.style.display = "block";
            introVideo.play().catch((err) => console.error("Erreur de lecture de la vidéo INTRO.mp4:", err));

            introVideo.addEventListener("ended", function () {
                introVideo.style.display = "none";
                introLoopVideo.style.display = "block";
                introLoopVideo.play().catch((err) => console.error("Erreur de lecture de la vidéo INTRO loop:", err));

                setTimeout(function () {
                    if (!hasScrolled) {
                        hasScrolled = true;
                        marginP2.scrollIntoView({ behavior: "smooth" });
                    }
                }, 2000);
            });
        } else {
            introVideo.style.display = "block";
            introVideo.play().catch((err) => console.error("Erreur de lecture de la vidéo INTRO.mp4:", err));

            introVideo.addEventListener("ended", function () {
                introVideo.style.display = "none";
                introLoopVideo.style.display = "block";
                introLoopVideo.play().catch((err) => console.error("Erreur de lecture de la vidéo INTRO loop:", err));
            });
        }

        introLoopVideo.addEventListener("ended", function () {
            introLoopVideo.play();
        });
    });
}

/*//////////////   SCROLL APRES VIDEO - Mobile /////////////// */

if (isMobile()) {
    document.addEventListener("DOMContentLoaded", function () {
        const introLoopVideo = document.getElementById("introLoop");
        introLoopVideo.style.display = "block";
        introLoopVideo.play().catch((err) => console.error("Erreur de lecture de la vidéo INTRO loop:", err));

        introLoopVideo.addEventListener("ended", function () {
            introLoopVideo.play();
        });
    });
}

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

/*//////////////   INTRO TEXT DISPARAIT  /////////////// */

document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.getElementById('playButton');
    const introText = document.getElementById('introText');

    playButton.addEventListener('click', function() {
        introText.style.opacity = '0';
        introText.style.filter = 'blur(10px)';

        introText.addEventListener('transitionend', function() {
            introText.style.display = 'none';
        });
    });
});

/*//////////////   FORCE NO SMOOTH  /////////////// */

document.addEventListener('DOMContentLoaded', function () {
    if (window.location.href.includes('?smooth=no')) {
        window.history.replaceState({}, document.title, 'index.html');
    }
});

/*//////////////   NO SMOOTH LANDING   /////////////// */

const margin_p2 = document.querySelector('#margin_p2');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const smooth = urlParams.get('smooth');  

if (smooth === 'no') { 
    margin_p2.scrollIntoView({behavior:'instant'});
}

/*//////////////   MINIATURES - Effet Hover sur Vidéo    /////////////// */

const videos = document.querySelectorAll('.video');

videos.forEach(video => {
    video.addEventListener('mouseenter', () => video.play());
    video.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
    });
});
/*//////////////   HOVERED - mobile  /////////////// */

function isElementInView(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return rect.top >= (windowHeight * 0.10) && rect.bottom <= (windowHeight * 0.80);
}

function applyHoverEffectOnText() {
    if (!isMobile()) return;

    const items = document.querySelectorAll('.item');
    let selectedItem = null;

    // On vérifie quel item est au centre de l'écran
    for (let item of items) {
        const video = item.querySelector('.video');
        if (video && isElementInView(video)) {
            selectedItem = item;
            break;
        }
    }

    items.forEach((item) => {
        const video = item.querySelector('.video');
        
        if (item === selectedItem) {
            // Si l'élément est celui sélectionné, on active la lecture de la vidéo
            item.classList.add('hovered');
            if (video.paused || video.currentTime === 0) {
                // Si la vidéo est en pause ou a été réinitialisée, on la relance
                video.load(); // Recharge la vidéo (évite de charger plusieurs fois)
                video.play();
            }
        } else {
            // Si l'élément n'est pas sélectionné, on met la vidéo en pause et on réinitialise
            item.classList.remove('hovered');
            if (video) {
                video.pause();
                video.currentTime = 0;  // Réinitialise la vidéo
            }
        }
    });
}

if (isMobile()) {
    window.addEventListener('load', applyHoverEffectOnText);
    window.addEventListener('scroll', applyHoverEffectOnText);
    window.addEventListener('resize', applyHoverEffectOnText);
}




/*//////////////   LAZY LOAD /////////////// */

function isElementInView(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return rect.top >= 0 && rect.bottom <= windowHeight;
}

function lazyLoadVideo() {
    const videos = document.querySelectorAll('video[data-src]');
    videos.forEach((video) => {
        if (isElementInView(video) && !video.src) {
            const src = video.getAttribute('data-src');
            video.src = src;
            video.load();
        }
    });
}

function togglePlayPause() {
    const video = this.closest('.player').querySelector('video');
    if (video.paused) {
        video.play();
        this.textContent = '❚❚';
    } else {
        video.pause();
        this.textContent = '►';
    }
}

window.addEventListener('scroll', lazyLoadVideo);
window.addEventListener('resize', lazyLoadVideo);

document.addEventListener('DOMContentLoaded', lazyLoadVideo);

const playButton = document.querySelector('.player__button.toggle');
playButton.addEventListener('click', togglePlayPause);


