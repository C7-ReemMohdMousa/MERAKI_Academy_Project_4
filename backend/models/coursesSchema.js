const mongoose = require("mongoose");

const coursesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoURL : { required: true },
  description: { type: String, required: true },
  instructors: [{ type: String, required: true }],
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  level: { type: String, required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Course", coursesSchema);
