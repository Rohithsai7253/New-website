// ===== DISCOVER PAGE - SWIPE FUNCTIONALITY =====

// Sample profiles data
const profiles = [
    {
        id: 1,
        name: "Sarah",
        age: 24,
        location: "2 km away",
        bio: "Adventure seeker & coffee addict ☕ Love hiking and discovering new places!",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        verified: true,
        online: true,
        interests: ["Travel", "Coffee", "Hiking", "Photography"],
        job: "Graphic Designer",
        education: "Art Institute"
    },
    {
        id: 2,
        name: "Emma",
        age: 26,
        location: "5 km away",
        bio: "Music lover 🎵 Foodie 🍕 Looking for someone to share adventures with!",
        image: "https://randomuser.me/api/portraits/women/65.jpg",
        verified: true,
        online: false,
        interests: ["Music", "Food", "Movies", "Art"],
        job: "Marketing Manager",
        education: "NYU"
    },
    {
        id: 3,
        name: "Lisa",
        age: 23,
        location: "3 km away",
        bio: "Yoga enthusiast 🧘‍♀️ Dog mom 🐕 Always up for a good conversation!",
        image: "https://randomuser.me/api/portraits/women/33.jpg",
        verified: false,
        online: true,
        interests: ["Yoga", "Pets", "Reading", "Nature"],
        job: "Yoga Instructor",
        education: "UCLA"
    },
    {
        id: 4,
        name: "Amy",
        age: 25,
        location: "8 km away",
        bio: "Tech geek & bookworm 📚 Netflix addict. Let's binge-watch together!",
        image: "https://randomuser.me/api/portraits/women/21.jpg",
        verified: true,
        online: false,
        interests: ["Gaming", "Reading", "Tech", "Movies"],
        job: "Software Developer",
        education: "MIT"
    },
    {
        id: 5,
        name: "Olivia",
        age: 27,
        location: "4 km away",
        bio: "Fitness freak 💪 Beach lover 🏖️ Looking for my gym partner!",
        image: "https://randomuser.me/api/portraits/women/79.jpg",
        verified: true,
        online: true,
        interests: ["Fitness", "Beach", "Healthy Food", "Dancing"],
        job: "Personal Trainer",
        education: "Stanford"
    },
    {
        id: 6,
        name: "Sophia",
        age: 24,
        location: "6 km away",
        bio: "Artist at heart 🎨 Wine lover 🍷 Seeking creative soul!",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
        verified: false,
        online: false,
        interests: ["Art", "Wine", "Music", "Travel"],
        job: "Artist",
        education: "Parsons"
    }
];

// DOM Elements
const cardsWrapper = document.getElementById('cardsWrapper');
const emptyState = document.getElementById('emptyState');
const likeBtn = document.getElementById('likeBtn');
const dislikeBtn = document.getElementById('dislikeBtn');
const superlikeBtn = document.getElementById('superlikeBtn');
const undoBtn = document.getElementById('undoBtn');
const boostBtn = document.getElementById('boostBtn');
const filterBtn = document.getElementById('filterBtn');
const filterModal = document.getElementById('filterModal');
const matchModal = document.getElementById('matchModal');

// Stats
let likesGiven = 0;
let passesGiven = 0;
let currentIndex = 0;
let history = [];

// Create profile card HTML
function createCardHTML(profile) {
    return `
        <div class="profile-card" data-id="${profile.id}">
            <div class="swipe-indicator like">LIKE</div>
            <div class="swipe-indicator nope">NOPE</div>
            <div class="swipe-indicator superlike">SUPER</div>
            
            <div class="card-image">
                <img src="${profile.image}" alt="${profile.name}" draggable="false">
                <div class="image-overlay"></div>
                
                <div class="card-badges">
                    ${profile.verified ? '<span class="badge verified"><i class="fas fa-check"></i> Verified</span>' : ''}
                    ${profile.online ? '<span class="badge online"><i class="fas fa-circle"></i> Online</span>' : ''}
                </div>
                
                <div class="photo-dots">
                    <span class="photo-dot active"></span>
                    <span class="photo-dot"></span>
                    <span class="photo-dot"></span>
                </div>
                
                <div class="card-info">
                    <h2>${profile.name}, ${profile.age} ${profile.verified ? '<i class="fas fa-check-circle verified-icon"></i>' : ''}</h2>
                    <p class="card-location"><i class="fas fa-map-marker-alt"></i> ${profile.location}</p>
                    <p class="card-bio">${profile.bio}</p>
                </div>
            </div>
            
            <div class="card-details">
                <div class="card-interests">
                    ${profile.interests.map(i => `<span class="interest">${i}</span>`).join('')}
                </div>
                <div class="card-meta">
                    <span><i class="fas fa-briefcase"></i> ${profile.job}</span>
                    <span><i class="fas fa-graduation-cap"></i> ${profile.education}</span>
                </div>
            </div>
        </div>
    `;
}

// Load cards
function loadCards() {
    cardsWrapper.innerHTML = '';
    
    const visibleProfiles = profiles.slice(currentIndex, currentIndex + 3).reverse();
    
    visibleProfiles.forEach((profile, index) => {
        cardsWrapper.insertAdjacentHTML('beforeend', createCardHTML(profile));
    });
    
    initSwipeListeners();
    
    if (currentIndex >= profiles.length) {
        cardsWrapper.style.display = 'none';
        emptyState.style.display = 'block';
        document.querySelector('.action-buttons').style.display = 'none';
    }
}

// Initialize swipe listeners
function initSwipeListeners() {
    const cards = document.querySelectorAll('.profile-card');
    
    cards.forEach((card, index) => {
        if (index === cards.length - 1) {
            // Only the top card is swipeable
            let startX = 0;
            let startY = 0;
            let currentX = 0;
            let isDragging = false;

            card.addEventListener('mousedown', startDrag);
            card.addEventListener('touchstart', startDrag);

            function startDrag(e) {
                isDragging = true;
                card.classList.add('swiping');
                startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
                startY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;

                document.addEventListener('mousemove', drag);
                document.addEventListener('touchmove', drag);
                document.addEventListener('mouseup', endDrag);
                document.addEventListener('touchend', endDrag);
            }

            function drag(e) {
                if (!isDragging) return;
                
                currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
                const currentY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;
                
                const diffX = currentX - startX;
                const diffY = currentY - startY;
                const rotation = diffX * 0.1;
                
                card.style.transform = `translateX(${diffX}px) translateY(${diffY}px) rotate(${rotation}deg)`;
                
                // Show indicators
                const likeIndicator = card.querySelector('.swipe-indicator.like');
                const nopeIndicator = card.querySelector('.swipe-indicator.nope');
                const superIndicator = card.querySelector('.swipe-indicator.superlike');
                
                if (diffX > 50) {
                    likeIndicator.style.opacity = Math.min(diffX / 100, 1);
                    nopeIndicator.style.opacity = 0;
                    superIndicator.style.opacity = 0;
                } else if (diffX < -50) {
                    nopeIndicator.style.opacity = Math.min(Math.abs(diffX) / 100, 1);
                    likeIndicator.style.opacity = 0;
                    superIndicator.style.opacity = 0;
                } else if (diffY < -50) {
                    superIndicator.style.opacity = Math.min(Math.abs(diffY) / 100, 1);
                    likeIndicator.style.opacity = 0;
                    nopeIndicator.style.opacity = 0;
                } else {
                    likeIndicator.style.opacity = 0;
                    nopeIndicator.style.opacity = 0;
                    superIndicator.style.opacity = 0;
                }
            }

            function endDrag(e) {
                if (!isDragging) return;
                isDragging = false;
                card.classList.remove('swiping');
                
                document.removeEventListener('mousemove', drag);
                document.removeEventListener('touchmove', drag);
                document.removeEventListener('mouseup', endDrag);
                document.removeEventListener('touchend', endDrag);
                
                const diffX = currentX - startX;
                
                if (diffX > 100) {
                    swipeRight(card);
                } else if (diffX < -100) {
                    swipeLeft(card);
                } else {
                    // Reset position
                    card.style.transform = '';
                    card.querySelector('.swipe-indicator.like').style.opacity = 0;
                    card.querySelector('.swipe-indicator.nope').style.opacity = 0;
                    card.querySelector('.swipe-indicator.superlike').style.opacity = 0;
                }
            }
        }
    });
}

// Swipe Right (Like)
function swipeRight(card) {
    const profile = profiles[currentIndex];
    history.push({ index: currentIndex, action: 'like' });
    
    card.style.transform = 'translateX(1000px) rotate(30deg)';
    card.style.opacity = '0';
    card.style.transition = 'all 0.5s ease';
    
    likesGiven++;
    document.getElementById('likesGiven').textContent = likesGiven;
    
    setTimeout(() => {
        currentIndex++;
        loadCards();
        
        // Random match (30% chance)
        if (Math.random() < 0.3) {
            showMatchModal(profile);
        }
    }, 300);
}

// Swipe Left (Pass)
function swipeLeft(card) {
    history.push({ index: currentIndex, action: 'pass' });
    
    card.style.transform = 'translateX(-1000px) rotate(-30deg)';
    card.style.opacity = '0';
    card.style.transition = 'all 0.5s ease';
    
    passesGiven++;
    document.getElementById('passesGiven').textContent = passesGiven;
    
    setTimeout(() => {
        currentIndex++;
        loadCards();
    }, 300);
}

// Super Like
function superLike(card) {
    const profile = profiles[currentIndex];
    history.push({ index: currentIndex, action: 'superlike' });
    
    card.style.transform = 'translateY(-1000px) scale(0.5)';
    card.style.opacity = '0';
    card.style.transition = 'all 0.5s ease';
    
    likesGiven++;
    document.getElementById('likesGiven').textContent = likesGiven;
    
    setTimeout(() => {
        currentIndex++;
        loadCards();
        
        // Higher chance of match with super like (60%)
        if (Math.random() < 0.6) {
            showMatchModal(profile);
        }
    }, 300);
}

// Show match modal
function showMatchModal(profile) {
    document.getElementById('matchName').textContent = profile.name;
    document.getElementById('matchAvatar').src = profile.image;
    matchModal.classList.add('active');
}

// Close match modal
function closeMatchModal() {
    matchModal.classList.remove('active');
}

// Undo last action
function undoLastAction() {
    if (history.length === 0) {
        alert('Nothing to undo!');
        return;
    }
    
    const lastAction = history.pop();
    currentIndex = lastAction.index;
    
    if (lastAction.action === 'like' || lastAction.action === 'superlike') {
        likesGiven--;
        document.getElementById('likesGiven').textContent = likesGiven;
    } else {
        passesGiven--;
        document.getElementById('passesGiven').textContent = passesGiven;
    }
    
    emptyState.style.display = 'none';
    cardsWrapper.style.display = 'block';
    document.querySelector('.action-buttons').style.display = 'flex';
    
    loadCards();
}

// Button Event Listeners
likeBtn.addEventListener('click', () => {
    const topCard = document.querySelector('.profile-card:last-child');
    if (topCard) swipeRight(topCard);
});

dislikeBtn.addEventListener('click', () => {
    const topCard = document.querySelector('.profile-card:last-child');
    if (topCard) swipeLeft(topCard);
});

superlikeBtn.addEventListener('click', () => {
    const topCard = document.querySelector('.profile-card:last-child');
    if (topCard) superLike(topCard);
});

undoBtn.addEventListener('click', undoLastAction);

boostBtn.addEventListener('click', () => {
    alert('Boost your profile for 30 minutes! (Premium feature)');
});

// Filter Modal
filterBtn.addEventListener('click', () => {
    filterModal.classList.add('active');
});

function closeFilterModal() {
    filterModal.classList.remove('active');
}

function applyFilters() {
    alert('Filters applied! (Demo)');
    closeFilterModal();
}

// Filter sliders
const filterMinAge = document.getElementById('filterMinAge');
const filterMaxAge = document.getElementById('filterMaxAge');
const filterAgeText = document.getElementById('filterAgeText');
const filterDistance = document.getElementById('filterDistance');
const filterDistanceText = document.getElementById('filterDistanceText');

if (filterMinAge && filterMaxAge) {
    filterMinAge.addEventListener('input', updateFilterAge);
    filterMaxAge.addEventListener('input', updateFilterAge);
}

function updateFilterAge() {
    let min = parseInt(filterMinAge.value);
    let max = parseInt(filterMaxAge.value);
    if (min > max) [min, max] = [max, min];
    filterAgeText.textContent = `${min} - ${max}`;
}

if (filterDistance) {
    filterDistance.addEventListener('input', () => {
        filterDistanceText.textContent = `${filterDistance.value} km`;
    });
}

// Close modals on outside click
window.addEventListener('click', (e) => {
    if (e.target === filterModal) closeFilterModal();
    if (e.target === matchModal) closeMatchModal();
});

// Initialize
loadCards();
