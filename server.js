require('dotenv').config(); // Laddar in .env

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Lagrar port och uri från env i variabler
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI).then(()=> {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log("Problem with connecting to database" + error);
});

// Startar upp
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });