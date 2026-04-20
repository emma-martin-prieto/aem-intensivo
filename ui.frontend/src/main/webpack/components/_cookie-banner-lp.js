document.addEventListener("DOMContentLoaded", function () {
    const banner = document.getElementById("cookieBanner");
    const acceptBtn = document.getElementById("cookieAccept");
    const rejectBtn = document.getElementById("cookieReject");
    const policyLink = document.getElementById("cookiePolicyLink");

    const modal = document.getElementById("cookieModal");
    const modalClose = document.getElementById("cookieModalClose");
    const modalOverlay = document.getElementById("cookieModalOverlay");
    const modalAccept = document.getElementById("cookieModalAccept");
    const modalReject = document.getElementById("cookieModalReject");

    if (!banner) return;

    // Comprobar estado guardado al cargar
    const savedConsent = localStorage.getItem("cookieConsent");
    if (savedConsent) {
        console.log(`🍪 Cookie consent ya guardado: "${savedConsent}" — no se muestra el banner`);
    } else {
        console.log("🍪 Cookie consent no encontrado — mostrando banner");
        banner.classList.remove("cookie-banner--hidden");
    }

    function acceptCookies() {
        localStorage.setItem("cookieConsent", "accepted");
        console.log("✅ Cookie consent guardado: accepted");
        banner.classList.add("cookie-banner--hidden");
        closeModal();
    }

    function rejectCookies() {
        localStorage.setItem("cookieConsent", "rejected");
        console.log("❌ Cookie consent guardado: rejected");
        banner.classList.add("cookie-banner--hidden");
        closeModal();
    }

    function openModal() {
        modal.classList.remove("cookie-modal--hidden");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        modal.classList.add("cookie-modal--hidden");
        document.body.style.overflow = "";
    }

    acceptBtn.addEventListener("click", acceptCookies);
    rejectBtn.addEventListener("click", rejectCookies);
    policyLink.addEventListener("click", openModal);
    modalClose.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", closeModal);
    modalAccept.addEventListener("click", acceptCookies);
    modalReject.addEventListener("click", rejectCookies);

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeModal();
    });

    document.querySelectorAll('a[href="#cookies"]').forEach(function (el) {
        el.addEventListener("click", function (e) {
            e.preventDefault();
            openModal();
        });
    });
});