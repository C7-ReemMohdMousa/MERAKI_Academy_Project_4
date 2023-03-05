const mongoose = require("mongoose");

const lecturesSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  videoURL: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Lecture", lecturesSchema);
