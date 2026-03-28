// ===== CHAT PAGE FUNCTIONALITY =====

// DOM Elements
const conversationsPanel = document.getElementById('conversationsPanel');
const chatArea = document.getElementById('chatArea');
const emptyChat = document.getElementById('emptyChat');
const messagesContainer = document.getElementById('messagesContainer');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const emojiBtn = document.getElementById('emojiBtn');
const emojiPicker = document.getElementById('emojiPicker');
const backBtn = document.getElementById('backBtn');
const typingIndicator = document.getElementById('typingIndicator');
const searchConversations = document.getElementById('searchConversations');

// Conversation data
const conversations = {
    1: {
        name: "Sarah",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        online: true,
        messages: []
    },
    2: {
        name: "Emma",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
        online: false,
        messages: []
    },
    3: {
        name: "Lisa",
        avatar: "https://randomuser.me/api/portraits/women/33.jpg",
        online: true,
        messages: []
    },
    4: {
        name: "Amy",
        avatar: "https://randomuser.me/api/portraits/women/21.jpg",
        online: false,
        messages: []
    },
    5: {
        name: "Olivia",
        avatar: "https://randomuser.me/api/portraits/women/79.jpg",
        online: true,
        messages: []
    },
    6: {
        name: "Sophia",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        online: false,
        messages: []
    }
};

let currentConversation = 1;

// Select conversation
function selectConversation(id) {
    currentConversation = id;
    const conversation = conversations[id];

    // Update active state
    document.querySelectorAll('.conversation-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`.conversation-item[data-id="${id}"]`).classList.add('active');

    // Update chat header
    document.getElementById('chatUserAvatar').src = conversation.avatar;
    document.getElementById('chatUserName').textContent = conversation.name;
    document.getElementById('chatUserStatus').textContent = conversation.online ? 'Online now' : 'Last seen recently';

    // Show chat area on mobile
    if (window.innerWidth <= 992) {
        conversationsPanel.classList.remove('active');
    }

    // Remove unread badge
    const badge = document.querySelector(`.conversation-item[data-id="${id}"] .unread-badge`);
    if (badge) badge.remove();

    // Scroll to bottom
    scrollToBottom();
}

// Send message
function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message sent';
    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${escapeHtml(text)}</p>
            <span class="message-time">Just now <i class="fas fa-check-double"></i></span>
        </div>
    `;

    // Insert before typing indicator
    messagesContainer.insertBefore(messageDiv, typingIndicator);

    // Clear input
    messageInput.value = '';

    // Scroll to bottom
    scrollToBottom();

    // Simulate reply after delay
    simulateReply();
}

// Simulate incoming reply
function simulateReply() {
    // Show typing indicator
    typingIndicator.style.display = 'flex';
    scrollToBottom();

    // Simulate reply after 2-3 seconds
    setTimeout(() => {
        typingIndicator.style.display = 'none';

        const replies = [
            "That sounds great! 😊",
            "I totally agree with you!",
            "Haha, you're so funny! 😂",
            "Interesting! Tell me more...",
            "That's awesome! 🎉",
            "I'd love to hear more about that!",
            "You're absolutely right!",
            "Wow, that's cool! ✨"
        ];

        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        const conversation = conversations[currentConversation];

        const messageDiv = document.createElement('div');
        messageDiv.className = 'message received';
        messageDiv.innerHTML = `
            <img src="${conversation.avatar}" alt="${conversation.name}" class="message-avatar">
            <div class="message-content">
                <p>${randomReply}</p>
                <span class="message-time">Just now</span>
            </div>
        `;

        messagesContainer.insertBefore(messageDiv, typingIndicator);
        scrollToBottom();

        // Mark message as read after 1 second
        setTimeout(() => {
            const checkmarks = document.querySelectorAll('.message.sent .fa-check-double');
            checkmarks.forEach(check => check.classList.add('read'));
        }, 1000);

    }, 2000 + Math.random() * 2000);
}

// Scroll to bottom of messages
function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Event Listeners
sendBtn.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Emoji picker toggle
emojiBtn.addEventListener('click', () => {
    emojiPicker.style.display = emojiPicker.style.display === 'none' ? 'block' : 'none';
});

// Emoji selection
document.querySelectorAll('.emoji').forEach(emoji => {
    emoji.addEventListener('click', () => {
        messageInput.value += emoji.dataset.emoji;
        messageInput.focus();
        emojiPicker.style.display = 'none';
    });
});

// Close emoji picker when clicking outside
document.addEventListener('click', (e) => {
    if (!emojiBtn.contains(e.target) && !emojiPicker.contains(e.target)) {
        emojiPicker.style.display = 'none';
    }
});

// Back button (mobile)
backBtn.addEventListener('click', () => {
    conversationsPanel.classList.add('active');
});

// Search conversations
searchConversations.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    document.querySelectorAll('.conversation-item').forEach(item => {
        const name = item.querySelector('h4').textContent.toLowerCase();
        if (name.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
});

// Call buttons
document.querySelectorAll('.chat-action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.querySelector('i').classList.contains('fa-phone') ? 'Voice' : 
                       btn.querySelector('i').classList.contains('fa-video') ? 'Video' : 'More';
        if (action !== 'More') {
            alert(`${action} call feature coming soon!`);
        }
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check if there's a selected chat from matches page
    const selectedChat = localStorage.getItem('selectedChat');
    if (selectedChat) {
        selectConversation(parseInt(selectedChat));
        localStorage.removeItem('selectedChat');
    }

    // Mobile: Show conversations panel by default
    if (window.innerWidth <= 992) {
        conversationsPanel.classList.add('active');
    }

    scrollToBottom();
});

// Window resize handler
window.addEventListener('resize', () => {
    if (window.innerWidth > 992) {
        conversationsPanel.classList.remove('active');
    }
});
