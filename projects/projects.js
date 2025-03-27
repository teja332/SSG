async function fetchProjects() {
    const apiEndpoints = [
        'https://ssg-f83i.onrender.com/api/projects',
        'http://localhost:10000/api/projects'
    ];

    for (const api of apiEndpoints) {
        try {
            const response = await fetch(api);
            if (response.ok) {
                const projects = await response.json();
                console.log(`Fetched Projects from ${api}:`, projects); // Debugging
                populateProjectCards(projects);
                attachCardClickListeners(projects); // Ensure event listeners are attached after populating
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

function populateProjectCards(projects) {
    const rows = document.querySelectorAll(".row");
    if (!rows.length) {
        console.error("Error: No rows found on the page.");
        return;
    }
    
    // Clear existing static content
    rows.forEach(row => row.querySelector(".card-groups").innerHTML = "");
    
    const sortedProjects = {};
    
    // Sort projects into respective rows
    projects.forEach(project => {
        if (!sortedProjects[project.row]) {
            sortedProjects[project.row] = [];
        }
        sortedProjects[project.row].push(project);
    });
    
    rows.forEach(row => {
        const rowID = row.getAttribute("data-row");
        const projectList = sortedProjects[rowID] || [];
        
        const cardGroups = document.createElement("div");
        cardGroups.classList.add("card-groups");
        
        let cardContainer = document.createElement("div");
        cardContainer.classList.add("card-container");
        
        projectList.forEach((project, index) => {
            const cardElement = document.createElement("div");
            cardElement.classList.add("card");
            
            const thumbnail = document.createElement("img");
            thumbnail.src = `https://img.youtube.com/vi/${project.videoId}/hqdefault.jpg`;
            thumbnail.alt = "Video Thumbnail";
            
            cardElement.appendChild(thumbnail);
            cardContainer.appendChild(cardElement);
            
            // Group cards in sets of 3
            if ((index + 1) % 3 === 0) {
                cardGroups.appendChild(cardContainer);
                cardContainer = document.createElement("div");
                cardContainer.classList.add("card-container");
            }
        });
        
        if (cardContainer.childElementCount > 0) {
            cardGroups.appendChild(cardContainer);
        }
        
        row.querySelector(".card-groups").appendChild(cardGroups);
    });
}

async function fetchVideoDetails(videoURL) {
    const videoID = new URL(videoURL).searchParams.get("v");
    if (!videoID) return { title: "Unknown Video", description: "Description not available." };

    try {
        const response = await fetch(`https://noembed.com/embed?url=${videoURL}`);
        const data = await response.json();
        return {
            title: data.title || "Untitled Video",
            description: data.author_name || "No description available."
        };
    } catch (error) {
        console.error("Error fetching video details:", error);
        return {
            title: "Unknown Video",
            description: "Description not available."
        };
    }
}

function attachCardClickListeners(projects) {
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modal-content");

    document.querySelectorAll(".card-container .card").forEach((card) => {
        card.addEventListener("click", async function (e) {
            e.stopPropagation();
            const row = this.closest(".row");
            if (!row) return;
            const rowID = row.getAttribute("data-row") || "row1";
            const videoLinks = projects.filter(p => p.row === rowID).map(p => p.youtubeLink);

            // Clear existing modal content before appending
            modalContent.innerHTML = "";

            const closeButton = document.createElement("button");
            closeButton.id = "close-modal";
            closeButton.classList.add("close-btn");
            closeButton.textContent = "X";
            modalContent.appendChild(closeButton);

            let modalGrid = document.querySelector(".modal-card-container");
            if (!modalGrid) {
                modalGrid = document.createElement("div");
                modalGrid.classList.add("modal-card-container");
                modalContent.appendChild(modalGrid);
            } else {
                modalGrid.innerHTML = ""; // Ensure only one container exists
            }

            for (let videoURL of videoLinks) {
                const videoID = new URL(videoURL).searchParams.get("v");
                const { title, description } = await fetchVideoDetails(videoURL);

                const videoCard = document.createElement("a");
                videoCard.classList.add("modal-card");
                videoCard.href = videoURL;
                videoCard.target = "_blank";

                const videoThumbnail = document.createElement("img");
                videoThumbnail.src = `https://img.youtube.com/vi/${videoID}/hqdefault.jpg`;
                videoThumbnail.alt = title;
                videoThumbnail.classList.add("video-thumbnail");

                const videoTitle = document.createElement("h3");
                videoTitle.textContent = title;
                videoTitle.classList.add("video-title");

                const videoDescription = document.createElement("p");
                videoDescription.textContent = description;
                videoDescription.classList.add("video-description");

                videoCard.appendChild(videoThumbnail);
                videoCard.appendChild(videoTitle);
                videoCard.appendChild(videoDescription);
                modalGrid.appendChild(videoCard);
            }

            modal.style.display = "flex";
        });
    });
}

document.addEventListener("click", function (e) {
    if (e.target.id === "close-modal" || e.target === document.getElementById("modal")) {
        document.getElementById("modal").style.display = "none";
    }
});

// Fetch projects when the page loads
document.addEventListener('DOMContentLoaded', fetchProjects);


// Hamburger Menu Functionality
const menuToggle = document.getElementById('menu-toggle');
const overlayMenu = document.getElementById('overlay-menu');

menuToggle.addEventListener('click', () => {
    const isOpen = overlayMenu.style.display === 'flex';
    overlayMenu.style.display = isOpen ? 'none' : 'flex';
    menuToggle.classList.toggle('active');
});