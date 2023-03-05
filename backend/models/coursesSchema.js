const mongoose = require("mongoose");

const coursesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  
  description: {
    type: String,
    required: true,
  },

  instructor: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  

  lectures: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lecture",
    },
  ],

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },

  level: {
    type: String,
    required: true,
  },

  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Course", coursesSchema);
