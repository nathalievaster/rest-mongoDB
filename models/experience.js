const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
        trim: true
      },
      position: {
        type: String,
        required: true,
        trim: true
      },
      startDate: {
        type: Date,
        required: true
      },
      endDate: {
        type: Date,
        default: null // om man t.ex. fortfarande arbetar där
      },
      description: {
        type: String,
        trim: true
      }
});

const Experience = mongoose.model("Experience", experienceSchema);
module.exports = Experience;