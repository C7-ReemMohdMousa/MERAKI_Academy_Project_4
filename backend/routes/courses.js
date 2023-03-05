const express = require("express");
const {
  getAllCourses,
  createCategory,
  uploadCourse,
  uploadLectures,
  deleteCourseById,
  updateCourseById,
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

module.exports = courseRouter;
