const express = require("express");
const { createRole, getRoles } = require("../controllers/roles");
const { authentication } = require("../middleware/authentication");

//instatiate router
const rolesRouter = express.Router();

rolesRouter.post("/:role", createRole);
rolesRouter.get("/", getRoles);

module.exports = rolesRouter;
