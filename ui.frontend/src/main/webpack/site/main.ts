// Stylesheets
import "./main.scss";

// AOS (PRIMERO cargar la librería)
import AOS from 'aos';
(window as any).AOS = AOS;

// Javascript / Typescript (después)
import "./**/*.js";
import "./**/*.ts";
import '../components/**/*.js';

// Componentes específicos
import '../components/_header.js';
import '../components/_contact-section-lp.js';
import '../components/cardlist-carousel.js';
import '../components/_cookie-banner-lp.js';
import '../components/_hero-bmw-audi.js';

// Inicialización de AOS (LO ÚLTIMO)
import './aos.js';