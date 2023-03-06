const express = require("express");
const {
  getAllCourses,
  createCategory,
  uploadCourse,
  uploadLectures,
  deleteCourseById,
  updateCourseById,
  updateLecture,
  deleteLecture,
  getCoursesByCategory,
  getCourseById,
} = require("../controllers/courses");
const { authentication } = require("../middleware/authentication");

const { authorization } = require("../middleware/authorization");

//instatiate router
const courseRouter = express.Router();

courseRouter.get("/", getAllCourses);
courseRouter.get("/:courseId", getCourseById);

courseRouter.delete(
  "/:courseId",
  authentication,
  authorization("delete_course"),
  deleteCourseById
);
courseRouter.put(
  "/:courseId",
  authentication,
  authorization("update_course"),
  updateCourseById
);
courseRouter.post(
  "/",
  authentication,
  authorization("upload_course"),
  uploadCourse
);

//category api
courseRouter.post(
  "/category",
  authentication,
  authorization("create_category"),
  createCategory
);
courseRouter.get("/:categoryId", getCoursesByCategory);

//lectures api
courseRouter.post(
  "/lectures",
  authentication,
  authorization("upload_lecture"),
  uploadLectures
);

courseRouter.put(
  "/:courseId/:lectureId",
  authentication,
  authorization("update_lecture"),
  updateLecture
);
courseRouter.delete(
  "/:courseId/:lectureId",
  authentication,
  authorization("delete_lecture"),
  deleteLecture
);

module.exports = courseRouter;
