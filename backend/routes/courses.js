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
  searchByCourseName,
  getCoursesByInstructor,
  getCategoryId,
  checkIfTheUserIsTheInstructor,
  getAllCategories,
  getCoursesByLevel,
} = require("../controllers/courses");
const { authentication } = require("../middleware/authentication");

const { authorization } = require("../middleware/authorization");

//instatiate router
const courseRouter = express.Router();

courseRouter.get("/", getAllCourses);

courseRouter.get("/search/results/:search", searchByCourseName);
courseRouter.get("/:courseId", getCourseById);

courseRouter.get("/all/categories", getAllCategories);

//get courses by level
courseRouter.get("/all/courses/bylevel/", getCoursesByLevel);

courseRouter.get("/created/:userId", authentication, getCoursesByInstructor);

//get category id
courseRouter.get("/category/:categoryName", getCategoryId);

//check if the user is the instructor
courseRouter.get(
  "/isinstructor/:courseId/:userId",
  authentication,
  checkIfTheUserIsTheInstructor
);

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
  "/create/category",
  createCategory
);
courseRouter.get("/categoryid/:categoryId", getCoursesByCategory);

//lectures api
courseRouter.post(
  "/:courseId/lectures",
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
