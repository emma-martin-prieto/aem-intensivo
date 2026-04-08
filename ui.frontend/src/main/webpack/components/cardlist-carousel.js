import Swiper from 'swiper/bundle';

function initCardSwiper() {
    const swipers = document.querySelectorAll('.js-cardlist-swiper');

    if (!swipers.length) {
        return;
    }

    swipers.forEach((element) => {
        new Swiper(element, {
            slidesPerView: 'auto',
            spaceBetween: 24,
            loop: true,
            grabCursor: true,
            speed: 800,
            loopAdditionalSlides: 6,

            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },

            pagination: {
                el: element.querySelector('.swiper-pagination'),
                clickable: true
            },

            breakpoints: {
                769: {
                    spaceBetween: 26,
                },
                1201: {
                    spaceBetween: 56,
                }
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initCardSwiper);