require('dotenv').config(); // Laddar in .env
const Experience = require("./models/experience");

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

app.get("/api", async(req, res) => {
    res.json({message: "Welcome to this Api"});
});

app.get("/experiences", async(req, res) => {
    try {
        let result = await Experience.find();

        return res.json(result);
    } catch(error) {
        return res.status(500).json(error);
    }
});

app.post("/experiences", async (req, res) => {
    console.log("Received POST request with body:", req.body);  // Debugging logg
    try {
        const newExperience = new Experience(req.body);
        const savedExperience = await newExperience.save();
        res.status(201).json(savedExperience);
    } catch (error) {
        console.log("Error:", error);  // Loggar felet för felsökning
        res.status(400).json({ message: error.message });
    }
});