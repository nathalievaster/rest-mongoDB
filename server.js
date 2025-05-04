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

// Anslut till MongoDB med URI från miljövariabler
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB"); // Lyckad anslutning
  })
  .catch((error) => {
    console.log("Problem with connecting to database: " + error); // Fel vid anslutning
  });

// Starta Express-servern på angiven port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Test-endpoint för att visa att API:et fungerar
app.get("/api", async (req, res) => {
  res.json({ message: "Welcome to this Api" });
});

// Hämta alla erfarenheter från databasen
app.get("/experiences", async (req, res) => {
  try {
    let result = await Experience.find(); // Hämta alla dokument i collectionen
    return res.json(result); // Skicka datan som JSON
  } catch (error) {
    return res.status(500).json(error); // Vid fel, skicka status 500 (serverfel)
  }
});

// Skapa en ny erfarenhet i databasen
app.post("/experiences", async (req, res) => {
  try {
    const newExperience = new Experience(req.body); // Skapa ny instans med request-body
    const savedExperience = await newExperience.save(); // Spara till databasen
    res.status(201).json(savedExperience); // Skicka tillbaka den sparade posten med 201 Created
  } catch (error) {
    res.status(400).json({ message: error.message }); // Vid fel, skicka status 400 (bad request)
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

  // Tar bort en erfarenhet baserat på ID
app.delete("/experiences/:id", async (req, res) => {
    const { id } = req.params; // Hämtar ID från URL:en
  
    try {
      // Hitta dokumentet med ID och ta bort det
      const deletedExperience = await Experience.findByIdAndDelete(id);
  
      if (!deletedExperience) {
        return res.status(404).json({ message: "Erfarenhet hittades inte" });
      }
  
      res.json({ message: "Erfarenhet borttagen", data: deletedExperience });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });