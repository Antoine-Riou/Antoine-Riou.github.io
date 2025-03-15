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

let activeVideo = null; // Variable pour suivre la vidéo active

// Fonction pour vérifier si l'on est sur mobile
function isMobile() {
    return window.innerWidth <= 768; // Considère les écrans de largeur <= 768px comme des mobiles
}

// Fonction pour vérifier si un élément est au centre de l'écran avec une plage d'épaisseur
function isElementAtCenter(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // Centre de l'écran : Calcul de la position exacte du centre
    const center = windowHeight / 2;
    
    // Augmenter la tolérance à 50 pixels pour rendre la zone plus épaisse
    const tolerance = 50;

    // Vérifier si l'élément est dans la plage d'épaisseur du centre
    return Math.abs((rect.top + rect.bottom) / 2 - center) < tolerance;
}

function manageVideosOnScroll() {
    // Applique la logique uniquement sur mobile
    if (!isMobile()) return;

    const items = document.querySelectorAll('.item');

    items.forEach((item) => {
        const video = item.querySelector('.video');

        if (video && isElementAtCenter(item)) {
            // Si l'élément est au centre de l'écran, on joue la vidéo si ce n'est pas déjà la vidéo active
            if (video.paused && activeVideo !== video) {
                if (activeVideo) {
                    activeVideo.pause(); // Met en pause la vidéo précédente
                    activeVideo.currentTime = 0; // Réinitialise la vidéo précédente
                    activeVideo.closest('.item').classList.remove('hovered'); // Enlève la classe hovered de la vidéo précédente
                }
                video.play();
                item.classList.add('hovered');
                activeVideo = video; // Marque cette vidéo comme étant active
            }
        } else {
            // Si l'élément n'est pas au centre, on met la vidéo en pause si elle est active et ne l'a pas encore été
            if (video !== activeVideo && !video.paused) {
                video.pause();
                video.currentTime = 0; // Réinitialise la vidéo
                item.classList.remove('hovered');
            }
        }
    });
}

// Appeler la fonction pour gérer les vidéos lors du scroll
window.addEventListener('scroll', manageVideosOnScroll);

// Appeler la fonction pour gérer les vidéos lorsque la page se charge
window.addEventListener('load', manageVideosOnScroll);

// Appeler la fonction lors du redimensionnement
window.addEventListener('resize', manageVideosOnScroll);




/*//////////////   LAZY LOAD /////////////// */

function isElementInView(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return rect.top >= 0 && rect.bottom <= windowHeight;
}

function lazyLoadVideo() {
    const videos = document.querySelectorAll('video[data-src]');
    videos.forEach((video) => {
        if (isElementInView(video) && !video.dataset.loaded) {
            const src = video.getAttribute('data-src');
            video.querySelector('source').setAttribute('src', src);
            video.load();
            video.dataset.loaded = "true";
        }
    });
}

// Toggle Play/Pause
function togglePlayPause() {
    const player = this.closest('.player');
    const video = player.querySelector('video');
    const playButton = player.querySelector('.player__button.toggle');

    if (video.paused) {
        video.play();
        playButton.textContent = '❚❚';
    } else {
        video.pause();
        playButton.textContent = '►';
    }

    showControlsTemporarily(player);
}

// Met à jour la barre de progression
function updateProgressBar() {
    const player = this.closest('.player');
    const progressFilled = player.querySelector('.progress__filled');
    const percent = (this.currentTime / this.duration) * 100;

    if (progressFilled) {
        progressFilled.style.flexBasis = `${percent}%`;
        progressFilled.style.width = `${percent}%`;
    }
}

// Permet de cliquer sur la barre de progression pour aller à un moment précis
function handleScrub(event) {
    const player = this.closest('.player');
    const video = player.querySelector('video');
    const progress = player.querySelector('.progress');

    const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;

    showControlsTemporarily(player);
}

// Fonction pour gérer le volume
function handleVolumeChange() {
    const player = this.closest('.player');
    const video = player.querySelector('video');
    video.volume = this.value;

    showControlsTemporarily(player);
}

// Fonction pour gérer le mode plein écran
function toggleFullScreen() {
    const player = this.closest('.player');

    if (!document.fullscreenElement) {
        player.requestFullscreen().catch(err => console.log(err));
    } else {
        document.exitFullscreen();
    }

    showControlsTemporarily(player);
}

// Fonction pour cacher les contrôles après 2 secondes sur mobile
function hideControls(player) {
    if (isMobile()) {
        player.classList.remove('show-controls');
    }
}

// Fonction pour afficher temporairement les contrôles
function showControlsTemporarily(player) {
    player.classList.add('show-controls');

    if (isMobile()) {
        clearTimeout(player.hideControlsTimeout);
        player.hideControlsTimeout = setTimeout(() => hideControls(player), 2000);
    }
}

// Détection si l'utilisateur est sur mobile
function isMobile() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

// Initialisation des événements
document.addEventListener('DOMContentLoaded', () => {
    lazyLoadVideo();

    const players = document.querySelectorAll('.player');

    players.forEach((player) => {
        const video = player.querySelector('video');
        const playButton = player.querySelector('.player__button.toggle');
        const progress = player.querySelector('.progress');
        const volumeSlider = player.querySelector('.player__slider');
        const fullscreenButton = player.querySelector('.player__button.fullscreen');

        if (playButton) {
            playButton.addEventListener('click', togglePlayPause);
        }

        if (video) {
            video.addEventListener('timeupdate', updateProgressBar);
            video.addEventListener('click', togglePlayPause);

            // Sur Desktop : cacher les contrôles quand la souris quitte la vidéo
            video.addEventListener('mouseleave', () => {
                if (!isMobile()) {
                    hideControls(player);
                }
            });

            // Sur Mobile : afficher les contrôles au toucher
            video.addEventListener('touchstart', () => showControlsTemporarily(player));
        }

        if (progress) {
            progress.addEventListener('click', handleScrub);
        }

        if (volumeSlider) {
            volumeSlider.addEventListener('input', handleVolumeChange);
        }

        if (fullscreenButton) {
            fullscreenButton.addEventListener('click', toggleFullScreen);
        }
    });
});

// Mise à jour lors du scroll et du resize
window.addEventListener('scroll', lazyLoadVideo);
window.addEventListener('resize', lazyLoadVideo);


/*//////////////   PAUSE/UNPAUSE INTRO_LOOP WHEN OUT/IN OF VIEW /////////////// */

// Intersection Observer to pause/unpause introLoop when it is out/in of view
document.addEventListener('DOMContentLoaded', function() {
    const introLoopVideo = document.getElementById('introLoop');

    // Fonction de callback pour l'IntersectionObserver
    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            // Si la vidéo n'est pas visible (hors de l'écran), on la met en pause
            if (!entry.isIntersecting) {
                introLoopVideo.pause();
            } else {
                // Si la vidéo devient visible (dans l'écran), on la relance
                introLoopVideo.play().catch((err) => console.error("Erreur de lecture de la vidéo INTRO loop:", err));
            }
        });
    };

    // Créer l'observateur avec les options
    const observer = new IntersectionObserver(handleIntersection, {
        root: null, // Utilise la fenêtre du navigateur comme root
        rootMargin: '0px', // Aucun décalage
        threshold: 0.8 // La vidéo est considérée comme "hors écran" si 10% de sa surface est hors de l'écran
    });

    // Observer la vidéo introLoop
    observer.observe(introLoopVideo);
});
