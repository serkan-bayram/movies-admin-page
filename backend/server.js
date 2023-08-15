const express = require("express");
const cors = require("cors"); // Import the cors middleware
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const movieRoutes = require("./routes/movieRoutes");
const searchRoutes = require("./routes/searchRoutes");
require("dotenv").config();

app.use(cors());

// Middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

async function main() {
  const connection = await mongoose.connect(
    "mongodb://127.0.0.1:27017/moviesDB"
  );
  if (connection.connection.readyState === 1)
    console.log("Database connection is established.");
}

main().catch((err) => console.log(err));

app.use("/api", movieRoutes);
app.use("/api", searchRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
