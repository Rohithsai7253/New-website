// ===== MATCHES PAGE FUNCTIONALITY =====

// Tab switching
const tabBtns = document.querySelectorAll('.tab-btn');
const matchCards = document.querySelectorAll('.match-card');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active from all tabs
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const tab = btn.dataset.tab;
        filterMatches(tab);
    });
});

function filterMatches(tab) {
    matchCards.forEach(card => {
        const isOnline = card.dataset.online === 'true';
        const isFavorite = card.dataset.favorite === 'true';

        if (tab === 'all') {
            card.style.display = 'block';
        } else if (tab === 'online' && isOnline) {
            card.style.display = 'block';
        } else if (tab === 'favorites' && isFavorite) {
            card.style.display = 'block';
        } else if (tab !== 'all') {
            card.style.display = 'none';
        }
    });
}

// Search functionality
const searchInput = document.getElementById('searchMatches');

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        matchCards.forEach(card => {
            const name = card.dataset.name.toLowerCase();
            if (name.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Favorite toggle
const favoriteBtns = document.querySelectorAll('.favorite-btn');

favoriteBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        btn.classList.toggle('active');
        
        const card = btn.closest('.match-card');
        if (card) {
            const isFavorite = btn.classList.contains('active');
            card.dataset.favorite = isFavorite.toString();
        }
    });
});

// Start chat function
function startChat(matchId) {
    // Store selected match and redirect to chat
    localStorage.setItem('selectedChat', matchId);
    window.location.href = 'chat.html';
}

// View profile function
function viewProfile(matchId) {
    alert(`Viewing profile #${matchId} (Demo)`);
}

// Horizontal scroll for new matches
const slider = document.getElementById('newMatchesSlider');

if (slider) {
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
}
