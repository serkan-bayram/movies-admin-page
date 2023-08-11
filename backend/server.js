const express = require("express");
const cors = require("cors"); // Import the cors middleware
const app = express();
const port = process.env.PORT || 5000;
const axios = require("axios");
require("dotenv").config();

app.use(cors());

// Middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/api/movies/search", async (req, res) => {
  console.log(req.query);
  try {
    const { movieName, movieYear } = req.query;
    // Make a request to TMDB API using axios
    const tmdbResponse = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        movieName
      )}`,
      {
        // Include your TMDB API key in the request headers
        headers: {
          Authorization: `Bearer ${process.env.YOUR_TMDB_API_KEY}`,
        },
      }
    );

    console.log(tmdbResponse.data);
    // Process the TMDB response and send relevant data as JSON
    res.json(tmdbResponse.data);
  } catch (error) {
    console.error("Error searching for movies", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
