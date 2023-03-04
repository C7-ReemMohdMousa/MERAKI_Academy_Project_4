const express = require("express");
const { createRole } = require("../controllers/roles");
//instatiate router
const rolesRouter = express.Router();

rolesRouter.post("/", createRole);

module.exports = rolesRouter;
