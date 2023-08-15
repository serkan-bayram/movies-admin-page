const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  movieId: {
    type: String,
    required: false,
  },
  movieName: {
    type: String,
    required: false,
  },
  releaseDate: {
    type: String,
    required: false,
  },
  director: {
    type: String,
    required: false,
  },
  actors: {
    type: [String],
    required: false,
  },
  characters: {
    type: [String],
    required: false,
  },
  posterPath: {
    type: String,
    required: false,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
