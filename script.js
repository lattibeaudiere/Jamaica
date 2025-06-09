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

// Catering Modal Show/Hide Functionality
document.addEventListener('DOMContentLoaded', function() {
    const openModalButton = document.getElementById('open-catering-modal-button');
    const closeModalButton = document.getElementById('close-catering-modal-button');
    const cateringModal = document.getElementById('catering-modal');
    const cateringModalContent = document.getElementById('catering-modal-content'); // To prevent closing when clicking inside content

    // Check if all elements exist (this script should only run if on catering.html where these elements are)
    if (openModalButton && cateringModal && closeModalButton && cateringModalContent) {

        openModalButton.addEventListener('click', () => {
            cateringModal.classList.remove('hidden');
            // Force a reflow before adding transition classes for show
            void cateringModal.offsetWidth;
            cateringModal.classList.remove('opacity-0');
            cateringModal.classList.add('opacity-100');
            // For modal content scaling effect
            cateringModalContent.classList.remove('scale-95');
            cateringModalContent.classList.add('scale-100');
        });

        const closeModal = () => {
            cateringModal.classList.remove('opacity-100');
            cateringModal.classList.add('opacity-0');
             // For modal content scaling effect
            cateringModalContent.classList.remove('scale-100');
            cateringModalContent.classList.add('scale-95');
            setTimeout(() => {
                cateringModal.classList.add('hidden');
            }, 300); // Should match the transition duration in Tailwind classes (e.g., duration-300)
        };

        closeModalButton.addEventListener('click', closeModal);

        // Close modal if the overlay (cateringModal) is clicked, but not its content (cateringModalContent)
        cateringModal.addEventListener('click', (event) => {
            if (event.target === cateringModal) {
                closeModal();
            }
        });
    }
});

// Daily Soup of the Day functionality (for menu page)
document.addEventListener('DOMContentLoaded', function() {
    const currentDayForSoup = new Date().getDay(); // 0 for Sunday, 1 for Monday, etc.
    const soupMap = {
        0: 'soup-sunday',    // Sunday
        1: 'soup-monday',    // Monday
        2: 'soup-tuesday',   // Tuesday
        3: 'soup-wednesday', // Wednesday
        4: 'soup-thursday',  // Thursday
        5: 'soup-friday',    // Friday
        6: 'soup-saturday'   // Saturday
    };
    const activeSoupId = soupMap[currentDayForSoup];

    const allDailySoups = document.querySelectorAll('.daily-soup');

    if (allDailySoups.length > 0) { // Check if soup elements exist on the page
        let soupShown = false;
        allDailySoups.forEach(soupDiv => {
            if (soupDiv.id === activeSoupId) {
                soupDiv.classList.remove('hidden');
                soupShown = true;
            } else {
                soupDiv.classList.add('hidden');
            }
        });

        // Optional: If today's soup ID wasn't found (e.g. if soupMap didn't have an entry for currentDayForSoup)
        // and no soup was therefore shown, you could choose to show a default message or hide the whole section.
        // For now, if activeSoupId is undefined, all .daily-soup divs will remain hidden.
        // If the section header should also hide if no soup is shown, that would require additional logic
        // to target and hide the h2 or the entire section#soup-of-the-day.
        // The current plan does not include this, so the "Soup of the Day" h2 will always show.
    }
});

// Daily specials functionality
document.addEventListener('DOMContentLoaded', function() { // Wrap in DOMContentLoaded
    const today = new Date().getDay(); // 0 for Sunday, 1 for Monday, etc.
    const specialsMap = {
        0: 'special-sunday',    // Sunday
        1: 'special-monday',    // Monday
        2: 'special-tuesday',   // Tuesday
        3: 'special-wednesday', // Wednesday
        4: 'special-thursday',  // Thursday
        5: 'special-friday',    // Friday
        6: 'special-saturday'   // Saturday
    };
    let activeSpecialId = specialsMap[today];

    const allDailySpecials = document.querySelectorAll('.daily-special'); // Use new variable name

    if (allDailySpecials.length > 0) { // Check if special elements exist on the page
        allDailySpecials.forEach(specialDiv => {
            if (specialDiv.id === activeSpecialId) {
                specialDiv.classList.remove('hidden');
            } else {
                specialDiv.classList.add('hidden'); // Ensure others are hidden
            }
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
