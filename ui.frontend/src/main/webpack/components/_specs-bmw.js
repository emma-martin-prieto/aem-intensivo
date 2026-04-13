(function () {
    'use strict';

    function initComponent() {
        const specsSection = document.querySelector('.bmw-specs');
        if (!specsSection) return;

        // 1. Mostrar primer panel por defecto
        const firstPanel = specsSection.querySelector('.bmw-specs__panel--active');
        if (firstPanel) {
            firstPanel.style.display = 'block';
            firstPanel.style.opacity = '1';
            firstPanel.style.transform = 'translateY(0)';
            
            // Disparar barras y contadores del primero
            setTimeout(() => {
                animateBars(firstPanel);
                initCounters(firstPanel);
            }, 300);
        }

        // 2. Tabs
        const tabBtns = specsSection.querySelectorAll('.bmw-specs__tab');
        const panels = specsSection.querySelectorAll('.bmw-specs__panel');

        tabBtns.forEach(btn => {
            btn.onclick = function() {
                const targetId = this.getAttribute('data-tab');
                
                tabBtns.forEach(b => b.classList.remove('bmw-specs__tab--active'));
                this.classList.add('bmw-specs__tab--active');

                panels.forEach(p => {
                    p.classList.remove('bmw-specs__panel--active');
                    p.style.display = 'none';
                });

                const activePanel = specsSection.querySelector(`[data-panel="${targetId}"]`);
                if (activePanel) {
                    activePanel.classList.add('bmw-specs__panel--active');
                    activePanel.style.display = 'block';
                    setTimeout(() => {
                        activePanel.style.opacity = '1';
                        animateBars(activePanel);
                        initCounters(activePanel);
                    }, 50);
                }
            };
        });

        // 3. Scroll Reveal Simple
        const reveals = specsSection.querySelectorAll('.js-bmw-reveal');
        reveals.forEach(el => el.classList.add('is-visible')); // En AEM mejor que se vean siempre al inicio
    }

    function animateBars(container) {
        const bars = container.querySelectorAll('.js-bar');
        bars.forEach(bar => {
            const width = bar.getAttribute('data-width') || '0';
            bar.style.width = width + '%';
        });
    }

    function initCounters(container) {
        const counters = container.querySelectorAll('.js-counter');
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target') || '0');
            counter.innerText = target; // Asignación directa para evitar fallos de animación
        });
    }

    // Inicializar al cargar y al editar en AEM
    document.addEventListener('DOMContentLoaded', initComponent);
    if (window.Granite && window.Granite.author) {
        initComponent();
    }
    // Listener específico para refrescos de autoría de AEM
    window.addEventListener('load', initComponent);
})();