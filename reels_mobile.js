/*//////////////    REELS - Mobile uniquement  /////////////// */

function isMobile() {
    return window.innerWidth <= 768;
}

let activeMobileItem = null;

function initMobileReelsClick() {
    const items = document.querySelectorAll('.item');

    items.forEach((item) => {
        item.addEventListener('click', (e) => {
            if (!isMobile()) return;
            
            // Ne pas interférer avec le clic sur la barre de volume
            if (e.target.closest('.volume-control')) return;

            const video = item.querySelector('.reel-video');

            // Si on clique sur la vidéo déjà en lecture -> on met en pause
            if (activeMobileItem === item) {
                item.classList.remove('hovered');
                if (video) {
                    video.pause();
                    video.currentTime = 0;
                }
                activeMobileItem = null;
            } else {
                // Sinon on coupe l'ancienne et on active la nouvelle
                if (activeMobileItem) {
                    activeMobileItem.classList.remove('hovered');
                    const oldVideo = activeMobileItem.querySelector('.reel-video');
                    if (oldVideo) {
                        oldVideo.pause();
                        oldVideo.currentTime = 0;
                    }
                }

                item.classList.add('hovered');
                if (video) video.play().catch(err => {});
                activeMobileItem = item;
            }
        });
    });

    // Si on clique ailleurs sur la page (en dehors d'une vidéo), on coupe tout
    document.addEventListener('click', (e) => {
        if (!isMobile() || !activeMobileItem) return;
        
        if (!e.target.closest('.item')) {
            activeMobileItem.classList.remove('hovered');
            const video = activeMobileItem.querySelector('.reel-video');
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
            activeMobileItem = null;
        }
    });
}

function fixBlackThumbnails() {
    const videos = document.querySelectorAll('.reel-video');
    videos.forEach(video => {
        // Ajoute playsinline et preload (très important pour le navigateur Insta/iOS)
        video.setAttribute('playsinline', '');
        video.setAttribute('preload', 'metadata');
        
        // Astuce pour forcer l'affichage de la 1ère frame si aucune image "poster" n'est définie
        if (!video.getAttribute('poster')) {
            const source = video.querySelector('source');
            if (video.src && !video.src.includes('#t=')) {
                video.src += '#t=0.001';
            } else if (source && source.src && !source.src.includes('#t=')) {
                source.src += '#t=0.001';
                video.load();
            }
        }
    });
}

window.addEventListener('load', () => {
    initMobileReelsClick();
    if (isMobile()) fixBlackThumbnails();
});
