const express = require("express");

const {
  courseEnrollment,
  cancelEnrollment,
  updateEnrollment,
  completedCourses,
  inProgressCourses,
} = require("../controllers/enrollment");


const { authentication } = require("../middleware/authentication");

//instatiate router
const enrollmentRouter = express.Router();

enrollmentRouter.post("/", courseEnrollment);
enrollmentRouter.delete("/:courseId", cancelEnrollment);
enrollmentRouter.put("/:courseId", updateEnrollment);

enrollmentRouter.get("/myCompletedCourses/:userId", completedCourses);
enrollmentRouter.get("/myinProgressCourses/:userId", inProgressCourses);

module.exports = enrollmentRouter;
