// Scroll event listener for both 'animate-on-scroll' and 'whats-happening' elements
window.addEventListener('scroll', () => {
    // Handle 'animate-on-scroll' elements
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        if (element.getBoundingClientRect().top < window.innerHeight) {
            element.classList.add('visible');
        }
    });

    // Handle '.whats-happening' section visibility
    const whatsHappening = document.querySelector('.whats-happening');
    if (whatsHappening && whatsHappening.getBoundingClientRect().top < window.innerHeight) {
        whatsHappening.classList.add('visible');
    }
});


const elements = document.querySelectorAll('.animate-on-scroll');

window.addEventListener('scroll', () => {
    elements.forEach(element => {
        if (element.getBoundingClientRect().top < window.innerHeight) {
            element.classList.add('visible');
        }
    });
});

// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
}

// Function to handle the scroll event
function handleScroll() {
    const section = document.querySelector('.whats-happening');
    
    if (isInViewport(section)) {
        section.classList.add('visible'); // Add the 'visible' class when in view
    }
}

// Listen for the scroll event and check visibility
window.addEventListener('scroll', handleScroll);

// Initial check to apply the class if the section is already in view
document.addEventListener('DOMContentLoaded', handleScroll);

