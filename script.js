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

// Catering Order Calculation Functionality
document.addEventListener('DOMContentLoaded', function() {
    const cateringModal = document.getElementById('catering-modal'); // Needed to know if we are on the right page
    if (!cateringModal) return; // Only run this script if the catering modal is on the page

    const itemCheckboxes = document.querySelectorAll('.catering-item-select');
    const pattiesQtyInput = document.getElementById('patties-qty');

    const selectedItemsListDiv = document.getElementById('selected-items-list');
    const subtotalAmountSpan = document.getElementById('subtotal-amount');
    const taxAmountSpan = document.getElementById('tax-amount');
    const grandTotalAmountSpan = document.getElementById('grand-total-amount');
    const salesTaxRate = 0.085;

    function formatPrice(amount) {
        return '$' + amount.toFixed(2);
    }

    function updateOrderSummary() {
        let currentOrderItems = [];
        let subtotal = 0;

        // Process S/L checkbox items
        itemCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const itemName = checkbox.closest('.catering-item').dataset.itemName;
                const size = checkbox.dataset.size;
                const price = parseFloat(checkbox.dataset.price);
                currentOrderItems.push({ name: itemName, size: size, price: price });
                subtotal += price;
            }
        });

        // Process Cocktail Patties
        if (pattiesQtyInput) {
            const qty = parseInt(pattiesQtyInput.value, 10);
            if (qty > 0) {
                const itemName = pattiesQtyInput.closest('.catering-item').dataset.itemName;
                const pricePerDozen = parseFloat(pattiesQtyInput.dataset.price);
                const unit = pattiesQtyInput.dataset.unit || 'dozen';
                const pattiesTotal = qty * pricePerDozen;
                currentOrderItems.push({ name: itemName, qty: qty, unit: unit, price: pattiesTotal });
                subtotal += pattiesTotal;
            }
        }

        const tax = subtotal * salesTaxRate;
        const grandTotal = subtotal + tax;

        // Update displayed list of selected items
        if (selectedItemsListDiv) {
            if (currentOrderItems.length === 0) {
                selectedItemsListDiv.innerHTML = '<p class="text-gray-500">No items selected yet.</p>';
            } else {
                selectedItemsListDiv.innerHTML = currentOrderItems.map(item => {
                    let itemText = `${item.name}`;
                    if (item.size) {
                        itemText += ` (${item.size})`;
                    }
                    if (item.qty) {
                        itemText += ` - ${item.qty} ${item.unit}`;
                    }
                    itemText += `: ${formatPrice(item.price)}`;
                    return `<div class="flex justify-between"><span class="truncate max-w-[70%]">${itemText.substring(0, itemText.lastIndexOf(':'))}</span><span class="font-medium">${itemText.substring(itemText.lastIndexOf(':') + 1)}</span></div>`;
                }).join('');
            }
        }

        // Update displayed totals
        if (subtotalAmountSpan) subtotalAmountSpan.textContent = formatPrice(subtotal);
        if (taxAmountSpan) taxAmountSpan.textContent = formatPrice(tax);
        if (grandTotalAmountSpan) grandTotalAmountSpan.textContent = formatPrice(grandTotal);
    }

    // Add event listeners
    itemCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateOrderSummary);
    });
    if (pattiesQtyInput) {
        pattiesQtyInput.addEventListener('input', updateOrderSummary);
    }

    // Initial call to set up summary
    updateOrderSummary();

    const submitOrderButton = document.getElementById('submit-catering-order');
    const customerPhoneInput = document.getElementById('customer-phone');

    if (submitOrderButton && customerPhoneInput) {
        submitOrderButton.addEventListener('click', function() {
            const phone = customerPhoneInput.value.trim();
            if (!phone) {
                alert('Please enter your phone number so we can contact you to confirm your order.');
                customerPhoneInput.focus();
                return;
            }

            let emailBody = "Catering Order Inquiry\n"; // \n for new line
            emailBody += "--------------------------\n";
            emailBody += "Customer Phone: " + phone + "\n";
            emailBody += "--------------------------\n\n";
            emailBody += "Selected Items:\n";

            let currentOrderItemsForMail = [];
            let subtotalForMail = 0;
            // const salesTaxRateForMail = 0.085; // Already defined above

            document.querySelectorAll('.catering-item-select').forEach(checkbox => {
                if (checkbox.checked) {
                    const itemName = checkbox.closest('.catering-item').dataset.itemName;
                    const size = checkbox.dataset.size;
                    const price = parseFloat(checkbox.dataset.price);
                    currentOrderItemsForMail.push({ name: itemName, size: size, price: price });
                    subtotalForMail += price;
                }
            });

            const pattiesQtyInputElement = document.getElementById('patties-qty');
            if (pattiesQtyInputElement) {
                const qty = parseInt(pattiesQtyInputElement.value, 10);
                if (qty > 0) {
                    const itemName = pattiesQtyInputElement.closest('.catering-item').dataset.itemName;
                    const pricePerDozen = parseFloat(pattiesQtyInputElement.dataset.price);
                    const unit = pattiesQtyInputElement.dataset.unit || 'dozen';
                    const pattiesTotal = qty * pricePerDozen;
                    currentOrderItemsForMail.push({ name: itemName, qty: qty, unit: unit, price: pattiesTotal });
                    subtotalForMail += pattiesTotal;
                }
            }

            if (currentOrderItemsForMail.length === 0) {
                alert('Your order is empty! Please select some items.');
                return;
            }

            currentOrderItemsForMail.forEach(item => {
                let itemText = `${item.name}`;
                if (item.size) {
                    itemText += ` (${item.size})`;
                }
                if (item.qty) {
                    itemText += ` - ${item.qty} ${item.unit}`;
                }
                itemText += `: $${item.price.toFixed(2)}`;
                emailBody += itemText + "\n";
            });

            const taxForMail = subtotalForMail * salesTaxRate; // Use salesTaxRate from outer scope
            const grandTotalForMail = subtotalForMail + taxForMail;

            emailBody += "\n--------------------------\n";
            emailBody += "Subtotal: $" + subtotalForMail.toFixed(2) + "\n";
            emailBody += "Sales Tax (8.5%): $" + taxForMail.toFixed(2) + "\n";
            emailBody += "Grand Total: $" + grandTotalForMail.toFixed(2) + "\n";
            emailBody += "--------------------------\n";
            emailBody += "We will contact you to confirm this order.\n";

            const mailtoLink = "mailto:jamaicagrand110@gmail.com" +
                               "?subject=" + encodeURIComponent("Catering Order Inquiry from Website") +
                               "&body=" + encodeURIComponent(emailBody);

            window.location.href = mailtoLink;

            if (document.getElementById('selected-items-list')) {
                 document.getElementById('selected-items-list').innerHTML = '<p class="text-green-600 font-semibold">Your email client should be open. Please review and send your order. We will contact you within 24 hours!</p>';
            }
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
