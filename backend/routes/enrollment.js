const express = require("express");

const {
  courseEnrollment,
  cancelEnrollment,
  updateEnrollment,
  completedCourses,
  inProgressCourses,
  enrollOnce,
  checkIfUserEnrolled,
} = require("../controllers/enrollment");

const { authentication } = require("../middleware/authentication");
const { authorization } = require("../middleware/authorization");

//instatiate router
const enrollmentRouter = express.Router();

enrollmentRouter.post(
  "/enrollCourse/:courseId",
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

enrollmentRouter.get("/:courseId/:userId", checkIfUserEnrolled);

module.exports = enrollmentRouter;
