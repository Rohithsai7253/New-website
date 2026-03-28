// ===== DOM ELEMENTS =====
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

// ===== TOGGLE PASSWORD VISIBILITY =====
document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', function() {
        const input = this.parentElement.querySelector('input');
        const icon = this.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
});

// ===== LOGIN FORM VALIDATION =====
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Basic validation
        let isValid = true;
        
        if (!validateEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError('email');
        }
        
        if (password.length < 6) {
            showError('password', 'Password must be at least 6 characters');
            isValid = false;
        } else {
            clearError('password');
        }
        
        if (isValid) {
            // Store user data (simulated)
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        }
    });
}

// ===== SIGNUP FORM - MULTI STEP =====
if (signupForm) {
    const steps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-steps .step');
    const nextBtns = document.querySelectorAll('.next-step');
    const prevBtns = document.querySelectorAll('.prev-step');
    let currentStep = 0;

    // Next step buttons
    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                currentStep++;
                updateSteps();
            }
        });
    });

    // Previous step buttons
    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentStep--;
            updateSteps();
        });
    });

    function updateSteps() {
        steps.forEach((step, index) => {
            step.classList.remove('active');
            if (index === currentStep) {
                step.classList.add('active');
            }
        });

        progressSteps.forEach((step, index) => {
            step.classList.remove('active', 'completed');
            if (index === currentStep) {
                step.classList.add('active');
            } else if (index < currentStep) {
                step.classList.add('completed');
            }
        });
    }

    function validateStep(step) {
        let isValid = true;
        
        if (step === 0) {
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (!firstName.trim()) {
                alert('Please enter your first name');
                isValid = false;
            }
            if (!lastName.trim()) {
                alert('Please enter your last name');
                isValid = false;
            }
            if (!validateEmail(email)) {
                alert('Please enter a valid email address');
                isValid = false;
            }
            if (password.length < 8) {
                alert('Password must be at least 8 characters');
                isValid = false;
            }
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                isValid = false;
            }
        }
        
        if (step === 1) {
            const dob = document.getElementById('dob').value;
            const gender = document.querySelector('input[name="gender"]:checked');
            const location = document.getElementById('location').value;
            
            if (!dob) {
                alert('Please enter your date of birth');
                isValid = false;
            }
            if (!gender) {
                alert('Please select your gender');
                isValid = false;
            }
            if (!location.trim()) {
                alert('Please enter your location');
                isValid = false;
            }
        }
        
        return isValid;
    }

    // Form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const terms = document.querySelector('input[name="terms"]').checked;
        
        if (!terms) {
            alert('Please accept the Terms of Service and Privacy Policy');
            return;
        }
        
        // Collect all form data
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('signupEmail').value,
            password: document.getElementById('signupPassword').value,
            dob: document.getElementById('dob').value,
            gender: document.querySelector('input[name="gender"]:checked').value,
            location: document.getElementById('location').value,
            bio: document.getElementById('bio').value,
            interestedIn: document.querySelector('input[name="interestedIn"]:checked')?.value,
            ageRange: {
                min: document.getElementById('minAge').value,
                max: document.getElementById('maxAge').value
            },
            maxDistance: document.getElementById('distance').value,
            interests: Array.from(document.querySelectorAll('input[name="interests"]:checked')).map(el => el.value)
        };
        
        // Store user data
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userData', JSON.stringify(formData));
        
        // Redirect to profile photo upload or dashboard
        alert('Account created successfully!');
        window.location.href = 'dashboard.html';
    });

    // Password strength indicator
    const passwordInput = document.getElementById('signupPassword');
    const strengthBar = document.querySelector('.strength-bar');
    
    if (passwordInput && strengthBar) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            
            if (password.length >= 8) strength++;
            if (/[A-Z]/.test(password)) strength++;
            if (/[0-9]/.test(password)) strength++;
            if (/[^A-Za-z0-9]/.test(password)) strength++;
            
            strengthBar.className = 'strength-bar';
            if (strength === 1) strengthBar.classList.add('strength-weak');
            else if (strength === 2 || strength === 3) strengthBar.classList.add('strength-medium');
            else if (strength === 4) strengthBar.classList.add('strength-strong');
        });
    }

    // Bio character count
    const bioInput = document.getElementById('bio');
    const bioCount = document.getElementById('bioCount');
    
    if (bioInput && bioCount) {
        bioInput.addEventListener('input', function() {
            bioCount.textContent = this.value.length;
            if (this.value.length > 300) {
                this.value = this.value.substring(0, 300);
                bioCount.textContent = 300;
            }
        });
    }

    // Age range sliders
    const minAge = document.getElementById('minAge');
    const maxAge = document.getElementById('maxAge');
    const minAgeValue = document.getElementById('minAgeValue');
    const maxAgeValue = document.getElementById('maxAgeValue');
    
    if (minAge && maxAge) {
        minAge.addEventListener('input', function() {
            if (parseInt(minAge.value) > parseInt(maxAge.value)) {
                minAge.value = maxAge.value;
            }
            minAgeValue.textContent = minAge.value;
        });
        
        maxAge.addEventListener('input', function() {
            if (parseInt(maxAge.value) < parseInt(minAge.value)) {
                maxAge.value = minAge.value;
            }
            maxAgeValue.textContent = maxAge.value;
        });
    }

    // Distance slider
    const distance = document.getElementById('distance');
    const distanceValue = document.getElementById('distanceValue');
    
    if (distance && distanceValue) {
        distance.addEventListener('input', function() {
            distanceValue.textContent = distance.value;
        });
    }

    // Get location button
    const getLocationBtn = document.getElementById('getLocation');
    const locationInput = document.getElementById('location');
    
    if (getLocationBtn && locationInput) {
        getLocationBtn.addEventListener('click', function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        // You would typically use a geocoding API here
                        locationInput.value = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
                    },
                    (error) => {
                        alert('Unable to get location. Please enter manually.');
                    }
                );
            } else {
                alert('Geolocation is not supported by your browser.');
            }
        });
    }
}

// ===== HELPER FUNCTIONS =====
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    const inputGroup = document.getElementById(fieldId).parentElement;
    
    if (errorElement) {
        errorElement.textContent = message;
    }
    if (inputGroup) {
        inputGroup.classList.add('error');
        inputGroup.classList.remove('success');
    }
}

function clearError(fieldId) {
    const errorElement = document.getElementById(fieldId + 'Error');
    const inputGroup = document.getElementById(fieldId).parentElement;
    
    if (errorElement) {
        errorElement.textContent = '';
    }
    if (inputGroup) {
        inputGroup.classList.remove('error');
        inputGroup.classList.add('success');
    }
}
