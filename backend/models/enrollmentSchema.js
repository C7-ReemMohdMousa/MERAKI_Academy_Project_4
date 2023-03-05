const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  enrolledAt: {
    type: Date,
    default: Date.now(),
  },
  completedAt: {
    type: Date,
    default: null,
  },
  status: {
    type: String,
    default: "in progress",
  },
  progress: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Enrollment", enrollmentSchema);
