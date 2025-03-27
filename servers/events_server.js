const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { exec } = require("child_process");
require("dotenv").config();
const rateLimit = require("express-rate-limit");

const app = express();
app.use(express.json());

// CORS: Only allow specific origins
app.use(cors({
  origin: ["http://localhost:5502", "https://ssg-event-server.onrender.com", "https://firefox672.github.io", "http://localhost:5000"], 
  origin:"*", 
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

// Unrecognized feature: 'interest-cohort'. This should remove the warning in the console.
app.use((req, res, next) => {
  res.setHeader("Permissions-Policy", "interest-cohort=()");
  next();
});

// Rate limiting to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Use environment variable for MongoDB URI
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
const eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  time: String,
  place: String,
  theme: String,
  info: String,
});

const Event = mongoose.model("Event", eventSchema);

// ✅ FIX: Add missing GET endpoint for fetching events
app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// API endpoint to handle event submissions
app.post("/submit-event", async (req, res) => {
  try {
    const { title, date, time, place, theme, info } = req.body;

    // Check if the event already exists (same title & date)
    const existingEvent = await Event.findOne({ title, date });
    if (existingEvent) {
      return res.status(409).json({ error: "Duplicate event. This event is already scheduled on this date." });
    }

    // Save to database
    const newEvent = new Event({ title, date, time, place, theme, info });
    await newEvent.save();

    res.status(201).json({ message: "Event saved successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to save event" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
