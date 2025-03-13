/*//////////////    MINIATURES    /////////////// */

const videos = document.querySelectorAll('.video');

videos.forEach(video => {
video.addEventListener('mouseenter', () => {
    video.play();
});

video.addEventListener('mouseleave', () => {
    video.pause();
    video.currentTime = 0;
    var mediaElement = document.getElementById("myvideo1");
    mediaElement.load();
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
    
});
});



