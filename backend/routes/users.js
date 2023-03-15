const express = require("express");
const {
  register,
  login,
  checkGoogleUser
} = require("../controllers/users");
//instatiate router
const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.post("/login/check/google/user", checkGoogleUser);
// usersRouter.post("/register/google/user", registerGoogleUser);
// usersRouter.post("/login/google/user", loginWithGoogle);

module.exports = usersRouter;
