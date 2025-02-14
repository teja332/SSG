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
});
