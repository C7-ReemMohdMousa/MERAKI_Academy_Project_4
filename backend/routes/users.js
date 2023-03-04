const express = require("express");
const { register } = require("../controllers/users");
//instatiate router
const usersRouter = express.Router();

usersRouter.post("/register", register);

module.exports = usersRouter;
