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

// Tab functionality for menu page
document.addEventListener('DOMContentLoaded', function() { // Ensure this runs after DOM is loaded
    const tabs = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    // Only proceed if tabs are found (i.e., on menu.html)
    if (tabs.length > 0 && tabContents.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Deactivate all tabs: remove active classes, add inactive classes
                tabs.forEach(item => {
                    item.classList.remove('active-tab', 'text-[var(--brand-red)]', 'border-[var(--brand-red)]');
                    item.classList.add('text-gray-500', 'hover:text-gray-700', 'hover:border-gray-400', 'border-transparent');
                    item.removeAttribute('aria-current');
                });

                // Activate clicked tab: add active classes, remove inactive classes
                tab.classList.add('active-tab', 'text-[var(--brand-red)]', 'border-[var(--brand-red)]');
                tab.classList.remove('text-gray-500', 'hover:text-gray-700', 'hover:border-gray-400', 'border-transparent');
                tab.setAttribute('aria-current', 'page');
                
                // Hide all tab contents
                tabContents.forEach(content => {
                    content.classList.add('hidden');
                });

                // Show target tab content
                const target = document.querySelector(tab.dataset.tabTarget);
                if (target) {
                    target.classList.remove('hidden');
                }
            });
        });
    }
});
