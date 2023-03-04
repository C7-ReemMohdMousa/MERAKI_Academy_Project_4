const usersModel = require("../models/usersSchema");

const register = (req, res) => {
  const { firstName, lastName, age, email, password, role } = req.body;

  const newUser = new usersModel({
    firstName,
    lastName,
    age,
    email,
    password,
    role,
  });

  newUser
    .save()
    .then((results) => {
      console.log(results);
      res.status(201).json({
        success: true,
        message: "Account Created Successfully",
        author: results,
      });
    })
    .catch((err) => {
      console.log("KEY: ", err.keyPattern);
      res.status(409).json({
        success: false,
        message: "The email already exists",
      });
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;


  
};

module.exports = { register };
