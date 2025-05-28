document.addEventListener('DOMContentLoaded', function () {
    const hamburgerButton = document.getElementById('hamburger-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerIconOpen = document.getElementById('hamburger-icon-open');
    const hamburgerIconClose = document.getElementById('hamburger-icon-close');

    if (hamburgerButton && mobileMenu && hamburgerIconOpen && hamburgerIconClose) {
        hamburgerButton.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
            hamburgerIconOpen.classList.toggle('hidden');
            hamburgerIconClose.classList.toggle('hidden');
        });
    }
});
