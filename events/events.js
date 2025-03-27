async function fetchEvents() {
    const apiEndpoints = [
        "https://ssg-event-server.onrender.com/api/events",
        "http://localhost:5000/api/events"
    ];

    for (const api of apiEndpoints) {
        try {
            const response = await fetch(api);
            if (response.ok) {
                const events = await response.json();
                console.log(`Fetched Events from ${api}:`, events); // Debugging
                populateEventCards(events);
                return; // Stop fetching if successful
            } else {
                console.warn(`API ${api} returned status: ${response.status}`);
            }
        } catch (error) {
            console.error(`Error fetching from ${api}:`, error);
        }
    }
    console.error("All API endpoints failed");
}


function populateEventCards(events) {
    const cardsContainer = document.querySelector('.cards-container');
    if (!cardsContainer) {
        console.error("Error: '.cards-container' not found on the page.");
        return;
    }
    cardsContainer.innerHTML = ''; // Clear existing static cards
    
    if (events.length === 0) {
        console.warn("No events found in the database.");
        cardsContainer.innerHTML = "<p>No upcoming events.</p>";
        return;
    }
    
    events.forEach(event => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('onclick', 'toggleFlip(this)');
        
        cardElement.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <h3>${event.title}</h3>
                    <p>${event.time}<br>${event.date}</p>
                    <h4>Overview</h4>
                </div>
                <div class="card-back" style="overflow-y: auto; scrollbar-width: none; -ms-overflow-style: none; white-space: pre-line; word-wrap: break-word;">
                    <h3>${event.title}</h3>
                    <p>
                        Date: ${event.date}<br>
                        Time: ${event.time}<br>
                        Place: ${event.place}<br>
                        Theme: ${event.theme}<br>
                        Info: ${event.info}
                    </p>
                </div>
            </div>
        `;
        
        cardsContainer.appendChild(cardElement);
    });
}

function toggleFlip(cardElement) {
    cardElement.classList.toggle("flipped");
}

// Hamburger Menu Functionality
const menuToggle = document.getElementById('menu-toggle');
const overlayMenu = document.getElementById('overlay-menu');

menuToggle.addEventListener('click', () => {
    const isOpen = overlayMenu.style.display === 'flex';
    overlayMenu.style.display = isOpen ? 'none' : 'flex';
    menuToggle.classList.toggle('active');
});

// Fetch events when the page loads
document.addEventListener('DOMContentLoaded', fetchEvents);
