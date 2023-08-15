const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/search", async (req, res) => {
  const [queryOption] = Object.keys(req.query);

  if (queryOption === "movieName") {
    try {
      const { movieName } = req.query;
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

      // Process the TMDB response and send relevant data as JSON
      res.json(tmdbResponse.data);
    } catch (error) {
      console.error("Error searching for movies", error);
      res.status(500).json({ error: "An error occurred" });
    }
  } else if (queryOption === "id") {
    try {
      const { id } = req.query;
      // Make a request to TMDB API using axios
      const tmdbResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${encodeURIComponent(id)}/credits`,
        {
          // Include your TMDB API key in the request headers
          headers: {
            Authorization: `Bearer ${process.env.YOUR_TMDB_API_KEY}`,
          },
        }
      );

      const { cast, crew } = tmdbResponse.data;

      const results = crew.filter((item) => {
        const { job, name } = item;
        if (job === "Director") return name;
      });

      const directing = [{ directorName: "Unknown" }];

      if (results && results.length > 0) {
        directing[0].directorName = results[0].name;
      }

      const [actor1, actor2, actor3] = cast;

      const acting = [
        {
          actorName: actor1 && actor1.name ? actor1.name : "Unknown",
          character: actor1 && actor1.character ? actor1.character : "Unknown",
        },
        {
          actorName: actor2 && actor2.name ? actor2.name : "Unknown",
          character: actor2 && actor2.character ? actor2.character : "Unknown",
        },
        {
          actorName: actor3 && actor3.name ? actor3.name : "Unknown",
          character: actor3 && actor3.character ? actor3.character : "Unknown",
        },
      ];

      const data = [acting, directing];

      res.json(data);
    } catch (error) {
      console.error("Error searching for credits", error);
      res.status(500).json({ error: "An error occurred" });
    }
  }
});

module.exports = router;
