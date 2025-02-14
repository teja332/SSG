document.addEventListener("DOMContentLoaded", () => {
    console.log("Page Loaded: Cards are ready!");
});

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modal-content");

    // Unique video sets for each row using full video links
    const videoData = {
        "row1": [
            "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
            "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
            "https://www.youtube.com/watch?v=L_jWHffIx5E",
            "https://www.youtube.com/watch?v=31lQzhN527Y",
            "https://youtu.be/JAzavlFwUdE?si=03vsADE9UakTs8qP",
            "https://www.youtube.com/watch?v=aqjxflahtXo",
            "https://www.youtube.com/watch?v=pm-2vw8RzC0",
            "https://youtu.be/JAzavlFwUdE"
            
        ],
        "row2": [
            "https://www.youtube.com/watch?v=Zi_XLOBDo_Y",
            "https://www.youtube.com/watch?v=hT_nvWreIhg",
            "https://www.youtube.com/watch?v=OpQFFLBMEPI",
            "https://www.youtube.com/watch?v=VbfpW0pbvaU"
        ],
        "row3": [
            "https://www.youtube.com/watch?v=RgKAFK5djSk",
            "https://www.youtube.com/watch?v=3tmd-ClpJxA",
            "https://www.youtube.com/watch?v=JGwWNGJdvx8",
            "https://www.youtube.com/watch?v=UceaB4D0jpo"
        ],
        "row4": [
            "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
            "https://www.youtube.com/watch?v=kJqp7kiw5fk",
            "https://www.youtube.com/watch?v=fLexgOxsZu0",
            "https://www.youtube.com/watch?v=9bZkp7q19f0"
        ],
        "row5": [
            "https://www.youtube.com/watch?v=CevxZvSJLk8",
            "https://www.youtube.com/watch?v=pRpeEdMmmQ0",
            "https://www.youtube.com/watch?v=tgbNymZ7vqY",
            "https://www.youtube.com/watch?v=YqeW9_5kURI"
        ]
    };

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

    document.querySelectorAll(".card-container .card").forEach(card => {
        card.addEventListener("click", async function (e) {
            e.stopPropagation();
            const row = this.closest(".row");
            if (!row) return;
            const rowID = row.getAttribute("data-row") || "row1"; 
            const videoLinks = videoData[rowID] || [];
            modalContent.innerHTML = "";

            const closeButton = document.createElement("button");
            closeButton.id = "close-modal";
            closeButton.classList.add("close-btn");
            closeButton.textContent = "X";
            modalContent.appendChild(closeButton);

            const modalGrid = document.createElement("div");
            modalGrid.classList.add("modal-card-container");

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

            modalContent.appendChild(modalGrid);
            modal.style.display = "flex";
        });
    });

    document.addEventListener("click", function (e) {
        if (e.target.id === "close-modal" || e.target === modal) {
            modal.style.display = "none";
        }
    });
});
