const express = require("express");

const {
  courseEnrollment,
  cancelEnrollment,
  updateEnrollment,
  completedCourses,
  inProgressCourses,
} = require("../controllers/enrollment");

const { enrollOnce } = require("../middleware/enrollOnce");
const { authentication } = require("../middleware/authentication");

//instatiate router
const enrollmentRouter = express.Router();

enrollmentRouter.post("/", enrollOnce, courseEnrollment);
enrollmentRouter.delete("/:courseId", cancelEnrollment);
enrollmentRouter.put("/:courseId", updateEnrollment);

enrollmentRouter.get("/myCompletedCourses/:userId", completedCourses);
enrollmentRouter.get("/myinProgressCourses/:userId", inProgressCourses);

module.exports = enrollmentRouter;
