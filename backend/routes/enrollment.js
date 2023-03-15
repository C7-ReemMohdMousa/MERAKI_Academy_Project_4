const express = require("express");

const {
  courseEnrollment,
  cancelEnrollment,
  updateEnrollment,
  completedCourses,
  inProgressCourses,
  enrollOnce,
  checkIfUserEnrolled,
  AddCompleteLecturesToEnrollment,
  getEnrollmentInformations,
  AddCompletedLectureOnce,
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

enrollmentRouter.put(
  "/complete/lecture/:courseId/:lectureId",
  authentication,
  AddCompletedLectureOnce,
  AddCompleteLecturesToEnrollment
);

enrollmentRouter.get("/:courseId/:userId", checkIfUserEnrolled);

enrollmentRouter.get(
  "/check/completed/lectures/:courseId",
  authentication,
  getEnrollmentInformations
);

module.exports = enrollmentRouter;
