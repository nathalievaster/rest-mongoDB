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
    try {
        const newExperience = new Experience(req.body);
        const savedExperience = await newExperience.save();
        res.status(201).json(savedExperience);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Uppdaterar en erfarenhet baserat på ID
app.put("/experiences/:id", async (req, res) => {
    const { id } = req.params; // Hämtar ID från URL:en
    const updatedData = req.body; // Ny data som skickas i request body
  
    try {
      // Hitta dokumentet via ID och uppdatera det med ny data
      const updatedExperience = await Experience.findByIdAndUpdate(
        id,
        updatedData,
        { new: true, runValidators: true } // new: returnera uppdaterade dokumentet, runValidators: validera ny data
      );
  
      if (!updatedExperience) {
        return res.status(404).json({ message: "Erfarenhet hittades inte" });
      }
  
      res.json(updatedExperience); // Skicka tillbaka det uppdaterade dokumentet
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });