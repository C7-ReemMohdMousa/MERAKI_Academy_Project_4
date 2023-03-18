const express = require("express");
const { createRole, getRoles, updateStudentToTeacher } = require("../controllers/roles");
const { authentication } = require("../middleware/authentication");

//instatiate router
const rolesRouter = express.Router();

rolesRouter.post("/:role", createRole);
rolesRouter.get("/:role", getRoles);
rolesRouter.post("/change/role/:userId", updateStudentToTeacher);

module.exports = rolesRouter;
