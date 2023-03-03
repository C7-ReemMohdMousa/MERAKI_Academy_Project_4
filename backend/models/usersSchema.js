const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  enrolledCourses: [{type: mongoose.Schema.Types.ObjectId, ref: "Course"}],
  createdCourses: [{type: mongoose.Schema.Types.ObjectId, ref: "Course"}]
});



module.exports = mongoose.model("User", usersSchema);
