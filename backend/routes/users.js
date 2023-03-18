const express = require("express");
const {
  register,
  login,
  checkGoogleUser,
  getAllUsers,
  updateUserInfo,
} = require("../controllers/users");
//instatiate router
const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.post("/login/check/google/user", checkGoogleUser);
// usersRouter.post("/register/google/user", registerGoogleUser);
// usersRouter.post("/login/google/user", loginWithGoogle);
usersRouter.get("/all/users", getAllUsers);
usersRouter.post("/update/user/:userId", updateUserInfo);

module.exports = usersRouter;
