// ===== PROFILE PAGE FUNCTIONALITY =====

// Bio character counter
const bioTextarea = document.getElementById('editBio');
const bioCharCount = document.getElementById('bioCharCount');

if (bioTextarea && bioCharCount) {
    bioTextarea.addEventListener('input', function() {
        const count = this.value.length;
        bioCharCount.textContent = count;
        
        if (count > 300) {
            this.value = this.value.substring(0, 300);
            bioCharCount.textContent = 300;
        }
    });
}

// Profile image upload
const avatarUpload = document.getElementById('avatarUpload');
const profileImage = document.getElementById('profileImage');

if (avatarUpload && profileImage) {
    avatarUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profileImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}

// Age range slider
const minAgeRange = document.getElementById('minAgeRange');
const maxAgeRange = document.getElementById('maxAgeRange');
const ageRangeText = document.getElementById('ageRangeText');

function updateAgeRange() {
    if (minAgeRange && maxAgeRange && ageRangeText) {
        let minVal = parseInt(minAgeRange.value);
        let maxVal = parseInt(maxAgeRange.value);
        
        if (minVal > maxVal) {
            [minVal, maxVal] = [maxVal, minVal];
            minAgeRange.value = minVal;
            maxAgeRange.value = maxVal;
        }
        
        ageRangeText.textContent = `${minVal} - ${maxVal}`;
    }
}

if (minAgeRange && maxAgeRange) {
    minAgeRange.addEventListener('input', updateAgeRange);
    maxAgeRange.addEventListener('input', updateAgeRange);
}

// Distance slider
const distanceRange = document.getElementById('distanceRange');
const distanceText = document.getElementById('distanceText');

if (distanceRange && distanceText) {
    distanceRange.addEventListener('input', function() {
        distanceText.textContent = `${this.value} km`;
    });
}

// Interest tags toggle
const interestTags = document.querySelectorAll('.interest-tag');

interestTags.forEach(tag => {
    tag.addEventListener('click', function() {
        this.classList.toggle('active');
    });
});

// Edit profile form submit
const editProfileForm = document.getElementById('editProfileForm');

if (editProfileForm) {
    editProfileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = {
            firstName: document.getElementById('editFirstName').value,
            lastName: document.getElementById('editLastName').value,
            email: document.getElementById('editEmail').value,
            dob: document.getElementById('editDob').value,
            gender: document.getElementById('editGender').value,
            location: document.getElementById('editLocation').value,
            bio: document.getElementById('editBio').value,
            job: document.getElementById('editJob').value,
            company: document.getElementById('editCompany').value
        };
        
        // Save to localStorage
        const userData = JSON.parse(localStorage.getItem('userData')) || {};
        Object.assign(userData, formData);
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Show success message
        alert('Profile updated successfully!');
    });
}

// Preferences form submit
const preferencesForm = document.getElementById('preferencesForm');

if (preferencesForm) {
    preferencesForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const preferences = {
            interestedIn: document.querySelector('input[name="interestedIn"]:checked').value,
            ageRange: {
                min: minAgeRange.value,
                max: maxAgeRange.value
            },
            maxDistance: distanceRange.value,
            lookingFor: document.getElementById('lookingFor').value
        };
        
        // Save preferences
        localStorage.setItem('preferences', JSON.stringify(preferences));
        
        alert('Preferences saved successfully!');
    });
}

// Preview button
const previewBtn = document.getElementById('previewBtn');

if (previewBtn) {
    previewBtn.addEventListener('click', function() {
        alert('Profile preview feature coming soon!');
    });
}

// Photo upload functionality
document.querySelectorAll('.add-photo input').forEach(input => {
    input.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            alert('Photo uploaded successfully! (Demo)');
        }
    });
});

// Photo delete buttons
document.querySelectorAll('.photo-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const icon = this.querySelector('i');
        
        if (icon.classList.contains('fa-trash')) {
            if (confirm('Are you sure you want to delete this photo?')) {
                this.closest('.photo-item').remove();
            }
        } else if (icon.classList.contains('fa-star')) {
            alert('Photo set as main! (Demo)');
        }
    });
});
