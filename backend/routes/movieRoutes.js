const express = require("express");
const Movie = require("../models/Movie"); // Path to your Movie model

const router = express.Router();

// Create a new movie
router.post("/movies", async (req, res) => {
  try {
    const movie = new Movie(req.body);
    const saving = await movie.save();
    if (saving) console.log(`| ${saving.movieName} | is saved.`);
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ error: "Error creating movie" });
  }
});

router.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.status(201).json(movies);
  } catch (error) {
    res.status(400).json({ error: "Error getting movies" });
  }
});

// Define other routes (GET, PUT, DELETE) here

module.exports = router;
