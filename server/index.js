const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const app = express();
require("dotenv").config();

const userController = require("./controllers/userController");

app.use(cors());
app.use(express.json());

// **** DB Connexion **** //
const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("MongoDB connection established");
});

// **** Routes **** //
app.post("/api/signup", userController.createUser);

// **** Server **** //
const port = process.env.PORT || 6500;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
