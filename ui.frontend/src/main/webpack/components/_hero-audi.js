(function () {
    'use strict';

    function initHeroVideo() {
        var video = document.getElementById('audiHeroVideo');

        if (video) {
            video.muted = true;
            var playPromise = video.play();

            if (playPromise !== undefined) {
                playPromise.catch(function () {
                    // Fallback si el navegador bloquea el autoplay
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

    function initRevealAnimation() {
        var hero = document.querySelector('.audi-hero');
        if (!hero) return;

        // Animar la entrada del contenido con un ligero delay escalonado
        var content = hero.querySelector('.audi-hero__content');
        var media   = hero.querySelector('.audi-hero__media');

        if (content) {
            content.style.opacity = '0';
            content.style.transform = 'translateY(30px)';
            setTimeout(function () {
                content.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
                content.style.opacity = '1';
                content.style.transform = 'translateY(0)';
            }, 200);
        }

        if (media) {
            media.style.opacity = '0';
            media.style.transform = 'translateX(40px)';
            setTimeout(function () {
                media.style.transition = 'opacity 1s ease, transform 1s ease';
                media.style.opacity = '1';
                media.style.transform = 'translateX(0)';
            }, 450);
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        initHeroVideo();
        initRevealAnimation();
    });

    window.addEventListener('load', initHeroVideo);

    document.addEventListener('readystatechange', function () {
        if (document.readyState === 'complete') {
            initHeroVideo();
        }
    });

}());