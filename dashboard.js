// ===== DASHBOARD FUNCTIONALITY =====

// Check if user is logged in
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'login.html';
    }
}

// Run auth check
checkAuth();

// Get user data
const userData = JSON.parse(localStorage.getItem('userData')) || {};

// Update welcome message with user's name
document.addEventListener('DOMContentLoaded', function() {
    const welcomeName = document.querySelector('.welcome-text .highlight');
    const userName = document.querySelector('.user-name');
    
    if (userData.firstName) {
        if (welcomeName) welcomeName.textContent = userData.firstName;
        if (userName) userName.textContent = `${userData.firstName} ${userData.lastName}`;
    }
});

// Sidebar toggle for mobile
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });
}

// Logout functionality
const logoutBtn = document.getElementById('logoutBtn');

if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userData');
        window.location.href = 'login.html';
    });
}

// Notification click handler
const notificationBtn = document.querySelector('.notification-btn');

if (notificationBtn) {
    notificationBtn.addEventListener('click', () => {
        alert('Notifications feature coming soon!');
    });
}

// Message button clicks
document.querySelectorAll('.match-item .btn').forEach(btn => {
    btn.addEventListener('click', () => {
        window.location.href = 'chat.html';
    });
});

// Message item clicks
document.querySelectorAll('.message-item').forEach(item => {
    item.addEventListener('click', () => {
        window.location.href = 'chat.html';
    });
});

// Nearby person clicks
document.querySelectorAll('.nearby-person').forEach(person => {
    person.addEventListener('click', () => {
        window.location.href = 'discover.html';
    });
});

// Animate stats on load
function animateStats() {
    document.querySelectorAll('.stat-info h3').forEach(stat => {
        const target = parseInt(stat.textContent.replace(/,/g, ''));
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current).toLocaleString();
            }
        }, 30);
    });
}

// Run animation when page loads
window.addEventListener('load', animateStats);
