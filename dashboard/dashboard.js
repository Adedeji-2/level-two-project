// Dashboard Navigation Handler
document.addEventListener('DOMContentLoaded', function () {
    // Sidebar navigation
    const navLinks = document.querySelectorAll('.sidebar .nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');

    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            // Hide all sections
            contentSections.forEach(section => section.classList.remove('active'));

            // Show clicked section
            const sectionId = this.getAttribute('data-section') + '-section';
            const section = document.getElementById(sectionId);
            if (section) {
                section.classList.add('active');
            }

            // Close sidebar on mobile
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('show');
            }
        });
    });

    // Sidebar toggle button
    sidebarToggle.addEventListener('click', function () {
        sidebar.classList.toggle('show');
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', function (e) {
        if (window.innerWidth <= 768 &&
            !sidebar.contains(e.target) &&
            !sidebarToggle.contains(e.target)) {
            sidebar.classList.remove('show');
        }
    });

    // Set home as active by default
    const homeLink = document.querySelector('.sidebar .nav-link[data-section="home"]');
    if (homeLink) {
        homeLink.classList.add('active');
        document.getElementById('home-section').classList.add('active');
    }
});

// Add to Cart functionality
document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.menu-item-card .btn-dark');
    let cartCount = 3; // Initial cart count

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            // Get item details
            const card = this.closest('.menu-item-card') || this.closest('.favorite-card');
            const itemName = card.querySelector('h5').textContent;
            const itemPrice = card.querySelector('.fw-bold').textContent;

            // Update cart count
            cartCount++;
            const cartBadge = document.querySelector('.badge');
            if (cartBadge) {
                cartBadge.textContent = cartCount;
            }

            // Visual feedback
            this.textContent = '✓ Added!';
            this.classList.add('btn-success');
            this.classList.remove('btn-dark');

            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.classList.remove('btn-success');
                this.classList.add('btn-dark');
            }, 1500);

            // Show toast notification
            showNotification(`${itemName} added to cart!`);
        });
    });
});

// Reorder functionality
document.addEventListener('DOMContentLoaded', function () {
    const reorderButtons = document.querySelectorAll('.order-card .btn-outline-secondary');

    reorderButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const orderId = this.closest('.order-card').querySelector('h5').textContent;
            showNotification(`Reordered ${orderId}! Check your cart.`);
        });
    });
});

// Favorite toggle
document.addEventListener('DOMContentLoaded', function () {
    const favoriteButtons = document.querySelectorAll('.btn-favorite');

    favoriteButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            if (this.textContent.includes('❤️')) {
                this.textContent = '🤍';
                this.style.backgroundColor = '#fff3e0';
            } else {
                this.textContent = '❤️';
                this.style.backgroundColor = '#ffebee';
            }
        });
    });
});

// Category filter
document.addEventListener('DOMContentLoaded', function () {
    const categoryButtons = document.querySelectorAll('.category-filter .btn');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => {
                btn.classList.remove('btn-secondary');
                btn.classList.add('btn-outline-secondary');
            });

            // Add active class to clicked button
            this.classList.remove('btn-outline-secondary');
            this.classList.add('btn-secondary');
        });
    });
});

// Edit profile functionality
document.addEventListener('DOMContentLoaded', function () {
    const editProfileButton = document.querySelector('.profile-details .btn-secondary');
    const profileInputs = document.querySelectorAll('.profile-details input');

    if (editProfileButton) {
        editProfileButton.addEventListener('click', function () {
            profileInputs.forEach(input => {
                input.disabled = !input.disabled;
            });

            if (this.textContent === 'Edit Information') {
                this.textContent = 'Save Changes';
                this.classList.add('btn-success');
                this.classList.remove('btn-secondary');
            } else {
                this.textContent = 'Edit Information';
                this.classList.remove('btn-success');
                this.classList.add('btn-secondary');
                showNotification('Profile updated successfully!');
            }
        });
    }
});

// Save notification preferences
document.addEventListener('DOMContentLoaded', function () {
    const savePreferencesButtons = document.querySelectorAll('.settings-card .btn-secondary');

    savePreferencesButtons.forEach(button => {
        if (button.textContent === 'Save Preferences') {
            button.addEventListener('click', function () {
                showNotification('Preferences saved successfully!');
            });
        }
    });
});

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'alert alert-success alert-dismissible fade show';
    notification.setAttribute('role', 'alert');
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Handle responsive sidebar
window.addEventListener('resize', function () {
    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth > 768) {
        sidebar.classList.remove('show');
    }
});

// Search functionality (basic)
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('keyup', function (e) {
            const searchTerm = this.value.toLowerCase();
            const menuItems = document.querySelectorAll('.menu-item-card');

            menuItems.forEach(item => {
                const itemName = item.querySelector('h5').textContent.toLowerCase();
                if (itemName.includes(searchTerm)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
});

// Order button click
document.addEventListener('DOMContentLoaded', function () {
    const orderButtons = document.querySelectorAll('.restaurant-card .btn');

    orderButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const restaurantName = this.closest('.restaurant-card').querySelector('h5').textContent;
            showNotification(`Viewing menu for ${restaurantName}`);
        });
    });
});
