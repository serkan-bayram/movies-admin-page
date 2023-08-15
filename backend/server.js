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
      const { id: movieId } = req.query;
      // Make a request to TMDB API using axios
      const tmdbResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${encodeURIComponent(
          movieId
        )}/credits`,
        {
          // Include your TMDB API key in the request headers
          headers: {
            Authorization: `Bearer ${process.env.YOUR_TMDB_API_KEY}`,
          },
        }
      );

      const response = tmdbResponse.data;
      // console.log(Object.keys(response)); id, cast, crew

      const { id, cast, crew } = response;

      const results = crew.filter((item) => {
        const { job, name } = item;
        if (job === "Director") return name;
      });

      const directing = [{ directorName: results[0].name }];

      const [actor1, actor2, actor3] = cast;

      const acting = [
        {
          actorName: actor1.name,
          character: actor1.character,
        },
        {
          actorName: actor2.name,
          character: actor2.character,
        },
        {
          actorName: actor3.name,
          character: actor3.character,
        },
      ];

      const data = [acting, directing];

      // Process the TMDB response and send relevant data as JSON
      res.json(data);
    } catch (error) {
      console.error("Error searching for movies", error);
      res.status(500).json({ error: "An error occurred" });
    }
  }
});

// ToDo credits için bi route daha oluştur ordan gereken filmler için creditsleri çek frontenden
// https://developer.themoviedb.org/reference/movie-credits

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
