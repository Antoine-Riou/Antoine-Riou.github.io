
/*//////////////   FUNCTION IS MOBILE  /////////////// */

function isMobile() {
    return window.innerWidth <= 768; 
}

/*//////////////   CHANGE VIDEO SOURCES FOR MOBILE  /////////////// */

function changeVideoSourcesForMobile() {
    if (isMobile()) {
        document.querySelectorAll('.video').forEach((video) => {
            const currentSrc = video.src;
            if (currentSrc.indexOf('preview') !== -1) {
                const lowResolutionSrc = currentSrc.replace('preview', 'low');
                video.src = lowResolutionSrc;
                video.load();
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', changeVideoSourcesForMobile);
window.addEventListener('resize', changeVideoSourcesForMobile);




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

let activeItem = null;

function initMobileProjectsClick() {
    const items = document.querySelectorAll('.item');
    
    items.forEach((item) => {
        // Sauvegarde de l'image de couverture (poster) initiale
        const video = item.querySelector('.video');
        if (video && video.getAttribute('poster')) {
            video.dataset.poster = video.getAttribute('poster');
        }

        item.addEventListener('click', (e) => {
            if (!isMobile()) return;

            // Premier clic : on empêche le lien de s'ouvrir, on joue la vidéo
            if (activeItem !== item) {
                e.preventDefault(); 

                // Si une autre vidéo était active, on la coupe
                if (activeItem) {
                    activeItem.classList.remove('hovered');
                    const oldVideo = activeItem.querySelector('.video');
                    if (oldVideo) {
                        oldVideo.pause();
                        oldVideo.currentTime = 0;
                        if (oldVideo.dataset.poster) oldVideo.setAttribute('poster', oldVideo.dataset.poster);
                    }
                }

                // On lance la nouvelle
                item.classList.add('hovered');
                if (video) {
                    video.removeAttribute('poster');
                    video.play().catch(err => {});
                }
                activeItem = item;
            }
            // Au deuxième clic : le lien vers le projet s'ouvre normalement !
        });
    });

    // Clic ailleurs met en pause
    document.addEventListener('click', (e) => {
        if (!isMobile() || !activeItem) return;

        if (!e.target.closest('.item')) {
            activeItem.classList.remove('hovered');
            const video = activeItem.querySelector('.video');
            if (video) {
                video.pause();
                video.currentTime = 0;
                if (video.dataset.poster) video.setAttribute('poster', video.dataset.poster);
            }
            activeItem = null;
        }
    });
}

window.addEventListener('load', initMobileProjectsClick);



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

function togglePlayPause(event) {
    const player = event.currentTarget.closest('.player');
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

function updateProgressBar() {
    const player = this.closest('.player');
    const progressFilled = player.querySelector('.progress__filled');
    const percent = (this.currentTime / this.duration) * 100;

    if (progressFilled) {
        progressFilled.style.flexBasis = `${percent}%`;
        progressFilled.style.width = `${percent}%`;
    }

    showControlsTemporarily(player);
}

function handleScrub(event) {
    const player = this.closest('.player');
    const video = player.querySelector('video');
    const progress = player.querySelector('.progress');
    const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    showControlsTemporarily(player);
}

function handleVolumeChange() {
    const player = this.closest('.player');
    const video = player.querySelector('video');
    video.volume = this.value;
    showControlsTemporarily(player);
}

function toggleFullScreen() {
    const player = this.closest('.player');
    if (!document.fullscreenElement) {
        player.requestFullscreen().catch(err => console.log(err));
    } else {
        document.exitFullscreen();
    }
    showControlsTemporarily(player);
}

function handleDoubleClick(event) {
    const player = this.closest('.player');
    const video = player.querySelector('video');

    if (!document.fullscreenElement) {
        if (player.requestFullscreen) {
            player.requestFullscreen();
        } else if (player.mozRequestFullScreen) {
            player.mozRequestFullScreen();
        } else if (player.webkitRequestFullscreen) {
            player.webkitRequestFullscreen();
        } else if (player.msRequestFullscreen) {
            player.msRequestFullscreen();
        }
    } else {
        document.exitFullscreen();
    }
}

function isMobile() {
    return /Mobi|Android|iPhone/i.test(navigator.userAgent);
}

function hideControls(player) {
    if (isMobile()) {
        player.classList.remove('show-controls');
    }
}

function showControlsTemporarily(player) {
    player.classList.add('show-controls');
    clearTimeout(player.hideControlsTimeout);
    if (isMobile()) {
        player.hideControlsTimeout = setTimeout(() => {
            hideControls(player);
        }, 2000);
    }
}

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
            video.addEventListener('mouseleave', () => {
                if (!isMobile()) {
                    hideControls(player);
                }
            });
            video.addEventListener('touchstart', () => {
                showControlsTemporarily(player);
            });
            video.addEventListener('play', () => showControlsTemporarily(player));
            video.addEventListener('dblclick', handleDoubleClick);
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

// LOGO PARALLAX

document.addEventListener('DOMContentLoaded', () => {
    const logo = document.getElementById('logo');
    const logo2 = document.getElementById('logo2');
    const subtitle = document.getElementById('subtitle');
    const page1 = document.getElementById('page1');
    const header = document.querySelector('header');

    let isMobileDevice = window.matchMedia("(max-width: 480px)").matches;

    function updateLogoBasePosition() {
        if (isMobileDevice) {
            logo.style.top = '';
            logo2.style.top = '';
            if (subtitle) subtitle.style.top = '';
        } else {
            const headerHeight = header.offsetHeight;
            const page1Height = page1.offsetHeight;
            const centerTop = `calc(${headerHeight}px + ${(page1Height - headerHeight) / 2}px - 1vw)`;
            const subtitleTop = `calc(${headerHeight}px + ${(page1Height - headerHeight) / 2}px + 3vw)`;
            logo.style.top = centerTop;
            logo2.style.top = centerTop;
            if (subtitle) subtitle.style.top = subtitleTop;
        }
    }

    function handleMove(e) {
        if (isMobileDevice) return;

        const centerX = window.innerWidth / 2;
        const centerY = (page1.offsetHeight / 2) + header.offsetHeight;

        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;

        const maxDistance = 80;
        const influenceRadius = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);
        const distance = Math.sqrt(dx * dx + dy * dy);

        const t = 1 - (distance / influenceRadius);
        const easing = Math.pow(t, 3);

        const moveX = (dx / influenceRadius) * maxDistance * easing;
        const moveY = (dy / influenceRadius) * maxDistance * easing;

        // Facteurs de déplacement différents pour chaque logo
        const factor1 = 1.0;  // logo principal
        const factor2 = 1.12;  // logo secondaire (plus puissant)
        const factor3 = 0.7;   // sous-titre (plus lent pour effet de profondeur)

        logo.style.transform = `translate(calc(-50% + ${moveX * factor1}px), calc(-50% + ${moveY * factor1}px))`;
        logo2.style.transform = `translate(calc(-50% + ${moveX * factor2}px), calc(-50% + ${moveY * factor2}px))`;
        if (subtitle) subtitle.style.transform = `translate(calc(-50% + ${moveX * factor3}px), calc(-50% + ${moveY * factor3}px))`;
    }

    function handleLeave() {
        if (isMobileDevice) return;
        logo.style.transform = 'translate(-50%, -50%)';
        logo2.style.transform = 'translate(-50%, -50%)';
        if (subtitle) subtitle.style.transform = 'translate(-50%, -50%)';
    }

    updateLogoBasePosition();

    if (!isMobileDevice) {
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseleave', handleLeave);
        document.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                handleMove({ clientX: touch.clientX, clientY: touch.clientY });
            }
        });
        document.addEventListener('touchend', handleLeave);
    }

    window.addEventListener('resize', () => {
        const wasMobile = isMobileDevice;
        isMobileDevice = window.matchMedia("(max-width: 480px)").matches;

        if (isMobileDevice !== wasMobile) {
            location.reload(); // reset comportement si switch mobile/desktop
        } else {
            updateLogoBasePosition();
            if (!isMobileDevice) {
                logo.style.transform = 'translate(-50%, -50%)';
                logo2.style.transform = 'translate(-50%, -50%)';
                if (subtitle) subtitle.style.transform = 'translate(-50%, -50%)';
            }
        }
    });
});


// CURSOR
document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.getElementById('custom-cursor');
  const isMobile = window.matchMedia('(pointer: coarse)').matches;

  if (isMobile) {
    cursor.style.display = 'none'; // désactive le curseur custom sur mobile
    return;
  }

  // Curseur actif sur desktop
  document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%)) scale(1)`;
  });
});
