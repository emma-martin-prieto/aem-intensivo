/* ═══════════════════════════════════════════════════════════
   ABOUT IMPACT — Stats animados + Timeline
   Añadir al final de:
   ui.apps/src/main/content/jcr_root/apps/itv/clientlibs/clientlib-site/js/site.js
   ═══════════════════════════════════════════════════════════ */

(function () {
    'use strict';

    function initAboutImpact() {

        /* ── STATS: contador animado ── */
        var statsBlock = document.getElementById('aboutImpactStats');
        if (statsBlock) {
            var numbers = statsBlock.querySelectorAll('.about-impact-stats__number');
            var statsTriggered = false;

            var statsObs = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting && !statsTriggered) {
                        statsTriggered = true;
                        numbers.forEach(function (el) {
                            var target = parseInt(el.getAttribute('data-target'), 10) || 0;
                            var duration = 1600;
                            var start = performance.now();

                            function step(now) {
                                var p = Math.min((now - start) / duration, 1);
                                var ease = 1 - Math.pow(1 - p, 3);
                                el.textContent = Math.round(ease * target).toLocaleString('es-ES');
                                if (p < 1) requestAnimationFrame(step);
                            }
                            requestAnimationFrame(step);
                        });
                        statsObs.disconnect();
                    }
                });
            }, { threshold: 0.3 });

            statsObs.observe(statsBlock);
        }

        /* ── TIMELINE: reveal en scroll + línea animada ── */
        var tlItems = document.querySelectorAll('[data-tl-item]');
        var tlFill = document.getElementById('aboutTimelineFill');
        var tlTrack = tlFill ? tlFill.closest('.about-impact-timeline__track') : null;

        if (tlItems.length && tlFill && tlTrack) {
            var tlObs = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');

                        /* Avanzar la línea hasta el punto del último hito visible */
                        var trackRect = tlTrack.getBoundingClientRect();
                        var dot = entry.target.querySelector('.about-impact-timeline__dot');
                        if (dot) {
                            var dotRect = dot.getBoundingClientRect();
                            var pct = ((dotRect.top - trackRect.top) / trackRect.height) * 100;
                            tlFill.style.height = Math.min(Math.max(pct + 4, 0), 100) + '%';
                        }
                    }
                });
            }, { threshold: 0.45 });

            tlItems.forEach(function (item) { tlObs.observe(item); });
        }
    }

    /* Inicializar en carga normal */
    document.addEventListener('DOMContentLoaded', initAboutImpact);

    /* Inicializar en navegación SPA de AEM */
    document.addEventListener('cq-page-info-loaded', initAboutImpact);

    window.addEventListener('popstate', function () {
        setTimeout(initAboutImpact, 100);
    });

}());
