(function () {
    'use strict';

    function initAOS() {
        if (typeof AOS === 'undefined') {
            console.warn('AOS no está cargado');
            return;
        }

        AOS.init({
            duration: 900,
            easing: 'ease-out-cubic',
            once: true,
            offset: 80
        });
    }

    function refreshAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.refreshHard();
        }
    }

    document.addEventListener('DOMContentLoaded', initAOS);
    window.addEventListener('load', refreshAOS);
    document.addEventListener('aem-content-loaded', refreshAOS);
    document.addEventListener('cq-page-info-loaded', refreshAOS);
})();