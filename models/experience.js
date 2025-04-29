const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  company: String,
  position: String,
  startDate: String,
  endDate: String,
  description: String
});

module.exports = mongoose.model("Experience", experienceSchema);