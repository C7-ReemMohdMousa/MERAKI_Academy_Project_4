const express = require("express");

const {
  courseEnrollment,
  cancelEnrollment,
  updateEnrollment,
} = require("../controllers/enrollment");
const { authentication } = require("../middleware/authentication");

//instatiate router
const enrollmentRouter = express.Router();

enrollmentRouter.post("/", courseEnrollment);
enrollmentRouter.delete("/:courseId", cancelEnrollment);
enrollmentRouter.put("/:courseId", updateEnrollment);

module.exports = enrollmentRouter;
