const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const usersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  },
  enrolledCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  createdCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],

  image: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw7jXBf3yLBZo1hA88vD25iD9xkHBfF0thiQ&usqp=CAU",
  },

  description: {
    type: String,
  },

  status: { type: String, default: "active" },
});

usersSchema.pre("save", async function () {
  //save the email with lowercase letters
  this.email = this.email.toLowerCase();
  //hash the password

  try {
    this.password = await bcrypt.hash(this.password, 5);
  } catch (err) {
    throw err;
  }
});

module.exports = mongoose.model("User", usersSchema);
