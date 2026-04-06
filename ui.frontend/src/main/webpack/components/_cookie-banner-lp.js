document.addEventListener("DOMContentLoaded", function () {
    const banner = document.getElementById("cookieBanner");
    const acceptBtn = document.getElementById("cookieAccept");
    const rejectBtn = document.getElementById("cookieReject");

    if (!banner || !acceptBtn || !rejectBtn) {
        return;
    }

    banner.classList.remove("cookie-banner--hidden");

    acceptBtn.addEventListener("click", function () {
        banner.classList.add("cookie-banner--hidden");
    });

    rejectBtn.addEventListener("click", function () {
        banner.classList.add("cookie-banner--hidden");
    });
});