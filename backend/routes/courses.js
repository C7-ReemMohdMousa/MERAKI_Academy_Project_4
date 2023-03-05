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
} = require("../controllers/courses");
const { authentication } = require("../middleware/authentication");

//instatiate router
const courseRouter = express.Router();

courseRouter.get("/", getAllCourses);
courseRouter.post("/category", createCategory);
courseRouter.post("/", uploadCourse);
courseRouter.post("/lectures", uploadLectures);
courseRouter.delete("/:courseId", deleteCourseById);
courseRouter.put("/:courseId", updateCourseById);

//lectures api
courseRouter.put("/:courseId/:lectureId", updateLecture);
courseRouter.delete("/:courseId/:lectureId", deleteLecture);


module.exports = courseRouter;
