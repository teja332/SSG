function logout() {
    alert("You have been logged out.");
    window.location.href = "../login.html";
}

function events() {
    window.location.href = "../events/add_events.html";
}

document.getElementById("youtubeForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const youtubeLink = document.getElementById("youtubeLink").value;
    const row = document.querySelector('input[name="row"]:checked')?.value;

    if (!row) {
        alert("Please select a row!");
        return;
    }

    const data = { youtubeLink, row };

    try {
        const response = await fetch("http://localhost:10000/submit", { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.status === 409) {
            alert("Duplicate entry! This video is already submitted in this row.");
        } else if (response.status === 201) {
            alert(result.message);
            document.getElementById("youtubeForm").reset();
        } else {
            alert("Error submitting data.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to submit data.");
    }
});
