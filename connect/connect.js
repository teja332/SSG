// document.getElementById('connectBtn').addEventListener('click', function() {
//     document.getElementById('connectForm').style.display = 'block';
//     document.getElementById('contributeForm').style.display = 'none';
//     document.getElementById('connectBtn').classList.add('active');
//     document.getElementById('contributeBtn').classList.remove('active');
//     document.getElementById('toggleBtn').innerText = 'Contribute';
// });

// document.getElementById('contributeBtn').addEventListener('click', function() {
//     document.getElementById('contributeForm').style.display = 'block';
//     document.getElementById('connectForm').style.display = 'none';
//     document.getElementById('contributeBtn').classList.add('active');
//     document.getElementById('connectBtn').classList.remove('active');
//     document.getElementById('toggleBtn').innerText = 'Connect';
// });

document.addEventListener("DOMContentLoaded", function () {
    let contributeForm = document.getElementById('contributeForm');
    let connectForm = document.getElementById('connectForm');
    let connectBtn = document.getElementById('connectBtn');
    let contributeBtn = document.getElementById('contributeBtn');
    let toggleBtn = document.getElementById('toggleBtn');
    let toggleImage = document.getElementById('toggleImage'); // Image element

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
            toggleImage.src = '/assets/images/sample.jpeg'; // Change to connect image
        } else {
            connectForm.style.display = 'block';
            contributeForm.style.display = 'none';
            connectBtn.classList.add('active');
            contributeBtn.classList.remove('active');
            toggleBtn.innerText = 'Contribute';
            toggleImage.src ='/assets/images/sample1.jpeg'; // Change to contribute image
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
});