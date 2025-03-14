// Fonction pour vérifier si l'utilisateur est sur mobile
function isMobile() {
    return window.innerWidth <= 768; // Taille de l'écran pour considérer mobile
}

/*//////////////    SCROLL APRES VIDEO - Desktop /////////////// */

if (!isMobile()) {
    // Si l'utilisateur est sur un appareil Desktop
    document.addEventListener("DOMContentLoaded", function () {
        const introVideo = document.getElementById("intro");
        const introLoopVideo = document.getElementById("introLoop");
        const marginP2 = document.getElementById("margin_p2");
        let hasScrolled = false;

        // Vérifier si c'est la première visite
        if (!localStorage.getItem("hasVisited")) {
            // C'est la première visite, on marque la visite
            localStorage.setItem("hasVisited", "true");

            // Lancer automatiquement la vidéo INTRO.mp4
            introVideo.style.display = "block"; // Afficher la vidéo d'introduction
            introVideo.play().catch((err) => {
                console.error("Erreur de lecture de la vidéo INTRO.mp4:", err);
            });

            // Gestion de la fin de la vidéo INTRO.mp4
            introVideo.addEventListener("ended", function () {
                // Masquer la vidéo INTRO
                introVideo.style.display = "none";

                // Afficher et jouer la vidéo INTRO loop
                introLoopVideo.style.display = "block";
                introLoopVideo.play().catch((err) => {
                    console.error("Erreur de lecture de la vidéo INTRO loop:", err);
                });

                // Attendre 2 secondes avant de défiler vers margin_p2
                setTimeout(function () {
                    // Scroll automatique vers page2 après 2 secondes de délai
                    if (!hasScrolled) {
                        hasScrolled = true; // Empêcher plusieurs défilements
                        marginP2.scrollIntoView({ behavior: "smooth" });
                    }
                }, 2000); // Délai de 2000ms (2 secondes)
            });
        } else {
            // Si ce n'est pas la première visite, on joue d'abord INTRO.mp4, puis INTRO loop
            introVideo.style.display = "block"; // Afficher la vidéo INTRO.mp4
            introVideo.play().catch((err) => {
                console.error("Erreur de lecture de la vidéo INTRO.mp4:", err);
            });

            // Gestion de la fin de la vidéo INTRO.mp4 (sur les visites suivantes)
            introVideo.addEventListener("ended", function () {
                // Masquer la vidéo INTRO
                introVideo.style.display = "none";

                // Afficher et jouer la vidéo INTRO loop
                introLoopVideo.style.display = "block";
                introLoopVideo.play().catch((err) => {
                    console.error("Erreur de lecture de la vidéo INTRO loop:", err);
                });
            });
        }

        // Continuer à jouer la vidéo en boucle même après plusieurs visites
        introLoopVideo.addEventListener("ended", function () {
            introLoopVideo.play(); // Rejouer la vidéo en boucle
        });
    });
}

/*//////////////    SCROLL APRES VIDEO - Mobile /////////////// */

if (isMobile()) {
    // Si l'utilisateur est sur un appareil Mobile
    document.addEventListener("DOMContentLoaded", function () {
        const introLoopVideo = document.getElementById("introLoop");

        // Lancer directement la vidéo INTRO loop en boucle
        introLoopVideo.style.display = "block";
        introLoopVideo.play().catch((err) => {
            console.error("Erreur de lecture de la vidéo INTRO loop:", err);
        });

        // Continuer à jouer la vidéo en boucle même après plusieurs visites
        introLoopVideo.addEventListener("ended", function () {
            introLoopVideo.play(); // Rejouer la vidéo en boucle
        });
    });
}


/*//////////////    NO SMOOTH LANDING   /////////////// */

const margin_p2 = document.querySelector('#margin_p2');
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString);
const smooth = urlParams.get('smooth');   console.log(queryString)  

if (smooth === 'no') { 
    
    margin_p2.scrollIntoView({behavior:'instant'});
}


/*//////////////    MINIATURES    /////////////// */

const videos = document.querySelectorAll('.video');

videos.forEach(video => {
video.addEventListener('mouseenter', () => {
    video.play();
});

video.addEventListener('mouseleave', () => {
    video.pause();
    video.currentTime = 0;
    // var mediaElement = document.getElementById("myvideo1");
    // mediaElement.load();
    var mediaElement = document.getElementById("myvideo2");
    mediaElement.load();
    var mediaElement = document.getElementById("myvideo3");
    mediaElement.load();
    var mediaElement = document.getElementById("myvideo4");
    mediaElement.load();
    var mediaElement = document.getElementById("myvideo5");
    mediaElement.load();
    var mediaElement = document.getElementById("myvideo6");
    mediaElement.load();
    var mediaElement = document.getElementById("myvideo7");
    mediaElement.load();
    
});
});

/*//////////////    MINIATURES - Mobile uniquement /////////////// */

// Fonction pour détecter si un élément est au centre de l'écran
function isElementInView(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // Vérifier si l'élément est bien visible dans une zone élargie au centre
    return rect.top >= (windowHeight * 0.10) && rect.bottom <= (windowHeight * 0.80);
}

// Fonction pour appliquer l'effet de survol (hover) sur le texte uniquement sur mobile
function applyHoverEffectOnText() {
    // Vérifier si l'on est sur un appareil mobile
    if (!isMobile()) {
        return; // Ne pas appliquer l'effet sur desktop
    }

    const items = document.querySelectorAll('.item'); // Récupérer tous les éléments contenant des vidéos
    let selectedItem = null; // Variable pour stocker l'élément sélectionné

    items.forEach((item) => {
        const video = item.querySelector('.video'); // Récupérer la vidéo dans chaque item

        if (video && isElementInView(video)) {
            selectedItem = item; // Définir cet élément comme sélectionné
        }
    });

    // Appliquer l'effet uniquement à l'élément sélectionné
    items.forEach((item) => {
        if (item === selectedItem) {
            item.classList.add('hovered'); // Ajouter la classe hovered
        } else {
            item.classList.remove('hovered'); // Retirer la classe des autres
        }
    });
}

// Appliquer l'effet lors du chargement de la page
window.addEventListener('load', applyHoverEffectOnText);

// Appliquer l'effet lors du scroll
window.addEventListener('scroll', applyHoverEffectOnText);

// Appliquer l'effet lors du redimensionnement de la fenêtre
window.addEventListener('resize', applyHoverEffectOnText);

// Vérifier si l'utilisateur est sur mobile
function isMobile() {
    return window.innerWidth <= 768; // Considérer mobile si largeur <= 768px
}


// Appliquer l'effet uniquement sur mobile
if (isMobile()) {
    applyHoverEffectOnText();
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
    // Vérifie si l'URL actuelle contient le paramètre `?smooth=no`
    if (window.location.href.includes('?smooth=no')) {
        // Redirige vers index.html sans paramètre
        window.history.replaceState({}, document.title, 'index.html');
    }
});


// /*//////////////   LOCK SCROLL FIRST TIME  /////////////// */


//     document.addEventListener('DOMContentLoaded', function() {
//         const introVideo = document.getElementById('intro');
//         const body = document.body;

//     //      Vérifie si c'est la première visite
//         if (!localStorage.getItem('videoWatched')) {
//             body.classList.add('lock');

//             introVideo.addEventListener('ended', function() {
//                 body.classList.remove('lock');
//                 localStorage.setItem('videoWatched', 'true'); 
//             });

//             introVideo.play();
//         } else {
//             body.classList.remove('lock'); 
//         }
//     });


//     /*//////////////    MODALS    /////////////// */

// function setupModal(modalId, buttonId, closeClassIndex, videoId) {
//     var modal = document.getElementById(modalId);
//     var btn = document.getElementById(buttonId);
//     var span = document.getElementsByClassName("close")[closeClassIndex];
//     var iframe = document.getElementById(videoId);
//     var player = new Vimeo.Player(iframe);

//     // Ouvrir la modal lorsque le bouton est cliqué
//     btn.onclick = function() {
//         modal.style.display = "block";
//     };

//     // Fermer la modal et mettre la vidéo en pause lorsque le bouton de fermeture est cliqué
//     span.onclick = function() {
//         modal.style.display = "none";
//         player.pause();
//     };
//     window.addEventListener('keydown', (event) => {
//         if (event.code === 'Escape') {
//             modal.style.display = "none";
//             player.pause(); 
//         }
//     })


//     // Fermer la modal et mettre la vidéo en pause lorsque l'utilisateur clique en dehors de la modal
//     window.onclick = function(event) {
//         if (event.target === modal) {
//             modal.style.display = "none";
//             player.pause();
//         }
//     };
// }

// // setupModal("myModal", "myvideo1", 0, "video");
// setupModal("myModal2", "myvideo2", 1, "video2");
// setupModal("myModal3", "myvideo3", 2, "video3");
// setupModal("myModal4", "myvideo4", 3, "video4");
// setupModal("myModal5", "myvideo5", 4, "video5");
// setupModal("myModal6", "myvideo6", 5, "video6");
