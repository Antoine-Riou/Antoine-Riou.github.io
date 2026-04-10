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

window.addEventListener('load', initMobileReelsClick);
