const express = require("express");
const { createRole } = require("../controllers/roles");
const { authentication } = require("../middleware/authentication");

//instatiate router
const rolesRouter = express.Router();

rolesRouter.post("/", authentication, createRole);

module.exports = rolesRouter;
