const express = require("express");

const {
  courseEnrollment,
  cancelEnrollment,
  updateEnrollment,
  completedCourses,
  inProgressCourses,
  enrollOnce,
} = require("../controllers/enrollment");

const { authentication } = require("../middleware/authentication");

//instatiate router
const enrollmentRouter = express.Router();

enrollmentRouter.post("/:userId/:courseId", enrollOnce, courseEnrollment);
enrollmentRouter.delete("/:courseId", cancelEnrollment);
enrollmentRouter.put("/:courseId", updateEnrollment);

enrollmentRouter.get("/myCompletedCourses/:userId", completedCourses);
enrollmentRouter.get("/myinProgressCourses/:userId", inProgressCourses);

module.exports = enrollmentRouter;
