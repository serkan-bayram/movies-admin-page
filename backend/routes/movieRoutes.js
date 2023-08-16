const express = require("express");
const Movie = require("../models/Movie"); // Path to your Movie model

const router = express.Router();

// Create a new movie
router.post("/movies", async (req, res) => {
  try {
    const getMovies = await Movie.find({});

    let isAdded = false;
    getMovies.forEach((movie) => {
      if (movie.movieId === req.body.movieId) {
        isAdded = true;
      }
    });

    if (!isAdded) {
      const movie = new Movie(req.body);
      const saving = await movie.save();
      if (saving) console.log(`| ${saving.movieName} | is saved.`);
      res.status(201).json(movie);
    } else {
      console.log(`| ${req.body.movieName} | is already added.`);
      res.send(false);
    }
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

router.delete("/movies/:movieId/:movieName", async (req, res) => {
  try {
    const movieId = req.params.movieId;

    const deletedMovie = await Movie.findOneAndDelete({
      movieId: movieId,
    });

    if (deletedMovie) {
      console.log(`| ${req.params.movieName} | is deleted.`);
      res.status(200).json({ message: "Movie deleted successfully" });
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting movie" });
  }
});

// Define other routes (GET, PUT, DELETE) here

module.exports = router;
