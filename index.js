
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

let activeVideo = null;

function isElementAtCenter(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const center = windowHeight / 2;
    const tolerance = 50;
    return Math.abs((rect.top + rect.bottom) / 2 - center) < tolerance;
}

function manageVideosOnScroll() {
    if (!isMobile()) return;

    const items = document.querySelectorAll('.item');
    items.forEach((item) => {
        const video = item.querySelector('.video');
        if (video && isElementAtCenter(item)) {
            if (video.paused && activeVideo !== video) {
                if (activeVideo) {
                    activeVideo.pause();
                    activeVideo.currentTime = 0;
                    activeVideo.closest('.item').classList.remove('hovered');
                    activeVideo.setAttribute('poster', activeVideo.getAttribute('data-poster'));
                }
                video.play();
                item.classList.add('hovered');
                video.removeAttribute('poster');
                activeVideo = video;
            }
        } else {
            if (video !== activeVideo && !video.paused) {
                video.pause();
                video.currentTime = 0;
                item.classList.remove('hovered');
                video.setAttribute('poster', video.getAttribute('data-poster'));
            }
        }
    });
}

window.addEventListener('scroll', manageVideosOnScroll);
window.addEventListener('load', manageVideosOnScroll);
window.addEventListener('resize', manageVideosOnScroll);

/*//////////////   PAUSE/UNPAUSE INTRO_LOOP WHEN OUT/IN OF VIEW /////////////// */

document.addEventListener('DOMContentLoaded', function() {
    const introLoopVideo = document.getElementById('introLoop');

    const handleIntersection = (entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                introLoopVideo.pause();
            } else {
                introLoopVideo.play().catch((err) => console.error("Erreur de lecture de la vidéo INTRO loop:", err));
            }
        });
    };

    const observer = new IntersectionObserver(handleIntersection, {
        root: null,
        rootMargin: '0px',
        threshold: 0.8
    });

    observer.observe(introLoopVideo);
});

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

window.addEventListener('scroll', lazyLoadVideo);
window.addEventListener('resize', lazyLoadVideo);
