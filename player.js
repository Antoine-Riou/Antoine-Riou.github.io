// get elements

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');

// build functions

function togglePlay() {
	const method = video.paused ? 'play' : 'pause';
	video[method]();
}

function updateButton() {
	const icon = this.paused ? '►' : '❚ ❚';
	toggle.textContent = icon;
}

function skip() {
	console.log(this.dataset.skip);
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
	video[this.name] = this.value;
}

function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}

// fullscreen function
function toggleFullscreen() {
    if (!document.fullscreenElement && !document.mozFullScreenElement &&
        !document.webkitFullscreenElement && !document.msFullscreenElement) {
        if (player.requestFullscreen) {
        player.requestFullscreen();
        } else if (player.msRequestFullscreen) {
        player.msRequestFullscreen();
        } else if (player.mozRequestFullScreen) {
        player.mozRequestFullScreen();
        } else if (player.webkitRequestFullscreen) {
        player.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.exitFullscreen) {
        document.exitFullscreen();
        } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
        }
    }
}

// play/pause with space-bar and skip with left/right arrow
function keyNav(e) {
	console.log(e.code);
	if(e.code === "Space") {
		togglePlay();
	} else if (e.code === "ArrowRight") {
		video.currentTime += 25;
	} else if (e.code === "ArrowLeft") {
		video.currentTime -= 10;
	}
}

// hook up the eventlisteners

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton); 
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

// fullscreen button
fullscreen.addEventListener('click', toggleFullscreen);

// play/pause with spacebar
window.addEventListener('keyup', keyNav);