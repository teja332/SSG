document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const place = document.getElementById("place").value.trim();
    const theme = document.getElementById("theme").value.trim();
    const info = document.getElementById("info").value.trim();

    if (!title || !date || !time || !place || !theme || !info) {
        alert("Please fill out all fields.");
        return;
    }

    const eventData = { title, date, time, place, theme, info };

    try {
        const response = await fetch("http://localhost:5000/submit-event", { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(eventData),
        });

        const result = await response.json();

        if (response.status === 409) {
            alert("Duplicate event! An event with this title and date already exists.");
        } else if (response.status === 201) {
            alert(result.message);
            document.querySelector("form").reset();
        } else {
            alert("Error submitting event.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to submit event.");
    }
});

// Logout function
function logout() {
    alert("You have been logged out.");
    window.location.href = "../login.html";
}

// Navigation function
function projects() {
    window.location.href = "../projects/add_projects.html";
}
