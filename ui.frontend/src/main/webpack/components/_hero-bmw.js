(function () {
    'use strict';

    function initHeroVideo() {
        const video = document.getElementById('bmwHeroVideo');

        if (video) {
            video.muted = true;
            const playPromise = video.play();

            if (playPromise !== undefined) {
                playPromise.catch(function () {
                    // Fallback si el navegador bloquea el autoplay por falta de interacción
                    function resumeVideo() {
                        video.play();
                        window.removeEventListener('click', resumeVideo);
                        window.removeEventListener('scroll', resumeVideo);
                    }
                    window.addEventListener('click', resumeVideo);
                    window.addEventListener('scroll', resumeVideo);
                });
            }
        }
    }

    // Ejecutar al cargar el DOM
    document.addEventListener('DOMContentLoaded', initHeroVideo);

    // Refuerzo para navegación interna (Mercedes -> BMW)
    window.addEventListener('load', initHeroVideo);

    // Listener para estados de carga asíncronos
    document.addEventListener('readystatechange', function () {
        if (document.readyState === 'complete') {
            initHeroVideo();
        }
    });
}());