(function () {
    'use strict';

    /* ── Anima las barras de progreso de un panel ── */
    function animateBars(panel) {
        var bars = panel.querySelectorAll('.js-audi-bar');
        bars.forEach(function (bar) {
            var targetWidth = bar.getAttribute('data-width') || '0';
            // Pequeño delay para que la transición CSS sea visible
            setTimeout(function () {
                bar.style.width = targetWidth + '%';
            }, 80);
        });
    }

    /* ── Anima los contadores numéricos de un panel ── */
    function initCounters(panel) {
        var counters = panel.querySelectorAll('.js-audi-counter');
        counters.forEach(function (el) {
            var target   = parseFloat(el.getAttribute('data-target')) || 0;
            var isDecimal = target % 1 !== 0;
            var duration = 1200;
            var start    = null;

            function step(timestamp) {
                if (!start) start = timestamp;
                var progress = Math.min((timestamp - start) / duration, 1);
                // Ease-out cúbico
                var eased = 1 - Math.pow(1 - progress, 3);
                var current = eased * target;
                el.textContent = isDecimal ? current.toFixed(1) : Math.round(current).toString();
                if (progress < 1) requestAnimationFrame(step);
            }

            requestAnimationFrame(step);
        });
    }

    /* ── IntersectionObserver para el reveal de elementos ── */
    function initReveal() {
        if (!window.IntersectionObserver) return;
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var el    = entry.target;
                    var delay = el.getAttribute('data-delay') || '0';
                    setTimeout(function () {
                        el.classList.add('is-visible');
                    }, parseInt(delay, 10));
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.15 });

        document.querySelectorAll('.js-audi-reveal').forEach(function (el) {
            observer.observe(el);
        });
    }

    /* ── Lógica de tabs ── */
    function initTabs() {
        var specsSection = document.querySelector('.audi-specs');
        if (!specsSection) return;

        // Mostrar primer panel al cargar
        var firstPanel = specsSection.querySelector('.audi-specs__panel--active');
        if (firstPanel) {
            firstPanel.style.display  = 'block';
            firstPanel.style.opacity  = '1';
            firstPanel.style.transform = 'translateY(0)';
            setTimeout(function () {
                animateBars(firstPanel);
                initCounters(firstPanel);
            }, 350);
        }

        var tabBtns = specsSection.querySelectorAll('.audi-specs__tab');
        var panels  = specsSection.querySelectorAll('.audi-specs__panel');

        tabBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var targetId = this.getAttribute('data-tab');

                // Actualizar tabs
                tabBtns.forEach(function (b) {
                    b.classList.remove('audi-specs__tab--active');
                });
                this.classList.add('audi-specs__tab--active');

                // Ocultar paneles
                panels.forEach(function (p) {
                    p.classList.remove('audi-specs__panel--active');
                    p.style.display = 'none';
                });

                // Mostrar panel activo y lanzar animaciones
                var activePanel = specsSection.querySelector('[data-panel="' + targetId + '"]');
                if (activePanel) {
                    activePanel.style.display   = 'block';
                    activePanel.classList.add('audi-specs__panel--active');
                    setTimeout(function () {
                        animateBars(activePanel);
                        initCounters(activePanel);
                    }, 60);
                }
            });
        });
    }

    /* ── Init ── */
    function init() {
        initTabs();
        initReveal();
    }

    document.addEventListener('DOMContentLoaded', init);
    window.addEventListener('load', init);

}());