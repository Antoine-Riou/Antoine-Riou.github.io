/*//////////////   FUNCTION IS MOBILE  /////////////// */

function isMobile() {
    return window.innerWidth <= 768; // Taille de l'écran pour considérer mobile
}

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

/*//////////////   MINIATURES - Mobile uniquement    /////////////// */

function isElementInView(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return rect.top >= (windowHeight * 0.10) && rect.bottom <= (windowHeight * 0.80);
}

function applyHoverEffectOnText() {
    if (!isMobile()) return;

    const items = document.querySelectorAll('.item');
    let selectedItem = null;

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
            item.classList.add('hovered');
            video.play();
        } else {
            item.classList.remove('hovered');
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        }
    });
}

if (isMobile()) {
    window.addEventListener('load', applyHoverEffectOnText);
    window.addEventListener('scroll', applyHoverEffectOnText);
    window.addEventListener('resize', applyHoverEffectOnText);
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

/*//////////////   LAZY LOAD /////////////// */


