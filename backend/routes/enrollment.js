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
const { authorization } = require("../middleware/authorization");

//instatiate router
const enrollmentRouter = express.Router();

enrollmentRouter.post(
  "/:userId/:courseId",
  enrollOnce,
  authentication,
  authorization("enroll_course"),
  courseEnrollment
);
enrollmentRouter.delete(
  "/:courseId",
  authentication,
  authorization("cancel_enrollment"),
  cancelEnrollment
);

enrollmentRouter.put(
  "/:courseId",
  authentication,
  authorization("update_enrollment"),
  updateEnrollment
);

enrollmentRouter.get(
  "/myCompletedCourses/:userId",
  authentication,
  completedCourses
);
enrollmentRouter.get(
  "/myinProgressCourses/:userId",
  authentication,
  inProgressCourses
);

module.exports = enrollmentRouter;
