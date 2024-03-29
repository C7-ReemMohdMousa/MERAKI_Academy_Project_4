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
      } else {
        res.status(500).json({
          success: false,
          message: `Server Error`,
          err: err.message,
        });
      }
    });
};

const login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();

  //search the database to find the email
  usersModel
    .findOne({ email, status: "active" })
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
            user: results,
          });
        }
        //if not matched, throw error msg
        else {
          res.status(403).json({
            success: false,
            message: `The email or the password is incorrect`,
          });
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

// const login = (req, res) => {
//   const password = req.body.password;
//   const email = req.body.email.toLowerCase();

//   //search the database to find the email
//   usersModel
//     .findOne({ email })
//     .populate("role")
//     .then(async (results) => {
//       //if the email is not exsisted return an error msg
//       if (!results) {
//         res.status(403).json({
//           success: false,
//           message: `The email or the password is incorrect`,
//         });
//       }
//       try {
//         //if the email is exsisted, compare the entered password with hashed password
//         const valid = await bcrypt.compare(password, results.password);
//         if (!valid) {
//           return res.status(403).json({
//             success: false,
//             message: `The email doesn't exist or The password you’ve entered is incorrect`,
//           });
//         }
//         //if the passwords matched, generate the token
//         const payload = {
//           userId: results._id,
//           firstName: results.firstName,
//           lastName: results.lastName,
//           role: results.role,
//         };
//         const options = {
//           expiresIn: process.env.TOKEN_EXP_Time,
//         };

//         const token = jwt.sign(payload, process.env.SECRET, options);
//         res.status(200).json({
//           success: true,
//           message: `Valid login credentials`,
//           token: token,
//         });
//       } catch (error) {
//         throw new Error(error.message);
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({
//         success: false,
//         message: `Server Error`,
//         err: err.message,
//       });
//     });
// };

// const login = (req, res) => {
//   const password = req.body.password;
//   const email = req.body.email.toLowerCase();
//   usersModel
//     .findOne({ email })
//     .populate("role", "-_id -__v")
//     .then(async (result) => {
//       if (!result) {
//         return res.status(403).json({
//           success: false,
//           message: `The email doesn't exist or The password you’ve entered is incorrect`,
//         });
//       }
//       try {
//         const valid = await bcrypt.compare(password, result.password);
//         if (!valid) {
//           return res.status(403).json({
//             success: false,
//             message: `The email doesn't exist or The password you’ve entered is incorrect`,
//           });
//         }
//         const payload = {
//           userId: result._id,
//           firstName: result.firstName,
//           lastName: result.lastName,
//           role: result.role,
//         };

//         const options = {
//           expiresIn: "24h",
//         };
//         const token = jwt.sign(payload, process.env.SECRET, options);
//         res.status(200).json({
//           success: true,
//           message: `Valid login credentials`,
//           token: token,
//         });
//       } catch (error) {
//         throw new Error(error.message);
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({
//         success: false,
//         message: `Server Error`,
//         err: err.message,
//       });
//     });
// };

const checkGoogleUser = (req, res) => {
  const { firstName, lastName, email } = req.body;

  const role = "646b9a16cc1c7fe784829ca6";
  const password = "none";

  usersModel
    .find({ email })
    .then((results) => {
      if (results.length == 0) {
        //*register him as a new user
        const newUser = new usersModel({
          firstName,
          lastName,
          email,
          password,
          role,
        });

        newUser
          .save()
          .then((results) => {
            console.log(results);
            //*if the registeration went correctly, log the user in
            if (results) {
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
                  //generate a token for google user
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
                    user: results,
                  });
                })
                .catch((err) => {
                  res.json(err);
                });
            }
          })
          .catch((err) => {
            res.json(err);
          });
      } else {
        //*if already registered, login
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
            //generate a token for google user
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
              user: results,
            });
          })
          .catch((err) => {
            res.json(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

// const registerGoogleUser = (req, res) => {
//   const { firstName, lastName, email } = req.body;

//   const role = "64060d4149b1402fedf92a91";
//   const password = "none";

//   const newUser = new usersModel({
//     firstName,
//     lastName,
//     email,
//     password,
//     role,
//   });

//   newUser
//     .save()
//     .then((results) => {
//       console.log(results);
//       res.status(201).json({
//         success: true,
//         message: "Account Created Successfully",
//         author: results,
//       });
//     })
//     .catch((err) => {
//       if (err.keyPattern) {
//         return res.status(409).json({
//           success: false,
//           message: `The email already exists`,
//         });
//       } else {
//         res.status(500).json({
//           success: false,
//           message: `Server Error`,
//           err: err.message,
//         });
//       }
//     });
// };

// const loginWithGoogle = (req, res) => {
//   const email = req.body.email.toLowerCase();

//   //search the database to find the email
//   usersModel
//     .findOne({ email })
//     .populate("role")
//     .then((results) => {
//       //if the email is not exsisted return an error msg
//       if (!results) {
//         res.status(403).json({
//           success: false,
//           message: `The email or the password is incorrect`,
//         });
//       }
//       //generate a token for google user
//       const payload = {
//         userId: results._id,
//         firstName: results.firstName,
//         lastName: results.lastName,
//         role: results.role,
//       };
//       const options = {
//         expiresIn: process.env.TOKEN_EXP_Time,
//       };
//       const token = jwt.sign(payload, process.env.SECRET, options);

//       res.status(200).json({
//         success: true,
//         message: `Valid login credentials`,
//         token: token,
//         user: results,
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         success: false,
//         message: `Server Error`,
//         err: err.message,
//       });
//     });
// };

const getAllUsers = (req, res) => {
  usersModel
    .find({})
    .populate("role")
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.json(err);
    });
};

const updateUserInfo = (req, res) => {
  const userId = req.params.userId;
  const { image, description, status } = req.body;

  usersModel
    .findByIdAndUpdate(
      { _id: userId },
      { image, description, status },
      { new: true }
    )
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = {
  register,
  login,
  checkGoogleUser,
  getAllUsers,
  updateUserInfo,
};
