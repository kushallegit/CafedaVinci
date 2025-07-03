// Scroll Animation
const elements = document.querySelectorAll('.animate-on-scroll');

window.addEventListener('scroll', () => {
    elements.forEach(element => {
        if (element.getBoundingClientRect().top < window.innerHeight) {
            element.classList.add('visible');
        }
    });
});

// Newsletter Subscription Form Validation
document.addEventListener('DOMContentLoaded', () => {
    const newsletterForm = document.getElementById('newsletter-form');
    const emailInput = document.getElementById('email');

    newsletterForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = emailInput.value.trim();

        if (validateEmail(email)) {
            alert(`Thank you for subscribing with ${email}!`);
            emailInput.value = ''; // Clear the input field
        } else {
            alert('Please enter a valid email address.');
        }
    });

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Corrected regex
        return emailRegex.test(email);
    }
});

// Scroll event listener for both 'animate-on-scroll' and 'whats-happening' elements
window.addEventListener('scroll', () => {
    // Handle 'animate-on-scroll' elements
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        if (element.getBoundingClientRect().top < window.innerHeight) {
            element.classList.add('visible');
        }
    });
});
