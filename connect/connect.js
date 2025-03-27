document.addEventListener("DOMContentLoaded", function () {
    let contributeForm = document.getElementById('contributeForm');
    let connectForm = document.getElementById('connectForm');
    let connectBtn = document.getElementById('connectBtn');
    let contributeBtn = document.getElementById('contributeBtn');
    let toggleBtn = document.getElementById('toggleBtn');
    let toggleImage = document.getElementById('toggleImage'); // Image element
    let container = document.querySelector('.container'); // Get the container div
    let imageContainer = document.querySelector('.image-container'); // Image container

    // Function to check if it's mobile view
    function isMobileView() {
        return window.innerWidth <= 768; // Adjust breakpoint if needed
    }

    // Function to update background image only on mobile
    function updateBackgroundImage(imageSrc) {
        if (isMobileView()) {
            container.style.backgroundImage = `url('${imageSrc}')`;
            container.style.backgroundSize = 'cover';
            container.style.backgroundPosition = 'center';
        }
    }

    // Ensure the correct initial display state
    connectForm.style.display = 'block';
    contributeForm.style.display = 'none';

    toggleBtn.addEventListener('click', function() {
        if (connectForm.style.display === 'block') {
            connectForm.style.display = 'none';
            contributeForm.style.display = 'block';
            connectBtn.classList.remove('active');
            contributeBtn.classList.add('active');
            toggleBtn.innerText = 'Connect';
            toggleImage.src = '../assets/images/c1.jpg'; // Change to connect image
            updateBackgroundImage(toggleImage.src);
        } else {
            connectForm.style.display = 'block';
            contributeForm.style.display = 'none';
            connectBtn.classList.add('active');
            contributeBtn.classList.remove('active');
            toggleBtn.innerText = 'Contribute';
            toggleImage.src = '../assets/images/c2.heic'; // Change to contribute image
            updateBackgroundImage(toggleImage.src);
        }
    });

    // Ensure Contribute Button Works on First Click
    if (contributeBtn) {
        contributeBtn.addEventListener("click", function () {
            console.log("Contribute button clicked!");
            alert("Contribute Button Clicked!");
        });

        // Ensure it recognizes clicks immediately
        contributeBtn.focus();
    }

    // Hamburger Menu Functionality
    const menuToggle = document.getElementById('menu-toggle');
    const overlayMenu = document.getElementById('overlay-menu');

    menuToggle.addEventListener('click', () => {
        const isOpen = overlayMenu.style.display === 'flex';
        overlayMenu.style.display = isOpen ? 'none' : 'flex';
        menuToggle.classList.toggle('active');
    });

    // Set initial background image only for mobile view
    updateBackgroundImage(toggleImage.src);

    // Update background on window resize
    window.addEventListener("resize", function () {
        updateBackgroundImage(toggleImage.src);

        // Check if it has become mobile and adjust layout
        if (isMobileView()) {
            if (imageContainer) {
                imageContainer.style.display = 'none'; // Hide the image container on mobile
            }
        } else {
            if (imageContainer) {
                imageContainer.style.display = 'block'; // Show the image container on desktop
            }
        }
    });
});
