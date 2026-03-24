import Swiper from 'swiper/bundle';
function initCardSwiper() {
    const container = document.querySelector('.cardlist-lp-wrapper.swiper');
    
    if (container) {
        new Swiper(container, {
            slidesPerView: 'auto', // Esto permite que el ancho lo defina tu CSS
            spaceBetween: 26,      // Espacio entre tarjetas
            loop: false,           // Cambia a true si quieres carrusel infinito
            grabCursor: true,      // Cambia el cursor a una mano
            
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }
}
document.addEventListener('DOMContentLoaded', initCardSwiper);