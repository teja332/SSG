const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { exec } = require("child_process");
require("dotenv").config();



const app = express();
app.use(express.json());
app.use(cors());

// Replace with your MongoDB Atlas connection string
const mongoURI = process.env.MONGO_URI;


mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// API to Start Server Automatically
app.get("/start-server", (req, res) => {
  console.log("Server is already running.");
  res.status(200).send("Server is running.");
});

// Define schema and model
const youtubeSchema = new mongoose.Schema({
  youtubeLink: String,
  videoId: String, // Store extracted video ID
  row: String,
});

const YoutubeEntry = mongoose.model("YoutubeEntry", youtubeSchema);

// Function to extract YouTube video ID from a given link
function extractVideoID(url) {
  const regex =
    /(?:youtube\.com\/(?:.*[?&]v=|.*\/v\/|.*\/embed\/|.*\/shorts\/)|youtu\.be\/|youtube\.com\/live\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}


// API endpoint to handle form submission
app.post("/submit", async (req, res) => {
  try {
    const { youtubeLink, row } = req.body;
    const videoId = extractVideoID(youtubeLink);

    if (!videoId) {
      return res.status(400).json({ error: "Invalid YouTube link" });
    }

    // Check if the combination of videoId and row already exists
    const existingEntry = await YoutubeEntry.findOne({ videoId, row });

    if (existingEntry) {
      return res.status(409).json({ error: "Duplicate entry. This video is already submitted in this row." });
    }

    // Save to database
    const newEntry = new YoutubeEntry({ youtubeLink, videoId, row });
    await newEntry.save();

    res.status(201).json({ message: "Data saved successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to save data" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

app.use(limiter);
