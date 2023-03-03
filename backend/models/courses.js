const mongoose = require("mongoose");

const coursesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoURL : { required: true },
  authors: [{ type: String, required: true }],
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Course", coursesSchema);
