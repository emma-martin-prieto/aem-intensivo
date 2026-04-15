(function () {
    'use strict';

    function playHeroVideos() {
        const videos = document.querySelectorAll('[data-hero-video]');

        videos.forEach((video) => {
            video.muted = true;
            video.autoplay = true;
            video.loop = true;
            video.playsInline = true;

            const playVideo = () => {
                video.currentTime = 0;
                video.play().catch((error) => {
                    console.warn('No se pudo reproducir el vídeo del hero', error);
                });
            };

            if (video.readyState >= 2) {
                playVideo();
            } else {
                video.addEventListener('loadeddata', playVideo, { once: true });
            }
        });
    }

    document.addEventListener('DOMContentLoaded', playHeroVideos);
    window.addEventListener('load', playHeroVideos);
    document.addEventListener('aem-content-loaded', playHeroVideos);
})();