function toggleFlip(cardElement) {
    // Check if the card is already flipped
    if (cardElement.classList.contains("flipped")) {
        // If flipped, remove the class to unflip it
        cardElement.classList.remove("flipped");
    } else {
        // If not flipped, add the class to flip it
        cardElement.classList.add("flipped");
    }
}
