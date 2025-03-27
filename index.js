// JavaScript for slideshow functionality

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slideshow .slide');
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    // Initialize the slideshow
    showSlide(currentIndex);
    setInterval(nextSlide, 5000); // Change slide every 3 seconds

    // Hamburger Menu Functionality
    const menuToggle = document.getElementById('menu-toggle');
    const overlayMenu = document.getElementById('overlay-menu');

    menuToggle.addEventListener('click', () => {
        const isOpen = overlayMenu.style.display === 'flex';
        overlayMenu.style.display = isOpen ? 'none' : 'flex';
        menuToggle.classList.toggle('active');
    });

});
