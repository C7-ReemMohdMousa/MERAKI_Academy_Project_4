const usersModel = require("../models/usersSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
      if (err.keyPattern) {
        return res.status(409).json({
          success: false,
          message: `The email already exists`,
        });
      }
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  //search the database to find the email
  usersModel
    .findOne({ email })
    .populate("role")
    .then((results) => {
      //if the email is not exsisted return an error msg
      if (!results) {
        res.status(403).json({
          success: false,
          message: `The email or the password is incorrect`,
        });
      }
      //if the email is exsisted, compare the entered password with hashed password
      bcrypt.compare(password, results.password, (err, matched) => {
        if (matched) {
          //if the passwords matched, generate the token
          const payload = {
            userId: results._id,
            firstName: results.firstName,
            lastName: results.lastName,
            role: results.role,
          };
          const options = {
            expiresIn: process.env.TOKEN_EXP_Time,
          };
          const token = jwt.sign(payload, process.env.SECRET, options);

          res.status(200).json({
            success: true,
            message: `Valid login credentials`,
            token: token,
          });
        }
        //if not matched, throw error msg
        if (err) {
          throw new Error(err.message);
        }
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

module.exports = { register, login };
